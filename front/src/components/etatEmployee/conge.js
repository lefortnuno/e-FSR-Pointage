import "./conge.css";
import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const EmployeeStatus = ({ onLeave }) => {
  return (
    <div className={`status-container ${onLeave ? "on-leave" : "available"}`}>
      {onLeave ? (
        <div className="cross-container">
          <FaTimesCircle className="status-icon on-leave-icon" />
        </div>
      ) : (
        <div className="checkmark-container">
          <FaCheckCircle className="status-icon available-icon" />
        </div>
      )}
      <p className="status-text">{onLeave ? "En congé" : "Disponible"}</p>
    </div>
  );
};

export default EmployeeStatus;
