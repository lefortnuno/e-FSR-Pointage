import React from "react";
import "./loadingList.css";

export default function LoadingList() {
  return (
    <li className="loadingRow list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
      <div className="loadingLight"></div>
      <div className=" loadingCell d-flex flex-column">
        <h6 className=" mb-1 text-dark font-weight-bold justify-content-center text-sm">
          Chargement des données ...
        </h6> 
      </div> 
    </li>
  );
}
