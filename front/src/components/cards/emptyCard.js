import React, { useState } from "react";
import AddModal from "../modals/add";

export default function EmptyCard({onSave}) {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <div 
        className="mb-2 mb-2 d-flex justify-content-center align-items-center contenu-corps-sous-cadre cardTrofel"
      >
        <div className="card-vide" onClick={handleShow}></div>
      </div>
      <AddModal show={showModal} handleClose={handleClose} onSave={onSave}/>
    </>
  );
}
