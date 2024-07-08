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
  tableContainer.className = `container ${className}`;
  tableContainer.style.display = "flex";
  tableContainer.style.flexDirection = "column";
  tableContainer.style.alignItems = "center";
  tableContainer.style.justifyContent = "center";

  const table = document.createElement("table");
  table.className = "mytable";

  createTableHeader(table);
  populateTableRows(table, data, containerId);

  const h2 = document.createElement("h2");
  h2.textContent = workoutTitle;

  const p = document.createElement("p");
  p.textContent = workoutDescription;

  tableContainer.appendChild(h2);
  tableContainer.appendChild(p);
  tableContainer.appendChild(table);

  const workoutContainer = document.getElementById(containerId);
  workoutContainer.textContent = "";
  workoutContainer.appendChild(tableContainer);
};

const createTableHeader = (table) => {
  const tableHeaders = ["Übung", "Sätze", "Wdh", "Gewicht", "Pause"];
  const headerRow = document.createElement("tr");
  tableHeaders.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);
};

const populateTableRows = async (table, data, containerId) => {
  for (const entry of data) {
    const row = document.createElement("tr");
    const exerciseCell = document.createElement("td");
    const setsCell = document.createElement("td");
    const repetitionsCell = document.createElement("td");
    const weightCell = document.createElement("td");
    const pauseCell = document.createElement("td");
    let weight = entry.weight || 0;
    let reps = entry.repetitions || 0;
    let pause = entry.pause || 60;

    setsCell.className = "set-cell";
    exerciseCell.textContent = entry.exercise;
    setsCell.textContent = entry.sets;

    const repContainer = createCounterContainer(
      reps,
      containerId,
      entry,
      setsCell,
      "rep"
    );
    const weightContainer = createCounterContainer(
      weight,
      containerId,
      entry,
      setsCell,
      "weight"
    );
    const pauseContainer = await createPauseContainer(pause, entry);

    repetitionsCell.appendChild(repContainer);
    weightCell.appendChild(weightContainer);
    pauseCell.appendChild(pauseContainer);

    row.appendChild(exerciseCell);
    row.appendChild(setsCell);
    row.appendChild(repetitionsCell);
    row.appendChild(weightCell);
    row.appendChild(pauseCell);

    table.appendChild(row);
  }
};

const createPauseContainer = async (initialPause, entry) => {
  const pauseContainer = document.createElement("div");
  const pauseButton = document.createElement("button");
  const pauseText = document.createElement("span");
  pauseButton.classList = "pauseButton";
  pauseButton.textContent = "Start";

  let state = await getWorkoutState(entry.exercise);
  let countdownInterval;

  const updateButtonColor = () => {
    const maxSets = parseInt(entry.sets, 10);
    const completedSets = state;

    if (completedSets === 0) {
      pauseButton.style.backgroundColor = "#f74545";
      pauseButton.style.color = "white";
    } else if (completedSets === maxSets) {
      pauseButton.style.backgroundColor = "#333";
      pauseButton.style.color = "#5bce5e";
      pauseButton.textContent = "Done";
      pauseButton.disabled = true;
    } else {
      const progress = completedSets / maxSets;
      const hue = 140 - progress * 120; // Verlauf von Grün zu Rot (120° bis 0°)
      pauseButton.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    }
  };

  updateButtonColor();

  pauseButton.addEventListener("click", () => {
    if (pauseButton.textContent === "Start") {
      pauseButton.style.display = "none"; // Button ausblenden beim Start des Countdowns
      let remainingTime = initialPause;
      countdownInterval = setInterval(() => {
        pauseText.textContent = `${remainingTime}s`;
        remainingTime -= 1;
        if (remainingTime < 0) {
          clearInterval(countdownInterval);
          pauseButton.style.display = "block"; // Button wieder einblenden nach Abschluss des Countdowns
          pauseButton.textContent = "Start";
          state = Math.min(state + 1, entry.sets); // Erhöhe den State bis zur Anzahl der Sets
          updateButtonColor();
          saveWorkoutState(entry.exercise, state);
          pauseText.textContent = ""; // Countdown-Text zurücksetzen
        }
      }, 1000);
    }
  });

  pauseContainer.appendChild(pauseText);
  pauseContainer.appendChild(pauseButton);
  return pauseContainer;
};

