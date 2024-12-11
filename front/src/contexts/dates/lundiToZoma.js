// src/utils/dateUtils.js

export const lundiToZoma = () => {
  const today = new Date();

  // Récupère le jour de la semaine (0 pour dimanche, 1 pour lundi, etc.)
  const dayOfWeek = today.getDay();

  // Calcule le nombre de jours à soustraire pour obtenir le lundi et vendredi
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Si dimanche (0), on va à -6, sinon on va à 1 - dayOfWeek pour obtenir le lundi
  const diffToFriday = dayOfWeek === 0 ? -2 : 5 - dayOfWeek; // Si dimanche, on va à -2 pour vendredi

  // Calcul des dates pour lundi et vendredi
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0); // Réinitialiser l'heure à 00:00

  const friday = new Date(today);
  friday.setDate(today.getDate() + diffToFriday);
  friday.setHours(23, 59, 59, 999); // Réinitialiser l'heure à 23:59

  // Retourner les dates formatées en YYYY-MM-DD
  const formatDate = (date) => {
    return date.toISOString().split("T")[0]; // Formater au format YYYY-MM-DD
  };

  return {
    dateStart: formatDate(monday),
    dateEnd: formatDate(friday),
  };
};
