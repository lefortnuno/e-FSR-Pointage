import React, { useState, useEffect } from "react";
import { BsBellFill } from "react-icons/bs";

import EmployeeStatus from "../../../components/etatEmployee/conge";
import CongeModal from "../../../components/modals/conge/conge";
import ReponseCongeModal from "../../../components/modals/conge/reponse";

import "../details.user.css";
const jrCongeInitial = 40;
const pourcentage = 2.5;

export default function Card1({ details, onUserUpdate, congeData, u_info }) {
  const [showModal, setShowModal] = useState(false);
  const [showModalReponse, setShowModalReponse] = useState(false);

  const handleSave = () => {
    setShowModal(false);
    onUserUpdate();
  };

  return (
    <>
      <div className="col-lg-4 col-md-6 col-12 mb-4">
        <div className="card h-100">
          <div className="card-header pb-0 p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="mb-0">Administration</h6>
              {congeData && (
                <>
                  {u_info.u_roleU &&
                    congeData.reqConge &&
                    congeData.etatReqConge != true && (
                      <div
                        onClick={() => setShowModalReponse(true)}
                        className="cursor-pointer"
                      >
                        <BsBellFill
                          className="cursor-pointer text-danger"
                          size={15}
                        />
                      </div>
                    )}
                </>
              )}
            </div>
          </div>
          <div className="card-body p-0">
            <div className="col-lg-12 col-12 mt-4 mt-lg-0">
              <div className="card shadow h-100">
                <div className="card-header pb-0 p-0">
                  <h6 className="mb-0">Congé</h6>
                </div>
                <div className="card-body pb-0 ps-3 pt-0 pe-3">
                  <ul className="list-group">
                    {/* Total */}
                    <li className="list-group-item border-0 d-flex align-items-center px-0 mb-0">
                      <div className="w-100">
                        <div className="d-flex mb-2">
                          <span className="me-2 text-sm font-weight-bold text-dark">
                            Total
                          </span>
                          <span className="ms-auto text-sm font-weight-bold">
                            {jrCongeInitial}j
                          </span>
                        </div>
                        <div className="progress progress-md">
                          <div
                            className={`progress-bar bg-primary w-${
                              Math.round((jrCongeInitial * pourcentage) / 5) * 5
                            }`}
                            role="progressbar"
                            aria-valuenow="60"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </li>

                    {/* Consomable */}
                    <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                      <div className="w-100">
                        <div className="d-flex mb-2">
                          <span className="me-2 text-sm font-weight-bold text-dark">
                            Consomable
                          </span>
                          <span className="ms-auto text-sm font-weight-bold">
                            {details && details.nbJour}j
                          </span>
                        </div>
                        <div className="progress progress-md">
                          <div
                            className={`progress-bar bg-primary w-${
                              Math.round((details.nbJour * pourcentage) / 5) * 5
                            }`}
                            role="progressbar"
                            aria-valuenow="10"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </li>

                    {congeData ? (
                      <>
                        {congeData.reqConge ? (
                          <>
                            {congeData.etatReqConge != null ? (
                              <>
                                {congeData.etatReqConge
                                  ? renderAcceptedLeave(
                                      congeData.nbJourC,
                                      congeData.dateDeFin
                                    )
                                  : renderDeniedRequest()}
                              </>
                            ) : (
                              renderRequestDetails(
                                congeData.nbJourC,
                                congeData.kelisisa
                              )
                            )}
                          </>
                        ) : (
                          renderNoRequest()
                        )}
                      </>
                    ) : (
                      renderNoRequest()
                    )}
                  </ul>
                </div>

                <div className="card-footer mt-2 pt-0 p-3 d-flex align-items-center">
                  <div className="w-60">
                    <EmployeeStatus onLeave={details && details.enConge} />
                  </div>

                  {congeData ? (
                    congeData.reqConge ? (
                      congeData.etatReqConge != null ? (
                        congeData.etatReqConge ? (
                          // Congé validé par l'admin
                          <div className="w-80 text-end">
                            <div className="btn btn-danger mb-0 text-center">
                              En période de vacance
                            </div>
                          </div>
                        ) : (
                          // Congé refusé par l'admin
                          <div
                            className="w-80 text-end"
                            onClick={() => setShowModal(true)}
                          >
                            {!u_info.u_roleU && (
                              <div className="btn btn-dark mb-0 text-center">
                                Réitérer la demande de absence
                              </div>
                            )}
                          </div>
                        )
                      ) : (
                        // En attente de validation par l'admin
                        <div className="w-80 text-end">
                          <div className="btn btn-dark mb-0 text-center">
                            En attente de validation
                          </div>
                        </div>
                      )
                    ) : (
                      // L'utilisateur n'a pas encore fait de demande de congé
                      <div
                        className="w-80 text-end"
                        onClick={() => setShowModal(true)}
                      >
                        {!u_info.u_roleU && (
                          <div className="btn btn-primary mb-0 text-center">
                            Demander une absence
                          </div>
                        )}
                      </div>
                    )
                  ) : (
                    // Aucun congeData (cas inattendu, optionnel)
                    <div
                      className="w-80 text-end"
                      onClick={() => setShowModal(true)}
                    >
                      {!u_info.u_roleU && (
                        <div className="btn btn-primary mb-0 text-center">
                          Demander une absence
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModalReponse && (
        <ReponseCongeModal
          userData={details}
          congeData={congeData}
          onClose={() => setShowModalReponse(false)}
          onSave={handleSave}
        />
      )}
      {showModal && (
        <CongeModal
          userData={details}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
      {/* -------------------------- FIN -------------------------- */}
    </>
  );
}

function renderRequestDetails(nbJourC, kelisisa) {
  return (
    <>
      <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
        <div className="w-100">
          <div className="d-flex mb-2">
            <span className="me-2 text-sm font-weight-bold text-dark">
              Demander
            </span>
            <span className="ms-auto text-sm font-weight-bold">{nbJourC}j</span>
          </div>
          <div className="progress progress-md">
            <div
              className={`progress-bar bg-primary w-${
                Math.round((nbJourC * pourcentage) / 5) * 5
              }`}
            ></div>
          </div>
        </div>
      </li>
      <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
        <div className="w-100">
          <div className="d-flex mb-2">
            <span className="me-2 text-sm font-weight-bold text-dark">
              Début d'ici
            </span>
            <span className="ms-auto text-sm font-weight-bold">
              {kelisisa}j
            </span>
          </div>
          <div className="progress progress-md">
            <div
              className={`progress-bar bg-primary w-${
                Math.round((kelisisa * pourcentage) / 5) * 5
              }`}
            ></div>
          </div>
        </div>
      </li>
    </>
  );
}

function renderPendingRequest(nbJourC, kelisisa) {
  return <></>;
}

function renderAcceptedLeave(nbJourC, dateDeFin) {
  return (
    <>
      <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
        <div className="w-100">
          <div className="d-flex mb-2">
            <span className="me-2 text-sm font-weight-bold text-dark">
              En vacance de
            </span>
            <span className="ms-auto text-sm font-weight-bold">{nbJourC}j</span>
          </div>
          <div>
            <div className="progress progress-md">
              <div
                className={`progress-bar bg-primary w-${
                  Math.round((nbJourC * pourcentage) / 5) * 5
                }`}
                role="progressbar"
                aria-valuenow="5"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      </li>
      <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
        <div className="w-100">
          <div className="d-flex mb-2">
            <span className="me-2 text-sm font-weight-bold text-dark">
              Fini d'ici
            </span>
            <span className="ms-auto text-sm font-weight-bold">
              {Math.ceil(
                (new Date(dateDeFin).getTime() - new Date().getTime()) /
                  (1000 * 60 * 60 * 24)
              )}
              j
            </span>
          </div>
          <div>
            <div className="progress progress-md">
              <div
                className={`progress-bar bg-primary w-${
                  Math.round(
                    Math.min(
                      Math.ceil(
                        ((new Date(dateDeFin).getTime() -
                          new Date().getTime()) /
                          (1000 * 60 * 60 * 24)) *
                          pourcentage
                      ),
                      100 // Pour s'assurer que la largeur ne dépasse pas 100
                    ) / 5
                  ) * 5
                }`}
                role="progressbar"
                aria-valuenow="5"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

function renderDeniedRequest() {
  return (
    <>
      <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
        <div className="w-100">
          <div className="d-flex mb-2">
            <span className="me-2 text-sm font-weight-bold text-dark">
              Demande d' absence refusé
            </span>
            <span className="ms-auto text-sm font-weight-bold"> </span>
          </div>
          <div className="progress progress-md">
            <div className="progress-bar bg-primary w-0"></div>
          </div>
        </div>
      </li>
      <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
        <div className="w-100">
          <div className="d-flex mb-2">
            <span className="me-2 text-sm font-weight-bold text-dark">
              Réitérez la demande d' absence
            </span>
            <span className="ms-auto text-sm font-weight-bold"> </span>
          </div>
          <div className="progress progress-md">
            <div className="progress-bar bg-primary w-0"></div>
          </div>
        </div>
      </li>
    </>
  );
}

function renderNoRequest() {
  return (
    <>
      <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
        <div className="w-100">
          <div className="d-flex mb-2">
            <span className="me-2 text-sm font-weight-bold text-dark">
              Aucune demande d' absence
            </span>
            <span className="ms-auto text-sm font-weight-bold"> </span>
          </div>
          <div className="progress progress-md">
            <div className="progress-bar bg-primary w-0"></div>
          </div>
        </div>
      </li>
      <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
        <div className="w-100">
          <div className="d-flex mb-2">
            <span className="me-2 text-sm font-weight-bold text-dark">
              Envoyez une demande d' absence
            </span>
            <span className="ms-auto text-sm font-weight-bold"> </span>
          </div>
          <div className="progress progress-md">
            <div className="progress-bar bg-primary w-0"></div>
          </div>
        </div>
      </li>
    </>
  );
}
