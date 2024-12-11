const Pointage = require("../models/pointage.model"); // Adjust the path to your model
const ResponseHelper = require("../helpers/responseHelper"); // Adjust the path to your response helper

module.exports.createPointage = async (req, res) => {
  let pointageData = req.body;

  if (!pointageData.employeIm) {
    return ResponseHelper.sendResponse(
      res,
      false,
      "IM de l'employé requis !",
      400
    );
  }

  try {
    // fuseau horaire de Madagascar
    const now = new Date();
    const options = { timeZone: "Indian/Antananarivo", hour12: false };
    const currentDate = new Date(now.toLocaleString("en-US", options));

    const dateDuJour = currentDate.toISOString().split("T")[0]; // Format YYYY-MM-DD
    const heureEntree = currentDate.toTimeString().split(" ")[0].slice(0, 5); // Format HH:MM

    // Définir l'heure de début de travail (8:00 AM) pour la comparaison
    const startWorkTime = new Date(`${dateDuJour}T08:00:00`);
    const delayInMs = currentDate - startWorkTime;
    const delayInMinutes = Math.floor(delayInMs / 60000);

    // Calculer le retard en heures et minutes si > 30 minutes
    let commentaire = null;
    if (delayInMinutes > 720) {
      commentaire = "";
    } else if (delayInMinutes > 360) {
      const retard = delayInMinutes - 360;
      const hours = Math.floor(retard / 60);
      const minutes = retard % 60;
      commentaire = `Retard de ${
        hours ? `${hours} heure${hours > 1 ? "s" : ""} et ` : ""
      }${minutes} minute${minutes !== 1 ? "s" : ""}`;
    } else if (delayInMinutes > 30) {
      const retard = delayInMinutes - 30;
      const hours = Math.floor(retard / 60);
      const minutes = retard % 60;
      commentaire = `Retard de ${
        hours ? `${hours} heure${hours > 1 ? "s" : ""} et ` : ""
      }${minutes} minute${minutes !== 1 ? "s" : ""}`;
    }

    // Ajouter le commentaire au champ `coms` s'il existe
    pointageData.coms =
      (pointageData.coms || "") + (commentaire ? ` ${commentaire}` : "");

    // Ajouter la date, l'heure d'entrée et les commentaires aux données de pointage
    pointageData = {
      ...pointageData,
      heureEntree,
      dateDuJour,
    };

    const result = await Pointage.createPointage(pointageData);
    ResponseHelper.sendResponse(res, true, "Ajout réussi !", result);
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de l'ajout !",
      error.message,
      500
    );
  }
};

module.exports.getAllPointages = async (req, res) => {
  const pointageData = req.body;

  try {
    const result = await Pointage.getAllPointages(pointageData);
    ResponseHelper.sendResponse(
      res,
      true,
      "Liste des pointages récupérée avec succès !",
      result
    );
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la récupération des pointages!",
      error.message,
      500
    );
  }
};

module.exports.getAllPointagesDesAbsents = async (req, res) => {
  const pointageData = req.body;

  try {
    const result = await Pointage.getAllPointagesDesAbsents(pointageData);
    ResponseHelper.sendResponse(
      res,
      true,
      "Liste des absents récupérée avec succès !",
      result
    );
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la récupération des absents!",
      error.message,
      500
    );
  }
};

module.exports.getPointageById = async (req, res) => {
  const pointageId = req.params.id;

  try {
    const result = await Pointage.getPointageById({ id: pointageId });
    if (result.length > 0) {
      ResponseHelper.sendResponse(res, true, "Pointage trouvé !", result[0]);
    } else {
      ResponseHelper.sendResponse(
        res,
        false,
        "Pointage non trouvé !",
        null,
        404
      );
    }
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la récupération d'une pointage !",
      error.message,
      500
    );
  }
};

module.exports.updatePointage = async (req, res) => {
  const userId = req.params.id;
  const { updateData } = req.body;

  try {
    const result = await Pointage.updatePointage(updateData, userId);
    ResponseHelper.sendResponse(res, result.success, result.message);
  } catch (error) {
    ResponseHelper.sendResponse(res, false, error.message, null, 500);
  }
};

module.exports.deletePointage = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Pointage.deletePointage(id);
    ResponseHelper.sendResponse(
      res,
      result.success,
      result.message,
      result.pointage // Include the deleted pointage
    );
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors du suppression du pointage!",
      error.message,
      500
    );
  }
};

module.exports.cloturePointage = async (req, res) => {
  let pointageData = req.body;

  if (!pointageData.employeIm) {
    return ResponseHelper.sendResponse(
      res,
      false,
      "Pointage clôture de journée : IM de l'employé requis !",
      400
    );
  }

  try {
    const presence = await Pointage.getPointageByCIM({
      id: pointageData.employeIm,
    });

    if (presence.length > 0) {
      // Heure Madagascar
      const now = new Date();
      const options = { timeZone: "Indian/Antananarivo", hour12: false };
      const currentDate = new Date(now.toLocaleString("en-US", options));

      const heureSortie = currentDate.toTimeString().split(" ")[0].slice(0, 5); // Format HH:MM

      pointageData = {
        ...pointageData,
        heureSortie,
      };

      const result = await Pointage.updatePointage(
        pointageData,
        presence[0].id
      );

      ResponseHelper.sendResponse(
        res,
        true,
        "Pointage clôture de journée réussi !",
        result
      );
    } else {
      ResponseHelper.sendResponse(
        res,
        false,
        "L'employé n'était pas présent aujourd'hui !",
        404
      );
    }
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la mise à jour de pointage clôture de journée !",
      error.message,
      500
    );
  }
};

