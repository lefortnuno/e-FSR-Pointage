let dbConn = require("../config/db");

let JoursFerie = function (joursFerie) {
  this.id = joursFerie.id;
  this.dateJF = joursFerie.dateJF;
  this.descJF = joursFerie.descJF;
};

const reqSQL = `SELECT * FROM jours_feries `;
const reqOrdre = ` ORDER BY "dateJF" DESC `;
const reqMntTtl = `SELECT COUNT(id) AS isaTtl FROM jours_feries`;

JoursFerie.addJoursFerie = async (newJoursFerie) => {
  try {
    const query = `INSERT INTO jours_feries ("dateJF", "descJF") 
                   VALUES ($1, $2)`;
    const values = [newJoursFerie.dateJF, newJoursFerie.descJF];

    const result = await dbConn.query(query, values);
    return result;
  } catch (error) {
    throw error;
  }
};

JoursFerie.getAllJoursFeries = async (result) => {
  try {
    const result = await dbConn.query(reqSQL + reqOrdre);

    return result.rows;
  } catch (error) {
    throw error;
  }
};

JoursFerie.getMyTotalJoursFerie = async (result) => {
  try {
    const result = await dbConn.query(reqMntTtl);

    return result.rows;
  } catch (error) {
    throw error;
  }
};

JoursFerie.deleteJoursFerie = async (id) => {
  try {
    const res = await dbConn.query("DELETE FROM jours_feries WHERE id = $1", [
      id,
    ]);
    if (res.rowCount > 0) {
      return { success: true, message: "JoursFerie supprimé avec succès !" };
    } else {
      return {
        success: false,
        message: "Échec de suppression! JoursFerie non existant!",
      };
    }
  } catch (error) {
    throw new Error("Erreur lors de la suppression : " + error.message);
  }
};

