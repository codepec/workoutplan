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
        console.log("Ereignis wurde erfolgreich im Kalender gespeichert!");
      })

      .catch((error) => {
        console.error("Fehler beim Speichern des Ereignisses: ", error);
      });
  } else {
    console.error("WebCal API wird von diesem Browser nicht unterstützt!");
  }
}

// Event-Listener für Brust-Button

document.getElementById("brust").addEventListener("click", function () {
  addCalendarEvent("Training Tag 1 - Brust - erfolgreich absolviert.");
});

// Event-Listener für Rücken-Button

document.getElementById("ruecken").addEventListener("click", function () {
  addCalendarEvent("Training Tag 2 - Beine - erfolgreich absolviert.");
});

// Event-Listener für Ganzkörper-Button

document.getElementById("ganzkoerper").addEventListener("click", function () {
  addCalendarEvent("Training Tag 3 - Ganzkörper - erfolgreich absolviert.");
});
