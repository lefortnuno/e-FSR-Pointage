const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config({ path: "./config/.env" });

const utilisateurRoute = require("./routes/utilisateur.route");
const JoursFerieRoute = require("./routes/joursFerie.route");
const CongeRoute = require("./routes/conge.route");
const PointageRoute = require("./routes/pointage.route"); 
const employeeRoute = require("./routes/employee.route");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use("/api/utilisateur", utilisateurRoute);
app.use("/api/joursFerie", JoursFerieRoute);
app.use("/api/conge", CongeRoute);
app.use("/api/pointage", PointageRoute); 
app.use("/api/employee", employeeRoute);

app.use(
  "/api/uploads",
  express.static(path.join(__dirname, process.env.IMAGE_STORAGE_PATH))
);  

app.listen(process.env.PORT || process.env.IP_HOST, () => {
  console.log(`Lancé sur ${process.env.IP_HOST}:${process.env.PORT} .... `);
});
