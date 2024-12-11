const router = require("express").Router();
const JoursFerieController = require("../controllers/joursFerie.controller");
const admin = require("../middlewares/admin.middleware");
const user = require("../middlewares/user.middleware");

router.post("/", admin.checkUtilisateur, JoursFerieController.addJoursFerie);

router.post("/recherche", JoursFerieController.searchJoursFerie);
router.post("/rDate", JoursFerieController.searchJoursFerieByMonthAndYear);
router.post("/rDates", JoursFerieController.searchJoursFerieBetweenDates);

router.get("/", JoursFerieController.getAllJoursFeries);
router.get("/glitch/", JoursFerieController.placeAuGlitch);

router.get("/:id", JoursFerieController.getIdJoursFerie);

router.put(
  "/:id",
  admin.checkUtilisateur,
  JoursFerieController.updateJoursFerie
);

router.delete(
  "/:id",
  admin.checkUtilisateur,
  JoursFerieController.deleteJoursFerie
);

module.exports = router;
