"use strict";
const JoursFerie = require("../models/joursFerie.model");
const ResponseHelper = require("../helpers/responseHelper");

module.exports.addJoursFerie = async (req, res) => {
  let { dateJF, descJF } = req.body;

  // Input validation
  if (!dateJF || !descJF) {
    return ResponseHelper.sendResponse(
      res,
      false,
      "Tous les champs sont requis !",
      null,
      400
    );
  }
  const newJoursFerie = {
    dateJF,
    descJF,
  };

  try {
    const result = await JoursFerie.addJoursFerie(newJoursFerie);
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

module.exports.updateJoursFerie = async (req, res) => {
  const userId = req.params.id;
  const userRole = req.body.reqUserRole;
  const { reqUserRole, ...updateData } = req.body;

  try {
    const result = await JoursFerie.updateJoursFerie(
      updateData,
      userId,
      userRole
    );
    ResponseHelper.sendResponse(res, result.success, result.message);
  } catch (error) {
    ResponseHelper.sendResponse(res, false, error.message, null, 500);
  }
};

module.exports.deleteJoursFerie = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await JoursFerie.getIdJoursFerie({ id: userId });

    if (result && result.length > 0) {
      const deleteResult = await JoursFerie.deleteJoursFerie(userId);
      ResponseHelper.sendResponse(
        res,
        deleteResult.success,
        deleteResult.message
      );
    } else {
      ResponseHelper.sendResponse(
        res,
        false,
        "Échec de suppression! JoursFerie non existant!",
        null,
        404
      );
    }
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la suppression!",
      error.message,
      500
    );
  }
};

module.exports.getAllJoursFeries = async (req, res) => {
  try {
    const jr = await JoursFerie.remplirJoursFeries(); //Auto Jour Feries

    const result = await JoursFerie.getAllJoursFeries();
    ResponseHelper.sendResponse(
      res,
      true,
      "Liste des JoursFeries récupérée avec succès !",
      result
    );
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la récupération des JoursFeries !",
      error.message,
      500
    );
  }
};

module.exports.getMyTotalJoursFerie = async (req, res) => {
  try {
    const result = await JoursFerie.getMyTotalJoursFerie();
    ResponseHelper.sendResponse(
      res,
      true,
      "Total des JoursFeries récupéré avec succès !",
      result
    );
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la récupération du total des JoursFeries !",
      error.message,
      500
    );
  }
};

module.exports.getIdJoursFerie = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await JoursFerie.getIdJoursFerie({ id: userId });
    if (result.length > 0) {
      ResponseHelper.sendResponse(res, true, "JoursFerie trouvé !", result[0]);
    } else {
      ResponseHelper.sendResponse(
        res,
        false,
        "JoursFerie non trouvé !",
        null,
        404
      );
    }
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la récupération de l'JoursFerie !",
      error.message,
      500
    );
  }
};

module.exports.searchJoursFerie = async (req, res) => {
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
    const result = await JoursFerie.searchJoursFerie({ val: valeur });
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
      "Erreur lors de la recherche d'JoursFerie !",
      error.message,
      500
    );
  }
};

// Search for JoursFeries between two dates
module.exports.searchJoursFerieBetweenDates = async (req, res) => {
  const { startDate, endDate } = req.body;

  // Validate input
  if (!startDate || !endDate) {
    return ResponseHelper.sendResponse(
      res,
      false,
      "Dates de recherche requises !",
      null,
      400
    );
  }

  try {
    const result = await JoursFerie.searchJoursFerieBetweenDates(
      startDate,
      endDate
    );
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
      "Erreur lors de la recherche de JoursFerie entre dates !",
      error.message,
      500
    );
  }
};

// Search for JoursFeries by a specific month and year
module.exports.searchJoursFerieByMonthAndYear = async (req, res) => {
  const { date } = req.body;

  if (!date) {
    return ResponseHelper.sendResponse(
      res,
      false,
      "Date de recherche requise !",
      null,
      400
    );
  }

  try {
    const result = await JoursFerie.searchJoursFerieByMonthAndYear({ date });
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
      "Erreur lors de la recherche de JoursFerie par mois et année !",
      error.message,
      500
    );
  }
};

module.exports.placeAuGlitch = async (req, res) => {
  try {
    const result = await JoursFerie.placeAuGlitch();
    ResponseHelper.sendResponse(res, true, "Glitch succès!", result);
  } catch (error) {
    ResponseHelper.sendResponse(res, false, "Glitch Erreur!", 500);
  }
};
