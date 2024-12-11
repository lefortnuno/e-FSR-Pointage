import LogoutConfirmationModal from "../../modals/session/session";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BsGear, BsPower } from "react-icons/bs";

export default function Menu({ u_info }) {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleShowLogoutModal = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  // Fonction pour se déconnecter et rediriger vers la page de connexion
  const seDeconnecterDuSession = (event) => {
    setShowLogoutModal(false);
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <li className="nav-item px-3 d-flex align-items-center">
        <div className="nav-item dropdown">
          <span
            className="profile-pic"
            id="dropdownMenuButton2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            role="button"
          >
            <span>Menu</span>
          </span>
          <ul
            className="dropdown-menu dropdown-menu-end dropdownProfile px-2 py-3 me-sm-n4"
            aria-labelledby="dropdownMenuButton2"
          >
            <li>
              <div className="user-box">
                <div className="u-img">
                  <img
                    src={process.env.REACT_APP_SUN_COMPLET_URL + u_info.u_pic}
                    alt="Profile Picture"
                  />
                </div>
                <div className="u-text">
                  <h5> {u_info.u_nom}</h5>
                  <Link
                    to={`/aboutUser/${u_info.u_im}`}
                    className="btn btn-rounded btn-danger btn-sm"
                  >
                    Profile
                  </Link>
                  <p> {u_info.u_im}</p>
                </div>
              </div>
            </li>
            <div className="dropdown-divider"></div>
            <Link 
                    to={`/params/${u_info.u_im}`}>
              <div className="dropdown-item">
                <BsGear />
                <span>Paramètres</span>
              </div>
            </Link>
            <div
              className="dropdown-item"
              onClick={handleShowLogoutModal}
              role="button"
            >
              <BsPower />
              <span>Se déconnecter</span>
            </div>
          </ul>
        </div>
      </li>

      <LogoutConfirmationModal
        show={showLogoutModal}
        handleClose={handleCloseLogoutModal}
        handleLogout={seDeconnecterDuSession}
      />
    </>
  );
}
