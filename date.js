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
  let blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });

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

let eventTitle = "Tag 1 - Brust Training";

// Funktion zum Speichern des Termins als iCalendar-Datei
function saveICal() {
  let title = eventTitle;
  let description = document.getElementById("eventDescription").value;
  let start = new Date(document.getElementById("eventDate").value);
  let end = new Date(start.getTime() + 60 * 60 * 1000); // Ende 1 Stunde später
  addCalendarEvent(title, description, "", start, end);
}

// Funktion zum Speichern des Termins im Google Calendar
function saveGoogle() {
  let title = document.getElementById("eventTitle").value;
  let description = document.getElementById("eventDescription").value;
  let start = new Date(document.getElementById("eventDate").value);
  let end = new Date(start.getTime() + 60 * 60 * 1000); // Ende 1 Stunde später
  let url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start.toISOString()}/${end.toISOString()}&details=${description}`;
  window.open(url, "_blank");
}

// Funktion zum Speichern des Termins in Outlook
function saveOutlook() {
  let title = document.getElementById("eventTitle").value;
  let description = document.getElementById("eventDescription").value;
  let start = new Date(document.getElementById("eventDate").value);
  let end = new Date(start.getTime() + 60 * 60 * 1000); // Ende 1 Stunde später
  let location = "";

  // Zeitzone des Benutzers
  let timeZoneOffset = new Date().getTimezoneOffset();
  let timeZoneOffsetMinutes = Math.abs(timeZoneOffset);
  let timeZoneOffsetHours = timeZoneOffsetMinutes / 60;
  let timeZoneOffsetSign = timeZoneOffset / timeZoneOffsetMinutes;

  let timeZoneOffsetString = timeZoneOffsetHours < 10 ? "0" : "";
  timeZoneOffsetString += Math.floor(timeZoneOffsetHours) + ":";
  timeZoneOffsetString += timeZoneOffsetMinutes % 60 < 10 ? "0" : "";
  timeZoneOffsetString += timeZoneOffsetMinutes % 60;
  timeZoneOffsetString =
    timeZoneOffsetSign > 0
      ? "-" + timeZoneOffsetString
      : "+" + timeZoneOffsetString;

  // Daten für das Kalenderereignis im iCalendar-Format
  let icsData = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
DTSTART;TZID=Europe/Berlin:${start.toISOString().replace(/[-:]/g, "")}
DTEND;TZID=Europe/Berlin:${end.toISOString().replace(/[-:]/g, "")}
BEGIN:VTIMEZONE
TZID:Europe/Berlin
BEGIN:DAYLIGHT
TZOFFSETFROM:+0100
TZOFFSETTO:+0200
DTSTART:20210328T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU
END:DAYLIGHT
BEGIN:STANDARD
TZOFFSETFROM:+0200
TZOFFSETTO:+0100
DTSTART:20211031T030000
RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU
END:STANDARD
END:VTIMEZONE
END:VEVENT
END:VCALENDAR`;

  // Blob mit den Daten erstellen
  let blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });

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
