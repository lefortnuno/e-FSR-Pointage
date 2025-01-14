import axios from "../../contexts/api/axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const URL_DE_BASE = `utilisateur/seConnecter/`;
let isValidate = false;
const timerDelai = 1500;

export default function LoginForm() {
  //#region // VARIABLES
  const navigate = useNavigate();

  const mesInputs = {
    im: "",
    pwd: "",
    pwd0: "",
    pwd1: "",
    pwd2: "",
    pwd3: "",
  };

  const [inputs, setInputs] = useState(mesInputs);
  const [erreurs, setErreurs] = useState({
    im: false,
    pwd: false,
  });
  const [messages, setMessages] = useState({
    im: "",
    pwd: "",
  });

  const pwdRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const imRef = useRef(null);
  const timeoutRef = useRef(null);
  const [incorrect, setIncorrect] = useState(false);
  const [showMe, setShowMe] = useState(false);

  const [disabledInputs, setDisabledInputs] = useState({
    pwd0: true,
    pwd1: true,
    pwd2: true,
    pwd3: true,
  });
  //#endregion

  //#region // HANDLE
  const handleChange = (event) => {
    isValidate = true;
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setInputs((values) => ({ ...values, [name]: value }));
    setErreurs((values) => ({ ...values, messageErreur: false }));

    if (name === "im") {
      if (value.length === 0) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Identifiant obligatoire!",
        }));
      } else if (value.length < 4) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Identifiant trop court!",
        }));
      } else if (value.length > 8) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Identifiant trop long!",
        }));
      } else {
        isValidate = true;
        setErreurs((values) => ({ ...values, [name]: false }));
        setMessages((values) => ({ ...values, [name]: "" }));
      }
    }
  };
  //#endregion

  //#region // HANDLE PWD
  const handleChangePwd = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    // Vérification si l'entrée est uniquement numérique
    if (/^[0-9]$/.test(value)) {
      isValidate = true;
      setInputs((values) => ({ ...values, [name]: value }));
      setErreurs((values) => ({ ...values, messageErreur: false }));
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
      isValidate = false;

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

      setInputs((values) => ({ ...values, [name]: "" })); // Efface le contenu de l'input
      setErreurs((values) => ({ ...values, pwd: true }));
      setMessages((values) => ({
        ...values,
        pwd: "Mot de passe obligatoire (0 à 9)!",
      }));
    }
  };
  //#endregion

  //#region // VALIDATION
  const validation = (event) => {
    event.preventDefault();
    autoValidation();
  };

  const autoValidation = () => {
    let formIsValid = true;

    // Vérifie si l'identifiant est valide
    if (!inputs.im) {
      setErreurs((values) => ({ ...values, im: true }));
      setMessages((values) => ({
        ...values,
        im: "Identifiant obligatoire!",
      }));
      formIsValid = false;
    } else {
      setErreurs((values) => ({ ...values, im: false }));
      setMessages((values) => ({ ...values, im: "" }));
    }

    // Vérifie si le mot de passe est valide
    if (!inputs.pwd) {
      setErreurs((values) => ({ ...values, pwd: true }));
      setMessages((values) => ({
        ...values,
        pwd: "Code secret obligatoire!",
      }));
      formIsValid = false;
    } else {
      setErreurs((values) => ({ ...values, pwd: false }));
      setMessages((values) => ({ ...values, pwd: "" }));
    }

    if (formIsValid) {
      onSubmit();
    }
  };
  //#endregion

  //#region // SUBMIT
  const onSubmit = () => {
    axios
      .post(URL_DE_BASE, inputs)
      .then(function (response) {
        if (response.status === 200 && response.data.success) {
          toast.success(response.data.message);

          localStorage.setItem("token", response.data.data.token);
          const utilisateur = response.data.data.user;

          for (const u in utilisateur) {
            if (u !== "pwd") {
              let value = utilisateur[u];
              localStorage.setItem(u, value);
            }
          }

          if (utilisateur.roleU == true) {
            navigate("/home/");
          } else if (utilisateur.roleU == false) {
            navigate(`/aboutUser/${utilisateur.im}`);
          } else {
            toast.error("Échec de la connexion! Vous n'avez pas de rôle!");
          }
        } else {
          setErreurs((values) => ({ ...values, messageErreur: true }));
          setMessages((values) => ({
            ...values,
            messageErreur: response.data.message,
          }));
        }
      })
      .catch((error) => {
        setErreurs((values) => ({ ...values, messageErreur: true }));
        setMessages((values) => ({
          ...values,
          messageErreur: "Veuillez vous connecter au serveur!",
        }));
      });
  };
  //#endregion

  //#region // FERMETURE
  function onClose() {
    setInputs(mesInputs);
    setErreurs({
      im: false,
      pwd: false,
    });
    setMessages({
      im: "",
      pwd: "",
    });
    setDisabledInputs({
      pwd0: true,
      pwd1: true,
      pwd2: true,
      pwd3: true,
    });

    navigate("/newUser/");
  }
  //#endregion

  //#region // USE EFFECT
  useEffect(() => {
    if (incorrect) {
      setInputs((prevState) => ({
        ...prevState,
        im: "",
      }));
      setIncorrect(false);
      if (imRef.current) {
        imRef.current.focus(); // Force le focus après réinitialisation
      }
    }
  }, [incorrect]);

  useEffect(() => {
    pwdRefs.forEach((ref, index) => {
      if (!disabledInputs[`pwd${index}`] && ref.current) {
        ref.current.focus();
      }
    });
  }, [disabledInputs]);

  //Auto show password field when idS complet
  const isimCompleteAndValid = inputs.im && !erreurs.im;
  useEffect(() => {
    if (isimCompleteAndValid) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // Annule le timeout précédent
      }

      // Démarrer un nouveau timer
      timeoutRef.current = setTimeout(() => {
        setShowMe(true);
        setDisabledInputs((prevState) => ({ ...prevState, pwd0: false }));
      }, timerDelai);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setShowMe(false);
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
    } // Nettoyage lors du démontage du composant
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isimCompleteAndValid]);

  // Auto set up inputs.pwd
  const isPwdCompleteAndValid =
    inputs.pwd0 && inputs.pwd1 && inputs.pwd2 && inputs.pwd3;
  useEffect(() => {
    if (isPwdCompleteAndValid) {
      const newPwd = `${inputs.pwd0}${inputs.pwd1}${inputs.pwd2}${inputs.pwd3}`;
      setInputs((prevState) => ({ ...prevState, pwd: newPwd }));
    } else {
      setInputs((prevState) => ({ ...prevState, pwd: "" }));
    }
  }, [isPwdCompleteAndValid]);

  // Auto Login when password complete
  const isPwdCompleteAndValidInInputs = inputs.pwd;
  useEffect(() => {
    if (isPwdCompleteAndValidInInputs) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // Annule le timeout précédent
      }

      // Démarrer un nouveau timer
      timeoutRef.current = setTimeout(() => {
        autoValidation();
      }, timerDelai / 10);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // Annule le timeout précédent
      }
    }
  }, [isPwdCompleteAndValidInInputs]);
  //#endregion

  return (
    <>
      <form>
        <span>
          {erreurs.messageErreur ? (
            <p className="text-danger d-block">{messages.messageErreur}</p>
          ) : null}
        </span>
        <div className="labelInput">
          <label>Identifiant :</label>
          <div className="inputRow">
            <input
              type="text"
              name="im"
              onChange={handleChange}
              autoComplete="off"
              placeholder="Entrez votre identifiant"
              value={inputs.im} // Liaison de la valeur
              ref={imRef} // Référence à l'input
            />
          </div>
          <small className="text-danger d-block text-center">
            {erreurs.im ? messages.im : null}
          </small>
        </div>
        {isimCompleteAndValid && showMe && (
          <div className="labelInput">
            <label>Veuillez saisir votre code e-FSR: </label>
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
            <span>Mot de passe oublié? </span>
          </div>
          <button onClick={validation}>
            <span> Se Connecter</span>
          </button>
        </div>
      </form>
      <p>
        Vous n'avez pas encore de compte?{" "}
        <span onClick={onClose}>S'enregistrer</span>
      </p>
    </>
  );
}
