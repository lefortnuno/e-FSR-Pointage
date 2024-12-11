import Template from "../../components/template/template";
import SignInForm from "./signin.form";

import { useState } from "react";

import "../../assets/styles/auth.css";
import "./signin.css";

import eKali from "../../assets/images/boa.png"; 

export default function SignIn() {
  const [qrCode, setQrCode] = useState(""); 
  
  return (
    <Template>
      <div className="bodyArtificSignIn mb-4">
        <div className="containerContent">
          <h1>S'enregistrer</h1>
          <SignInForm setQrCode={setQrCode} />
        </div>
        <div className="containerImg">
          {qrCode ? (
            <img src={qrCode} className="renduQRCODE" alt="QR Code" />
          ) : (
            <img src={eKali} className="renduQRCODE" alt="logo-eKali" />
          )}
        </div>
      </div>
    </Template>
  );
}
