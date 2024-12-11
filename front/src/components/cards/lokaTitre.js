export default function LokaTitre() {
  const currentHour = new Date().getHours();
  const isWithinTimeRange = (start, end) =>
    currentHour >= start && currentHour < end;

  return (
    <div className="col-md card-lokaTitre">
      <div className="row cadre">
        <div className="d-flex flex-column sous-cadre">
          <div
            className="mb-2 d-flex justify-content-center align-items-center titre-sous-cadre"
            style={{
              color: "transparent",
              backgroundColor: "transparent",
            }}
          >
            {" "}
            ...{" "}
          </div>
          <div className="d-flex flex-column corps-sous-cadre">
            <div
              className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center csc"
              style={
                isWithinTimeRange(6, 8) ? { backgroundColor: "#c0dbea" } : {}
              }
            >
              P'tit Déj
            </div>
            <div
              className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center csc"
              style={
                isWithinTimeRange(12, 14) ? { backgroundColor: "#c0dbea" } : {}
              }
            >
              Déjeuner
            </div>
            <div
              className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center csc"
              style={
                isWithinTimeRange(18, 20) ? { backgroundColor: "#c0dbea" } : {}
              }
            >
              Dîner
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
