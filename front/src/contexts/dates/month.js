import React from "react";

// Fonction pour mettre la première lettre en majuscule
const capitalizeFirstLetter = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

// Mois actuel
const currentDate = new Date();
const mois2 = capitalizeFirstLetter(
  currentDate.toLocaleDateString("fr-FR", { year: "numeric", month: "long" })
);

// Mois précédent
const previousDate = new Date();
previousDate.setMonth(currentDate.getMonth() - 1); 

const mois1 = capitalizeFirstLetter(
  previousDate.toLocaleDateString("fr-FR", { year: "numeric", month: "long" })
);

const MonthRange = () => {
  return <>{`Mois de ${mois1} et de ${mois2}`}</>;
};

// Export des mois
export { mois1, mois2 };

export default MonthRange;
