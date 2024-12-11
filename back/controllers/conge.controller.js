const Conge = require("../models/conge.model");
const ResponseHelper = require("../helpers/responseHelper");
const Utilisateur = require("../models/utilisateur.model");

module.exports.getAllConges = async (req, res) => {
  try {
    const result = await Conge.getAllConges();
    ResponseHelper.sendResponse(
      res,
      true,
      "Liste des congés récupérée avec succès !",
      result
    );
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la récupération des congés !",
      error.message,
      500
    );
  }
};

module.exports.getAllCongesDM = async (req, res) => {
  try {
    const result = await Conge.getAllCongesDM();
    ResponseHelper.sendResponse(
      res,
      true,
      "Liste des congés récupérée avec succès !",
      result
    );
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la récupération des congés !",
      error.message,
      500
    );
  }
};

module.exports.getCongeById = async (req, res) => {
  const congeId = req.params.id;

  try {
    const result = await Conge.getCongeById({ id: congeId });
    if (result.length > 0) {
      ResponseHelper.sendResponse(res, true, "Congé trouvé !", result[0]);
    } else {
      ResponseHelper.sendResponse(res, false, "Congé non trouvé !", null, 404);
    }
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la récupération du congé !",
      error.message,
      500
    );
  }
};

module.exports.getMyReqConge = async (req, res) => {
  const congeIm = req.params.id;

  try {
    const result = await Conge.getMyReqConge({ im: congeIm });

    if (result.length > 0) {
      ResponseHelper.sendResponse(
        res,
        true,
        "Requête de congé trouvé !",
        result[0]
      );
    } else {
      ResponseHelper.sendResponse(
        res,
        true,
        "Requête de congé non trouvé !",
        null
      );
    }
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la récupération du requête de congé !",
      error.message,
      500
    );
  }
};

module.exports.createConge = async (req, res) => {
  const { cIm, motif, dateDeDebut, nbJourC } = req.body;

  if (!cIm || !motif || !dateDeDebut || !nbJourC) {
    return ResponseHelper.sendResponse(
      res,
      false,
      "Tous les champs sont requis !",
      400
    );
  }

  // Assure-toi que nbJourC est un nombre
  const nombreDeJours = parseInt(nbJourC, 10);
  if (isNaN(nombreDeJours) || nombreDeJours <= 0) {
    return ResponseHelper.sendResponse(
      res,
      false,
      "Nombre de jour de congé doit être un nombre valide !",
      400
    );
  }

  // Calcul de la date de fin
  const startDate = new Date(dateDeDebut);
  const dateDeFin = new Date(startDate);
  dateDeFin.setDate(startDate.getDate() + nombreDeJours);

  let newConge = {
    cIm,
    motif,
    dateDeDebut,
    nbJourC,
    dateDeFin: dateDeFin.toISOString().split("T")[0],
  };

  try {
    const result = await Conge.createConge(newConge);
    ResponseHelper.sendResponse(
      res,
      true,
      "Demande de congé envoyer avec succès!",
      result
    );
  } catch (error) {
    ResponseHelper.sendResponse(res, false, error.message, 500);
  }
};

module.exports.updateConge = async (req, res) => {
  const userId = req.params.id;
  const userRole = req.body.reqUserRole;
  const { reqUserRole, ...updateData } = req.body;

  try {
    const result = await Conge.updateConge(updateData, userId, userRole);
    ResponseHelper.sendResponse(res, result.success, result.message);
  } catch (error) {
    ResponseHelper.sendResponse(res, false, error.message, 500);
  }
};

module.exports.deleteConge = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await Conge.getCongeById({ id: userId });

    if (result && result.length > 0) {
      const userResult = await Utilisateur.getIdUtilisateur({
        id: result[0].cIm,
      });

      if (userResult.length > 0) {
        const currentNbJour = userResult[0].nbJour;

        // Update the user's nbJour
        const updateData = {
          enConge: false,
          nbJour: currentNbJour + result[0].nbJourC,
        };

        await Utilisateur.updateUtilisateur(updateData, result[0].cIm, true);

        const deleteResult = await Conge.deleteConge(userId);
        ResponseHelper.sendResponse(
          res,
          deleteResult.success,
          deleteResult.message
        );
      } else {
        ResponseHelper.sendResponse(res, false, "Employée non trouvé !", 404);
      }
    } else {
      ResponseHelper.sendResponse(
        res,
        false,
        "Échec de suppression! Congé non existant!",
        404
      );
    }
  } catch (error) {
    ResponseHelper.sendResponse(res, false, error.message, 500);
  }
};

module.exports.searchConge = async (req, res) => {
  const { valeur } = req.body;

  if (!valeur) {
    return ResponseHelper.sendResponse(
      res,
      false,
      "Valeur de recherche requise !",
      null,
      400
    );
  }

  try {
    const result = await Conge.searchConge({ val: valeur });
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
      "Erreur lors de la recherche du congé !",
      error.message,
      500
    );
  }
};

module.exports.searchCongeDM = async (req, res) => {
  const { valeur } = req.body;

  if (!valeur) {
    return ResponseHelper.sendResponse(
      res,
      false,
      "Valeur de recherche requise !",
      null,
      400
    );
  }

  try {
    const result = await Conge.searchCongeDM({ val: valeur });
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
      "Erreur lors de la recherche du congé !",
      error.message,
      500
    );
  }
};

module.exports.getTotalOfReqConge = async (req, res) => {
  try {
    const result = await Conge.getTotalOfReqConge();
    ResponseHelper.sendResponse(
      res,
      true,
      "Total des requetes de congé récupéré avec succès !",
      result
    );
  } catch (error) {
    ResponseHelper.sendResponse(res, false, error.message, 500);
  }
};

module.exports.updateMyConge = async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  try {
    const result = await Conge.updateMyCongeByAdmin(updateData, userId);
    ResponseHelper.sendResponse(res, result.success, result.message);
  } catch (error) {
    ResponseHelper.sendResponse(res, false, error.message, 500);
  }
};

module.exports.updateAutoEmployeEnConge = async (req, res) => {
  try {
    const result = await Conge.updateAutoEmployeEnConge();
    ResponseHelper.sendResponse(res, true, result.message, 200);
  } catch (error) {
    ResponseHelper.sendResponse(res, false, error.message, 500);
  }
};
