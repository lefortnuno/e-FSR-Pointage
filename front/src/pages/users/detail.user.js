import axios from "../../contexts/api/axios";
import GetUserData from "../../contexts/api/udata";

import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { lundiToZoma } from "../../contexts/dates/lundiToZoma";

import Template from "../../components/template/template";
import FicheSolo from "../../components/fiches/fiche.solo";
import BillanSolo from "../../components/fiches/billan.solo";
import HeadView from "./view/headView";
import Card1 from "./view/card1";
import Card2 from "./view/card2";
import Card3 from "./view/card3";

import "./details.user.css";

export default function UserDetails() {
  const { id } = useParams();
  const location = useLocation();
  const u_info = GetUserData();
  const [details, setDetails] = useState({});
  const [congeData, setCongeData] = useState({});
  const [pointageData, setPointageData] = useState([]);
  const [billanData, setBillanData] = useState([]);
  const [billanActuData, setBillanActuData] = useState([]);
  const [fahatongavana, setFahatongavana] = useState(false);
  const ficheSoloRef = useRef(null);

  useEffect(() => {
    getUser();
    getConge();
    getPointage();
    getBillan();
    getBillanActuel();
    getFahatongavana();
  }, [id]);

  // Défilement Auto vers FicheSolo
  useEffect(() => {
    if (
      details.validCompte &&
      location.state?.scrollToFicheSolo &&
      ficheSoloRef.current
    ) {
      ficheSoloRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [details, location.state]);

  const getUser = () => {
    axios
      .get(`utilisateur/${id}`, u_info.opts)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.data;
          setDetails(data);
        }
      })
      .catch((error) => {});
  };

  const getConge = () => {
    axios
      .get(`conge/reqConge/${id}`, u_info.opts)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.data;
          setCongeData(data);
        }
      })
      .catch((error) => {});
  };

  const getPointage = () => {
    const { dateStart, dateEnd } = lundiToZoma();
    const data = { dateStart, dateEnd, employeIm: id };

    axios
      .post(`pointage/ptg/`, data, u_info.opts)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.data;
          setPointageData(data);
        }
      })
      .catch((error) => {});
  };

  const getBillan = () => {
    const previousMonthDate = new Date();
    previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);

    const data = { dateMois: previousMonthDate, employeIm: id };

    axios
      .post(`pointage/billan/`, data, u_info.opts)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.data;

          setBillanData(data);
        }
      })
      .catch((error) => {});
  };

  const getBillanActuel = () => {
    const data = { dateMois: new Date(), employeIm: id };

    axios
      .post(`pointage/billan/`, data, u_info.opts)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.data;

          setBillanActuData(data);
        }
      })
      .catch((error) => {});
  };

  const getFahatongavana = () => {
    axios
      .get(`employee/fahatongavana/${id}`, u_info.opts)
      .then((response) => {
        if (response.status == 200) {
          const data = response.data.data;

          // Si `data` existe, `fahatongavana` est `true`, sinon `false`
          setFahatongavana(!!data);
        }
      })
      .catch((error) => {});
  };

  const handleSave = () => {
    getUser();
    getConge();
    getPointage();
    getFahatongavana();
  };

  return (
    <Template>
      <HeadView details={details} />

      <div className="container-fluid py-4">
        <div className="row">
          <Card1
            details={details}
            onUserUpdate={handleSave}
            congeData={congeData}
            u_info={u_info}
          />
          <Card2 details={details} onUserUpdate={handleSave} />
          <Card3
            details={details}
            congeData={congeData}
            fahatongavana={fahatongavana}
          />
        </div>
      </div>

      <div ref={ficheSoloRef}>
        {details && details.validCompte && (
          <div className="row py-0">
            <div className="col-lg-12 mt-0">
              <FicheSolo userData={pointageData} im={id} />
            </div>
            <div className="col-lg-12 mt-4">
              <BillanSolo
                billanMois1={billanData}
                billanMois2={billanActuData}
                im={id}
              />
            </div>
          </div>
        )}
      </div>
    </Template>
  );
}
