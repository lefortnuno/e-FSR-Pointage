import axios from "../../../contexts/api/axios";

import React from "react";
import { toast } from "react-toastify";
import { BsXCircleFill, BsCheckCircleFill } from "react-icons/bs";
import { Modal, Button } from "react-bootstrap";

import "../edit/edit.css";
import "../conge/reponse.css";

export default function PointageEntree({ userData, onClose, onSave, u_info }) {
  const handleSave = () => {
    const data = { employeIm: userData.im };
    axios
      .post(`pointage/web/`, data, u_info.opts)
      .then((response) => {
        if (response.status === 200 && response.data.success) {
          onSave();
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message || "Échec!");
        }
        onClose();
      })
      .catch(() => {
        toast.error("Erreur!");
      });
  };

  return (
    <Modal show onHide={onClose} centered className="custom-modal">
      <Modal.Header closeButton className="bg-secondary">
        <Modal.Title className="text-white">Pointage d'Entrée</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="row mb-3">
            <div className="col">
              <div className="u-img">
                <img
                  src={process.env.REACT_APP_SUN_COMPLET_URL + userData.pic}
                  alt="Profile Picture"
                  style={{ borderRadius: "5px" }}
                />
              </div>
            </div>
            <div className="col">
              <label className="form-label">IM : {userData.im}</label> <br />
              <label className="form-label">
                Nom : {userData.nom} {userData.prenom}
              </label>
              <br />
              <label className="form-label">
                Departement : {userData.departement}
              </label>
              <br />
              <label className="form-label">Téléphone : {userData.num}</label>
              <br />
              <label className="form-label">Email : {userData.email}</label>
              <br />
              <label className="form-label">
                Rôle : {userData.roleU ? "Admin" : "Utilisateur"}
              </label>
            </div>
          </div>
        </form>
      </Modal.Body>
      <div className="modal-footer">
        <Button variant="danger" onClick={onClose} className="action-button">
          Annuler
          <BsXCircleFill className="action-icon" />
        </Button>
        <Button
          variant="success"
          onClick={handleSave}
          className="action-button"
        >
          Valider
          <BsCheckCircleFill className="action-icon" />
        </Button>
      </div>
    </Modal>
  );
}
