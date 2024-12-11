const router = require("express").Router();
const PointageController = require("../controllers/pointage.controller");
const admin = require("../middlewares/admin.middleware");

router.post("/", PointageController.createPointage);
router.post("/web/", PointageController.createPointageWeb);
router.post("/ptg/", PointageController.getPointageEmployee);
router.post("/billan/", PointageController.getBillanEmployee);
router.post(
  "/ptgAll/",
  admin.checkUtilisateur,
  PointageController.getPointageEmployees
);
router.post("/taux/", admin.checkUtilisateur, PointageController.getTaux);

router.post(
  "/byDay/",
  admin.checkUtilisateur,
  PointageController.getAllPointages
);
router.post(
  "/absent/byDay/",
  admin.checkUtilisateur,
  PointageController.getAllPointagesDesAbsents
);
router.post(
  "/rechercheParJour/",
  admin.checkUtilisateur,
  PointageController.searchPointageParJour
);
router.post(
  "/absent/rechercheParJour/",
  admin.checkUtilisateur,
  PointageController.searchPointageAbsentParJour
);
router.post(
  "/rechercheParWeek/",
  admin.checkUtilisateur,
  PointageController.searchPointageParWeek
);

router.get("/:id", admin.checkUtilisateur, PointageController.getPointageById);

router.put("/cloture", PointageController.cloturePointage);
router.put("/web/sortie/", PointageController.cloturePointageWeb);
router.put("/:id", admin.checkUtilisateur, PointageController.updatePointage);

router.delete(
  "/:id",
  admin.checkUtilisateur,
  PointageController.deletePointage
);

module.exports = router;
