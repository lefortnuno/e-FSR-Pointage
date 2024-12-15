import axios from "../../../contexts/api/axios";
import GetUserData from "../../../contexts/api/udata";

import Template from "../../../components/template/template";
import Pagination from "../../../components/pagination/pagination";
import LoadingTable from "../../../components/loading/tables/loadingTable";
import WeekRange from "../../../contexts/dates/weeksList";

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BsSearch,
  BsArrowLeftRight,
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
  BsCheckCircleFill,
  BsXCircleFill,
} from "react-icons/bs";

import html2pdf from "html2pdf.js";
import "../pointage.css";
import "./weeks.css";

const url_req = `pointage/`;
const histoPerPage = 5;

const getDaysMapForCurrentWeek = (today) => {
  const days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  // Trouver le lundi de la semaine actuelle
  const firstDayOfWeek = new Date(today);
  const dayOfWeek = firstDayOfWeek.getDay();
  const offset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Dimanche recule de 6, autres jours ajustent
  firstDayOfWeek.setDate(firstDayOfWeek.getDate() + offset);

  // Générer les dates de lundi à vendredi
  const daysMap = {};
  for (let i = 0; i < 5; i++) {
    const currentDay = new Date(firstDayOfWeek);
    currentDay.setDate(firstDayOfWeek.getDate() + i);

    const formattedDate = currentDay.toISOString().split("T")[0]; // Format YYYY-MM-DD
    daysMap[formattedDate] = days[currentDay.getDay()]; // Associe la date au nom du jour
  }

  return daysMap;
};

const groupDataByUser = (data, dateIwant) => {
  const daysMap = getDaysMapForCurrentWeek(dateIwant);
  const grouped = {};

  // Initialiser les jours pour chaque utilisateur
  const defaultDays = Object.values(daysMap).reduce((acc, day) => {
    acc[day] = null; // Par défaut, aucun statut
    return acc;
  }, {});

  data.forEach((entry) => {
    const im = entry.im;
    if (!im) return;

    if (!grouped[im]) {
      grouped[im] = {
        name: `${entry.nom} ${entry.prenom}`.trim(),
        pic: entry.pic,
        departement: entry.departement,
        im: entry.im,
        days: { ...defaultDays }, // Copie des jours par défaut
      };
    }

    // Normalisation de la date + 1 jour
    const normalizedDate = (() => {
      const adjustedDate = new Date(entry.date);
      adjustedDate.setDate(adjustedDate.getDate() + 0); //ovana 1 ref en local
      return adjustedDate.toISOString().split("T")[0];
    })();

    const day = daysMap[normalizedDate];

    if (day) {
      grouped[im].days[day] = {
        statut: entry.statut,
        heure_entree: entry.heure_entree,
        heure_sortie: entry.heure_sortie,
      };
    }
  });

  return Object.values(grouped);
};

