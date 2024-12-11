import "./pic.params.css";
import React, { useState } from "react";
import { BsCloudUploadFill } from "react-icons/bs";

const ImageUploader = ({
  onImageUpload,
  initialImage,
  isChanging,
  setIsChanging,
}) => {
  const [fileName, setFileName] = useState("Aucun fichier sélectionné");
  const [image, setImage] = useState(initialImage || null);

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const selectedFile = files[0];
      const validImageExtensions = ["jpg", "jpeg", "png", "gif"];
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

      if (validImageExtensions.includes(fileExtension)) {
        setFileName(selectedFile.name);
        setImage(URL.createObjectURL(selectedFile)); // Afficher l'image localement
        setIsChanging(true);

        // Passer le fichier sélectionné au parent via callback
        if (onImageUpload) onImageUpload(selectedFile);
      } else {
        alert("Format non pris en charge. Veuillez sélectionner une image.");
        setFileName("Aucun fichier sélectionné");
        setImage(initialImage || null);
      }
    }
  };

  return (
    <div
      className="upload-box"
      onClick={() => document.querySelector(".input-file").click()}
    >
      <input
        type="file"
        className="input-file"
        hidden
        onChange={handleFileChange}
      />
      {initialImage ? (
        <img
          src={
            isChanging
              ? image
              : process.env.REACT_APP_SUN_COMPLET_URL + initialImage
          }
          alt={fileName}
          className="uploaded-image"
        />
      ) : (
        <div className="placeholder">
          <BsCloudUploadFill className="icon" />
          <p className="textProfile text-dark">Profile</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
