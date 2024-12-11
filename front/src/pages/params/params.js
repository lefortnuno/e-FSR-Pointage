import axios from "../../contexts/api/axios";
import GetUserData from "../../contexts/api/udata";
import Template from "../../components/template/template";
import ParamsForm from "./params.form";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsDownload } from "react-icons/bs";

import "../../assets/styles/auth.css";
import "../signin/signin.css";
import "../login/login.css";
import "./params.css";

import eKali from "../../assets/images/boa.png";

export default function Params() {
  const { id } = useParams();
  const u_info = GetUserData();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUser();
  }, [id]);

  const getUser = () => {
    axios
      .get(`utilisateur/${id}`, u_info.opts)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.data;
          setUserData(data);
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données", error)
      );
  };

  return (
    <Template>
      <div className="bodyArtificSignIn mb-4">
        <div className="containerContent">
          <h1>Paramètres de Compte</h1>
          <ParamsForm inputs={userData} setInputs={setUserData} />
        </div>
        <div className="containerImg">
          {userData ? (
            <>
              <img
                src={userData.qrCodeValue}
                className="renduQRCODE"
                alt="QR Code"
              />
              <a
                href={userData.qrCodeValue}
                download="QRCode.png"
                className="download-icon-params"
              >
                <BsDownload />
              </a>
            </>
          ) : (
            <img src={eKali} className="renduQRCODE" alt="logo-eKali" />
          )}
        </div>
      </div>
    </Template>
  );
}
