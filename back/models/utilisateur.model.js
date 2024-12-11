let dbConn = require("../config/db");

let Utilisateur = function (utilisateur) {
  this.nom = utilisateur.nom;
  this.prenom = utilisateur.prenom;
  this.im = utilisateur.im;
  this.departement = utilisateur.departement;
  this.num = utilisateur.num;
  this.email = utilisateur.email;
  this.pwd = utilisateur.pwd;
  this.roleU = utilisateur.roleU;
  this.validCompte = utilisateur.validCompte;
  this.enConge = utilisateur.enConge;
  this.nbJour = utilisateur.nbJour;
  this.pic = utilisateur.pic;
  this.qrCodeValue = utilisateur.qrCodeValue;
};

const reqSQL = `SELECT * FROM utilisateurs `;
const reqOrdre = ` ORDER BY created_at DESC `;
const reqMntTtl = `SELECT COUNT(id) AS isaTtl FROM utilisateurs`;
const ariseReqSQL = `SELECT * FROM utilisateurs WHERE "validCompte" = false `;
const employeeReqSQL = `SELECT * FROM utilisateurs WHERE "validCompte" = true `;

Utilisateur.addUtilisateur = async (newUtilisateur) => {
  try {
    const { rows } = await dbConn.query(reqSQL + `WHERE im = $1`, [
      newUtilisateur.im,
    ]);

    if (rows.length > 0) {
      throw new Error("Utilisateur déjà existant!");
    }

    const query = `INSERT INTO utilisateurs (pic, nom, prenom, im, departement, num, email, pwd, "qrCodeValue") 
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9)`;
    const values = [
      newUtilisateur.pic,
      newUtilisateur.nom,
      newUtilisateur.prenom,
      newUtilisateur.im,
      newUtilisateur.departement,
      newUtilisateur.num,
      newUtilisateur.email,
      newUtilisateur.pwd,
      newUtilisateur.qrCodeValue,
    ];

    const result = await dbConn.query(query, values);
    return result;
  } catch (error) {
    throw error;
  }
};

Utilisateur.loginUtilisateur = async (values) => {
  try {
    const requete = reqSQL + `WHERE im = $1 AND "validCompte"=True `;
    const result = await dbConn.query(requete, [values.im]);

    return result.rows;
  } catch (error) {
    throw error;
  }
};

