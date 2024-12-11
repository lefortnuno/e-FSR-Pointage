import React, { useRef } from "react";
import WeekRange from "../../contexts/dates/weeksList";
import {
  formatHoursMin,
  formatTotalHours,formatBillan
} from "../../contexts/dates/formatDate";
import { BsXCircleFill, BsCheckCircleFill } from "react-icons/bs";
import html2pdf from "html2pdf.js";
import "./solo.css";

export default function FicheSolo({ userData, im }) {
  const dayNames = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
  const ficheRef = useRef(); // Référence pour l'export PDF 

  // Fonction pour générer le PDF
  const generatePDF = () => {
    const element = ficheRef.current;
    const options = {
      margin: 0.5,
      filename: im + "_fiche_de_presence.pdf",
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
          <h5>FICHE DE PRESENCE :</h5>
          <WeekRange startOfWeek={new Date()} />
        </div>

        {/* Contenu de la fiche de présence à exporter en PDF */}
        <div className="table-responsive">
          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th>J/H</th>
                <th>Arrivée</th>
                <th>Départ</th>
                <th>Total</th>
                <th>Commentaire</th>
                <th>Pointage</th>
              </tr>
            </thead>
            <tbody className="text-start">
              {userData &&
                userData.map((data, index) => (
                  <tr key={index}>
                    <td>{dayNames[index] || "-"}</td>
                    <td>{formatHoursMin(data.heureEntree) || "-"}</td>
                    <td>{formatHoursMin(data.heureSortie) || "-"}</td>
                    <td>{formatBillan(data.totalHeureEffectuee) || "-"}</td>
                    <td>{data.coms || "-"}</td>
                    <td>
                      {data.fahatongavana ? (
                        <div className="pointageStatu tonga" title="Présent">
                          <BsCheckCircleFill />
                        </div>
                      ) : (
                        <div className="pointageStatu tsyTonga" title="Absent">
                          <BsXCircleFill />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="button-pdf">
        <button className="btn btn-primary me-4" onClick={generatePDF}>
          Télécharger PDF
        </button>
      </div>
    </div>
  );
}
