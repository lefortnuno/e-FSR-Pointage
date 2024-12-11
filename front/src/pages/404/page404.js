import React from "react";
import { useNavigate } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";

import Template from "../../components/template/template";
import page404 from "../../assets/images/dev.png";
import Loading from "../../components/loading/others/loading";

import "./pageNotFound.css";

export default function PageNotFound() {
  const navigate = useNavigate();
  const redirectedToHome = () => {
    navigate("/home/");
  };

  return (
    <Template>
      <div className="container-fluid flex-grow-1 mb-4">
        <main className="col-md-12 ms-sm-auto col-lg-12 px-md-4 mt-5">
          <div className="bg-white card mb-3 ">
            <header className="bg-secondary py-2 d-flex align-items-center">
              <BsInfoCircle className="ms-4 fs-5 text-white" />
              <h4 className="me-4 m-0 flex-grow-1 text-center  text-white">
                Note
              </h4>
            </header>

            <div className="mt-2">
              <div className="row">
                <div className="col-md-4">
                  <div className="u-img">
                    <img src={page404} alt="pdp" />
                  </div>
                </div>
                <div className="col-md-8 text-primary mt-6">
                  <Loading
                    text={"En cours de développement ..."}
                  />
                </div>
              </div>
              <button
                onClick={redirectedToHome}
                className="btn btn-primary w-30 m-2 text-white text-bold mb-4"
              >
               Allez à l'accueil
              </button>
            </div>
          </div>
        </main>
      </div>
    </Template>
  );
}
