const UtilisateurModel = require("../models/utilisateur.model");
const ResponseHelper = require("../helpers/responseHelper");

const jwt = require("jsonwebtoken");

module.exports.checkUtilisateur = (req, res, next, myUserRole) => {
  const token = req.headers.authorization;

  // // pour PostMan
  // const authHeader = req.headers.authorization || "";
  // const token = authHeader.includes(" ") ? authHeader.split(" ")[1] : "";

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (decodedToken) {
        const dtok = decodedToken.account;
        const id = dtok.im;
        const resultat = await UtilisateurModel.getIdUtilisateur({ id });

        const tmp = resultat[0];
        let verif = tmp.roleU || "69";
        if (tmp) {
          verif = tmp.roleU;
        } 

        if (verif == myUserRole.admin) {
          next();
        } else {
          ResponseHelper.sendResponse(
            res,
            false,
            "Accès non autorisé pour l'utilisateur actuelle!",
            null,
            403
          );
        }
      } else {
        ResponseHelper.sendResponse(
          res,
          false,
          "Action non autorisé! Impossible de décoder votre jeton/token!",
          null,
          401
        );
      }
    });
  } else {
    ResponseHelper.sendResponse(
      res,
      false,
      "Action non autorisé! Impossible de trouver votre jeton/token!",
      null,
      401
    );
  }
};
