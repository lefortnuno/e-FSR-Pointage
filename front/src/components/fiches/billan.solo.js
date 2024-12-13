import React, { useRef } from "react";
import MonthRange from "../../contexts/dates/month";
import { mois1, mois2 } from "../../contexts/dates/month";
import { formatBillan } from "../../contexts/dates/formatDate";

import html2pdf from "html2pdf.js";
import "./solo.css";

const BillanSolo = ({ billanMois1, billanMois2, im }) => {
  const ficheRef = useRef(); // Référence pour l'export PDF

  const currentDate = new Date();
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  let nbJoursTravailRestant = 0;

  // Parcourir tous les jours restants jusqu'à la fin du mois
  for (
    let day = currentDate.getDate();
    day <= lastDayOfMonth.getDate();
    day++
  ) {
    const currentDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const dayOfWeek = currentDay.getDay(); // 0 = Dimanche, 6 = Samedi

    // Ajouter uniquement les jours qui ne sont pas samedi (6) ou dimanche (0)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      nbJoursTravailRestant++;
    }
  }
  const nbJ_restant = nbJoursTravailRestant - 3; // moins le jours androany int(2)/ POUR LE NET 3j

  // Fonction pour générer le PDF
  const generatePDF = () => {
    const element = ficheRef.current;
    const options = {
      margin: 0.5,
      filename: `${im}_fiche_de_presence.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="bg-white border-radius-lg p-4">
      <div className="row mt-4" ref={ficheRef}>
        <div className="text-center mb-3">
          <h5>BILAN ETUDIANT</h5>
          <MonthRange startOfWeek={new Date()} />
        </div>

        {/* Contenu de la fiche de présence à exporter en PDF */}
        <div className="table-responsive">
          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th> </th>
                <th>{mois1}</th>
                <th>{mois2}</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>Total heure de présence</td>
                <td>
                  {formatBillan(billanMois1[0]?.heures_travail_total) || "-"}
                </td>
                <td>
                  {formatBillan(billanMois2[0]?.heures_travail_total) || "-"}
                </td>
              </tr>
              <tr>
                <td>Total heure de retard</td>
                <td>
                  {formatBillan(billanMois1[0]?.heures_retard_total) || "-"}
                </td>
                <td>
                  {formatBillan(billanMois2[0]?.heures_retard_total) || "-"}
                </td>
              </tr>
              <tr>
                <td>Total jours de présence</td>
                <td>{billanMois1[0]?.jours_travail_total || "-"}j</td>
                <td>{billanMois2[0]?.jours_travail_total || "-"}j</td>
              </tr>
              <tr>
                <td>Total jours d'absence</td>
                <td>{billanMois1[0]?.jours_absence_total || "-"}j</td>
                <td>
                  {(
                    parseInt(billanMois2[0]?.jours_absence_total, 9) -
                    nbJ_restant
                  ).toString() || "-"}
                  j
                </td>
              </tr>
              <tr>
                <td>Commentaires</td>
                <td style={{ wordWrap: "break-word", whiteSpace: "normal" }}>
                  {billanMois1[0]?.jours_absence_total > 25
                    ? "Trop d'absences, revoyez votre organisation."
                    : billanMois1[0]?.jours_absence_total > 15
                    ? "Absences conséquentes, évaluez l'impact."
                    : billanMois1[0]?.jours_absence_total > 10
                    ? "Absences notables, attention aux tâches critiques."
                    : billanMois1[0]?.jours_absence_total > 5
                    ? "Quelques absences, mais dans les objectifs."
                    : "Très peu d'absences, excellent travail !"}
                </td>
                <td style={{ wordWrap: "break-word", whiteSpace: "normal" }}>
                  {parseInt(billanMois2[0]?.jours_absence_total, 10) -
                    nbJ_restant >
                  25
                    ? "Trop d'absences, revoyez votre organisation."
                    : parseInt(billanMois2[0]?.jours_absence_total, 10) -
                        nbJ_restant >
                      15
                    ? "Absences conséquentes, évaluez l'impact."
                    : parseInt(billanMois2[0]?.jours_absence_total, 10) -
                        nbJ_restant >
                      10
                    ? "Absences notables, attention aux tâches critiques."
                    : parseInt(billanMois2[0]?.jours_absence_total, 10) -
                        nbJ_restant >
                      5
                    ? "Quelques absences, mais dans les objectifs."
                    : "Très peu d'absences, excellent travail !"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className="button-pdf">
        <button className="btn btn-primary me-4" onClick={generatePDF}>
          Télécharger PDF
        </button>
      </div> */}
    </div>
  );
};

export default BillanSolo;
