"use strict";
const Utilisateur = require("../models/utilisateur.model");
const ResponseHelper = require("../helpers/responseHelper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tmp = 3 * 24 * 60 * 60 * 1000;
const path = require("path");

const createToken = (account) => {
  return jwt.sign({ account }, process.env.TOKEN_SECRET, { expiresIn: tmp });
};

module.exports.addUtilisateur = async (req, res) => {
  let { nom, prenom, im, departement, num, email, pwd, qrCodeValue } = req.body;
  const pic = req.file ? req.file.path : null;

  // Input validation
  if (!nom || !im || !departement || !num || !email || !pwd) {
    return ResponseHelper.sendResponse(
      res,
      false,
      "Tous les champs sont requis !",
      400
    );
  }

  pwd = bcrypt.hashSync(pwd, 10);
  // num = "+261:" + num;

  const newUtilisateur = {
    nom,
    prenom,
    im,
    departement,
    num,
    email,
    pwd,
    pic,
    qrCodeValue,
  };

  try {
    const result = await Utilisateur.addUtilisateur(newUtilisateur);
    ResponseHelper.sendResponse(res, true, "Ajout réussi !", result);
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      // "Erreur lors de l'ajout !",
      error.message,
      500
    );
  }
};

module.exports.loginUtilisateur = async (req, res) => {
  const { im, pwd } = req.body;

  try {
    const result = await Utilisateur.loginUtilisateur({ im });
    if (result && result.length > 0) {
      const user = result[0];
      const isPasswordValid = bcrypt.compareSync(pwd, user.pwd);

      if (isPasswordValid) {
        const token = createToken(user); 
        ResponseHelper.sendResponse(res, true, "Connecté à e-BOA!", {
          user,
          token,
        });
      } else {
        ResponseHelper.sendResponse(
          res,
          false,
          "Identifiant ou Mot de passe incorrect!",
          401
        );
      }
    } else {
      ResponseHelper.sendResponse(
        res,
        false,
        "Identifiant ou Mot de passe incorrect!",
        404
      );
    }
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la connexion !",
      error.message,
      500
    );
  }
};

module.exports.updateUtilisateur = async (req, res) => {
  const userId = req.params.id;
  const userRole = req.body.reqUserRole;

  const { reqUserRole, ...updateData } = req.body;

  if (userRole) {
    try {
      const result = await Utilisateur.updateUtilisateur(
        updateData,
        userId,
        userRole
      );
      ResponseHelper.sendResponse(res, result.success, result.message);
    } catch (error) {
      ResponseHelper.sendResponse(res, false, error.message, null, 500);
    }
  } else {
    try {
      const result = await Utilisateur.updateUtilisateurByEmployee(
        updateData,
        userId
      );
      ResponseHelper.sendResponse(res, result.success, result.message);
    } catch (error) {
      ResponseHelper.sendResponse(res, false, error.message, null, 500);
    }
  }
};

module.exports.updateUtilisateurPDP = async (req, res) => {
  const userId = req.params.id;

  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "Aucun fichier n'a été uploadé." });
  }

  // Construire le chemin relatif du fichier
  const pic = req.file.path;

  try {
    const result = await Utilisateur.updateUtilisateurPDP(pic, userId);
    ResponseHelper.sendResponse(res, result.success, result.message);
  } catch (error) {
    ResponseHelper.sendResponse(res, false, error.message, null, 500);
  }
};

module.exports.updateUtilisateurInfo = async (req, res) => {
  const userId = req.params.id;
  let { nom, prenom, num, email, pwd } = req.body;

  pwd = bcrypt.hashSync(pwd, 10);

  const updateData = {
    nom,
    prenom,
    num,
    email,
    pwd,
  };
  try {
    const result = await Utilisateur.updateUtilisateurInfo(updateData, userId);
    ResponseHelper.sendResponse(res, result.success, result.message);
  } catch (error) {
    ResponseHelper.sendResponse(res, false, error.message, null, 500);
  }
};

module.exports.updateUserRole = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await Utilisateur.updateUserRole(userId);
    ResponseHelper.sendResponse(res, result.success, result.message);
  } catch (error) {
    ResponseHelper.sendResponse(res, false, error.message, null, 500);
  }
};

module.exports.deleteUtilisateur = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await Utilisateur.getIdUtilisateur({ id: userId });

    if (result && result.length > 0) {
      const deleteResult = await Utilisateur.deleteUtilisateur(userId);
      ResponseHelper.sendResponse(
        res,
        deleteResult.success,
        deleteResult.message
      );
    } else {
      ResponseHelper.sendResponse(
        res,
        false,
        "Échec de suppression! Utilisateur non existant!",
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

module.exports.getAllUtilisateurs = async (req, res) => {
  try {
    const result = await Utilisateur.getAllUtilisateurs();
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

module.exports.getAllAriseUsers = async (req, res) => {
  try {
    const result = await Utilisateur.getAllAriseUsers();
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

module.exports.getAllEmployeeUsers = async (req, res) => {
  try {
    const result = await Utilisateur.getAllEmployeeUsers();
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

module.exports.getMyTotalUtilisateur = async (req, res) => {
  try {
    const result = await Utilisateur.getMyTotalUtilisateur();
    ResponseHelper.sendResponse(
      res,
      true,
      "Total des utilisateurs récupéré avec succès !",
      result
    );
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la récupération du total des utilisateurs !",
      error.message,
      500
    );
  }
};

module.exports.getIdUtilisateur = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await Utilisateur.getIdUtilisateur({ id: userId });
    if (result.length > 0) {
      ResponseHelper.sendResponse(res, true, "Utilisateur trouvé !", result[0]);
    } else {
      ResponseHelper.sendResponse(
        res,
        false,
        "Utilisateur non trouvé !",
        null,
        404
      );
    }
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la récupération de l'utilisateur !",
      error.message,
      500
    );
  }
};

module.exports.getimUtilisateur = async (req, res) => {
  const im = req.params.im; // Assuming im is passed in the route

  try {
    const result = await Utilisateur.getimUtilisateur(im);
    if (result.length > 0) {
      ResponseHelper.sendResponse(res, true, "Utilisateur trouvé !", result[0]);
    } else {
      ResponseHelper.sendResponse(
        res,
        false,
        "Utilisateur non trouvé !",
        null,
        404
      );
    }
  } catch (error) {
    ResponseHelper.sendResponse(
      res,
      false,
      "Erreur lors de la récupération de l'utilisateur !",
      error.message,
      500
    );
  }
};

module.exports.searchUtilisateur = async (req, res) => {
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
    const result = await Utilisateur.searchUtilisateur({ val: valeur });
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

module.exports.searchEmployeeUser = async (req, res) => {
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
    const result = await Utilisateur.searchEmployeeUser({ val: valeur });
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

module.exports.searchUserToArise = async (req, res) => {
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
    const result = await Utilisateur.searchUserToArise({ val: valeur });
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
