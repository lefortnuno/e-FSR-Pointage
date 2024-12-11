import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  BsArrowLeftCircle, 
  BsArrowLeftCircleFill,
} from "react-icons/bs";

export default function Titre({ setVal, children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.pathname !== "http://192.168.1.40:8301/") {
      navigate(-1);
    } else {
      navigate("/home");
    }
  };

  return (
    <>
      <div onClick={handleBack} className="back-button me-4">
        <BsArrowLeftCircle />
      </div>

      <nav className="bienvenu" aria-label="breadcrumb">
        <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
          <li className="breadcrumb-item text-sm">
            <div className="opacity-5 text-dark">e-BOA</div>
          </li>
          <li
            className="breadcrumb-item text-sm text-dark active"
            aria-current="page"
          >
            vous souhaite la
          </li>
        </ol>
        <h6 className="font-weight-bolder mb-0">Bienvenue</h6>
      </nav>
    </>
  );
}
