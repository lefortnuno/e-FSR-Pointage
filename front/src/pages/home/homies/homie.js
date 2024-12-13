import eBoa from "../../../assets/images/fsr2.png";
import {
  BsWifi2,
  BsWifi1,
  BsWifi,
  BsBank,
  BsPaypal,
  BsPlus,
  BsPencil,
  BsBarChartFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Homie() {
  const navigate = useNavigate();
  return (
    <div className="col-lg-8 mt-4">
      <div className="row">
        <div className="col-xl-6 mb-xl-0 mb-4 text-start">
          <div className="card bg-transparent shadow-xl">
            <div
              className="overflow-hidden position-relative border-radius-xl"
              style={{
                backgroundColor: "#074fdf",
              }}
            >
              <span className="mask bg-gradient-dark"></span>
              <div className="card-body position-relative z-index-1 p-3 ">
                <BsWifi className="text-white pt-2" size={35} />
                <h5 className="text-white mt-2 mb-5 pt-2 pb-2">
                  Faculté des Sciences
                </h5>
                <div className="d-flex">
                  <div className="d-flex">
                    <div className="me-4">
                      <p className="text-white text-sm opacity-8 mb-0">Pays</p>
                      <h6 className="text-white mb-0">Maroc</h6>
                    </div>
                    <div>
                      <p className="text-white text-sm opacity-8 mb-0">Ville</p>
                      <h6 className="text-white mb-0">Rabat</h6>
                    </div>
                  </div>
                  <div className="ms-auto w-20 d-flex align-items-end justify-content-end text-white">
                    10170
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header mx-4 p-3 d-flex justify-content-center align-items-center">
                  <div
                    className="icon icon-shape icon-lg bg-secondary shadow border-radius-lg cursor-pointer"
                    onClick={() => navigate("/stats/")}
                  >
                    <BsBarChartFill
                      className="opacity-10 text-white"
                      size={20}
                    />
                  </div>
                </div>
                <div className="card-body pt-0 p-3">
                  <h6 className="text-center mb-0">Stats</h6>
                  <span className="text-xs">Nombre d'Etudiant</span>
                  <hr className="horizontal dark my-2" />
                  <h5 className="mb-0">10.261</h5>
                </div>
              </div>
            </div>

            <div className="col-md-6 mt-md-0 mt-4">
              <div className="card">
                <div className="card-header mx-4 p-3  d-flex justify-content-center align-items-center">
                  <div
                    className="icon icon-shape icon-lg bg-secondary shadow text-center border-radius-lg cursor-pointer"
                    onClick={() => navigate("/pointages/")}
                  >
                    <BsPaypal className="opacity-10 text-white" size={20} />
                  </div>
                </div>
                <div className="card-body pt-0 p-3 text-center">
                  <h6 className="text-center mb-0">Pointage</h6>
                  <span className="text-xs">Nombre d'Enseignant</span>
                  <hr className="horizontal dark my-2" />
                  <h5 className="mb-0">461</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12 mb-lg-0 mb-0">
          <div
            className="mt-4 shadow-lg rounded-3 position-relative"
            style={{
              backgroundImage: `url(${eBoa})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "500px",
              maxHeight: "235px",
              width: "100%",
              border: "5px solid white",
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
              borderRadius: "8px",
              overflow: "hidden",
              transform: "scale(1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.01)";
              e.currentTarget.style.boxShadow =
                "0px 15px 30px rgba(0, 0, 0, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0px 10px 20px rgba(0, 0, 0, 0.3)";
            }}
          > 
            <div
              className="overlay"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                background: "rgba(0, 0, 0, 0.2)",  
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
