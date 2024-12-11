import axios from "../../contexts/api/axios";
import GetUserData from "../../contexts/api/udata";

import Template from "../../components/template/template";
import Pagination from "../../components/pagination/pagination";
import LoadUser from "../../components/loading/users/loadUser";
import NoUser from "../../components/loading/noUser";
import EditModal from "../../components/modals/edit/edit";
import DeleteModal from "../../components/modals/delete/delete";

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  BsFillTrashFill,
  BsPencilSquare,
  BsEye,
  BsSearch,
  BsThreeDots,
  BsPersonPlusFill,
} from "react-icons/bs";

// import "../users/user.css";

const url_req = `utilisateur/employee/`;
const histoPerPage = 8;

export default function Employee() {
  //#region //-variable
  const navigate = useNavigate();
  const u_info = GetUserData();

  const [histo, setHisto] = useState([]);
  const [details, setDetails] = useState(null);
  const [totaly, setTotaly] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [dataToModif, setDataToModif] = useState(null);

  const searchInputRef = useRef(null);

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
          setTotalPages(Math.ceil(allHisto.length / histoPerPage)); // Calculer le nombre total de pages
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
  const handleDeleteClick = (histo) => {
    setSelectedEntity(histo);
    setShowDeleteModal(true);
  };
  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    getHisto();
  };

  const handleDetailClick = (entity) => {
    navigate(`/aboutUser/${entity.im}`, { state: { entity } });
  };

  const handleEditClick = (data) => {
    setDataToModif(data);
    setShowModalEdit(true);
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
      };

      axios
        .post(url_req + `recherche/`, finalInputs, u_info.opts)
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
    <>
      {u_info.u_roleU && (
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
      )}
    </>
  );
  //#endregion

  //#region //-html
  return (
    <Template customInput={customInput}>
      {u_info.u_roleU && (
        <Link
          to={"/newUser/"}
          className="fixed-plugin"
          title="Nouvel utilisateur"
        >
          <div className="fixed-plugin-button text-white bg-dark position-fixed px-3 py-2">
            <BsPersonPlusFill />
          </div>
        </Link>
      )}

      <main className="col-md-12 ms-sm-auto col-lg-12 px-md-4 mt-0 main">
        <div className="pt-3 pb-2 mb-3">
          {/* -------------------------- PAGE CONTENT -------------------------- */}
          <div className="text-center my-3 mt-0">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <h5 className="mb-0 me-2 position-relative d-inline-block">
                  Liste des Employées :<span className="green-underline"></span>
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

          <div className="row">
            {!details ? (
              <LoadUser />
            ) : (
              <>
                {currentHisto.length > 0 ? (
                  currentHisto.map((s, key) => (
                    <div key={key} className="col-lg-3 col-md-6 col-12 mb-4">
                      <div className="card">
                        <span className="cardUser mask opacity-10 border-radius-lg"></span>
                        <div className="card-body p-3 position-relative">
                          <div className="row">
                            <div className="col-6 text-start">
                              <div>
                                <Link
                                  to={
                                    u_info.u_roleU
                                      ? `/aboutUser/${s.im}`
                                      : "/employees/"
                                  }
                                >
                                  <img
                                    className={`icon icon-shape bg-white shadow border-radius-2xl cursor-pointer icon-custom ${
                                      s.enConge ? "red" : "green"
                                    }`}
                                    src={
                                      process.env.REACT_APP_SUN_COMPLET_URL +
                                      s.pic
                                    }
                                    title={
                                      s.enConge ? "En congé" : "En service"
                                    }
                                  />
                                </Link>
                              </div>
                              <h5 className="text-white font-weight-bolder mb-0 mt-3">
                                {s.im}
                              </h5>
                              <span className="text-white text-sm">
                                {s.nom}
                              </span>
                            </div>
                            <div className="col-6">
                              <div className="dropstart text-end mb-6">
                                {u_info.u_roleU ? (
                                  <>
                                    <a
                                      className="cursor-pointer"
                                      id="dropdownUsers2"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <BsThreeDots className="text-white" />
                                    </a>
                                    <ul
                                      className="dropdown-menu px-1 py-1"
                                      aria-labelledby="dropdownUsers2"
                                    >
                                      <li className="cursor-pointer">
                                        <div
                                          className="dropdown-item border-radius-md d-flex justify-content-between align-items-center"
                                          style={{ color: "green" }}
                                          onClick={() => handleDetailClick(s)}
                                        >
                                          <span>Voir</span>
                                          <BsEye className="ms-2" />
                                        </div>
                                      </li>
                                      <li className="cursor-pointer">
                                        <div
                                          className="dropdown-item border-radius-md d-flex justify-content-between align-items-center"
                                          style={{ color: "blue" }}
                                          onClick={() => handleEditClick(s)}
                                        >
                                          <span>Modifier</span>
                                          <BsPencilSquare className="ms-2" />
                                        </div>
                                      </li>
                                      <li className="cursor-pointer">
                                        <div
                                          className="dropdown-item border-radius-md d-flex justify-content-between align-items-center"
                                          onClick={() => handleDeleteClick(s)}
                                          style={{ color: "red" }}
                                        >
                                          <span>Supprimer</span>
                                          <BsFillTrashFill className="ms-2" />
                                        </div>
                                      </li>
                                    </ul>
                                  </>
                                ) : (
                                  <>
                                    <BsThreeDots className="text-white" />
                                  </>
                                )}
                              </div>
                              <p className="text-white text-sm text-end font-weight-bolder mt-auto mb-0">
                                {s.departement}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <NoUser />
                )}
              </>
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

          {showDeleteModal && selectedEntity && (
            <DeleteModal
              show={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
              onDeleteConfirm={handleDeleteConfirm}
              lnom={selectedEntity.nom}
              id={selectedEntity.im}
            />
          )}

          {showModalEdit && (
            <EditModal
              userData={dataToModif}
              id={dataToModif.im}
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
