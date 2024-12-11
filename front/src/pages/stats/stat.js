import Template from "../../components/template/template";
import Times from "./times/times";
import Days from "./days/days";

import { useRef, useState } from "react";
import { BsArrowLeftRight } from "react-icons/bs";

import html2pdf from "html2pdf.js";
import "./stat.css";

const url_req = process.env.REACT_APP_SUN_COMPLET_URL + `employee/`;

export default function Pointage() {
  //#region //-variable
  const [modeAffichage, setModeAffichage] = useState(false);

  const ficheRef = useRef(); // Référence pour l'export PDF

  // Fonction pour générer le PDF
  const generatePDF = () => {
    const element = ficheRef.current;
    const options = {
      margin: 0.5,
      filename: "fiche_de_presence.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  };

  const handleModeAffichage = () => {
    setModeAffichage(!modeAffichage);
  };

  //#endregion

  //#region //-html
  return (
    <Template>
      <main
        className="col-md-12 ms-sm-auto col-lg-12 px-md-4 main mt-2 pb-2"
        ref={ficheRef}
      >
        <div className="pt-3 pb-2 mb-3">
          {/* -------------------------- PAGE CONTENT -------------------------- */}
          <div className="text-center my-3 mt-0">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <h5 className="mb-0 me-2 position-relative d-inline-block">
                  <BsArrowLeftRight
                    className="me-2 cursor-pointer"
                    onClick={handleModeAffichage}
                  />
                  Statistiques
                </h5>
              </div>
            </div>
          </div>

          {modeAffichage ? (
            <Times url={url_req + `statHeure`} />
          ) : (
            <Days url={url_req + "statJour/"} />
          )}

          {/* -------------------------- FIN -------------------------- */}
        </div>
      </main>
      {/* <div className="button-pdf">
        <button className="btn btn-primary" onClick={generatePDF}>
          Télécharger PDF
        </button>
      </div> */}
    </Template>
  );
  //#endregion
}
