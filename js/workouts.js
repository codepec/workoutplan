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
  workoutContainer.innerHTML = "";
  workoutContainer.appendChild(tableContainer);
};

const createTableHeader = (table) => {
  const tableHeaders = ["Übung", "Sätze", "Wdh", "Gewicht"];
  const headerRow = document.createElement("tr");
  tableHeaders.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);
};

const populateTableRows = (table, data, containerId) => {
  data.forEach((entry) => {
    const row = document.createElement("tr");
    const exerciseCell = document.createElement("td");
    const setsCell = document.createElement("td");
    const repetitionsCell = document.createElement("td");
    const weightCell = document.createElement("td");
    let weight = entry.weight || 0;
    let reps = entry.repetitions || 0;

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

    repetitionsCell.appendChild(repContainer);
    weightCell.appendChild(weightContainer);

    row.appendChild(exerciseCell);
    row.appendChild(setsCell);
    row.appendChild(repetitionsCell);
    row.appendChild(weightCell);

    table.appendChild(row);
  });
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
      : parseInt(valueElement.nextElementSibling.textContent, 10)
  );
};

const saveInputsToLocalStorage = (
  containerId,
  exercise,
  sets,
  reps,
  weight
) => {
  const savedData = localStorage.getItem(containerId);
  let data = savedData ? JSON.parse(savedData) : {};
  data[exercise] = { sets, reps, weight };
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
