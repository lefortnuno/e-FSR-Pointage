import React, { useState, useEffect } from "react";

import "../details.user.css";

export default function Card3({ details, congeData, fahatongavana }) {
  const [data, setData] = useState({
    validCompte: false,
    enConge: false,
    roleU: false,
    reqConge: false,
  });

  useEffect(() => {
    setData({
      validCompte: details?.validCompte || false,
      enConge: details?.enConge || false,
      roleU: details?.roleU || false,
      reqConge: congeData?.reqConge || false,
    });
  }, [details, congeData]);

  return (
    <div className="col-lg-4 col-md-6 col-12 mb-4">
      <div className="card h-100 ">
        <div className="card-header pb-0 p-3">
          <h6 className="mb-0 text-start">Réglages</h6>
        </div>
        <div className="card-body p-3">
          <h6 className="text-uppercase text-body text-xs font-weight-bolder">
            Etudiant
          </h6>
          <ul className="list-group text-start">
            <li className="list-group-item border-0 px-0 d-flex align-items-center">
              <div className="form-check form-switch ps-0 flex-grow-1">
                <input
                  className="form-check-input ms-auto"
                  type="checkbox"
                  checked={fahatongavana}
                  readOnly
                />
                <label className="form-check-label text-body ms-2 text-truncate w-80 mb-0">
                  <b className="text-dark ms-4 me-4">Pointage: </b>
                   {fahatongavana ? "Présent" : "Absent"}
                  {/* <u>"{fahatongavana ? "Présent" : "Absent"}" </u> */}
                </label>
              </div>
            </li>

            <li className="list-group-item border-0 px-0 d-flex align-items-center">
              <div className="form-check form-switch ps-0 flex-grow-1">
                <input
                  className="form-check-input ms-auto"
                  type="checkbox"
                  checked={data.reqConge}
                  readOnly
                />
                <label className="form-check-label text-body ms-2 text-truncate w-80 mb-0">
                  <b className="text-dark ms-4 me-4">Demande d'absence: </b>
                  {data.reqConge ? "Oui" : "Non"}
                </label>
              </div>
            </li>

            <li className="list-group-item border-0 px-0 d-flex align-items-center">
              <div className="form-check form-switch ps-0 flex-grow-1">
                <input
                  className="form-check-input ms-auto"
                  type="checkbox"
                  checked={data.enConge ? false : true}
                  readOnly
                />
                <label className="form-check-label text-body ms-2 text-truncate w-80 mb-0">
                  <b className="text-dark ms-4 me-4">Disponibilité: </b>
                  {data.enConge ? " Non! En congé" : "Oui! Disponible"}
                </label>
              </div>
            </li>
          </ul>
          <h6 className="text-uppercase text-body text-xs font-weight-bolder mt-4">
            Application
          </h6>
          <ul className="list-group text-start">
            <li className="list-group-item border-0 px-0 d-flex align-items-center">
              <div className="form-check form-switch ps-0 flex-grow-1">
                <input
                  className="form-check-input ms-auto"
                  type="checkbox"
                  checked={data.validCompte}
                  readOnly
                />
                <label className="form-check-label text-body ms-2 text-truncate w-80 mb-0">
                  <b className="text-dark ms-4 me-4">Statut: </b>
                  {data.validCompte ? "Activé" : "Non activé"}
                </label>
              </div>
            </li>

            <li className="list-group-item border-0 px-0 d-flex align-items-center">
              <div className="form-check form-switch ps-0 flex-grow-1">
                <input
                  className="form-check-input ms-auto"
                  type="checkbox"
                  checked={data.roleU}
                  readOnly
                />
                <label className="form-check-label text-body ms-2 text-truncate w-80 mb-0">
                  <b className="text-dark ms-4 me-4">Rôle: </b>
                  {data.roleU ? "Professeur" : "Etudiqnt"}
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
