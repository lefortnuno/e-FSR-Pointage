import React from "react";
import "./loadUser.css";
import ImgLoad from "../../../assets/images/newU.png";

export default function LoadUser() {
  return (
    <div className="col-lg-3 col-md-6 col-12 mb-4">
      <div className="card">
        <div className="loading"></div> {/* Loading overlay */}
        <span className="cardUser mask opacity-10 border-radius-lg"></span>
        <div className="card-body p-3 position-relative">
          <div className="row">
            <div className="col-6 text-start">
              <div>
                <img
                  className="icon icon-shape bg-white shadow border-radius-2xl cursor-pointer icon-custom red"
                  src={ImgLoad}
                  title={"..."}
                />
              </div>
              <h5 className="text-white font-weight-bolder mb-0 mt-3">IM</h5>
              <span className="text-white text-sm">Nom</span>
            </div>
            <div className="col-6">
              <div className="dropstart text-end mb-6">
                <a
                  className="cursor-pointer"
                  id="dropdownUsers2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa fa-ellipsis-h text-white"></i>
                </a>
                <ul
                  className="dropdown-menu px-2 py-3"
                  aria-labelledby="dropdownUsers2"
                >
                  <li>
                    <a className="dropdown-item border-radius-md d-flex justify-content-between align-items-center">
                      <span> </span>
                    </a>
                  </li>
                </ul>
              </div>
              <p className="text-white text-sm text-end font-weight-bolder mt-auto mb-0">
                Departement
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
