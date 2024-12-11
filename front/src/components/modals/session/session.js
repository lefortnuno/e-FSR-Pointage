import React from "react";
import { Modal, Button } from "react-bootstrap";
import { BsXCircleFill, BsCheckCircleFill } from "react-icons/bs";

import "../edit/edit.css";

const LogoutConfirmationModal = ({ show, handleClose, handleLogout }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-secondary">
        <Modal.Title className="text-white">
          Confirmation de Déconnexion
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-bold">
        Êtes-vous sûr de vouloir vous déconnecter ?
      </Modal.Body>

      <div className="modal-footer">
        <Button
          variant="secondary"
          onClick={handleClose}
          className="action-button-session"
        >
          Non
          <BsXCircleFill className="action-icon" />
        </Button>
        <Button
          variant="danger"
          onClick={handleLogout}
          className="action-button-session"
        >
          OUI
          <BsCheckCircleFill className="action-icon" />
        </Button>
      </div>
    </Modal>
  );
};

export default LogoutConfirmationModal;
