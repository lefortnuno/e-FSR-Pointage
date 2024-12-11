import "./pic.css";
import React, { useState } from "react";
import { BsCloudUploadFill } from "react-icons/bs";

const ImageUploader = ({ onImageUpload }) => {
  const [fileName, setFileName] = useState("Aucun fichier sélectionné");
  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const selectedFile = files[0];
      const validImageExtensions = ["jpg", "jpeg", "png", "gif"];
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

      if (validImageExtensions.includes(fileExtension)) {
        setFileName(selectedFile.name);
        setImage(URL.createObjectURL(selectedFile)); 

        onImageUpload(selectedFile); // Appeler le callback avec le fichier sélectionné
      } else {
        console.log(
          "Fichier non pris en charge. Veuillez sélectionner une image."
        );
        setFileName("Aucun fichier sélectionné");
        setImage(null);
      }
    } else {
      setFileName("Aucun fichier sélectionné");
      setImage(null);
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
      {image ? (
        <img src={image} alt={fileName} className="uploaded-image" />
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