const startCountdown = (
  pauseElement,
  initialPause,
  containerId,
  entry,
  setsCell,
  toggleButton
) => {
  let time = initialPause;

  const countdown = setInterval(() => {
    time -= 1;
    pauseElement.textContent = `${time}s`;

    if (time <= 0) {
      clearInterval(countdown);
      pauseElement.textContent = `${initialPause}s`; // Zurücksetzen auf initialen Wert
      toggleButton.textContent = "Start"; // Zurücksetzen des Button-Texts
    }
  }, 1000);

  return countdown;
};

const createCounterContainer = (
  initialValue,
  containerId,
  entry,
  setsCell,
  type
) => {
  const valueContainer = document.createElement("div");
  const value = document.createElement("span");
  const plusButton = document.createElement("button");
  const minusButton = document.createElement("button");

  value.className = `${type}-value`;
  value.textContent = initialValue;
  plusButton.textContent = "+";
  minusButton.textContent = "-";

  plusButton.classList.add(`plus-${type}-button`);
  minusButton.classList.add(`minus-${type}-button`);

  plusButton.addEventListener("click", () => {
    updateValue(value, 1, containerId, entry, setsCell, type);
  });

  minusButton.addEventListener("click", () => {
    updateValue(value, -1, containerId, entry, setsCell, type);
  });

  valueContainer.appendChild(plusButton);
  valueContainer.appendChild(value);
  valueContainer.appendChild(minusButton);

  plusButton.style.display = "none";
  minusButton.style.display = "none";

  valueContainer.style.display = "flex";
  valueContainer.style.flexDirection = "column";
  valueContainer.style.alignItems = "center";

  return valueContainer;
};

const updateValue = (
  valueElement,
  increment,
  containerId,
  entry,
  setsCell,
  type
) => {
  let value = parseInt(valueElement.textContent, 10);
  value = Math.max(value + increment, 0);
  valueElement.textContent = value;
  saveInputsToLocalStorage(
    containerId,
    entry.exercise,
    setsCell.textContent,
    type === "rep"
      ? value
      : parseInt(valueElement.nextElementSibling.textContent, 10),
    type === "weight"
      ? value
      : parseInt(valueElement.nextElementSibling.textContent, 10),
    type === "pause"
      ? value
      : parseInt(valueElement.nextElementSibling.textContent, 10)
  );
};

const saveInputsToLocalStorage = (
  containerId,
  exercise,
  sets,
  reps,
  weight,
  pause
) => {
  const savedData = localStorage.getItem(containerId);
  let data = savedData ? JSON.parse(savedData) : {};
  data[exercise] = { sets, reps, weight, pause };
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
      threeSplitWorkout1: {
        data: data.data_threeSplit_one,
        title: "3-Split Training (Teil 1: Brust)",
        description:
          "Aufwärmen: 5 Minuten auf der Gymnastikmatte, Dehnung des oberen Rückens, Schultern und Brust mit Stretchbändern.",
        className: "threeSplit",
      },
      threeSplitWorkout2: {
        data: data.data_threeSplit_two,
        title: "3-Split Training (Teil 2: Beine)",
        description:
          "Aufwärmen: 5 Minuten auf der Gymnastikmatte, Dehnung des oberen Rückens, Schultern und Brust mit Stretchbändern.",
        className: "threeSplit",
      },
      threeSplitWorkout3: {
        data: data.data_threeSplit_three,
        title: "3-Split Training (Teil 3: Schulter)",
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