export default function Weeks() {
  const navigate = useNavigate();
  const u_info = GetUserData();

  const [histo, setHisto] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateIwant, setDateIwant] = useState(new Date());
  const usersPerPage = histoPerPage;

  const [taux, setTaux] = useState([]);

  const searchInputRef = useRef(null);
  const ficheRef = useRef();

  useEffect(() => {
    getHisto();
    getTaux();
  }, [dateIwant]);

  //#endregion

  //#region //-histo
  const getTaux = () => {
    const data = { dateIwant: dateIwant };

    axios
      .post(url_req + "taux/", data, u_info.opts)
      .then((response) => {
        if (
          response.status === 200 &&
          response.data.success &&
          response.data.data.length > 0
        ) {
          setTaux(response.data.data[0]);
        } else {
          setTaux([]);
        }
      })
      .catch((error) => {
        setTaux([]);
      });
  };

  const getHisto = async () => {
    const data = { dateIwant: dateIwant };

    try {
      const response = await axios.post(url_req + "ptgAll/", data, u_info.opts);

      if (
        response.status === 200 &&
        response.data.success &&
        response.data.data.length > 0
      ) {
        const pureData = response.data.data;

        const allHisto = groupDataByUser(pureData, dateIwant);
        setHisto(allHisto);
      } else {
        setHisto([]);
      }
    } catch (error) {
      setHisto([]);
    }
  };

  //#endregion

  //#region //-handle
  const handleDateChange = (newDate) => {
    setDateIwant(newDate);
  };

  const handlePreviousDay = () => {
    const previousDate = new Date(dateIwant);
    previousDate.setDate(dateIwant.getDate() - 7);
    handleDateChange(previousDate);
  };

  const handleNextDay = () => {
    const nextDate = new Date(dateIwant);
    nextDate.setDate(dateIwant.getDate() + 7);
    handleDateChange(nextDate);
  };

  const handleViewClick = (data) => {
    navigate(`/aboutUser/${data.im}`, {
      state: { data, scrollToFicheSolo: true },
    });
  };
  //#endregion

  //#region //-Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = histo.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(histo.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  //#endregion

  //#region //-search
  const customInput = (
    <div className="input-group">
      <span className="input-group-text text-body">
        <BsSearch aria-hidden="true" />
      </span>
      <input
        type="text"
        name="searchValue"
        placeholder="Rechercher ...."
        autoComplete="off"
        className="form-control text-dark"
        ref={searchInputRef}
        onChange={rechercheElement}
      />
    </div>
  );

  function rechercheElement(event) {
    const valeur = event.target.value;
    setCurrentPage(1);

    if (!valeur) {
      getHisto();
    } else {
      const finalInputs = {
        valeur: valeur,
        dateIwant: dateIwant,
      };

      axios
        .post(url_req + `rechercheParWeek/`, finalInputs, u_info.opts)
        .then((response) => {
          if (
            response.status === 200 &&
            response.data.success &&
            response.data.data.length > 0
          ) {
            const allHisto = groupDataByUser(response.data.data, dateIwant);
            setHisto(allHisto);
          } else {
            setHisto([]);
          }
        })
        .catch((error) => {
          setHisto([]);
        });
    }
  }
  //#endregion

  // Fonction pour générer le PDF
  const generatePDF = () => {
    const element = ficheRef.current;
    const options = {
      margin: 0.5,
      filename: "fiche_de_presence.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <Template customInput={customInput}>
      <main className="col-md-12 ms-sm-auto col-lg-12 mt-2 main" ref={ficheRef}>
        <div className="pt-3 pb-2 mb-3">
          {/* -------------------------- PAGE CONTENT -------------------------- */}
          <div className="text-center my-3 mt-0">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <h5 className="mb-0 me-2 position-relative d-inline-block">
                  <Link to={"/pointages/"}>
                    <BsArrowLeftRight className="me-2 cursor-pointer" />
                    Fiche de présence
                  </Link>
                </h5>
              </div>
              <h5
                className="mb-0 me-2 position-relative d-inline-block cursor-pointer"
                title="Taux Global de Présence"
              >
                TGP:{" "}
                <span className="totaly">
                  {taux ? taux.taux_presence_global : "0"}%
                </span>
              </h5>
            </div>
          </div>

          <div className="date-container-wrapper mb-2">
            <span className="me-2 cursor-pointer" onClick={handlePreviousDay}>
              <BsArrowLeftCircleFill />
            </span>
            <span className="date-container">
              <WeekRange startOfWeek={dateIwant} />
            </span>
            <span className="ms-2 cursor-pointer" onClick={handleNextDay}>
              <BsArrowRightCircleFill />
            </span>
          </div>

          <div className="table-responsive text-nowrap bg-white mb-2">
            <table className="table table-bordered w-100">
              <thead>
                <tr>
                  <th> </th>
                  <th>Nom & Prénom</th>
                  <th>Lundi</th>
                  <th>Mardi</th>
                  <th>Mercredi</th>
                  <th>Jeudi</th>
                  <th>Vendredi</th>
                </tr>
              </thead>
              <tbody className="text-start">
                {!histo ? (
                  <LoadingTable />
                ) : (
                  <>
                    {currentUsers.length > 0 ? (
                      <>
                        {currentUsers.map((user, index) => (
                          <tr key={index}>
                            <td>
                              <img
                                className="icon icon-shape border-radius-2xl icon-custom cursor-pointer"
                                src={`${process.env.REACT_APP_SUN_COMPLET_URL}${user.pic}`}
                                alt="."
                                title={user.departement}
                                onClick={() => handleViewClick(user)}
                              />
                            </td>
                            <td>{user.name}</td>
                            {[
                              "Lundi",
                              "Mardi",
                              "Mercredi",
                              "Jeudi",
                              "Vendredi",
                            ].map((day, i) => (
                              <td key={i}>
                                {user.days[day] ? (
                                  <div
                                    className={`pointageStatu ${
                                      user.days[day].statut === "Présent"
                                        ? "tonga"
                                        : "tsyTonga"
                                    }`}
                                  >
                                    {user.days[day].statut === "Présent" ? (
                                      <BsCheckCircleFill />
                                    ) : (
                                      <BsXCircleFill />
                                    )}
                                  </div>
                                ) : (
                                  <div className="pointageStatu tsyTonga">
                                    {/* Fikafika anakonana an'Lundi tsy hita rehefa ONLINE "-" */}
                                    <BsXCircleFill />
                                  </div>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td className="text-center"> </td>
                        <td className="text-center">-</td>
                        <td className="text-center">Aucune</td>
                        <td className="text-center">donnée</td>
                        <td className="text-center">disponible</td>
                        <td className="text-center">-</td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>
    </Template>
  );
}
