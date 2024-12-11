import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

import EditModal from "../modals/edit"; 

import "./cardTrofel.css";

export default function CardTrofel({
  lnom,
  id,
  onEditSuccess,
  onDeleteSuccess,
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  //#region //-modals 
  const handleEditClick = () => {
    setShowEditModal(true);
  };
 
  const handleModalClose = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  const handleEditSave = (updatedData) => {
    onEditSuccess(); // Trigger getData after edit
    setShowEditModal(false);
  }; 
  //#endregion
  return (
    <>
      <div className="mb-2 d-flex justify-content-center align-items-center contenu-corps-sous-cadre cardTrofel">
        <div className="card-content" onClick={handleEditClick}>
          {lnom}
        </div>
      </div>

      {showEditModal && (
        <EditModal
          lnom={lnom}
          id={id}
          onClose={handleModalClose}
          onSave={handleEditSave}
        />
      )} 
    </>
  );
}
