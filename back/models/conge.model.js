const dbConn = require("../config/db"); // Adjust the path to your db connection file

let Conge = function (conge) {
  this.id = conge.id;
  this.cIm = conge.cIm;
  this.motif = conge.motif;
  this.dateDeDebut = conge.dateDeDebut;
  this.dateDeFin = conge.dateDeFin;
  this.nbJourC = conge.nbJourC;
  this.reqConge = conge.reqConge;
  this.etatReqConge = conge.etatReqConge;
};

const reqSQL = `SELECT * FROM conges `;
const reqOrdre = ` ORDER BY conges.id DESC `;
const reqMntTtl = `SELECT COUNT(id) AS isaReqConge FROM conges WHERE "reqConge" = TRUE AND "validCompte"=true AND "etatReqConge" IS NULL `;

const detailsReqSQL = `SELECT 
                      id, "cIm", motif, "dateDeDebut", "dateDeFin", "nbJourC", "reqConge", "etatReqConge",
                      LEAST(GREATEST(DATE_PART('day', AGE("dateDeFin", CURRENT_DATE)), 0), "nbJourC") AS tavela,
                      GREATEST(DATE_PART('day', AGE("dateDeDebut", CURRENT_DATE)), 0) AS kelisisa 
                      FROM conges `;

const joinUserAndConge = `SELECT 
                          utilisateurs.im, utilisateurs.nom, utilisateurs.prenom, utilisateurs.departement, utilisateurs.num, utilisateurs.email, utilisateurs."roleU", utilisateurs."validCompte", utilisateurs."enConge", utilisateurs."nbJour", utilisateurs.pic, utilisateurs."qrCodeValue",
                          conges.id AS id, conges.motif, conges."dateDeDebut", conges."dateDeFin", conges."nbJourC", conges."reqConge", conges."etatReqConge"
                          FROM utilisateurs INNER JOIN conges ON utilisateurs.im = conges."cIm" WHERE "etatReqConge" = true AND "enConge"=true AND "validCompte"=true `;

const joinUserAndCongeDM = `SELECT 
                            utilisateurs.im, utilisateurs.nom, utilisateurs.prenom, utilisateurs.departement, utilisateurs.num, utilisateurs.email, utilisateurs."roleU", utilisateurs."validCompte", utilisateurs."enConge", utilisateurs."nbJour", utilisateurs.pic, utilisateurs."qrCodeValue",
                            conges.id AS id, conges.motif, conges."dateDeDebut", conges."dateDeFin", conges."nbJourC", conges."reqConge", conges."etatReqConge"
                            FROM utilisateurs INNER JOIN conges ON utilisateurs.im = conges."cIm" WHERE "validCompte"=true AND "enConge"=false AND "etatReqConge" IS NULL `;

