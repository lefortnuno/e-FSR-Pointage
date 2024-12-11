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

const HeuresTravailleesChart = ({ url }) => {
  const [heuresData, setHeuresData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Ajouter une clé "fill" à chaque jour dans les données
        const dataWithColors = data.data.map((entry) => {
          const colorsByDay = {
            Lundi: "#8884d8",
            Mardi: "#82ca9d",
            Mercredi: "#ffc658",
            Jeudi: "#ff8042",
            Vendredi: "#a4de6c",
          };
          return {
            ...entry,
            fill: colorsByDay[entry.jour_semaine] || "#89e4b5",
          };
        });
        setHeuresData(dataWithColors);
      })
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des heures travaillées:",
          error
        )
      );
  }, [url]);

  return (
    <div>
      <h5>Moyenne des heures travaillées par jour de la semaine</h5>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={heuresData}
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
            domain={[0, (dataMax) => Math.min(10, dataMax + 1)]} // max sera le minimum entre 10 et dataMax + 1
            label={{
              value: "Moyenne des heures",
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

          <Bar dataKey="moyenne_heures" isAnimationActive={false}>
            {heuresData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}

            <LabelList
              dataKey="moyenne_heures"
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

export default HeuresTravailleesChart;
