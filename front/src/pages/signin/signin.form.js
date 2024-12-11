import axios from "../../contexts/api/axios";
import { toast } from "react-toastify";
import GetUserData from "../../contexts/api/udata";

import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import ImageUploader from "./profile/pic";

const URL_DE_BASE = process.env.REACT_APP_SUN_COMPLET_URL + "employee/";
const url_req = `utilisateur/`;

let isInfoCompleteAndValid;
let isValidate = false;

export default function SignInForm({ setQrCode }) {
  //#region // FONC
  const navigate = useNavigate();
  const u_info = GetUserData();
  const initialInputs = {
    pic: null,
    im: "",
    nom: "",
    prenom: "",
    num: "",
    email: "",
    departement: "",
    qrCodeValue: "",
    pwd: "",
    pwd0: "",
    pwd1: "",
    pwd2: "",
    pwd3: "",
  };
  const booleanInputs = {
    pic: false,
    im: false,
    nom: false,
    prenom: false,
    num: false,
    email: false,
    departement: false,
    pwd: false,
  };

  const [erreurs, setErreurs] = useState(booleanInputs);
  const [messages, setMessages] = useState(initialInputs);

  const pwdRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const [disabledInputs, setDisabledInputs] = useState({
    pwd0: true,
    pwd1: true,
    pwd2: true,
    pwd3: true,
  });
  const [showSave, setShowSave] = useState(false);

  const [inputs, setInputs] = useState(initialInputs);
  const handleImageUpload = (file) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      pic: file,
    }));
  };

  const handleChange = async (event) => {
    isValidate = true;
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    handleDoubt();
    setInputs((values) => ({ ...values, [name]: inputValue }));
    setErreurs((values) => ({ ...values, [name]: false }));
    setMessages((values) => ({ ...values, [name]: "" }));

    if (name === "im") {
      if (value.length === 0) {
        isValidate = false;
        setQrCode("");
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Identifiant obligatoire!",
        }));
      } else if (value.length < 4) {
        isValidate = false;
        setQrCode("");
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Identifiant trop court!",
        }));
      } else if (value.length > 8) {
        isValidate = false;
        setQrCode("");
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Identifiant trop long!",
        }));
      } else {
        isValidate = true;
        setErreurs((values) => ({ ...values, [name]: false }));
        setMessages((values) => ({ ...values, [name]: "" }));
        try {
          const im = inputValue;
          const response = await fetch(URL_DE_BASE, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...u_info.opts.headers,
            },
            body: JSON.stringify({ im }),
          });

          const result = await response.json();

          if (result.success) {
            setQrCode(result.data);
            setInputs((values) => ({ ...values, qrCodeValue: result.data }));
            setErreurs((values) => ({ ...values, messageErreur: false }));
            setMessages((values) => ({
              ...values,
              messageErreur: "",
            }));
          } else {
            setQrCode("");
            setErreurs((values) => ({ ...values, messageErreur: true }));
            setMessages((values) => ({
              ...values,
              messageErreur: result.message,
            }));
            console.log("Échec de l'ajout! ", result.message);
          }
        } catch (error) {
          setQrCode("");
          setErreurs((values) => ({ ...values, messageErreur: true }));
          setMessages((values) => ({
            ...values,
            messageErreur: "Veuillez vous connecter au serveur!",
          }));
          console.error("Erreur lors de la requête : ", error);
        }
      }
    }

    if (name === "num") {
      if (value.length === 0) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Numéro obligatoire!",
        }));
      } else if (value.length < 10) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Numéro trop court!",
        }));
      } else if (value.length > 10) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Numéro trop long!",
        }));
      } else {
        isValidate = true;
        setErreurs((values) => ({ ...values, [name]: false }));
        setMessages((values) => ({ ...values, [name]: "" }));
      }
    }

    if (name === "nom") {
      if (value.length === 0) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Nom obligatoire!",
        }));
      } else if (value.length < 2) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Nom trop court!",
        }));
      } else if (value.length > 25) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Nom trop long!",
        }));
      } else {
        isValidate = true;
        setErreurs((values) => ({ ...values, [name]: false }));
        setMessages((values) => ({ ...values, [name]: "" }));
      }
    }

    if (name === "email") {
      if (value.length === 0) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Email obligatoire!",
        }));
      } else if (value.length < 12) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Email trop court!",
        }));
      } else if (value.length > 25) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Email trop long!",
        }));
      } else {
        isValidate = true;
        setErreurs((values) => ({ ...values, [name]: false }));
        setMessages((values) => ({ ...values, [name]: "" }));
      }
    }
  };

  const handleChangePwd = (event) => {
    const { name, value } = event.target;

    if (/^[0-9]$/.test(value)) {
      setInputs((values) => ({ ...values, [name]: value }));
      setErreurs((values) => ({ ...values, pwd: false }));
      setMessages((values) => ({ ...values, pwd: "" }));

      switch (name) {
        case "pwd0":
          setDisabledInputs((prevState) => ({ ...prevState, pwd1: false }));
          setDisabledInputs((prevState) => ({ ...prevState, pwd0: true }));
          break;
        case "pwd1":
          setDisabledInputs((prevState) => ({ ...prevState, pwd2: false }));
          setDisabledInputs((prevState) => ({ ...prevState, pwd1: true }));
          break;
        case "pwd2":
          setDisabledInputs((prevState) => ({ ...prevState, pwd3: false }));
          setDisabledInputs((prevState) => ({ ...prevState, pwd2: true }));
          break;
        case "pwd3":
          break;
        default:
          break;
      }
    } else {
      setInputs((values) => ({ ...values, [name]: "" }));
      setInputs((values) => ({ ...values, pwd: "" }));
      setErreurs((values) => ({ ...values, pwd: true }));
      setMessages((values) => ({
        ...values,
        pwd: "Valeur valide [0-9]!",
      }));

      switch (name) {
        case "pwd0":
          break;
        case "pwd1":
          setDisabledInputs((prevState) => ({ ...prevState, pwd1: true }));
          setDisabledInputs((prevState) => ({ ...prevState, pwd0: false }));
          break;
        case "pwd2":
          setDisabledInputs((prevState) => ({ ...prevState, pwd2: true }));
          setDisabledInputs((prevState) => ({ ...prevState, pwd1: false }));
          break;
        case "pwd3":
          setDisabledInputs((prevState) => ({ ...prevState, pwd3: true }));
          setDisabledInputs((prevState) => ({ ...prevState, pwd2: false }));
          break;
        default:
          break;
      }
    }
  };

  const preValidation = (event) => {
    event.preventDefault();

    const inputsObligatoire = ["nom", "im", "num", "email"];
    let formIsValid = true;

    inputsObligatoire.forEach((element) => {
      if (!inputs[element]) {
        formIsValid = false;
        setErreurs((values) => ({ ...values, [element]: true }));
        setMessages((values) => ({
          ...values,
          [element]: "Obligatoire!",
        }));
      }
    });

    if (formIsValid) {
      isInfoCompleteAndValid =
        inputs.nom && inputs.im && !erreurs.nom && !erreurs.im;

      if (isInfoCompleteAndValid) {
        setShowSave(true);
        setDisabledInputs((prevState) => ({ ...prevState, pwd0: false }));
      } else {
        handleDoubt();
      }
    }
  };

  const validation = (event) => {
    event.preventDefault();

    const inputsObligatoire = ["nom", "im", "num", "email", "pwd"];

    let formIsValid = true;

    inputsObligatoire.forEach((element) => {
      if (!inputs[element]) {
        formIsValid = false;
        setErreurs((values) => ({ ...values, [element]: true }));
        setMessages((values) => ({
          ...values,
          [element]: "Obligatoire!",
        }));
      }
    });

    if (formIsValid) {
      onSubmit();
    }
  };

  const onSubmit = async () => {
    // Créer un FormData
    const formData = new FormData();

    // Ajouter l'image si elle est présente
    if (inputs.pic) {
      formData.append("pic", inputs.pic, inputs.pic.name);
    }

    // Ajouter tous les champs texte et numériques
    Object.keys(inputs).forEach((key) => {
      if (inputs[key] !== null && key !== "pic") {
        formData.append(key, inputs[key]);
      }
    });

    try {
      // Envoyer les données via axios avec le type multipart/form-data
      const response = await axios.post(url_req, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...u_info.opts.headers, // Ajouter les en-têtes personnalisés si nécessaire
        },
      });

      // Vérifier la réponse
      if (response.status === 200 && response.data.success) {
        toast.success(response.data.message);
        navigate("/users/"); // Redirection après le succès
      } else {
        toast.error(`Échec de l'ajout! ${response.data.message}`);
      }
    } catch (error) {
      setErreurs((values) => ({ ...values, messageErreur: true }));
      setMessages((values) => ({
        ...values,
        messageErreur: "Erreur de connexion au serveur!",
      }));
      console.error("Erreur lors de la requête : ", error);
      toast.error("Veuillez vérifier votre connexion au serveur.");
    }
  };

  function onClose() {
    setInputs(initialInputs);
    setErreurs(booleanInputs);
    setDisabledInputs({
      pwd0: true,
      pwd1: true,
      pwd2: true,
      pwd3: true,
    });

    navigate("/users/");
  }

  function handleDoubt() {
    setShowSave(false);
    isInfoCompleteAndValid = false;
    setDisabledInputs((prevState) => ({
      ...prevState,
      pwd0: true,
      pwd1: true,
      pwd2: true,
      pwd3: true,
    }));
    setInputs((prevState) => ({
      ...prevState,
      pwd: "",
      pwd0: "",
      pwd1: "",
      pwd2: "",
      pwd3: "",
    }));
  }

  useEffect(() => {
    pwdRefs.forEach((ref, index) => {
      if (!disabledInputs[`pwd${index}`] && ref.current) {
        ref.current.focus();
      }
    });
  }, [disabledInputs]);

  const isPwdCompleteAndValid =
    inputs.pwd0 && inputs.pwd1 && inputs.pwd2 && inputs.pwd3;

  useEffect(() => {
    if (isPwdCompleteAndValid) {
      const newPwd = `${inputs.pwd0}${inputs.pwd1}${inputs.pwd2}${inputs.pwd3}`;
      setInputs((prevState) => ({ ...prevState, pwd: newPwd }));
    }
  }, [isPwdCompleteAndValid]);
  //#endregion

  const departementOptions = [
    "Secretariat",
    "Caissier",
    "Accueil",
    "Sécurité",
    "Adjoint",
    "Chargé de clientèle",
    "Stagiaire",
  ];

  return (
    <>
      <form>
        <span>
          {erreurs.messageErreur ? (
            <p className="text-danger d-block">{messages.messageErreur}</p>
          ) : null}
        </span>
        <div className="idAndName">
          <div className="labelInput">
            <ImageUploader onImageUpload={handleImageUpload} />
            <small className="text-danger d-block text-center">
              {erreurs.pic ? messages.pic : null}
            </small>
          </div>
          <div className="labelInput">
            <label>Immatricule :</label>
            <div className="inputRow">
              <input
                type="text"
                name="im"
                onChange={handleChange}
                autoComplete="off"
                placeholder="Créez votre Identifiant"
              />
            </div>
            <small className="text-danger d-block text-center">
              {erreurs.im ? messages.im : null}
            </small>
          </div>
        </div>

        <div className="idAndName">
          <div className="labelInput">
            <label>Nom :</label>
            <div className="inputRow">
              <input
                type="text"
                name="nom"
                onChange={handleChange}
                autoComplete="off"
                placeholder="Entrez votre Nom"
              />
            </div>
            <small className="text-danger d-block text-center">
              {erreurs.nom ? messages.nom : null}
            </small>
          </div>
          <div className="labelInput">
            <label>Prénom :</label>
            <div className="inputRow">
              <input
                type="text"
                name="prenom"
                onChange={handleChange}
                autoComplete="off"
                placeholder="Entrez votre Prénom"
              />
            </div>
            <small className="text-danger d-block text-center">
              {erreurs.prenom ? messages.prenom : null}
            </small>
          </div>
          <div className="labelInput">
            <label>Numéro :</label>
            <div className="inputRow">
              <input
                type="text"
                name="num"
                onChange={handleChange}
                autoComplete="off"
                placeholder="+261 ** *** ** **"
                inputMode="numeric"
              />
            </div>
            <small className="text-danger d-block text-center">
              {erreurs.num ? messages.num : null}
            </small>
          </div>
        </div>

        <div className="idAndName">
          <div className="labelInput">
            <label>Email :</label>
            <div className="inputRow">
              <input
                type="text"
                name="email"
                onChange={handleChange}
                autoComplete="off"
                placeholder="Entrez votre Email"
              />
            </div>
            <small className="text-danger d-block text-center">
              {erreurs.email ? messages.email : null}
            </small>
          </div>
          <div className="labelInput">
            <label>Departement :</label>
            <select
              name="departement"
              onChange={handleChange}
              value={inputs.departement}
              className="inputRow"
            >
              <option value="">Sélectionnez un département</option>
              {departementOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <small className="text-danger d-block text-center">
              {erreurs.departement ? messages.departement : null}
            </small>
          </div>
        </div>

        {isInfoCompleteAndValid && (
          <div className="labelInput">
            <label>Veuillez créer votre code e-BOA: </label>
            <div className="groupPwdPlace">
              <div className="groupPwd">
                {pwdRefs.map((ref, index) => (
                  <div className="inputPwd" key={index}>
                    <input
                      key={index}
                      type="password"
                      name={`pwd${index}`}
                      onChange={handleChangePwd}
                      autoComplete="off"
                      ref={ref}
                      maxLength={1}
                      value={inputs[`pwd${index}`]}
                      disabled={disabledInputs[`pwd${index}`]}
                      inputMode="numeric"
                    />
                  </div>
                ))}
              </div>
            </div>
            <small className="text-danger d-block text-center">
              {erreurs.pwd ? messages.pwd : null}
            </small>
          </div>
        )}

        <div>
          <div className="inputFP">
            <span>Besoin d'assistance ? </span>
          </div>
          <button onClick={showSave ? validation : preValidation} type="submit">
            <span>{showSave ? "Enregistrer" : "Continuer"}</span>
          </button>
        </div>
      </form>
    </>
  );
}
