import axios from "../../../contexts/api/axios";
import GetUserData from "../../../contexts/api/udata";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  BsXCircleFill,
  BsCheckCircleFill,
  BsFillReplyAllFill,
} from "react-icons/bs";
import { Modal, Button } from "react-bootstrap";

import "./edit.css";

export default function EditModal({ userData, id, onClose, onSave }) {
  const navigate = useNavigate();
  const u_info = GetUserData();

  const [inputs, setInputs] = useState({
    nom: userData.nom || "",
    prenom: userData.prenom || "",
    im: userData.im || "",
    departement: userData.departement || "",
    num: userData.num || "",
    email: userData.email || "",
    pic: userData.pic || "",
    qrCodeValue: userData.qrCodeValue || "",
    enConge: userData.enConge || false,
    nbJour: userData.nbJour || 0,
    roleU: userData.roleU || false,
    validCompte: userData.validCompte || false,
    reqUserRole: u_info.u_roleU || "",
  });

  const [erreurs, setErreurs] = useState({});

  useEffect(() => {
    axios
      .get(`utilisateur/${id}`, u_info.opts)
      .then((response) => {
        if (response.status === 200) {
          setInputs(response.data.data);
        }
      })
      .catch(() => {});
  }, [id]);

  const handleSave = () => {
    const hasErrors = Object.values(erreurs).some((error) => error);
    if (!hasErrors) {
      const finalInputs = {
        ...inputs,
        reqUserRole: u_info.u_roleU,
      };

      axios
        .put(`utilisateur/${id}`, finalInputs, u_info.opts)
        .then((response) => {
          if (response.status === 200 && response.data.success) {
            onSave(); // Pass updated data to parent component
            onClose();
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message || "Échec de la modification!");
          }
        })
        .catch(() => {
          toast.error("Erreur lors de la modification!");
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

  const departementOptions = [
    "Secretariat",
    "Caissier",
    "Accueil",
    "Sécurité",
    "Adjoint",
    "Chargé de clientèle",
    "Stagiaire",
  ];

  return (
    <Modal show onHide={onClose} centered className="custom-modal">
      <Modal.Header closeButton className="bg-secondary">
        <Modal.Title className="text-white">Modifier l'utilisateur</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="row mb-0">
            <div className="col">
              <label className="form-label">IM :</label>
              <input
                type="text"
                name="im"
                value={inputs.im}
                className="form-control"
                placeholder="Entrez l'IM"
                autoComplete="off"
                disabled={true}
              />
              <small className="text-danger">{erreurs.im}</small>
            </div>
            <div className="col">
              <label className="form-label">Nom :</label>
              <input
                type="text"
                name="nom"
                onChange={handleChange}
                value={inputs.nom}
                className="form-control"
                placeholder="Entrez le nom"
                autoComplete="off"
              />
              <small className="text-danger">{erreurs.nom}</small>
            </div>
          </div>

          <div className="mb-0">
            <label className="form-label">Prénom :</label>
            <input
              type="text"
              name="prenom"
              onChange={handleChange}
              value={inputs.prenom}
              className="form-control"
              placeholder="Entrez le prénom"
              autoComplete="off"
            />
            <small className="text-danger">{erreurs.prenom}</small>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Numéro :</label>
              <input
                type="text"
                name="num"
                onChange={handleChange}
                value={inputs.num}
                className="form-control"
                placeholder="Entrez le numéro"
                autoComplete="off"
                inputMode="numeric"
              />
              <small className="text-danger">{erreurs.num}</small>
            </div>
            <div className="col">
              <label className="form-label">Email :</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={inputs.email}
                className="form-control"
                placeholder="Entrez l'email"
                autoComplete="off"
              />
              <small className="text-danger">{erreurs.email}</small>
            </div>
          </div>

          <div className="row mb-0">
            <div className="col form-check">
              <input
                className="form-check-input ms-auto"
                type="checkbox"
                name="enConge"
                onChange={handleChange}
                checked={inputs.enConge}
                disabled={true}
              />
              <label className="form-check-label">En Congé</label>
            </div>
            <div className="col form-check">
              <input
                className="form-check-input ms-auto"
                type="checkbox"
                name="validCompte"
                onChange={handleChange}
                checked={inputs.validCompte}
                disabled={u_info.u_roleU ? false : true}
              />
              <label className="form-check-label">Activé</label>
            </div>
            <div className="col form-check">
              <input
                className="form-check-input ms-auto"
                type="checkbox"
                name="roleU"
                onChange={handleChange}
                checked={inputs.roleU}
                disabled={u_info.u_roleU ? false : true}
              />
              <label className="form-check-label">Admin </label>
            </div>
          </div>

          <div className="row mb-0">
            <div className="col">
              <label className="form-label">Département :</label>
              <select
                name="departement"
                onChange={handleChange}
                value={inputs.departement}
                className="form-control"
                disabled={u_info.u_roleU ? false : true}
              >
                <option value="">Sélectionnez un département</option>
                {departementOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <small className="text-danger">{erreurs.departement}</small>
            </div>
            <div className="col">
              <label className="form-label">Nombre de Jours :</label>
              <input
                type="number"
                name="nbJour"
                onChange={handleChange}
                value={inputs.nbJour}
                className="form-control"
                placeholder="Entrez le nombre de jours"
                autoComplete="off"
                maxLength={2}
                inputMode="numeric"
                disabled={u_info.u_roleU ? false : true}
              />
              <small className="text-danger">{erreurs.nbJour}</small>
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
