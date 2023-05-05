const workoutDays = document.getElementById("workoutDays");

workoutDays.addEventListener("change", function () {
  if (workoutDays.value === "threeDays") {
  } else {
    alert("Workout-Pläne werden noch erstellt.");
  }
});

const chooseLanguage = document.getElementById("chooseLanguage");

chooseLanguage.addEventListener("change", function () {
  if (chooseLanguage.value === "german") {
  } else {
    alert("work in progress");
  }
});

// Funktion zum Hinzufügen eines Termins
function addCalendarEvent(title) {
  // Datum erstellen
  let date = new Date();

  // Daten für das Kalenderereignis
  let eventData = {
    title: title,
    start: date,
    end: date,
  };

  // WebCal API aufrufen
  if (navigator.webcal) {
    navigator.webcal
      .saveEvent(eventData)
      .then(() => {
        alert("Ereignis wurde erfolgreich im Kalender gespeichert!");
      })
      .catch((error) => {
        alert("Fehler beim Speichern des Ereignisses: " + error.message);
      });
  } else {
    alert("WebCal API wird von diesem Browser nicht unterstützt!");
  }
}

// Event-Listener für Brust-Button
document.getElementById("brust").addEventListener("click", function () {
  addCalendarEvent("Brust");
});

// Event-Listener für Rücken-Button
document.getElementById("ruecken").addEventListener("click", function () {
  addCalendarEvent("Rücken");
});

// Event-Listener für Ganzkörper-Button
document.getElementById("ganzkoerper").addEventListener("click", function () {
  addCalendarEvent("Ganzkörper");
});

// Überprüfe, ob WebCal API verfügbar ist
if (!navigator.webcal) {
  alert("WebCal API wird von diesem Browser nicht unterstützt!");
}

// Überprüfe, ob Berechtigungen vorhanden sind
if (navigator.permissions) {
  navigator.permissions.query({ name: "calendar" }).then((permission) => {
    if (permission.state === "denied") {
      alert("Keine Berechtigung zum Speichern von Ereignissen im Kalender!");
    }
  });
}

// Überprüfe, ob es Probleme beim Speichern von Ereignissen gibt
window.addEventListener(
  "error",
  function (event) {
    alert("Fehler beim Speichern des Ereignisses: " + event.error.message);
  },
  true
);
