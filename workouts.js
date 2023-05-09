const url = 'data.json';

const createTable = (data, workoutTitle, workoutDescription, containerId) => {
  const table = document.createElement('table');

  // Erstelle die tabellarischen Überschriften
  const tableHeaders = ['Übung', 'Sätze', 'Wiederholungen'];
  const headerRow = document.createElement('tr');
  tableHeaders.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });

  // Füge die tabellarischen Überschriften hinzu
  table.appendChild(headerRow);

  // Füge die tabellarischen Daten hinzu
  data.forEach(entry => {
    const row = document.createElement('tr');
    const exerciseCell = document.createElement('td');
    const setsCell = document.createElement('td');
    const repetitionsCell = document.createElement('td');

    exerciseCell.textContent = entry.exercise;
    setsCell.textContent = entry.sets;
    repetitionsCell.textContent = entry.repetitions;

    row.appendChild(exerciseCell);
    row.appendChild(setsCell);
    row.appendChild(repetitionsCell);

    table.appendChild(row);
  });

  // Erstelle das h2-Element
  const h2 = document.createElement('h2');
  h2.textContent = workoutTitle;

  // Erstelle das p-Element
  const p = document.createElement('p');
  p.textContent = workoutDescription;

  // Füge alle Elemente in das DOM ein
  const workoutContainer = document.getElementById(containerId);
  workoutContainer.appendChild(h2);
  workoutContainer.appendChild(p);
  workoutContainer.appendChild(table);
};

fetch(url)
  .then(response => response.json())
  .then(data => {
    createTable(data.data_1_3, 'Tag 1: Oberkörper-Training', 'Aufwärmen: 5 Minuten auf der Gymnastikmatte, Dehnung des oberen Rückens, Schultern und Brust mit Stretchbändern.', 'dayOne_WorkoutPlan');
    createTable(data.data_2_3, 'Tag 2: Bein-Training', 'Aufwärmen: 5 Minuten auf der Gymnastikmatte, Dehnung der Beine mit Stretchbändern.', 'dayTwo_WorkoutPlan');
    createTable(data.data_3_3, 'Tag 3: Ganzkörper-Training', 'Aufwärmen: 5 Minuten auf der Gymnastikmatte, Dehnung des ganzen Körpers mit Stretchbändern.', 'dayThree_WorkoutPlan');
  })
  .catch(error => console.error(error));
