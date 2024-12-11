import axios from "../../../contexts/api/axios";
import GetUserData from "../../../contexts/api/udata";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BsXCircleFill, BsCheckCircleFill } from "react-icons/bs";
import { Modal, Button } from "react-bootstrap";

import "../edit/edit.css";
import "./reponse.css";

export default function ReponseModal({ userData, onClose, onSave, congeData }) {
  const navigate = useNavigate();
  const u_info = GetUserData();

  const dateDeDebutMarina = new Date(
    new Date(congeData.dateDeDebut).getTime() -
      new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  const todayPlus3Days = new Date();
  todayPlus3Days.setDate(todayPlus3Days.getDate() + 3);
  const formattedDate = todayPlus3Days.toISOString().split("T")[0];
  const formattedDateDeDebut = congeData.dateDeDebut
    ? new Date(
        new Date(congeData.dateDeDebut).getTime() -
          new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0]
    : formattedDate;

  const [inputs, setInputs] = useState({
    motif: congeData.motif || "Convalescence",
    dateDeDebut: formattedDateDeDebut,
    nbJourC: congeData.nbJourC || 5,
    reqConge: congeData.reqConge || false,
    dateDeFin: congeData.dateDeFin || formattedDateDeDebut,
  });
  const [erreurs, setErreurs] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setInputs((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      setErreurs((prev) => ({ ...prev, email: "Email invalide" }));
    } else {
      setErreurs((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSave = (rep, url) => {
    const hasErrors = Object.values(erreurs).some((error) => error);
    if (!hasErrors) {
      const updateData = {
        ...inputs,
        cIm: userData.im,
        etatReqConge: rep,
      };
      console.log(updateData);

      axios
        .put(`conge/${url}/${congeData.id}`, updateData, u_info.opts)
        .then((response) => {
          if (response.status === 200 && response.data.success) {
            onSave();
            toast.success(response.data.message);
          } else {
            toast.error(
              response.data.message || "Échec de validation de congé!"
            );
          }
          onClose();
        })
        .catch(() => {
          toast.error("Erreur lors de la validation de congé!");
        });
    }
  };

  const takeOffRaison = [
    "Voyage familial",
    "Visite à la famille éloignée",
    "Traitement médical",
    "Récupération post-opératoire",
    "Repos après un projet intensif",
    "Prise en charge d'un proche malade",
    "Pause pour épuisement professionnel",
    "Mariage et cérémonie",
    "Études et formation",
    "Convalescence",
  ];
  const refuserConge = () => {
    handleSave(false, "refuser");
  };
  const validerConge = () => {
    handleSave(true, "valider");
  };

  return (
    <Modal show onHide={onClose} centered className="custom-modal">
      <Modal.Header closeButton className="bg-secondary">
        <Modal.Title className="text-white">Réponse Demande Congé</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">IM :</label>
              <input
                type="text"
                name="CIm"
                disabled={true}
                value={userData.im}
                className="form-control"
                placeholder="Entrez l'IM"
                autoComplete="off"
              />
              <small className="text-danger">{erreurs.im}</small>
            </div>
            <div className="col">
              <label className="form-label">Débute le :</label>
              <input
                type="date"
                name="dateDeDebut"
                onChange={handleChange}
                value={inputs.dateDeDebut}
                className="form-control"
                placeholder="Entrez le nom"
                autoComplete="off"
              />
              <small className="text-danger">{erreurs.dateDeDebut}</small>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Motif :</label>
              <select
                name="motif"
                disabled={true}
                value={inputs.motif}
                className="form-control"
              >
                <option value="">Sélectionnez un motif</option>
                {takeOffRaison.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <small className="text-danger">{erreurs.motif}</small>
            </div>
            <div className="col">
              <label className="form-label">Nombre de Jours :</label>
              <input
                type="number"
                name="nbJourC"
                disabled={true}
                value={inputs.nbJourC}
                className="form-control"
                placeholder="Entrez le nombre de jours demander"
                autoComplete="off"
                maxLength={2}
                inputMode="numeric"
              />
              <small className="text-danger">{erreurs.nbJourC}</small>
            </div>
          </div>
        </form>
      </Modal.Body>
      <div className="modal-footer">
        <Button
          variant="danger"
          onClick={refuserConge}
          className="action-button"
        >
          Refuser
          <BsXCircleFill className="action-icon" />
        </Button>
        <Button
          variant="success"
          onClick={validerConge}
          className="action-button"
        >
          Valider
          <BsCheckCircleFill className="action-icon" />
        </Button>
      </div>
    </Modal>
  );
}
