import eBoa from "../../../assets/images/boa.png";
import {
  BsWifi2,
  BsWifi1,
  BsWifi,
  BsBank,
  BsPaypal,
  BsPlus,
  BsPencil,
} from "react-icons/bs";

export default function Homie() {
  return (
    <div className="col-lg-8 mt-4">
      <div className="row">
        <div className="col-xl-6 mb-xl-0 mb-4 text-start">
          <div className="card bg-transparent shadow-xl">
            <div
              className="overflow-hidden position-relative border-radius-xl"
              style={{
                backgroundImage: `url(${eBoa})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <span className="mask bg-gradient-dark"></span>
              <div className="card-body position-relative z-index-1 p-3 ">
                <BsWifi className="text-white pt-2" size={35} />
                <h5 className="text-white mt-2 mb-5 pt-2 pb-2">
                  Rêve d'un nouveau monde
                </h5>
                <div className="d-flex">
                  <div className="d-flex">
                    <div className="me-4">
                      <p className="text-white text-sm opacity-8 mb-0">
                        Agence
                      </p>
                      <h6 className="text-white mb-0">BOA M/scar</h6>
                    </div>
                    <div>
                      <p className="text-white text-sm opacity-8 mb-0">Ville</p>
                      <h6 className="text-white mb-0">F/tsoa</h6>
                    </div>
                  </div>
                  <div className="ms-auto w-20 d-flex align-items-end justify-content-end text-white">
                    301
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
                  <div className="icon icon-shape icon-lg bg-secondary shadow border-radius-lg">
                    <BsBank className="opacity-10 text-white" size={20} />
                  </div>
                </div>
                <div className="card-body pt-0 p-3">
                  <h6 className="text-center mb-0">Salarie</h6>
                  <span className="text-xs">Nombre Employée</span>
                  <hr className="horizontal dark my-2" />
                  <h5 className="mb-0">15.200</h5>
                </div>
              </div>
            </div>

            <div className="col-md-6 mt-md-0 mt-4">
              <div className="card">
                <div className="card-header mx-4 p-3  d-flex justify-content-center align-items-center">
                  <div className="icon icon-shape icon-lg bg-secondary shadow text-center border-radius-lg">
                    <BsPaypal className="opacity-10 text-white" size={20} />
                  </div>
                </div>
                <div className="card-body pt-0 p-3 text-center">
                  <h6 className="text-center mb-0">Pointage</h6>
                  <span className="text-xs">Alternative Pointage</span>
                  <hr className="horizontal dark my-2" />
                  <h5 className="mb-0">9.300</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12 mb-lg-0 mb-4">
          <div className="card mt-4">
            <div className="card-header pb-0 p-3">
              <div className="row">
                <div className="col-6 d-flex align-items-center">
                  <h6 className="mb-0">Laissez-Nous Vos Commentaires</h6>
                </div>
                <div className="col-6 text-end">
                  <div className="btn bg-gradient-dark mb-0">
                    <BsPlus size={14} />
                    &nbsp;&nbsp;Contactez-Nous
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body p-3">
              <div className="row">
                <div className="col-md-6 mb-md-0 mb-4">
                  <div className="card card-body border card-plain border-radius-lg d-flex align-items-center flex-row">
                    <div className="icon icon-shape icon-sm bg-secondary shadow text-center border-radius-lg me-2 ">
                      <BsBank className="opacity-10 text-white" size={1} />
                    </div>
                    <h6 className="mb-0">
                      ****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;7852
                    </h6>
                    <BsPencil
                      className="ms-auto text-dark cursor-pointer"
                      size={14}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Edit Card"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card card-body border card-plain border-radius-lg d-flex align-items-center flex-row">
                    <div className="icon icon-shape icon-sm bg-secondary shadow text-center border-radius-lg me-2">
                      <BsPaypal className="opacity-10 text-white" size={1} />
                    </div>
                    <h6 className="mb-0">
                      ****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;5248
                    </h6>
                    <BsPencil
                      className="ms-auto text-dark cursor-pointer"
                      size={14}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Edit Card"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
