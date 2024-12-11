const router = require("express").Router();
const CongeController = require("../controllers/conge.controller");
const admin = require("../middlewares/admin.middleware");
const user = require("../middlewares/user.middleware");

router.post("/", CongeController.createConge);
router.post("/recherche", admin.checkUtilisateur, CongeController.searchConge);
router.post(
  "/dm/recherche",
  admin.checkUtilisateur,
  CongeController.searchCongeDM
);

router.get("/", admin.checkUtilisateur, CongeController.getAllConges);
router.get("/dm/", admin.checkUtilisateur, CongeController.getAllCongesDM);
router.get("/reqConge/:id", CongeController.getMyReqConge);
router.get(
  "/miseAJour/",
  admin.checkUtilisateur,
  CongeController.updateAutoEmployeEnConge
);
router.get("/:id", CongeController.getCongeById);

router.put(
  "/valider/:id",
  admin.checkUtilisateur,
  CongeController.updateMyConge
);
router.put(
  "/refuser/:id",
  admin.checkUtilisateur,
  CongeController.updateMyConge
);
router.put("/:id", admin.checkUtilisateur, CongeController.updateConge);

router.delete("/:id", admin.checkUtilisateur, CongeController.deleteConge);

module.exports = router;
