let dbConn = require("../config/db");

let Employe = function (employe) {
  this.nom = employe.nom;
  this.prenom = employe.prenom;
  this.im = employe.im;
  this.departement = employe.departement;
  this.num = employe.num;
  this.email = employe.email;
  this.roleU = employe.roleU;
  this.validCompte = employe.validCompte;
  this.enConge = employe.enConge;
  this.nbJour = employe.nbJour;
  this.pic = employe.pic;
  this.qrCodeValue = employe.qrCodeValue;
};

const reqNombreEmploye = `SELECT COUNT(im) AS "isaEmploye" FROM utilisateurs WHERE "validCompte" = TRUE `;

const reqPointage = `SELECT
                        u.nom, u.prenom, u.im, u.pic, p."dateDuJour", p."heureEntree", p."heureSortie"
                    FROM
                        utilisateurs u
                    LEFT JOIN
                        pointages p ON u.im = p."employeIm" AND p."dateDuJour" = CURRENT_DATE
                    WHERE
                        u."validCompte" = TRUE AND p."heureEntree" IS NOT NULL `;

const reqPointageNombre = `SELECT 
                        COUNT(CASE WHEN p."heureEntree" IS NOT NULL THEN 1 END) AS "isaPresent",
                        COUNT(CASE WHEN p."heureEntree" IS NULL THEN 1 END) AS "isaAbsent"
                    FROM
                        utilisateurs u
                    LEFT JOIN
                        pointages p ON u.im = p."employeIm" AND p."dateDuJour" = CURRENT_DATE
                    WHERE
                        u."validCompte" = TRUE `;

const statNbMoyenEmployeParJour = `
                        SELECT 
                            CASE EXTRACT(DOW FROM "dateDuJour")
                                WHEN 1 THEN 'Lundi'
                                WHEN 2 THEN 'Mardi'
                                WHEN 3 THEN 'Mercredi'
                                WHEN 4 THEN 'Jeudi'
                                WHEN 5 THEN 'Vendredi'
                            END AS jour_semaine,
                            EXTRACT(DOW FROM "dateDuJour") AS jour_numero,
                            ROUND(AVG(nombre_employes), 2) AS moyenne_employes
                        FROM (
                            SELECT 
                                "dateDuJour", 
                                COUNT(DISTINCT "employeIm") AS nombre_employes
                            FROM 
                                pointages
                            WHERE 
                                EXTRACT(DOW FROM "dateDuJour") BETWEEN 1 AND 5
                            GROUP BY 
                                "dateDuJour"
                        ) sous_requete
                        GROUP BY 
                            jour_numero, jour_semaine
                        ORDER BY 
                            jour_numero;
                    `;
const statNbHeureParJour = `
                    SELECT 
                        CASE EXTRACT(DOW FROM "dateDuJour")
                            WHEN 1 THEN 'Lundi'
                            WHEN 2 THEN 'Mardi'
                            WHEN 3 THEN 'Mercredi'
                            WHEN 4 THEN 'Jeudi'
                            WHEN 5 THEN 'Vendredi'
                        END AS jour_semaine,
                        EXTRACT(DOW FROM "dateDuJour") AS jour_numero,
                        ROUND(AVG(EXTRACT(EPOCH FROM ("heureSortie" - "heureEntree")) / 3600), 2) AS moyenne_heures
                    FROM 
                        pointages
                    WHERE 
                        "heureSortie" IS NOT NULL 
                        AND "heureEntree" IS NOT NULL
                        AND EXTRACT(DOW FROM "dateDuJour") BETWEEN 1 AND 5  -- Filtre pour les jours du lundi au vendredi
                    GROUP BY 
                        EXTRACT(DOW FROM "dateDuJour"), jour_semaine
                    ORDER BY 
                        jour_numero;
                `;

Employe.getPointage = async () => {
  try {
    const result = await dbConn.query(reqPointage);

    return result.rows;
  } catch (error) {
    throw error;
  }
};

Employe.getNombreEmploye = async () => {
  try {
    const result = await dbConn.query(reqNombreEmploye);

    return result.rows;
  } catch (error) {
    throw error;
  }
};

Employe.getNombrePointage = async () => {
  try {
    const result = await dbConn.query(reqPointageNombre);

    return result.rows;
  } catch (error) {
    throw error;
  }
};

Employe.getStatParJour = async () => {
  try {
    const result = await dbConn.query(statNbMoyenEmployeParJour);

    return result.rows;
  } catch (error) {
    throw error;
  }
};

Employe.getStatParHeure = async () => {
  try {
    const result = await dbConn.query(statNbHeureParJour);

    return result.rows;
  } catch (error) {
    throw error;
  }
};

Employe.getFahatongavana = async (values) => {
  try {
    const result = await dbConn.query(reqPointage + ` AND im=$1 `, [values.im]);

    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = Employe;
