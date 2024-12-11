import GetUserData from "../../contexts/api/udata";
import { Link, useLocation } from "react-router-dom";

import {
  BsHouseFill,
  BsCalendarFill,
  BsClockFill,
  BsPeopleFill,
  BsBarChartFill,
  BsPersonCircle,
} from "react-icons/bs";

import "./sidebar.css";

export default function Sidebar() {
  const location = useLocation();
  const u_info = GetUserData();
  const userUrl = "/aboutUser/" + u_info.u_im;

  return (
    <aside
      className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-white"
      id="sidenav-main"
    >
      <div className="sidenav-header"></div>
      <hr className="horizontal dark mt-0" />
      <div
        className="collapse navbar-collapse w-auto nySidebar-ko"
        // id="sidenav-collapse-main"
      >
        <ul className="navbar-nav">
              <li className="nav-item mt-3">
                <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
                  Pages: Commun
                </h6>
              </li>
          <li className="nav-item">
            <Link
              to="/home/"
              className={`nav-link customNavLink ${
                location.pathname === "/home/" ? "atato" : ""
              }`}
            >
              <div className="navIcone">
                <BsHouseFill />
              </div>
              <span className="navText">Accueil</span>
            </Link>
          </li>

          {/* {u_info.u_roleU && (
            <li className="nav-item">
              <Link
                to="/conges/"
                className={`nav-link customNavLink ${
                  location.pathname === "/conges/" ? "atato" : ""
                }`}
              >
                <div className="navIcone">
                  <BsCalendarFill />
                </div>
                <span className="navText">Congés</span>
              </Link>
            </li>
          )} */}

          {/* <li className="nav-item">
            <Link
              to="/employees/"
              className={`nav-link customNavLink ${
                location.pathname === "/employees/" ? "atato" : ""
              }`}
            >
              <div className="navIcone">
                <BsPeopleFill />
              </div>
              <span className="navText">Employées</span>
            </Link>
          </li> */}

          <li className="nav-item">
            <Link
              to="/stats/"
              className={`nav-link customNavLink ${
                location.pathname === "/stats/" ? "atato" : ""
              }`}
            >
              <div className="navIcone">
                <BsBarChartFill />
              </div>
              <span className="navText">Statistiques</span>
            </Link>
          </li>

          {u_info.u_roleU ? (
            <>
              <li className="nav-item mt-3">
                <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
                  Pages: Administrateurs
                </h6>
              </li>
              <li className="nav-item">
                <Link
                  to="/users/"
                  className={`nav-link customNavLink ${
                    location.pathname === "/users/" ? "atato" : ""
                  }`}
                >
                  <div className="navIcone">
                    <BsPeopleFill />
                  </div>
                  <span className="navText">Utilisateurs</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/pointages/"
                  className={`nav-link customNavLink ${
                    location.pathname === "/pointages/" ||
                    location.pathname === "/absences/" ||
                    location.pathname === "/pointagesWeeks/"
                      ? "atato"
                      : ""
                  }`}
                >
                  <div className="navIcone">
                    <BsClockFill />
                  </div>
                  <span className="navText">Pointages</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item mt-3">
                <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
                  Pages: Utilisateurs
                </h6>
              </li>
              <li className="nav-item">
                <Link
                  to={`/aboutUser/${u_info.u_im}`}
                  className={`nav-link customNavLink ${
                    location.pathname === userUrl ? "atato" : ""
                  }`}
                >
                  <div className="navIcone">
                    <BsPersonCircle />
                  </div>
                  <span className="navText">Profile</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
 
    </aside>
  );
}
