import axios from "../../../contexts/api/axios";
import GetUserData from "../../../contexts/api/udata";

import React from "react";
import { Modal, Button } from "react-bootstrap";
import { BsXCircleFill, BsCheckCircleFill } from "react-icons/bs";

import { toast } from "react-toastify";

export default function DeleteModal({ lnom, id, onClose, onDeleteConfirm }) {
  const u_info = GetUserData();

  const handleDelete = () => {
    axios
      .delete(`utilisateur/${id}`, u_info.opts)
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            `${
              lnom.charAt(0).toUpperCase() + lnom.slice(1)
            } supprimé avec succès!`
          );
          onDeleteConfirm(); // Action à effectuer après suppression
        } else {
          toast.error(`Erreur lors de la suppression du ${lnom}.`);
        }
      })
      .catch((error) => {
        toast.error(`Erreur lors de la suppression du ${lnom}.`);
      });
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton className="bg-secondary">
        <Modal.Title className="text-white">
          Confirmation de suppression
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Êtes-vous sûr de vouloir supprimer{" "}
        <strong>
          {lnom} ID°{id}
        </strong>
        ?
      </Modal.Body>
      <div className="modal-footer">
        <Button variant="danger" onClick={onClose} className="action-button">
          Annuler
          <BsXCircleFill className="action-icon" />
        </Button>
        <Button
          variant="success"
          onClick={handleDelete}
          className="action-button"
        >
          Confirmer
          <BsCheckCircleFill className="action-icon" />
        </Button>
      </div>
    </Modal>
  );
}
