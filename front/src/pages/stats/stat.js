import Template from "../../components/template/template"; 
import Days from "./days/days";
 
import "./stat.css";

const url_req = process.env.REACT_APP_SUN_COMPLET_URL + `employee/`;

export default function Pointage() { 

  return (
    <Template>
      <main className="col-md-12 ms-sm-auto col-lg-12 px-md-4 main mt-2 pb-2">
        <div className="pt-3 pb-2 mb-3">
          {/* -------------------------- PAGE CONTENT -------------------------- */}
          <div className="text-center my-3 mt-0">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <h5 className="mb-0 me-2 position-relative d-inline-block">
                  Statistiques :
                </h5>
              </div>
            </div>
          </div>

          <Days url={url_req + "statJour/"} />

          {/* -------------------------- FIN -------------------------- */}
        </div>
      </main>
    </Template>
  );
}
