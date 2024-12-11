const router = require("express").Router();
const EmployeeController = require("../controllers/employee.controller");
const admin = require("../middlewares/admin.middleware");

router.post("/", admin.checkUtilisateur, EmployeeController.getQRCode);
router.get(
  "/pointage/",
  //   admin.checkUtilisateur,
  EmployeeController.getPointage
);
router.get(
  "/nombre/employe/",
  //   admin.checkUtilisateur,
  EmployeeController.getNombreEmploye
);
router.get(
  "/pointage/nombre/",
  //   admin.checkUtilisateur,
  EmployeeController.getNombrePointage
);
router.get(
  "/statHeure/",
  //   admin.checkUtilisateur,
  EmployeeController.getStatParHeure
);
router.get(
  "/statJour/",
  //   admin.checkUtilisateur,
  EmployeeController.getStatParJour
);
router.get("/fahatongavana/:id", EmployeeController.getFahatongavana);
module.exports = router;
