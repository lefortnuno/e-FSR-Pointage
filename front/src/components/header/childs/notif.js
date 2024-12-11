import axios from "../../../contexts/api/axios";
import eventEmitter from "../../../contexts/api/eventEmitter";
import { useNavigate, Link } from "react-router-dom";
import { BsBell, BsBellFill, BsClockFill } from "react-icons/bs";

import logoNewU from "../../../assets/images/newU.png";
import logoNewC from "../../../assets/images/newC.png";
import { toast } from "react-toastify";

export default function Notif({ u_info }) {
  const miseAJour = () => {
    axios
      .get(`conge/miseAJour/`, u_info.opts)
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.message, {
            autoClose: 5000, 
          });
          eventEmitter.emit("miseAJour");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <>
      {u_info.u_roleU ? (
        <li className="nav-item dropdown pe-2 d-flex align-items-center">
          <div
            className="nav-link text-body p-0"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            role="button"
          >
            <BsBellFill className="cursor-pointer text-danger" size={15} />
          </div>
          <ul
            className="dropdown-menu dropdown-menu-end px-2 py-3 me-sm-n4"
            aria-labelledby="dropdownMenuButton"
          >
            <li className="mb-2">
              <Link to={"/account/"} className="dropdown-item border-radius-md">
                <div className="d-flex py-1">
                  <div className="my-auto">
                    <img
                      src={logoNewU}
                      className="avatar avatar-sm me-3"
                      alt="User Profile"
                    />
                  </div>
                  <div className="d-flex flex-column justify-content-center">
                    <h6 className="text-sm font-weight-normal mb-1">
                      <span className="font-weight-bold">Nouveau Compte</span>
                    </h6>
                    <p className="text-xs text-secondary mb-0">
                      <BsClockFill className="me-1" />
                      il y a 53 minutes
                    </p>
                  </div>
                </div>
              </Link>
            </li>

            <li className="mb-2">
              <Link
                to={"/dmConges/"}
                className="dropdown-item border-radius-md"
              >
                <div className="d-flex py-1">
                  <div className="my-auto">
                    <img
                      src={logoNewC}
                      className="avatar avatar-sm me-3 p-1 bg-black border-radius-2xl"
                      alt="User Profile"
                    />
                  </div>
                  <div className="d-flex flex-column justify-content-center">
                    <h6 className="text-sm font-weight-normal mb-1">
                      <span className="font-weight-bold">
                        Nouveau Congé Soumise
                      </span>
                    </h6>
                    <p className="text-xs text-secondary mb-0">
                      <BsClockFill className="me-1" />
                      il y a 5 jours
                    </p>
                  </div>
                </div>
              </Link>
            </li>

            <li onClick={() => miseAJour()}>
              <div className="dropdown-item border-radius-md">
                <div className="d-flex py-1 cursor-pointer">
                  <div className="avatar avatar-sm bg-gradient-secondary me-3 my-auto">
                    <svg
                      width="12px"
                      height="12px"
                      viewBox="0 0 43 36"
                      version="1.1"
                      aria-label="Credit Card Icon"
                    >
                      <title> </title>
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g
                          transform="translate(-2169.000000, -745.000000)"
                          fill="#FFFFFF"
                          fillRule="nonzero"
                        >
                          <g transform="translate(1716.000000, 291.000000)">
                            <g transform="translate(453.000000, 454.000000)">
                              <path
                                className="color-background"
                                d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
                                opacity="0.593633743"
                              ></path>
                              <path
                                className="color-background"
                                d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="d-flex flex-column justify-content-center">
                    <h6 className="text-sm font-weight-normal mb-1">
                      Mise à jour du système requis
                    </h6>
                    <p className="text-xs text-secondary mb-0">
                      <BsClockFill className="me-1" />
                      depuis 3 jours
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      ) : (
        <li className="nav-item  pe-2 d-flex align-items-center">
          <div className="nav-link text-body p-0">
            <BsBell className="cursor-pointer" size={15} />
          </div>
        </li>
      )}
    </>
  );
}
