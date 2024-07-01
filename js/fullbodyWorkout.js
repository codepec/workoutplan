const url = "data.json";

const createTable = (data, workoutTitle, workoutDescription, containerId) => {
  const table = document.createElement("table");
  table.className = "mytable";

  // Erstelle die tabellarischen Überschriften
  const tableHeaders = ["Übung", "Sätze", "Wdh", "Gewicht"];
  const headerRow = document.createElement("tr");
  tableHeaders.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });

  // Füge die tabellarischen Überschriften hinzu
  table.appendChild(headerRow);

  // Füge die tabellarischen Daten hinzu
  data.forEach((entry) => {
    const row = document.createElement("tr");
    const exerciseCell = document.createElement("td");
    const setsCell = document.createElement("td");
    const repetitionsCell = document.createElement("td");
    const weightCell = document.createElement("td");
    const plusRepButton = document.createElement("button");
    const minusRepButton = document.createElement("button");
    const repValue = document.createElement("span");
    const plusWeightButton = document.createElement("button");
    const minusWeightButton = document.createElement("button");
    const weightValue = document.createElement("span");
    let weight = entry.weight || 0;
    let reps = entry.repetitions || 0;

    setsCell.setAttribute("class", "set-cell");
    repValue.setAttribute("class", "rep-value");
    weightValue.setAttribute("class", "weight-value");
    plusRepButton.setAttribute("id", "plus-rep-button");
    minusRepButton.setAttribute("id", "minus-rep-button");
    plusWeightButton.setAttribute("id", "plus-weight-button");
    minusWeightButton.setAttribute("id", "minus-weight-button");

    exerciseCell.textContent = entry.exercise;
    setsCell.textContent = entry.sets;
    repValue.textContent = reps;
    weightValue.textContent = weight;
    plusRepButton.textContent = "+";
    minusRepButton.textContent = "-";
    plusWeightButton.textContent = "+";
    minusWeightButton.textContent = "-";

    plusRepButton.addEventListener("click", () => {
      reps = Math.max(reps - 1, 0);

      repValue.textContent = reps;
      saveInputsToLocalStorage(
        containerId,
        entry.exercise,
        setsCell.textContent,
        reps,
        weight
      );
    });

    minusRepButton.addEventListener("click", () => {
      reps = Math.max(reps - 1, 0);
      repValue.textContent = reps;
      saveInputsToLocalStorage(
        containerId,
        entry.exercise,
        setsCell.textContent,
        reps,
        weight
      );
    });

    plusWeightButton.addEventListener("click", () => {
      weight = Math.max(weight - 1, 0);

      weightValue.textContent = weight;
      saveInputsToLocalStorage(
        containerId,
        entry.exercise,
        setsCell.textContent,
        reps,
        weight
      );
    });

    minusWeightButton.addEventListener("click", () => {
      weight = Math.max(weight - 1, 0);
      weightValue.textContent = weight;
      saveInputsToLocalStorage(
        containerId,
        entry.exercise,
        setsCell.textContent,
        reps,
        weight
      );
    });

    repetitionsCell.appendChild(repValue);
    const repContainer = document.createElement("div");
    repContainer.appendChild(plusRepButton);
    repContainer.appendChild(minusRepButton);
    repContainer.style.display = "flex";
    repContainer.style.flexDirection = "row";
    repContainer.style.alignItems = "center";
    const repValueContainer = document.createElement("div");
    repValueContainer.appendChild(repValue);
    repValueContainer.appendChild(repContainer);
    repetitionsCell.appendChild(repValueContainer);

    weightCell.appendChild(weightValue);
    const weightContainer = document.createElement("div");
    weightContainer.appendChild(plusWeightButton);
    weightContainer.appendChild(minusWeightButton);
    weightContainer.style.display = "flex";
    weightContainer.style.flexDirection = "row";
    weightContainer.style.alignItems = "center";
    const weightValueContainer = document.createElement("div");
    weightValueContainer.appendChild(weightValue);
    weightValueContainer.appendChild(weightContainer);
    weightCell.appendChild(weightValueContainer);

    row.appendChild(exerciseCell);
    row.appendChild(setsCell);
    row.appendChild(repetitionsCell);
    row.appendChild(weightCell);

    table.appendChild(row);
  });

  // Erstelle das h2-Element
  const h2 = document.createElement("h2");
  h2.textContent = workoutTitle;

  // Erstelle das p-Element
  const p = document.createElement("p");
  p.textContent = workoutDescription;

  // Füge alle Elemente in das DOM ein
  const workoutContainer = document.getElementById(containerId);
  workoutContainer.appendChild(h2);
  workoutContainer.appendChild(p);
  workoutContainer.appendChild(table);
};

const saveInputsToLocalStorage = (
  containerId,
  exercise,
  sets,
  reps,
  weight
) => {
  const savedData = localStorage.getItem(containerId);

  // Überprüfen, ob bereits Daten in localStorage vorhanden sind
  let data;
  if (savedData) {
    data = JSON.parse(savedData);
  } else {
    data = {};
  }

  // Speichern der Eingaben für die entsprechende Übung
  if (!data[exercise]) {
    data[exercise] = {};
  }
  data[exercise].sets = sets;
  data[exercise].reps = reps;
  data[exercise].weight = weight;

  // Aktualisieren der Daten in localStorage
  localStorage.setItem(containerId, JSON.stringify(data));
};

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    createTable(
      data.data_1_3,
      "Tag 1: Oberkörper-Training",
      "Aufwärmen: 5 Minuten auf der Gymnastikmatte, Dehnung des oberen Rückens, Schultern und Brust mit Stretchbändern.",
      "dayOne_WorkoutPlan"
    );
    createTable(
      data.data_2_3,
      "Tag 2: Bein-Training",
      "Aufwärmen: 5 Minuten auf der Gymnastikmatte, Dehnung der Beine mit Stretchbändern.",
      "dayTwo_WorkoutPlan"
    );
    createTable(
      data.data_3_3,
      "Tag 3: Ganzkörper-Training",
      "Aufwärmen: 5 Minuten auf der Gymnastikmatte, Dehnung des ganzen Körpers mit Stretchbändern.",
      "dayThree_WorkoutPlan"
    );
  })
  .catch((error) => console.error(error));
