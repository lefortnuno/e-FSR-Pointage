import React, { useState, useEffect } from "react";

const WeekRange = ({ startOfWeek }) => {
  const currentDay = startOfWeek.getDay();
  const daysToMonday = currentDay === 0 ? 6 : currentDay - 1; // Si dimanche, retour à lundi
  startOfWeek.setDate(startOfWeek.getDate() - daysToMonday);

  const weekDays = [];
  // Générer les jours de la semaine (du lundi au vendredi)
  for (let i = 0; i < 5; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    weekDays.push(day);
  }

  return (
    <>
      {`Semaine du ${weekDays[0].toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })} au ${weekDays[4].toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}`}
    </>
  );
};

export default WeekRange;
