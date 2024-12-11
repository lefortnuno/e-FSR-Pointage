import axios from "../../contexts/api/axios";
import GetUserData from "../../contexts/api/udata";
import { formatDate } from "../../contexts/dates/formatDate";

import Template from "../../components/template/template";
import Pagination from "../../components/pagination/pagination";
import LoadingTable from "../../components/loading/tables/loadingTable";
import ReponseModal from "../../components/modals/conge/reponse";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { BsHandIndex } from "react-icons/bs";

import "./conge.css";

const url_req = `conge/dm/`;
const histoPerPage = 5;

export default function CongeDM() {
  //#region //-variable
  const u_info = GetUserData();

  const [histo, setHisto] = useState([]);
  const [details, setDetails] = useState(null);
  const [totaly, setTotaly] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [dataToModif, setDataToModif] = useState(null);


  useEffect(() => {
    getHisto();
  }, []);
  //#endregion

  //#region //-histo
  function getHisto() {
    axios
      .get(url_req, u_info.opts)
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
  //#endregion

  //#region //-modals
  const handleEditClick = (data) => {
    setDataToModif(data);
    setShowModalEdit(true);
  };
  //#endregion

  //#region //-search
  const indexOfLastService = currentPage * histoPerPage;
  const indexOfFirstService = indexOfLastService - histoPerPage;
  const currentHisto = histo.slice(indexOfFirstService, indexOfLastService);

  //#endregion

  //#region //-html
  return (
    <Template >
      <main className="col-md-12 ms-sm-auto col-lg-12 px-md-4 mt-0 main">
        <div className="pt-3 pb-2 mb-3">
          {/* -------------------------- PAGE CONTENT -------------------------- */}
          <div className="text-center my-3 mt-0">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <h5 className="mb-0 me-2 position-relative d-inline-block">
                  Liste des demande de congé :
                  <span className="green-underline"></span>
                </h5>
              </div>
              <h5 className="mb-0 me-2 position-relative d-inline-block">
                Nombre :{" "}
                <span className="totaly">
                  {totaly !== null && totaly !== undefined ? totaly : "0"}
                </span>
              </h5>
            </div>
          </div>

          <div className="table-responsive text-nowrap bg-white">
            <table className="table table-striped w-100">
              <thead>
                <tr>
                  <th> </th>
                  <th>IM</th>
                  <th>Nom&Prénom</th>
                  <th>Date de Début </th>
                  <th>Date de Fin</th>
                  <th>Motif</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {!details ? (
                  <LoadingTable />
                ) : (
                  <>
                    {currentHisto.length > 0 ? (
                      currentHisto.map((s, key) => (
                        <tr key={key}>
                          <td>
                            <Link to={`/aboutUser/${s.im}`}>
                              <img
                                className={`icon icon-shape border-radius-2xl icon-custom cursor-pointer`}
                                src={
                                  process.env.REACT_APP_SUN_COMPLET_URL + s.pic
                                }
                                title={s.departement}
                              />
                            </Link>
                          </td>

                          <td>{s.im}</td>
                          <td>
                            {s.nom} {s.prenom}
                          </td>
                          <td>{formatDate(s.dateDeDebut)}</td>
                          <td>{formatDate(s.dateDeFin)}</td>
                          <td>
                            {s.motif ? s.motif : ""} ({s.nbJourC}j)
                          </td>
                          <td>
                            <div
                              className="callToAction"
                              onClick={() => handleEditClick(s)}
                            >
                              <BsHandIndex />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10">Aucune donnée disponible</td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

          {showModalEdit && (
            <ReponseModal
              userData={dataToModif}
              congeData={dataToModif}
              onClose={() => setShowModalEdit(false)}
              onSave={getHisto}
            />
          )}
          {/* -------------------------- FIN -------------------------- */}
        </div>
      </main>
    </Template>
  );
  //#endregion
}
