const router = require("express").Router();
const UtilisateurController = require("../controllers/utilisateur.controller");
const admin = require("../middlewares/admin.middleware");
const user = require("../middlewares/user.middleware");
const { upload } = require("../middlewares/uploadImage.middleware"); // Importation de multer
const { updatePic } = require("../middlewares/updateImage.middleware");

router.post(
  "/",
  admin.checkUtilisateur,
  upload,
  UtilisateurController.addUtilisateur
);
router.post("/seConnecter", UtilisateurController.loginUtilisateur);
router.post(
  "/recherche",
  admin.checkUtilisateur,
  UtilisateurController.searchUtilisateur
);
router.post(
  "/employee/recherche",
  admin.checkUtilisateur,
  UtilisateurController.searchEmployeeUser
);
router.post(
  "/account/recherche",
  admin.checkUtilisateur,
  UtilisateurController.searchUserToArise
);

router.get(
  "/",
  admin.checkUtilisateur,
  UtilisateurController.getAllUtilisateurs
);
router.get("/account/", UtilisateurController.getAllAriseUsers);
router.get("/employee/", UtilisateurController.getAllEmployeeUsers);
router.get("/:id", UtilisateurController.getIdUtilisateur);

router.put(
  "/arise/:id",
  admin.checkUtilisateur,
  UtilisateurController.updateUserRole
);
router.put("/pdp/:id", updatePic, UtilisateurController.updateUtilisateurPDP);
router.put("/info/:id", UtilisateurController.updateUtilisateurInfo);
router.put("/:id", UtilisateurController.updateUtilisateur);

router.delete(
  "/:id",
  admin.checkUtilisateur,
  UtilisateurController.deleteUtilisateur
);

module.exports = router;
