const dbConn = require("../config/db");

let Pointage = function (pointage) {
  this.id = pointage.id;
  this.employeIm = pointage.employeIm;
  this.heureEntree = pointage.heureEntree;
  this.heureSortie = pointage.heureSortie;
  this.dateDuJour = pointage.dateDuJour;
  this.coms = pointage.coms;
};

const reqSQL = `SELECT 
                utilisateurs.im, utilisateurs.nom, utilisateurs.prenom, utilisateurs.departement, utilisateurs.num, utilisateurs.email, utilisateurs."roleU", utilisateurs."validCompte", utilisateurs."enConge", utilisateurs."nbJour", utilisateurs.pic, utilisateurs."qrCodeValue",
                pointages.id AS id, pointages.coms, pointages."heureEntree", pointages."heureSortie", pointages."dateDuJour", pointages."employeIm"
                FROM utilisateurs INNER JOIN pointages ON utilisateurs.im = pointages."employeIm" WHERE "dateDuJour" = CURRENT_DATE AND "validCompte" = true `;

const reqOrdre = ` ORDER BY id DESC `;

const joinUserAndConge = `SELECT 
                          utilisateurs.im, utilisateurs.nom, utilisateurs.prenom, utilisateurs.departement, utilisateurs.num, utilisateurs.email, utilisateurs."roleU", utilisateurs."validCompte", utilisateurs."enConge", utilisateurs."nbJour", utilisateurs.pic, utilisateurs."qrCodeValue",
                          pointages.id AS id, pointages.coms, pointages."heureEntree", pointages."heureSortie", pointages."dateDuJour", pointages."employeIm"
                          FROM utilisateurs INNER JOIN pointages ON utilisateurs.im = pointages."employeIm" WHERE "dateDuJour" = $1 AND "validCompte" = true `;

const lesAbsentsParJour = `
                          SELECT 
                              utilisateurs.im, 
                              utilisateurs.nom, 
                              utilisateurs.prenom, 
                              utilisateurs.departement, 
                              utilisateurs.num, 
                              utilisateurs.email, 
                              utilisateurs."roleU", 
                              utilisateurs."validCompte", 
                              utilisateurs."enConge", 
                              utilisateurs."nbJour", 
                              utilisateurs.pic, 
                              utilisateurs."qrCodeValue",
                              pointages.id AS id, 
                              pointages.coms, 
                              pointages."heureEntree", 
                              pointages."heureSortie", 
                              pointages."dateDuJour", 
                              pointages."employeIm"
                          FROM 
                              utilisateurs
                          LEFT JOIN 
                              pointages 
                          ON 
                              utilisateurs.im = pointages."employeIm" 
                              AND pointages."dateDuJour" = $1
                          WHERE 
                              utilisateurs."validCompte" = true 
                              AND utilisateurs."enConge" = false 
                              AND (pointages."heureEntree" IS NULL OR pointages."dateDuJour" IS NULL) `;

const reqPointage = `WITH week_dates AS (
                    SELECT generate_series(
                        $1::date,  -- Date de début (lundi)
                        $2::date,  -- Date de fin (vendredi)
                        '1 day'::interval    -- Pas de 1 jour
                    )::date AS "dateDuJour"
                )
                SELECT 
                    wd."dateDuJour", 
                    p."employeIm", 
                    p."heureEntree", 
                    p."heureSortie", 
                    p."coms",
                    CASE 
                        WHEN p."heureEntree" IS NOT NULL THEN TRUE  -- Si les heures de pointage sont présentes, l'employé est présent
                        ELSE FALSE  -- Sinon, l'employé est absent
                    END AS "fahatongavana",
                    -- Calcul du total des heures effectuées
                    CASE 
                        WHEN p."heureEntree" IS NOT NULL AND p."heureSortie" IS NOT NULL THEN
                            -- Calcul de la différence entre l'heure de sortie et l'heure d'entrée
                            EXTRACT(EPOCH FROM (p."heureSortie"::time - p."heureEntree"::time)) / 3600
                        ELSE NULL
                    END AS "totalHeureEffectuee"
                FROM week_dates wd
                LEFT JOIN pointages p
                    ON p."dateDuJour" = wd."dateDuJour"
                    AND p."employeIm" = $3  
                WHERE EXTRACT(DOW FROM wd."dateDuJour") BETWEEN 1 AND 5
                ORDER BY wd."dateDuJour" `;

// Pour tout les employees
const reqPointages = `WITH semaine AS (
                      SELECT 
                          generate_series(
                              DATE_TRUNC('week', $1::timestamp), -- Lundi et sans decalage
                              DATE_TRUNC('week', $1::timestamp) + INTERVAL '4 days', -- Vendredi
                              INTERVAL '1 day'
                          ) AS date_semaine
                  )
                  SELECT 
                      u.im AS im,
                      u.departement AS departement,
                      u.nom AS nom,
                      u.prenom AS prenom,
                      u.pic AS pic,
                      s.date_semaine AS date,
                      CASE 
                          WHEN p."heureEntree" IS NOT NULL THEN 'Présent'
                          ELSE 'Absent'
                      END AS statut,
                      p."heureEntree" AS heure_entree,
                      p."heureSortie" AS heure_sortie
                  FROM 
                      utilisateurs u
                  CROSS JOIN 
                      semaine s
                  LEFT JOIN 
                      pointages p 
                      ON u.im = p."employeIm" 
                      AND p."dateDuJour" = s.date_semaine `;