Conge.getAllConges = async () => {
  try {
    const result = await dbConn.query(joinUserAndConge + reqOrdre);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

Conge.getAllCongesDM = async () => {
  try {
    const result = await dbConn.query(joinUserAndCongeDM + reqOrdre);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

Conge.getCongeById = async (values) => {
  try {
    const requete = reqSQL + `WHERE id = $1`;
    const result = await dbConn.query(requete, [values.id]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

Conge.createConge = async (newConge) => {
  try {
    const query = `INSERT INTO conges ("cIm", motif, "dateDeDebut", "dateDeFin", "nbJourC") 
                   VALUES ($1, $2, $3, $4, $5)`;
    const values = [
      newConge.cIm,
      newConge.motif,
      newConge.dateDeDebut,
      newConge.dateDeFin,
      newConge.nbJourC,
    ];

    const userCheckQuery = 'SELECT "nbJour" FROM utilisateurs WHERE "im" = $1';
    const userResult = await dbConn.query(userCheckQuery, [newConge.cIm]);

    if (userResult.rows.length === 0) {
      throw new Error("Employée non trouvé !");
    }

    const currentNbJour = userResult.rows[0].nbJour;

    if (currentNbJour < newConge.nbJourC) {
      throw new Error("Employée  n'as pas assez de jours de congé valide !");
    }

    // Update the user's nbJour
    const updatedNbJour = currentNbJour - newConge.nbJourC;
    const updateUserQuery = `UPDATE utilisateurs SET "nbJour" = $1 WHERE "im" = $2;`;
    const res = await dbConn.query(updateUserQuery, [
      updatedNbJour,
      newConge.cIm,
    ]);

    // add congE
    const result = await dbConn.query(query, values);
    return result;
  } catch (error) {
    throw error;
  }
};

Conge.deleteConge = async (id) => {
  try {
    const res = await dbConn.query("DELETE FROM conges WHERE id = $1", [id]);
    if (res.rowCount > 0) {
      return { success: true, message: "Congé supprimé avec succès !" };
    } else {
      return {
        success: false,
        message: "Échec de suppression! Congé non existant!",
      };
    }
  } catch (error) {
    throw new Error("Erreur lors de la suppression : " + error.message);
  }
};

Conge.updateConge = async (updateConge, id, userRole) => {
  try {
    // Vérifier si l'congE existe
    const resId = await dbConn.query(reqSQL + `WHERE id = $1`, [id]);
    if (resId.rows.length === 0) {
      return {
        success: false,
        message: `Échec de la modification! Congé non existant !`,
      };
    }

    const currentConge = resId.rows[0];

    // Mettre à jour uniquement les champs autorisés
    let updatedData = {
      motif: updateConge.motif,
      dateDeDebut: updateConge.dateDeDebut,
      reqConge: updateConge.reqConge,
    };

    if (userRole) {
      updatedData.cIm = updateConge.cIm;
      updatedData.nbJourC = updateConge.nbJourC;
      updatedData.dateDeFin = updateConge.dateDeFin;
      updatedData.etatReqConge = updateConge.etatReqConge;
    } else {
      if (
        updateConge.cIm ||
        updateConge.nbJourC ||
        updateConge.dateDeFin ||
        updateConge.etatReqConge
      ) {
        return {
          success: false,
          message: `Échec de la modification! Vous n'avez pas la permission de modifier ces attributs !`,
        };
      }
    }

    // Préparer la requête de mise à jour
    const setQuery = Object.keys(updatedData)
      .map((key, index) => `"${key}" = $${index + 1}`)
      .join(", ");

    const values = [...Object.values(updatedData), id];

    await dbConn.query(
      `UPDATE conges SET ${setQuery} WHERE id = $${values.length}`,
      values
    );

    return { success: true, message: "Mise à jour réussie" };
  } catch (error) {
    throw new Error(
      "Erreur lors de la mise à jour du congé : " + error.message
    );
  }
};

Conge.searchConge = async (valeur) => {
  try {
    const requete =
      joinUserAndConge + ` AND ("cIm" ILIKE $1 OR nom ILIKE $1) ` + reqOrdre; // ILIKE: case-insensitive
    const values = [`%${valeur.val}%`];

    const { rows } = await dbConn.query(requete, values);

    if (rows.length > 0) {
      return { res: rows, message: "Congé trouvé !", success: true };
    } else {
      return { res: [], message: "Aucun congé trouvé !", success: false };
    }
  } catch (error) {
    throw {
      err: error,
      message: "Erreur lors de la recherche !",
      success: false,
    };
  }
};

Conge.searchCongeDM = async (valeur) => {
  try {
    const requete =
      joinUserAndCongeDM + ` AND ("cIm" ILIKE $1 OR nom ILIKE $1) ` + reqOrdre; // ILIKE: case-insensitive
    const values = [`%${valeur.val}%`];

    const { rows } = await dbConn.query(requete, values);

    if (rows.length > 0) {
      return { res: rows, message: "Congé trouvé !", success: true };
    } else {
      return { res: [], message: "Aucun congé trouvé !", success: false };
    }
  } catch (error) {
    throw {
      err: error,
      message: "Erreur lors de la recherche !",
      success: false,
    };
  }
};

Conge.getTotalOfReqConge = async () => {
  try {
    const result = await dbConn.query(reqMntTtl);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

Conge.getMyReqConge = async (values) => {
  try {
    const requete =
      detailsReqSQL +
      `WHERE "cIm" = $1 AND ("dateDeFin" > CURRENT_DATE) ` +
      reqOrdre +
      ` LIMIT 1 `;
    // `WHERE "cIm" = $1 AND "reqConge" = true AND "etatReqConge" IS NULL `+reqOrdre;
    const result = await dbConn.query(requete, [values.im]);

    return result.rows;
  } catch (error) {
    throw error;
  }
};

Conge.updateMyCongeByAdmin = async (updateConge, id) => {
  try {
    // Vérifier si l'congE existe
    const resId = await dbConn.query(reqSQL + `WHERE id = $1 `, [id]);
    if (resId.rows.length === 0) {
      return {
        success: false,
        message: `Échec de la modification! Congé non existant !`,
      };
    }

    // Calcul de la new date de fin
    const startDate = new Date(updateConge.dateDeDebut);
    const dateFinRecalc = new Date(startDate);
    dateFinRecalc.setDate(startDate.getDate() + updateConge.nbJourC);

    let updatedData = {
      dateDeDebut: updateConge.dateDeDebut,
      // reqConge: updateConge.reqConge,
      cIm: updateConge.cIm,
      nbJourC: updateConge.nbJourC,
      dateDeFin: dateFinRecalc,
      etatReqConge: updateConge.etatReqConge,
    };

    // Préparer la requête de mise à jour
    const setQuery = Object.keys(updatedData)
      .map((key, index) => `"${key}" = $${index + 1}`)
      .join(", ");

    const values = [...Object.values(updatedData), id];

    await dbConn.query(
      `UPDATE conges SET ${setQuery} WHERE id = $${values.length}`,
      values
    );

    if (updatedData.etatReqConge) {
      await dbConn.query(
        `UPDATE utilisateurs SET "enConge"=true WHERE im = $1`,
        [updatedData.cIm]
      );
    } else {
      const userCheckQuery =
        'SELECT "nbJour" FROM utilisateurs WHERE "im" = $1';
      const userResult = await dbConn.query(userCheckQuery, [updatedData.cIm]);
      const currentNbJour = userResult.rows[0].nbJour;

      // Update the user's nbJour
      const updatedNbJour = currentNbJour + updatedData.nbJourC;
      const res = await dbConn.query(
        `UPDATE utilisateurs SET "nbJour" = $1 WHERE im = $2`,
        [updatedNbJour, updatedData.cIm]
      );
    }

    return { success: true, message: "Mise à jour réussie" };
  } catch (error) {
    throw new Error(
      "Erreur lors de la mise à jour du congé : " + error.message
    );
  }
};

Conge.updateAutoEmployeEnConge = async () => {
  try {
    const resId = await dbConn.query(
      `SELECT utilisateurs.im AS im
       FROM utilisateurs 
       INNER JOIN conges 
       ON utilisateurs.im = conges."cIm"
       WHERE conges."etatReqConge" = true 
         AND utilisateurs."enConge" = true 
         AND utilisateurs."validCompte" = true 
         AND conges."dateDeFin" < CURRENT_DATE`
    );

    if (resId.rows.length > 0) {
      const userIds = resId.rows.map((row) => row.im);
      await dbConn.query(
        `UPDATE utilisateurs
         SET "enConge" = false
         WHERE im = ANY($1::text[])`,
        [userIds]
      );

      return {
        success: true,
        message: `Mise à jour effectuée pour les utilisateurs : ${userIds.join(
          ", "
        )}`,
      };
    } else {
      return {
        success: true,
        message: `Aucune mise à jour aujourd'hui !`,
      };
    }
  } catch (error) {
    throw new Error(
      "Erreur lors de la mise à jour du congé : " + error.message
    );
  }
};

module.exports = Conge;
