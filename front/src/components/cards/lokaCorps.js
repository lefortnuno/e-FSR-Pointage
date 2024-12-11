export default function LokaCorps({ jour, children }) {
  const currentDay = new Date().toLocaleString("fr-FR", { weekday: "long" });
  const isToday = currentDay.toLowerCase() === jour.toLowerCase();

  return (
    <div className="col-md">
      <div className="row cadre">
        <div className="d-flex flex-column sous-cadre">
          <div
            className="mb-2 d-flex justify-content-center align-items-center titre-sous-cadre tsc"
            style={isToday ? { backgroundColor: "#c0dbea" } : {}}
          >
            {jour}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
