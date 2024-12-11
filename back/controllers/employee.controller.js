const Employe = require("../models/employe.model");
const ResponseHelper = require("../helpers/responseHelper");
const QRCode = require("qrcode");

module.exports.getQRCode = async (req, res) => {
  let { im } = req.body;

  try {
    const qrCodeValue = await QRCode.toDataURL(im);
    ResponseHelper.sendResponse(
      res,
      true,
      "Génération du QR code réussi !",
      qrCodeValue
    );
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la génération du QR code: ",
      error.message,
      500
    );
  }
};

module.exports.getPointage = async (req, res) => {
  try {
    const result = await Employe.getPointage();
    ResponseHelper.sendResponse(
      res,
      true,
      "Liste des utilisateurs récupérée avec succès !",
      result
    );
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la récupération des utilisateurs !",
      error.message,
      500
    );
  }
};

module.exports.getNombreEmploye = async (req, res) => {
  try {
    const result = await Employe.getNombreEmploye();
    ResponseHelper.sendResponse(
      res,
      true,
      "Employer récupérée avec succès !",
      result
    );
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la récupération des Employers !",
      error.message,
      500
    );
  }
};

module.exports.getNombrePointage = async (req, res) => {
  try {
    const result = await Employe.getNombrePointage();
    ResponseHelper.sendResponse(
      res,
      true,
      "Liste des utilisateurs récupérée avec succès !",
      result
    );
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la récupération des utilisateurs !",
      error.message,
      500
    );
  }
};

module.exports.getStatParJour = async (req, res) => {
  try {
    const result = await Employe.getStatParJour();
    ResponseHelper.sendResponse(res, true, "Stat Jour: succès !", result);
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur Stat Jour !",
      error.message,
      500
    );
  }
};

module.exports.getStatParHeure = async (req, res) => {
  try {
    const result = await Employe.getStatParHeure();
    ResponseHelper.sendResponse(res, true, "Stat Heure: succès !", result);
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur Stat Heure !",
      error.message,
      500
    );
  }
};

module.exports.getFahatongavana = async (req, res) => {
  const congeId = req.params.id; 

  try {
    const result = await Employe.getFahatongavana({ id: congeId }); 

    if (result.length > 0) {
      ResponseHelper.sendResponse(
        res,
        true,
        "L'Employé(e) est présent !",
        result[0]
      );
    } else {
      ResponseHelper.sendResponse(res, true, "L'Employé(e) est absent !", null);
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
