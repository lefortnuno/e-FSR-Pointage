import axios from "../../contexts/api/axios";
import { useEffect } from "react";
import LogInForm from "./login.form";
import eKali from "../../assets/images/boa.png";
import "../../assets/styles/auth.css";
import "./login.css";

export default function LogIn() {
  const fetchData = () => {
    axios
      .get("joursFerie/glitch/")
      .then(function (response) {
        // console.log("Données récupérées : ", response.data);
      })
      .catch((error) => {
        // console.error("Erreur lors de la récupération : ", error);
      });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // 0,30secondes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bodyArtificLogin">
      <div className="containerContent">
        <h3>Bienvenue!</h3>
        <h1>S'authentifier</h1>
        <LogInForm />
      </div>
      <div className="containerImg">
        <img src={eKali} alt="bg-eKali" />
      </div>
    </div>
  );
}