Utilisateur.getAllUtilisateurs = async () => {
  try {
    const result = await dbConn.query(reqSQL + reqOrdre);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

Utilisateur.getAllAriseUsers = async () => {
  try {
    const result = await dbConn.query(ariseReqSQL + reqOrdre);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

Utilisateur.getAllEmployeeUsers = async () => {
  try {
    const result = await dbConn.query(employeeReqSQL + reqOrdre);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

Utilisateur.getMyTotalUtilisateur = async () => {
  try {
    const result = await dbConn.query(reqMntTtl);

    return result.rows;
  } catch (error) {
    throw error;
  }
};

Utilisateur.deleteUtilisateur = async (id) => {
  try {
    const res = await dbConn.query("DELETE FROM utilisateurs WHERE im = $1", [
      id,
    ]);
    if (res.rowCount > 0) {
      return { success: true, message: "Utilisateur supprimé avec succès !" };
    } else {
      return {
        success: false,
        message: "Échec de suppression! Utilisateur non existant!",
      };
    }
  } catch (error) {
    throw new Error("Erreur lors de la suppression : " + error.message);
  }
};

Utilisateur.getIdUtilisateur = async (values) => {
  try {
    const requete = reqSQL + `WHERE im = $1`;
    const result = await dbConn.query(requete, [values.id]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

Utilisateur.getimUtilisateur = async (values) => {
  try {
    const requete = reqSQL + `WHERE im = $1`;
    const result = await dbConn.query(requete, [values.im]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

Utilisateur.updateUtilisateur = async (updateUtilisateur, id, userRole) => {
  try {
    // Vérifier si l'utilisateur existe
    const resId = await dbConn.query(reqSQL + `WHERE im = $1`, [id]);
    if (resId.rows.length === 0) {
      return {
        success: false,
        message: `Échec de la modification! Utilisateur non existant !`,
      };
    }

    const currentUtilisateur = resId.rows[0];

    // Mettre à jour uniquement les champs autorisés
    let updatedData = {
      nom: updateUtilisateur.nom,
      num: updateUtilisateur.num,
      prenom: updateUtilisateur.prenom,
      email: updateUtilisateur.email,
      pwd: updateUtilisateur.pwd,
      pic: updateUtilisateur.pic,
    };

    if (userRole) {
      updatedData.im = updateUtilisateur.im;
      updatedData.departement = updateUtilisateur.departement;
      updatedData.roleU = updateUtilisateur.roleU;
      updatedData.validCompte = updateUtilisateur.validCompte;
      updatedData.enConge = updateUtilisateur.enConge;
      updatedData.nbJour = updateUtilisateur.nbJour;
      updatedData.qrCodeValue = updateUtilisateur.qrCodeValue;
    } else {
      if (
        updateUtilisateur.im ||
        updateUtilisateur.departement ||
        updateUtilisateur.roleU ||
        updateUtilisateur.validCompte ||
        updateUtilisateur.enConge ||
        updateUtilisateur.nbJour ||
        updateUtilisateur.qrCodeValue
      ) {
        return {
          success: false,
          message: `Vous n'avez pas la permission de modifier ces attributs !`,
        };
      }
    }

    // Préparer la requête de mise à jour
    const setQuery = Object.keys(updatedData)
      .map((key, index) => `"${key}" = $${index + 1}`)
      .join(", ");

    const values = [...Object.values(updatedData), id]; // Ajouter l'ID pour la condition WHERE

    // Exécuter la requête de mise à jour
    await dbConn.query(
      `UPDATE utilisateurs SET ${setQuery} WHERE im = $${values.length}`,
      values
    );

    return { success: true, message: "Mise à jour réussie" };
  } catch (error) {
    throw new Error(
      "Erreur lors de la mise à jour de l'utilisateur : " + error.message
    );
  }
};

Utilisateur.updateUtilisateurPDP = async (pic, id) => {
  try {
    const result = await dbConn.query(
      `UPDATE utilisateurs SET  pic = $1 WHERE  im = $2`,
      [pic, id]
    );

    return {
      success: true,
      message: "Photo de profil mise à jour avec succès",
    };
  } catch (error) {
    throw new Error(
      "Erreur lors de la mise à jour de la photo de profil : " + error.message
    );
  }
};

Utilisateur.updateUtilisateurInfo = async (updateUtilisateur, id) => {
  try {
    let updatedData = {
      nom: updateUtilisateur.nom,
      num: updateUtilisateur.num,
      prenom: updateUtilisateur.prenom,
      email: updateUtilisateur.email,
      pwd: updateUtilisateur.pwd,
    };

    // Préparer la requête de mise à jour
    const setQuery = Object.keys(updatedData)
      .map((key, index) => `"${key}" = $${index + 1}`)
      .join(", ");

    const values = [...Object.values(updatedData), id]; // Ajouter l'ID pour la condition WHERE

    // Exécuter la requête de mise à jour
    await dbConn.query(
      `UPDATE utilisateurs SET ${setQuery} WHERE im = $${values.length}`,
      values
    );

    return { success: true, message: "Mise à jour réussie" };
  } catch (error) {
    throw new Error(
      "Erreur lors de la mise à jour de l'utilisateur : " + error.message
    );
  }
};

Utilisateur.updateUtilisateurByEmployee = async (updateUtilisateur, id) => {
  try {
    // Mettre à jour uniquement les champs autorisés
    let updatedData = {
      nom: updateUtilisateur.nom,
      num: updateUtilisateur.num,
      prenom: updateUtilisateur.prenom,
      email: updateUtilisateur.email,
      pic: updateUtilisateur.pic,
    };

    // Préparer la requête de mise à jour
    const setQuery = Object.keys(updatedData)
      .map((key, index) => `"${key}" = $${index + 1}`)
      .join(", ");

    const values = [...Object.values(updatedData), id]; // Ajouter l'ID pour la condition WHERE

    // Exécuter la requête de mise à jour
    await dbConn.query(
      `UPDATE utilisateurs SET ${setQuery} WHERE im = $${values.length}`,
      values
    );

    return { success: true, message: "Mise à jour réussie" };
  } catch (error) {
    throw new Error(
      "Erreur lors de la mise à jour de l'utilisateur : " + error.message
    );
  }
};

Utilisateur.updateUserRole = async (id) => {
  try {
    await dbConn.query(
      `UPDATE utilisateurs SET "validCompte"=true WHERE im = $1`,
      [id]
    );

    return { success: true, message: "Mise à jour réussie" };
  } catch (error) {
    throw new Error(
      "Erreur lors de la mise à jour de l'utilisateur : " + error.message
    );
  }
};

Utilisateur.searchUtilisateur = async (valeur) => {
  try {
    const requete = reqSQL + ` WHERE (nom ILIKE $1 OR im ILIKE $1)` + reqOrdre; // ILIKE: case-insensitive
    const values = [`%${valeur.val}%`];

    const { rows } = await dbConn.query(requete, values);

    if (rows.length > 0) {
      return { res: rows, message: "Utilisateur trouvé !", success: true };
    } else {
      return { res: [], message: "Aucun utilisateur trouvé !", success: false };
    }
  } catch (error) {
    throw {
      err: error,
      message: "Erreur lors de la recherche !",
      success: false,
    };
  }
};

Utilisateur.searchEmployeeUser = async (valeur) => {
  try {
    const requete =
      employeeReqSQL + ` AND (nom ILIKE $1 OR im ILIKE $1)` + reqOrdre; // ILIKE: case-insensitive
    const values = [`%${valeur.val}%`];

    const { rows } = await dbConn.query(requete, values);

    if (rows.length > 0) {
      return { res: rows, message: "Utilisateur trouvé !", success: true };
    } else {
      return { res: [], message: "Aucun utilisateur trouvé !", success: false };
    }
  } catch (error) {
    throw {
      err: error,
      message: "Erreur lors de la recherche !",
      success: false,
    };
  }
};

Utilisateur.searchUserToArise = async (valeur) => {
  try {
    const requete =
      ariseReqSQL + ` AND (nom ILIKE $1 OR im ILIKE $1)` + reqOrdre; // ILIKE: case-insensitive
    const values = [`%${valeur.val}%`];

    const { rows } = await dbConn.query(requete, values);

    if (rows.length > 0) {
      return { res: rows, message: "Utilisateur trouvé !", success: true };
    } else {
      return { res: [], message: "Aucun utilisateur trouvé !", success: false };
    }
  } catch (error) {
    throw {
      err: error,
      message: "Erreur lors de la recherche !",
      success: false,
    };
  }
};

module.exports = Utilisateur;