const tauxPresence = `WITH semaine AS (
    SELECT 
        generate_series(
            DATE_TRUNC('week', $1::timestamp) + INTERVAL '1 day', -- Lundi
            DATE_TRUNC('week', $1::timestamp) + INTERVAL '5 days', -- Vendredi
            INTERVAL '1 day'
        ) AS date_semaine
),
pointage_status AS (
    SELECT 
        u.im AS im,
        u.departement AS departement,
        u.nom AS nom,
        u.prenom AS prenom,
        u.pic AS pic,
        s.date_semaine AS date,
        CASE 
            WHEN p."heureEntree" IS NOT NULL THEN 'Présent'
            ELSE 'Absent'
        END AS statut
    FROM 
        utilisateurs u  
    CROSS JOIN 
        semaine s
    LEFT JOIN 
        pointages p 
        ON u.im = p."employeIm" 
        AND p."dateDuJour" = s.date_semaine
)
SELECT 
    COUNT(CASE WHEN statut = 'Présent' THEN 1 END) AS total_jours_present,  
    COUNT(DISTINCT im) AS total_employes,  
    ROUND(100.0 * COUNT(CASE WHEN statut = 'Présent' THEN 1 END) / (COUNT(DISTINCT im) * 5)) AS taux_presence_global  
FROM 
    pointage_status `;

const reqBilan = `WITH jours_ouvrables AS (
    SELECT 
        generate_series(
            date_trunc('month', TO_DATE($2, 'YYYY-MM')),
            date_trunc('month', TO_DATE($2, 'YYYY-MM')) + interval '1 month' - interval '1 day',
            '1 day'
        )::DATE AS "dateDuJour"
),
jours_ouvrables_filtrees AS (
    SELECT 
        "dateDuJour"
    FROM 
        jours_ouvrables
    WHERE 
        EXTRACT(DOW FROM "dateDuJour") NOT IN (0, 6) -- Exclure dimanche (0) et samedi (6)
),
presence AS (
    SELECT 
        j."dateDuJour", 
        p."heureEntree", 
        p."heureSortie",
        CASE WHEN p."heureEntree" IS NOT NULL THEN 1 ELSE 0 END AS present,
        CASE WHEN p."heureEntree" > '08:30:00' THEN EXTRACT(EPOCH FROM (p."heureEntree" - '08:30:00'::TIME)) / 3600 ELSE 0 END AS retard_heures,
        CASE WHEN p."heureEntree" IS NULL THEN 1 ELSE 0 END AS absent
    FROM 
        jours_ouvrables_filtrees j
    LEFT JOIN 
        pointages p
    ON 
        j."dateDuJour" = p."dateDuJour" AND p."employeIm" = $1
)
SELECT 
    SUM(EXTRACT(EPOCH FROM (presence."heureSortie" - presence."heureEntree")) / 3600) AS heures_travail_total,
    SUM(presence.retard_heures) AS heures_retard_total,
    SUM(presence.present) AS jours_travail_total,
    SUM(presence.absent) AS jours_absence_total
FROM 
    presence `;

// Create a new pointage entry
Pointage.createPointage = async (newPointage) => {
  try {
    const { rows } = await dbConn.query(
      reqSQL +
        ` AND "enConge" = false AND "employeIm" = $1 AND "dateDuJour" = $2 `,
      [newPointage.employeIm, newPointage.dateDuJour]
    );

    if (rows.length > 0) {
      throw new Error("Pointage déjà existant ou Employée en congé!");
    }

    const query = `INSERT INTO pointages ("employeIm", "heureEntree", "dateDuJour", coms) 
                   VALUES ($1, $2, $3, $4)`;
    const values = [
      newPointage.employeIm,
      newPointage.heureEntree,
      newPointage.dateDuJour,
      newPointage.coms,
    ];

    const result = await dbConn.query(query, values); 
    return result;
  } catch (error) {
    throw error;
  }
};

