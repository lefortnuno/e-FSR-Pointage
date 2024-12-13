import axios from "../../../contexts/api/axios";
import GetUserData from "../../../contexts/api/udata";
import { formatDate, dayOfThisDate } from "../../../contexts/dates/formatDate";
import LoadingList from "../../../components/loading/listes/loadingList";

import { useState, useEffect } from "react";

export default function DaysOFF() {
  const u_info = GetUserData();
  const [histo, setHisto] = useState([]);

  useEffect(() => {
    getHisto();
  }, []);
  //#endregion

  //#region //-histo
  function getHisto() {
    axios
      .get("joursFerie/", u_info.opts)
      .then(function (response) {
        if (
          response.status === 200 &&
          response.data.success &&
          response.data.data.length > 0
        ) {
          const allHisto = response.data.data;
          setHisto(allHisto);
        } else {
          setHisto([]);
        }
      })
      .catch((error) => {
        setHisto([]);
      });
  }
  return (
    <div className="col-lg-4 mt-4">
      <div className="card h-80">
        <div className="card-header pb-0 p-3">
          <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-center">
              <h6 className="mb-0">Les Jours Feries De l'Année</h6>
            </div>
          </div>
        </div>
        <div
          className="card-body p-3 pb-0 "
          style={{ overflow: "scroll", maxHeight: "430px" }}
        >
          <ul className="list-group">
            {histo && histo.length > 0 ? (
              histo.map((h, key) => (
                <li
                  key={key}
                  className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
                >
                  <div className="d-flex flex-column">
                    <h6 className="mb-1 text-dark font-weight-bold text-sm">
                      Le {dayOfThisDate(h.dateJF)} {formatDate(h.dateJF)}
                    </h6>
                    <span className="text">{h.descJF}</span>
                  </div>
                  <div className="d-flex align-items-center text-sm">
                    {new Date(h.dateJF) - new Date() > 0
                      ? `${Math.floor(
                          (new Date(h.dateJF) - new Date()) /
                            (1000 * 60 * 60 * 24)
                        )} jours restants`
                      : "Passé"}
                  </div>
                </li>
              ))
            ) : (
              <LoadingList />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
