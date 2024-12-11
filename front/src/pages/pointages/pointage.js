import axios from "../../contexts/api/axios";
import GetUserData from "../../contexts/api/udata";

import Template from "../../components/template/template";
import Pagination from "../../components/pagination/pagination";
import LoadingTable from "../../components/loading/tables/loadingTable";

import { formatDate, formatHoursMin } from "../../contexts/dates/formatDate";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PointageSortie from "../../components/modals/pointages/sortie";
import {
  BsSearch,
  BsArrowLeftRight,
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
  BsQrCode,
  BsFilterRight,
} from "react-icons/bs";

import html2pdf from "html2pdf.js";
import "./pointage.css";

const url_req = `pointage/`;
const histoPerPage = 5;

export default function Pointage() {
  //#region //-variable
  const u_info = GetUserData();
  const navigate = useNavigate();

  const [histo, setHisto] = useState([]);
  const [details, setDetails] = useState(null);
  const [totaly, setTotaly] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nbEmploye, setNbEmploye] = useState({});
  const [dateIwant, setDateIwant] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());

  const searchInputRef = useRef(null);
  const ficheRef = useRef();

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [dataToModif, setDataToModif] = useState(null);

  const handleEditClick = (data) => {
    setDataToModif(data);
    setShowModalEdit(true);
  };

  const handlePreviousDay = () => {
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(previousDate);
    handleDateChange(previousDate);
  };

  const handleNextDay = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDate);
    handleDateChange(nextDate);
  };

  const handleViewClick = (data) => {
    navigate(`/aboutUser/${data.im}`, {
      state: { data, scrollToFicheSolo: true },
    });
  };

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

  useEffect(() => {
    getHisto();
    getNbEmploye();
  }, [dateIwant]);

  const handleDateChange = (newDate) => {
    setDateIwant(newDate);
  };
  //#endregion

  //#region //-histo et pointages
  function getHisto() {
    const data = { dateIwant };

    axios
      .post(url_req + "byDay/", data, u_info.opts)
      .then(function (response) {
        if (
          response.status === 200 &&
          response.data.success &&
          response.data.data.length > 0
        ) {
          const allHisto = response.data.data;
          setHisto(allHisto);
          setTotaly(allHisto.length);
          setDetails(allHisto.length);
          setTotalPages(Math.ceil(allHisto.length / histoPerPage));
        } else {
          setHisto([]);
          setTotaly(0);
          setDetails([]);
          setTotalPages(1);
        }
      })
      .catch((error) => {
        setHisto([]); // Gérer l'erreur en réinitialisant les histo à un tableau vide
        setTotaly(0);
      });
  }

  const getNbEmploye = () => {
    axios
      .get(`employee/nombre/employe/`, u_info.opts)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.data[0];
          setNbEmploye(data);
        }
      })
      .catch((error) => {});
  };
  //#endregion

  //#region //-search
  const indexOfLastService = currentPage * histoPerPage;
  const indexOfFirstService = indexOfLastService - histoPerPage;
  const currentHisto = histo.slice(indexOfFirstService, indexOfLastService);

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
        .post(url_req + `rechercheParJour/`, finalInputs, u_info.opts)
        .then((response) => {
          if (
            response.status === 200 &&
            response.data.success &&
            response.data.data.length > 0
          ) {
            const allHisto = response.data.data;
            setHisto(allHisto);
            setTotaly(allHisto.length);
            setDetails(allHisto.length);
            setTotalPages(Math.ceil(allHisto.length / histoPerPage));
          } else {
            setHisto([]);
            setTotaly(0);
            setDetails([]);
            setTotalPages(1);
          }
        })
        .catch((error) => {
          setHisto([]);
          setTotaly(0);
        });
    }
  }

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
        className="form-control text-dark ps-1"
        ref={searchInputRef}
        onChange={rechercheElement}
      />
    </div>
  );
  //#endregion

  //#region //-html
  return (
    <Template customInput={customInput}>
      <main
        className="col-md-12 ms-sm-auto col-lg-12  main mt-2"
        ref={ficheRef}
      >
        <div className="pt-3 pb-2 mb-3">
          {/* -------------------------- PAGE CONTENT -------------------------- */}
          <div className="text-center my-3 mt-0">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <h5 className="mb-0 me-2 position-relative d-inline-block">
                  <Link to={"/pointagesWeeks/"}>
                    <BsArrowLeftRight className="me-2 cursor-pointer" />
                    Fiche de présence
                  </Link>
                </h5>
              </div>
              <h5
                className="mb-0 me-2 position-relative d-inline-block cursor-pointer"
                onClick={() => navigate("/absences/")}
              >
                Nombre :{" "}
                <span className="totaly me-1">
                  {totaly !== null && totaly !== undefined ? totaly : "0"}/
                  {nbEmploye ? nbEmploye.isaEmploye : "0"}
                </span>
                <BsFilterRight />
              </h5>
            </div>
          </div>

          <div className="date-container-wrapper mb-2">
            <span className="me-2 cursor-pointer" onClick={handlePreviousDay}>
              <BsArrowLeftCircleFill />
            </span>
            <span className="date-container">
              {currentDate
                .toLocaleDateString("fr-FR", { weekday: "long" })
                .charAt(0)
                .toUpperCase() +
                currentDate
                  .toLocaleDateString("fr-FR", { weekday: "long" })
                  .slice(1)}{" "}
              {formatDate(currentDate)}
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
                  <th>Nom&Prénom</th>
                  <th>Arrivée</th>
                  <th>Départ</th>
                  <th>Commentaire</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="text-start">
                {!details ? (
                  <LoadingTable />
                ) : (
                  <>
                    {currentHisto.length > 0 ? (
                      currentHisto.map((s, key) => (
                        <tr key={key}>
                          <td>
                            <img
                              className={`icon icon-shape border-radius-2xl icon-custom cursor-pointer`}
                              src={
                                process.env.REACT_APP_SUN_COMPLET_URL + s.pic
                              }
                              title={s.departement}
                              onClick={() => handleViewClick(s)}
                            />
                          </td>

                          <td>
                            {s.nom} {s.prenom}
                          </td>
                          <td>{formatHoursMin(s.heureEntree)}</td>
                          <td>{formatHoursMin(s.heureSortie)}</td>
                          <td>{s.coms ? s.coms : "-"}</td>
                          <td>
                            {s.heureSortie === null ? (
                              <div
                                className="callToAction"
                                onClick={() => handleEditClick(s)}
                              >
                                <BsQrCode />
                              </div>
                            ) : null}
                          </td>
                        </tr>
                      ))
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
              onPageChange={setCurrentPage}
            />
          </div>

          {showModalEdit && (
            <PointageSortie
              userData={dataToModif}
              u_info={u_info}
              onClose={() => setShowModalEdit(false)}
              onSave={getHisto}
            />
          )}
          {/* -------------------------- FIN -------------------------- */}
        </div>
      </main>
      {histo.length > 0 && (
        <div className="button-pdf">
          <button className="btn btn-primary" onClick={generatePDF}>
            Télécharger PDF
          </button>
        </div>
      )}
    </Template>
  );
  //#endregion
}
