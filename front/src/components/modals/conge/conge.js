import axios from "../../../contexts/api/axios";
import GetUserData from "../../../contexts/api/udata";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Modal, Button } from "react-bootstrap";
import { BsXCircleFill, BsCheckCircleFill } from "react-icons/bs";

import "../edit/edit.css";

export default function CongeModal({ userData, onClose, onSave }) {
  const navigate = useNavigate();
  const u_info = GetUserData();
  const todayPlus3Days = new Date();
  todayPlus3Days.setDate(todayPlus3Days.getDate() + 3);
  const formattedDate = todayPlus3Days.toISOString().split("T")[0];

  const [inputs, setInputs] = useState({
    motif: userData.motif || "Convalescence",
    dateDeDebut: userData.dateDeDebut || formattedDate,
    nbJourC: userData.nbJourC || 5,
  });
  const [erreurs, setErreurs] = useState({});

  const handleSave = () => {
    const hasErrors = Object.values(erreurs).some((error) => error);
    if (!hasErrors) {
      const finalInputs = {
        ...inputs,
        cIm: userData.im,
      };
      axios
        .post(`conge/`, finalInputs, u_info.opts)
        .then((response) => {
          if (response.status === 200 && response.data.success) {
            onSave();
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message || "Échec de congé!");
          }
        })
        .catch(() => {
          toast.error("Erreur lors de la demande de congé!");
        });
    }
  };

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

  return (
    <Modal show onHide={onClose} centered className="custom-modal">
      <Modal.Header closeButton className="bg-secondary">
        <Modal.Title className="text-white">Demande de Congé</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">IM :</label>
              <input
                type="text"
                name="CIm"
                onChange={handleChange}
                value={userData.im}
                className="form-control"
                placeholder="Entrez l'IM"
                autoComplete="off"
                disabled={true}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
        <Button variant="secondary" onClick={onClose} className="action-button">
          Annuler
          <BsXCircleFill className="action-icon" />
        </Button>
        <Button
          variant="success"
          onClick={handleSave}
          className="action-button"
        >
          Enregistrer
          <BsCheckCircleFill className="action-icon" />
        </Button>
      </div>
    </Modal>
  );
}
