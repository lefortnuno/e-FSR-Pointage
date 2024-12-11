import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

const JoursTravaillesChart = ({ url }) => {
  const [joursData, setJoursData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const transformedData = data.data.map((item) => ({
          jour_semaine: item.jour_semaine, // Lundi, Mardi, etc.
          moyenne_employes: item.moyenne_employes,
        }));
        setJoursData(transformedData);
      })
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des jours travaillés:",
          error
        )
      );
  }, [url]);

  const colorsByDay = {
    Lundi: "#8884d8",
    Mardi: "#82ca9d",
    Mercredi: "#ffc658",
    Jeudi: "#ff8042",
    Vendredi: "#a4de6c",
  };

  return (
    <div>
      <h5>Nombre moyen d'employés travaillant chaque jour de la semaine</h5>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={joursData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="jour_semaine"
            label={{
              value: "Jour de la semaine",
              position: "insideBottom",
              offset: -10,
            }}
          />
          <YAxis
            label={{
              value: "Moyenne employés",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend
            wrapperStyle={{
              marginBottom: "-12px",
            }}
          />

          <Bar dataKey="moyenne_employes" isAnimationActive={false}>
            {joursData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colorsByDay[entry.jour_semaine.trim()] || "#89e4b5"}
              />
            ))}

            <LabelList
              dataKey="moyenne_employes"
              position="top"
              offset={10}
              style={{
                fontSize: "12px",
                fill: "#555",
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default JoursTravaillesChart;
