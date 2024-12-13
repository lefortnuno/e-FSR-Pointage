import React, { useState } from "react";

import {
  BsPersonLinesFill,
  BsFacebook,
  BsTwitter,
  BsInstagram,
} from "react-icons/bs";
import EditModal from "../../../components/modals/edit/edit";

import "../details.user.css";

export default function Card2({ details, onUserUpdate }) {
  const [showModal, setShowModal] = useState(false);

  const handleSave = () => {
    setShowModal(false);
    onUserUpdate();
  };
  
  const departmentMessages = {
    "Licence 1":
      "En début de parcours, je découvre les bases de ma formation et développe des compétences essentielles pour réussir mes études supérieures.",

    "Licence 2":
      "À ce stade, je consolide mes connaissances et approfondis les concepts clés pour construire une expertise solide dans mon domaine.",

    "Licence 3":
      "Dernière étape de la licence, je me prépare à la vie professionnelle ou à poursuivre en master, en maîtrisant des compétences avancées.",

    "Master 1":
      "Première année de spécialisation, je m'investis dans des projets ambitieux et acquiers une expertise pointue dans mon domaine.",

    "Master 2":
      "À la fin de mon parcours, je me concentre sur mon mémoire ou projet professionnel, prêt à intégrer le monde du travail ou poursuivre en doctorat.",

    Professeur:
      "Avec passion et rigueur, je transmets des connaissances et guide mes étudiants vers leur réussite académique et professionnelle.",
  };

  return (
    <>
      <div className="col-lg-4 col-md-6 col-12 mb-4">
        <div className="card h-100">
          <div className="card-header pb-0 p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="mb-0">Information</h6>
              <div
                onClick={() => setShowModal(true)}
                className="cursor-pointer"
              >
                <BsPersonLinesFill
                  className="text-secondary text-sm"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Réglages"
                />
              </div>
            </div>
          </div>
          <div className="card-body p-3">
            <p className="text-sm text-justify">
              {departmentMessages[details.departement] ||
                "Bienvenue dans notre équipe !"}
            </p>
            <p className="text-sm text-end">
              #{details && <>{details.departement}</>}
            </p>
            <hr className="horizontal gray-light my-2" />
            <ul className="list-group text-start">
              <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                <strong className="text-dark">Nom & Prénom:</strong> &nbsp;
                {details && (
                  <>
                    {details.nom} {details.prenom}
                  </>
                )}
              </li>
              <li className="list-group-item border-0 ps-0 text-sm">
                <strong className="text-dark">Tél:</strong> &nbsp; +261:
                {details && <>{details.num}</>}
              </li>
              <li className="list-group-item border-0 ps-0 text-sm">
                <strong className="text-dark">Email:</strong> &nbsp;
                {details && <>{details.email}</>}
              </li>
              <li className="list-group-item border-0 ps-0 text-sm">
                <strong className="text-dark">Location:</strong> &nbsp;
                Madagascar
              </li>
              <li className="list-group-item border-0 ps-0 pb-0 text-sm">
                <strong className="text-dark">Social:</strong> &nbsp;
                <div className="btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0">
                  <BsFacebook size={20} />
                </div>
                <div className="btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0">
                  <BsTwitter size={20} />
                </div>
                <div className="btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0">
                  <BsInstagram size={20} />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {showModal && (
        <EditModal
          userData={details}
          id={details.im}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
}