module.exports.getPointageEmployee = async (req, res) => {
  const pointageData = req.body;

  try {
    const result = await Pointage.getPointageEmployee(pointageData);
    ResponseHelper.sendResponse(
      res,
      true,
      "Pointages récupérée avec succès !",
      result
    );
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la récupération du pointages!",
      error.message,
      500
    );
  }
};

module.exports.getPointageEmployees = async (req, res) => {
  const pointageData = req.body;
  try {
    const result = await Pointage.getPointageEmployees(pointageData);
    ResponseHelper.sendResponse(
      res,
      true,
      "Pointages récupérée avec succès !",
      result
    );
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la récupération du pointages!",
      error.message,
      500
    );
  }
};

module.exports.searchPointageParJour = async (req, res) => {
  const pointageData = req.body;
  try {
    const result = await Pointage.searchPointageParJour(pointageData);
    ResponseHelper.sendResponse(
      res,
      result.success,
      result.message,
      result.res // Include the results
    );
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la recherche d'utilisateur !",
      error.message,
      500
    );
  }
};

module.exports.searchPointageAbsentParJour = async (req, res) => {
  const pointageData = req.body;
  try {
    const result = await Pointage.searchPointageAbsentParJour(pointageData);
    ResponseHelper.sendResponse(
      res,
      result.success,
      result.message,
      result.res // Include the results
    );
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la recherche d'utilisateur !",
      error.message,
      500
    );
  }
};

module.exports.searchPointageParWeek = async (req, res) => {
  const pointageData = req.body;

  try {
    const result = await Pointage.searchPointageParWeek(pointageData);
    ResponseHelper.sendResponse(
      res,
      true,
      "Pointages récupérée avec succès !",
      result
    );
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la récupération du pointages!",
      error.message,
      500
    );
  }
};

module.exports.getTaux = async (req, res) => {
  const pointageData = req.body;
  try {
    const result = await Pointage.getTaux(pointageData);
    ResponseHelper.sendResponse(
      res,
      true,
      "Pointages récupérée avec succès !",
      result
    );
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la récupération du pointages!",
      error.message,
      500
    );
  }
};

module.exports.getBillanEmployee = async (req, res) => {
  let billanData = req.body;
  // billanData.dateMois = new Date(billanData.dateMois).toISOString().slice(0, 7);

  try {
    const result = await Pointage.getBillanEmployee(billanData);
    ResponseHelper.sendResponse(
      res,
      true,
      "Billan récupérée avec succès !",
      result
    );
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la récupération du Billan!",
      error.message,
      500
    );
  }
};

module.exports.createPointageWeb = async (req, res) => {
  let pointageData = req.body;

  if (!pointageData.employeIm) {
    return ResponseHelper.sendResponse(
      res,
      false,
      "IM de l'employé requis !",
      400
    );
  }

  try {
    // Récupérer la date et l'heure actuelles dans le fuseau horaire de Madagascar
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Indian/Antananarivo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const formattedNow = formatter.format(new Date());
    const [datePart, timePart] = formattedNow.split(", ");
    const dateDuJour = datePart; // Format YYYY-MM-DD
    const heureEntree = timePart.slice(0, 5); // Format HH:MM

    // Définir l'heure de début de travail (8:00 AM) pour la comparaison
    const startWorkTime = new Date(`${dateDuJour}T08:00:00`);
    const now = new Date(`${dateDuJour}T${timePart}`);
    const delayInMs = now - startWorkTime;
    const delayInMinutes = Math.floor(delayInMs / 60000);

    // Calculer le retard en heures et minutes si > 30 minutes
    let commentaire = null;
    if (delayInMinutes > 30) {
      const retard = delayInMinutes - 30;
      const hours = Math.floor(retard / 60);
      const minutes = retard % 60;
      commentaire = `Retard de ${
        hours ? `${hours} heure${hours > 1 ? "s" : ""} et ` : ""
      }${minutes} minute${minutes !== 1 ? "s" : ""}`;
    }

    // Ajouter le commentaire au champ `coms` s'il existe
    pointageData.coms =
      (pointageData.coms || "") + (commentaire ? ` ${commentaire}` : "");

    // Ajouter la date, l'heure d'entrée et les commentaires aux données de pointage
    pointageData = {
      ...pointageData,
      heureEntree,
      dateDuJour,
    };

    const result = await Pointage.createPointage(pointageData);
    ResponseHelper.sendResponse(res, true, "Ajout réussi !", result);
  } catch (error) { 
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de l'ajout !" + error.message,
      500
    );
  }
};

module.exports.cloturePointageWeb = async (req, res) => {
  let pointageData = req.body;

  if (!pointageData.employeIm) {
    return ResponseHelper.sendResponse(
      res,
      false,
      "Pointage clôture de journée : IM de l'employé requis !",
      400
    );
  }

  try {
    const presence = await Pointage.getPointageByCIM({
      id: pointageData.employeIm,
    });

    if (presence.length > 0) {
      // Récupérer la date et l'heure actuelles dans le fuseau horaire de Madagascar
      const now = new Date();
      const heureSortie = now.toLocaleTimeString("en-GB", {
        timeZone: "Indian/Antananarivo",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });

      pointageData = {
        ...pointageData,
        heureSortie,
      };

      const result = await Pointage.updatePointage(
        pointageData,
        presence[0].id
      );

      return ResponseHelper.sendResponse(
        res,
        true,
        "Pointage clôture de journée réussi !",
        result
      );
    } else {
      return ResponseHelper.sendResponse(
        res,
        false,
        "L'employé n'était pas présent aujourd'hui !",
        404
      );
    }
  } catch (error) {
    return ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la mise à jour de pointage clôture de journée !" +
        error.message,
      500
    );
  }
};
