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
    Secretariat:
      "Je veille au bon déroulement des opérations administratives, en facilitant la communication et l'organisation au sein de l'équipe. Mon rôle est essentiel pour le soutien et la coordination de nos activités.",

    Caissier:
      "Je gère les transactions avec précision et professionnalisme, assurant la sécurité des opérations financières. La confiance et la transparence sont au cœur de mon travail.",

    Accueil:
      "Premier point de contact, j'accueille nos visiteurs avec chaleur et professionnalisme. Mon objectif est de créer une première impression positive et mémorable.",

    Sécurité:
      "Je veille à la sécurité de tous au sein de l’entreprise, assurant une surveillance constante. Mon rôle est de garantir un environnement sûr et serein pour chacun.",

    Adjoint:
      "J'assiste l'équipe pour atteindre nos objectifs avec efficacité. Mon soutien contribue à la fluidité et au succès des projets communs.",

    "Chargé de clientèle":
      "À l’écoute des besoins des clients, je m’assure de leur satisfaction en proposant des solutions adaptées. Mon objectif est de renforcer leur confiance et leur fidélité.",

    Stagiaire:
      "En formation, j’apporte mon énergie et ma curiosité pour apprendre et contribuer activement. C'est une opportunité pour moi de grandir professionnellement.",
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