JoursFerie.getIdJoursFerie = async (values) => {
  try {
    const requete = reqSQL + `WHERE id = $1`;
    const result = await dbConn.query(requete, [values.id]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

JoursFerie.updateJoursFerie = async (updateJoursFerie, id, userRole) => {
  try {
    // Vérifier si l'JoursFerie existe
    const resId = await dbConn.query(reqSQL + `WHERE id = $1`, [id]);
    if (resId.rows.length === 0) {
      return {
        success: false,
        message: `Échec de la modification! JoursFerie non existant!`,
      };
    }

    const currentJoursFerie = resId.rows[0];

    // Mettre à jour uniquement les champs autorisés
    let updatedData = {
      descJF: updateJoursFerie.descJF,
    };

    // Champs réservés aux administrateurs
    if (userRole) {
      updatedData.dateJF = updateJoursFerie.dateJF;
    } else {
      // Si non admin, vérifier qu'il n'essaie pas de mettre à jour des champs restreints
      if (updateJoursFerie.dateJF) {
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

    const values = [...Object.values(updatedData), id]; // Ajouter l'ID pour la condition WHERE

    // Exécuter la requête de mise à jour
    await dbConn.query(
      `UPDATE jours_feries SET ${setQuery} WHERE id = $${values.length}`,
      values
    );

    return { success: true, message: "Mise à jour réussie" };
  } catch (error) {
    throw new Error(
      "Erreur lors de la mise à jour de l'JoursFerie : " + error.message
    );
  }
};

JoursFerie.searchJoursFerie = async (valeur) => {
  try {
    const requete = reqSQL + ` WHERE ("descJF" ILIKE $1 )` + reqOrdre; // ILIKE: case-insensitive
    const values = [`%${valeur.val}%`];

    const { rows } = await dbConn.query(requete, values);

    if (rows.length > 0) {
      return { res: rows, message: "JoursFerie trouvé !", success: true };
    } else {
      return { res: [], message: "Aucun JoursFerie trouvé !", success: false };
    }
  } catch (error) {
    throw {
      err: error,
      message: "Erreur lors de la recherche !",
      success: false,
    };
  }
};

JoursFerie.searchJoursFerieBetweenDates = async (startDate, endDate) => {
  try {
    const requete = reqSQL + ` WHERE ("dateJF" BETWEEN $1 AND $2)` + reqOrdre; // Searching between two dates
    const values = [startDate, endDate];

    const { rows } = await dbConn.query(requete, values);

    if (rows.length > 0) {
      return { res: rows, message: "JoursFerie trouvés !", success: true };
    } else {
      return {
        res: [],
        message: "Aucun JoursFerie trouvé dans cette plage !",
        success: false,
      };
    }
  } catch (error) {
    throw {
      err: error,
      message: "Erreur lors de la recherche !",
      success: false,
    };
  }
};

JoursFerie.searchJoursFerieByMonthAndYear = async (valeur) => {
  try {
    // Extract the month and year from the provided date
    const year = new Date(valeur.date).getFullYear();
    const month = new Date(valeur.date).getMonth() + 1; // Months are zero-based in JavaScript

    // SQL query to fetch holidays in the specified month and year
    const requete =
      reqSQL +
      ` WHERE EXTRACT(YEAR FROM "dateJF") = $1 AND EXTRACT(MONTH FROM "dateJF") = $2` +
      reqOrdre;

    const values = [year, month];

    const { rows } = await dbConn.query(requete, values);

    if (rows.length > 0) {
      return { res: rows, message: "JoursFerie trouvé !", success: true };
    } else {
      return { res: [], message: "Aucun JoursFerie trouvé !", success: false };
    }
  } catch (error) {
    throw {
      err: error,
      message: "Erreur lors de la recherche !",
      success: false,
    };
  }
};

//#region // TROFEL
function calculerJoursFeries(annee) {
  const joursFeries = [
    { dateJF: new Date(annee, 0, 1), descJF: "Jour de l'An" }, // 1er janvier
    { dateJF: new Date(annee, 1, 14), descJF: "Saint Valentin" }, // 14 fev
    { dateJF: new Date(annee, 3, 8), descJF: "Journée de la Femme" }, // 8 mars
    { dateJF: new Date(annee, 3, 29), descJF: "Journée des martyrs" }, // 29 mars
    { dateJF: new Date(annee, 4, 1), descJF: "Fête du Travail" }, // 1er mai
    { dateJF: new Date(annee, 4, 8), descJF: "Armistice 1945" }, // 8 mai
    { dateJF: new Date(annee, 5, 26), descJF: "Fête Nationale" }, // 26 JUIN
    { dateJF: new Date(annee, 7, 15), descJF: "Assomption Marie" }, // 15 août
    { dateJF: new Date(annee, 10, 1), descJF: "Toussaint" }, // 1er novembre
    { dateJF: new Date(annee, 10, 11), descJF: "Armistice 1918" }, // 11 novembre
    { dateJF: new Date(annee, 11, 25), descJF: "Noël" }, // 25 décembre
    { dateJF: new Date(annee, 11, 31), descJF: "Réveillon" }, // 31 décembre
  ];

  // Calcul de la date de Pâques (Algorithme de Meeus/Jones/Butcher)
  const a = annee % 19;
  const b = Math.floor(annee / 100);
  const c = annee % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const moisPaques = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const jourPaques = ((h + l - 7 * m + 114) % 31) + 1;

  const datePaques = new Date(annee, moisPaques, jourPaques);

  // Lundi de Pâques
  const lundiPaques = new Date(datePaques);
  lundiPaques.setDate(datePaques.getDate() + 1);
  joursFeries.push({ dateJF: lundiPaques, descJF: "Lundi de Pâques" });

  // Ascension (39 jours après Pâques)
  const ascension = new Date(datePaques);
  ascension.setDate(datePaques.getDate() + 39);
  joursFeries.push({ dateJF: ascension, descJF: "Ascension" });

  // Lundi de Pentecôte (50 jours après Pâques)
  const pentecote = new Date(datePaques);
  pentecote.setDate(datePaques.getDate() + 50);
  joursFeries.push({ dateJF: pentecote, descJF: "Lundi de Pentecôte" });

  return joursFeries;
}

JoursFerie.remplirJoursFeries = async () => {
  try {
    const { rows } = await dbConn.query(reqMntTtl);
    const nombreDeJoursFeries = rows[0].isattl;

    if (nombreDeJoursFeries < 13) {
      await dbConn.query("DELETE FROM jours_feries");
      const joursFeriesAnneeEnCours = calculerJoursFeries(
        new Date().getFullYear()
      );

      for (const jourFerie of joursFeriesAnneeEnCours) {
        try {
          await JoursFerie.addJoursFerie(jourFerie);
        } catch (error) {
          if (error.code !== "23505") {
            console.error("Erreur lors de l'insertion du jour férié:", error);
          }
        }
      }
    }
  } catch (error) {
    console.error("Erreur lors du remplissage des jours fériés:", error);
    throw error;
  }
};

JoursFerie.placeAuGlitch = async (result) => {
  try {
    const result = await dbConn.query(
      "SELECT COUNT(*) AS glitch FROM jours_feries"
    ); 

    return result.rows;
  } catch (error) {
    throw error;
  }
};
//#endregion

module.exports = JoursFerie;
