const fs = require("fs");
const path = require("path");
const multer = require("multer");

// Chemin du dossier de stockage
const imagePath = process.env.IMAGE_STORAGE_PATH || "uploads/";

// Vérifie si le dossier existe, sinon le crée
if (!fs.existsSync(imagePath)) {
  fs.mkdirSync(imagePath, { recursive: true }); // recursive: true permet de créer les dossiers parents si besoin
}

// Configuration de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagePath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.mimetype.split("/")[1];
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});

const updatePic = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, //limit 20Mo
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Type de fichier non pris en charge."), false);
    }
  },
}).single("pic");

module.exports.updatePic = updatePic;
