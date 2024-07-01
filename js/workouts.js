const url = "data.json";

// Function to create the table and append it to the specified container
const createTable = (
  data,
  workoutTitle,
  workoutDescription,
  className,
  containerId
) => {
  const tableContainer = document.createElement("div");
  tableContainer.className = `container ${className}`; // Setze die Klasse des Containers basierend auf dem Workout-Typ
  tableContainer.style.display = "flex";
  tableContainer.style.flexDirection = "column";
  tableContainer.style.alignItems = "center";
  tableContainer.style.justifyContent = "center";
  // Höhe des Containers auf volle Bildschirmhöhe gesetzt

  const table = document.createElement("table");
  table.className = "mytable";

  // Create table headers
  const tableHeaders = ["Übung", "Sätze", "Wdh", "Gewicht"];
  const headerRow = document.createElement("tr");
  tableHeaders.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });

  // Append headers to the table
  table.appendChild(headerRow);

  // Append data rows to the table
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
    plusRepButton.classList.add("plus-rep-button");
    minusRepButton.classList.add("minus-rep-button");
    plusWeightButton.classList.add("plus-weight-button");
    minusWeightButton.classList.add("minus-weight-button");

    exerciseCell.textContent = entry.exercise;
    setsCell.textContent = entry.sets;
    repValue.textContent = reps;
    weightValue.textContent = weight;
    plusRepButton.textContent = "+";
    minusRepButton.textContent = "-";
    plusWeightButton.textContent = "+";
    minusWeightButton.textContent = "-";

    plusRepButton.addEventListener("click", () => {
      reps = parseInt(repValue.textContent, 10); // Text in Zahl umwandeln
      reps += 1; // Erhöhe die Anzahl der Wiederholungen um 1
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
      reps = parseInt(repValue.textContent, 10); // Text in Zahl umwandeln
      reps = Math.max(reps - 1, 0); // Verringere die Anzahl der Wiederholungen um 1, aber nicht unter 0
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
      weight = parseInt(weightValue.textContent, 10); // Text in Zahl umwandeln
      weight += 1; // Erhöhe das Gewicht um 1
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
      weight = parseInt(weightValue.textContent, 10); // Text in Zahl umwandeln
      weight = Math.max(weight - 1, 0); // Verringere das Gewicht um 1, aber nicht unter 0
      weightValue.textContent = weight;
      saveInputsToLocalStorage(
        containerId,
        entry.exercise,
        setsCell.textContent,
        reps,
        weight
      );
    });

    // Append repetition controls
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

    // Append weight controls
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

    // Append cells to the row
    row.appendChild(exerciseCell);
    row.appendChild(setsCell);
    row.appendChild(repetitionsCell);
    row.appendChild(weightCell);

    // Append row to the table
    table.appendChild(row);
  });

  // Create and append title and description
  const h2 = document.createElement("h2");
  h2.textContent = workoutTitle;

  const p = document.createElement("p");
  p.textContent = workoutDescription;

  // Append all elements to the container
  tableContainer.appendChild(h2);
  tableContainer.appendChild(p);
  tableContainer.appendChild(table);

  // Clear previous content and append new container to specified element
  const workoutContainer = document.getElementById(containerId);
  workoutContainer.innerHTML = ""; // Clear previous content
  workoutContainer.appendChild(tableContainer);
};

const saveInputsToLocalStorage = (
  containerId,
  exercise,
  sets,
  reps,
  weight
) => {
  const savedData = localStorage.getItem(containerId);
  let data;
  if (savedData) {
    data = JSON.parse(savedData);
  } else {
    data = {};
  }

  if (!data[exercise]) {
    data[exercise] = {};
  }
  data[exercise].sets = sets;
  data[exercise].reps = reps;
  data[exercise].weight = weight;

  localStorage.setItem(containerId, JSON.stringify(data));
  console.log(data);
};

// Fetch workout data and initialize the table creation
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const workoutData = {
      fullbodyWorkout: {
        data: data.data_fullbody,
        title: "Ganzkörper-Training",
        description:
          "Aufwärmen: 5 Minuten auf der Gymnastikmatte, Dehnung des ganzen Körpers mit Stretchbändern.",
        className: "fullbody",
      },
      threeSplitWorkout: {
        data: data.data_threeSplit,
        title: "3-Split Training",
        description:
          "Aufwärmen: 5 Minuten auf der Gymnastikmatte, Dehnung des oberen Rückens, Schultern und Brust mit Stretchbändern.",
        className: "threeSplit",
      },
      fiveSplitWorkout: {
        data: data.data_fiveSplit,
        title: "5-Split Training",
        description:
          "Aufwärmen: 5 Minuten auf der Gymnastikmatte, Dehnung der Beine mit Stretchbändern.",
        className: "fiveSplit",
      },
    };

    const workoutChoose = document.getElementById("workoutChoose");
    workoutChoose.addEventListener("change", (event) => {
      const selectedWorkout = event.target.value;
      const workoutInfo = workoutData[selectedWorkout];
      if (workoutInfo) {
        createTable(
          workoutInfo.data,
          workoutInfo.title,
          workoutInfo.description,
          workoutInfo.className,
          `${selectedWorkout}_data`
        );
      }
    });

    // Initialize with the default workout
    workoutChoose.dispatchEvent(new Event("change"));
  })
  .catch((error) => console.error(error));
