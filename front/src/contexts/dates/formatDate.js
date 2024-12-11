// Fonction pour formater la date en "jour mois année"
export function formatDate(dateString) {
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

// Fonction pour obtenir le jour de la semaine
export function dayOfThisDate(dateString) {
  const daysOfWeek = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  const date = new Date(dateString);
  const dayIndex = date.getDay();

  return daysOfWeek[dayIndex];
}

export function formatHoursMin(timeString) {
  if (!timeString) {
    return "-";
  }
  const [hours, minutes] = timeString.split(":");

  if (hours && minutes) {
    return `${hours}h${minutes}`;
  }
  return "-";
}

export function formatTotalHours(totalHeureEffectuee) {
  if (totalHeureEffectuee === null || totalHeureEffectuee === undefined) {
    return "-";
  }

  const hours = Math.floor(totalHeureEffectuee);
  const minutes = Math.round((totalHeureEffectuee - hours) * 60);

  return `${hours}h${minutes.toString().padStart(2, "0")}`;
}

export function formatBillan(totalHeureEffectuee) {
  if (totalHeureEffectuee === null || totalHeureEffectuee === undefined) {
    return "-";
  }

  const hours = Math.floor(totalHeureEffectuee); // Obtenez l'heure entière
  const minutes = Math.round((totalHeureEffectuee - hours) * 60); // Calcul des minutes en fonction de la partie décimale

  // Affichage avec des minutes arrondies correctement
  return `${hours}h et ${minutes.toString().padStart(2, "0")}min`;
}

