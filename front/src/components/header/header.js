import GetUserData from "../../contexts/api/udata";

import Titre from "./childs/titre";
import Notif from "./childs/notif";
import Menu from "./childs/menu";

import "./header.css";
import { useState } from "react";

// Le composant Header avec un bouton hamburger pour le menu
export default function Header({ setVal, children }) {
  const u_info = GetUserData();
  const [clickMe, setClickMe] = useState(false);

  const toggleVal = () => {
    setVal((prev) => !prev);
    setClickMe(!clickMe);
  };
  const fermerSideBar = () => {
    setVal((prev) => false);
    setClickMe(false);
  };

  // Vérifie si l'utilisateur est connecté (u_token) avant d'afficher l'entête
  return (
    <>
      {u_info.u_token ? (
        <nav
          className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl position-sticky blur shadow-blur mt-4 left-auto top-1 z-index-sticky"
          id="navbarBlur"
          navbar-scroll="false"
          {...(clickMe && { onClick: fermerSideBar })}
        >
          <div className="container-fluid py-1 px-3">
            <Titre />

            <div
              className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
              id="navbar"
            >
              <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                {children}
              </div>
              <ul className="navbar-nav justify-content-end">
                <Notif u_info={u_info} />

                <Menu u_info={u_info} />

                <li
                  className="nav-item d-xl-none ps-3 d-flex align-items-center"
                  onClick={toggleVal}
                  role="button"
                >
                  <div
                    className="nav-link text-body p-0"
                    id="iconNavbarSidenav"
                  >
                    <div className="sidenav-toggler-inner">
                      <i className="sidenav-toggler-line"></i>
                      <i className="sidenav-toggler-line"></i>
                      <i className="sidenav-toggler-line"></i>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      ) : null}
    </>
  );
}
