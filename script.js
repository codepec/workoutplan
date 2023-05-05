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
function addCalendarEvent(title, description, location, start, end) {
  // Daten für das Kalenderereignis im iCalendar-Format
  let icsData = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
DTSTART:${start.toISOString()}
DTEND:${end.toISOString()}
END:VEVENT
END:VCALENDAR`;

  // Blob mit den Daten erstellen
  let blob = new Blob([icsData], { type: "text/calendar" });

  // URL zum Download des Blobs erstellen
  let url = URL.createObjectURL(blob);

  // Link zum Download des Kalenderereignisses erstellen und klicken
  let link = document.createElement("a");
  link.href = url;
  link.download = `${title}.ics`;
  document.body.appendChild(link);
  link.click();

  // Blob und URL wieder freigeben
  URL.revokeObjectURL(url);
  document.body.removeChild(link);
}

// Event-Listener für Brust-Button
document.getElementById("brust").addEventListener("click", function () {
  let title = "Brust";
  let description = "Trainingseinheit für die Brustmuskulatur";
  let location = "Fitnessstudio";
  let start = new Date();
  let end = new Date();
  end.setHours(start.getHours() + 1); // Ende 1 Stunde später
  addCalendarEvent(title, description, location, start, end);
});

// Event-Listener für Rücken-Button
document.getElementById("ruecken").addEventListener("click", function () {
  let title = "Rücken";
  let description = "Trainingseinheit für den Rücken";
  let location = "Fitnessstudio";
  let start = new Date();
  let end = new Date();
  end.setHours(start.getHours() + 1); // Ende 1 Stunde später
  addCalendarEvent(title, description, location, start, end);
});

// Event-Listener für Ganzkörper-Button
document.getElementById("ganzkoerper").addEventListener("click", function () {
  let title = "Ganzkörper";
  let description = "Trainingseinheit für den ganzen Körper";
  let location = "Fitnessstudio";
  let start = new Date();
  let end = new Date();
  end.setHours(start.getHours() + 2); // Ende 2 Stunden später
  addCalendarEvent(title, description, location, start, end);
});