// pointage employee/jour
Pointage.getAllPointages = async (values) => {
  try {
    const result = await dbConn.query(joinUserAndConge + reqOrdre, [
      values.dateIwant,
    ]);

    return result.rows;
  } catch (error) {
    throw error;
  }
};
Pointage.getAllPointagesDesAbsents = async (values) => {
  try {
    const result = await dbConn.query(lesAbsentsParJour + reqOrdre, [
      values.dateIwant,
    ]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

// Retrieve a pointage by ID
Pointage.getPointageById = async (values) => {
  try {
    const requete = reqSQL + `AND id = $1`;
    const result = await dbConn.query(requete, [values.id]);

    return result.rows;
  } catch (error) {
    throw error;
  }
};

// Retrieve a pointage by CIM
Pointage.getPointageByCIM = async (values) => {
  try {
    const requete = reqSQL + `AND "employeIm" = $1`;
    const result = await dbConn.query(requete, [values.id]);

    return result.rows;
  } catch (error) {
    throw error;
  }
};

Pointage.updatePointage = async (updatePointage, id) => {
  try {
    // Vérifier si l'pointage  existe
    const resId = await dbConn.query(reqSQL + `AND pointages.id = $1`, [id]);
    if (resId.rows.length === 0) {
      return {
        success: false,
        message: `Échec de la modification! Pointage non existant !`,
      };
    }

    const currentPointage = resId.rows[0];

    // Mettre à jour uniquement les champs autorisés
    const updatedData = {
      coms: currentPointage.coms,
      dateDuJour: currentPointage.dateDuJour,
      heureSortie: updatePointage.heureSortie,
      heureEntree: currentPointage.heureEntree,
    };

    const setQuery = Object.keys(updatedData)
      .map((key, index) => `"${key}" = $${index + 1}`)
      .join(", ");

    const values = [...Object.values(updatedData), id];

    // Exécuter la requête de mise à jour
    await dbConn.query(
      `UPDATE pointages SET ${setQuery} WHERE "dateDuJour" = CURRENT_DATE AND id = $${values.length}`,
      values
    );

    return { success: true, message: "Mise à jour réussie" };
  } catch (error) {
    throw new Error(
      "Erreur lors de la mise à jour du pointage : " + error.message
    );
  }
};

// Delete a pointage by ID
Pointage.deletePointage = async (id) => {
  try {
    const res = await dbConn.query(
      `DELETE FROM pointages WHERE "dateDuJour" = CURRENT_DATE AND id = $1 RETURNING *`,
      [id]
    );

    if (res.rowCount > 0) {
      return {
        message: "Pointage supprimé avec succès !",
        success: true,
      };
    }
    return {
      message: "Échec de suppression! Pointage non existant!",
      success: false,
    };
  } catch (error) {
    throw new Error("Erreur lors de la suppression : " + error.message);
  }
};

// pointage par employee/jour
Pointage.getPointageEmployee = async (values) => {
  try {
    const result = await dbConn.query(reqPointage, [
      values.dateStart,
      values.dateEnd,
      values.employeIm,
    ]);

    return result.rows;
  } catch (error) {
    throw error;
  }
};

// pointage employee/Weeks
Pointage.getPointageEmployees = async (values) => {
  try {
    const toda = new Date();
    const result = await dbConn.query(
      reqPointages +
        ` where "validCompte"=true ORDER BY u.nom, s.date_semaine  `,
      [toda]
    );

    return result.rows;
  } catch (error) {
    throw error;
  }
};

Pointage.searchPointageParJour = async (pointageData) => {
  try {
    const requete =
      joinUserAndConge + ` AND (nom ILIKE $2 OR im ILIKE $2) ` + reqOrdre;

    const values = [pointageData.dateIwant, `%${pointageData.valeur}%`];

    const { rows } = await dbConn.query(requete, values);

    if (rows.length > 0) {
      return { res: rows, message: "Trouvé !", success: true };
    } else {
      return { res: [], message: "Non trouvé !", success: false };
    }
  } catch (error) {
    throw {
      err: error,
      message: "Erreur lors de la recherche !",
      success: false,
    };
  }
};

Pointage.searchPointageAbsentParJour = async (pointageData) => {
  try {
    const requete =
      lesAbsentsParJour + ` AND (nom ILIKE $2 OR im ILIKE $2) ` + reqOrdre;

    const values = [pointageData.dateIwant, `%${pointageData.valeur}%`];

    const { rows } = await dbConn.query(requete, values);

    if (rows.length > 0) {
      return { res: rows, message: "Trouvé !", success: true };
    } else {
      return { res: [], message: "Non trouvé !", success: false };
    }
  } catch (error) {
    throw {
      err: error,
      message: "Erreur lors de la recherche !",
      success: false,
    };
  }
};

Pointage.searchPointageParWeek = async (pointageData) => {
  try {
    const requete =
      reqPointages +
      ` WHERE (nom ILIKE $2 OR im ILIKE $2) AND "validCompte"=true` +
      ` ORDER BY u.nom, s.date_semaine`;

    const values = [pointageData.dateIwant, `%${pointageData.valeur}%`];

    const result = await dbConn.query(requete, values);
    return result.rows;
  } catch (error) {
    throw {
      err: error,
      message: "Erreur lors de la recherche !",
      success: false,
    };
  }
};

// Taux
Pointage.getTaux = async (values) => {
  try {
    const result = await dbConn.query(tauxPresence, [values.dateIwant]);

    return result.rows;
  } catch (error) {
    throw error;
  }
};

// billan par employee/mois
Pointage.getBillanEmployee = async (values) => {
  try {
    const result = await dbConn.query(reqBilan, [
      values.employeIm,
      values.dateMois,
    ]);

    return result.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = Pointage;
