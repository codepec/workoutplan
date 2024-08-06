document.addEventListener("DOMContentLoaded", function () {
  const workoutChoose = document.getElementById("workoutChoose");

  const workoutElements = {
    data_fullbody: document.getElementById("data_fullbody_start_data"),
    data_threeSplit_one: document.getElementById("data_threeSplit_one_start_data"),
    data_threeSplit_two: document.getElementById("data_threeSplit_two_start_data"),
    data_threeSplit_three: document.getElementById("data_threeSplit_three_start_data"),
    data_fiveSplit: document.getElementById("data_fiveSplit_start_data"),
  };

  workoutChoose.addEventListener("change", function () {
    Object.keys(workoutElements).forEach((key) => {
      workoutElements[key].style.display = "none";
    });

    if (workoutElements[workoutChoose.value]) {
      workoutElements[workoutChoose.value].style.display = "block";
    } else {
      alert("Workout-Pläne werden noch erstellt.");
      console.log(workoutChoose.value);
    }
  });

  function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      const dropdowns = document.getElementsByClassName("dropdown-content");
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };

  const url = "data.json";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const workoutData = {
        data_fullbody: {
          data: data.data_fullbody,
          title: "Ganzkörper-Training",
          warmup: "5 Minuten auf der Gymnastikmatte: Ganzkörperdehnung mit Stretchbändern.",
          frequency: "2 bis 4 Trainingseinheiten pro Woche",
          reps: "6 bis 8 Wiederholungen pro Satz; bei mehr Wiederholungen das Gewicht erhöhen.",
          weight: "60 bis 80% des maximalen Gewichts",
          goal: "Ziel: Reine Kraftsteigerung und Muskelzuwachs",
          className: "fullbody",
        },
        data_threeSplit_one: {
          data: data.data_threeSplit_one,
          title: "3-Split Training (Teil 1: Brust)",
          warmup:
            "5 Minuten auf der Gymnastikmatte, Dehnung des oberen Rückens, Schultern und Brust mit Stretchbändern.",
            frequency: "2 - 4 Trainingseinheiten pro Woche",
            reps: "6 - 8 Wiederholungen nicht mehr sonst mehr Gewicht",
            weight: "60 - 80% des maximalen Gewichts",
            goal: "Ziele: Reiner Kraft und Muskelzuwachs",
          className: "threeSplit",
        },
        data_threeSplit_two: {
          data: data.data_threeSplit_two,
          title: "3-Split Training (Teil 2: Beine)",
          warmup:
            "5 Minuten auf der Gymnastikmatte, Dehnung des oberen Rückens, Schultern und Brust mit Stretchbändern.",
            frequency: "2 - 4 Trainingseinheiten pro Woche",
            reps: "6 - 8 Wiederholungen nicht mehr sonst mehr Gewicht",
            weight: "60 - 80% des maximalen Gewichts",
            goal: "Ziele: Reiner Kraft und Muskelzuwachs",
          className: "threeSplit",
        },
        data_threeSplit_three: {
          data: data.data_threeSplit_three,
          title: "3-Split Training (Teil 3: Schulter)",
          warmup:
            "5 Minuten auf der Gymnastikmatte, Dehnung des oberen Rückens, Schultern und Brust mit Stretchbändern.",
            frequency: "2 - 4 Trainingseinheiten pro Woche",
            reps: "6 - 8 Wiederholungen nicht mehr sonst mehr Gewicht",
            weight: "60 - 80% des maximalen Gewichts",
            goal: "Ziele: Reiner Kraft und Muskelzuwachs",
          className: "threeSplit",
        },
        data_fiveSplit: {
          data: data.data_fiveSplit,
          title: "5-Split Training",
          warmup:
            "5 Minuten auf der Gymnastikmatte, Dehnung der Beine mit Stretchbändern.",
            frequency: "2 - 4 Trainingseinheiten pro Woche",
            reps: "6 - 8 Wiederholungen nicht mehr sonst mehr Gewicht",
            weight: "60 - 80% des maximalen Gewichts",
            goal: "Ziele: Reiner Kraft und Muskelzuwachs",
          className: "fiveSplit",
        },
      };

      workoutChoose.addEventListener("change", (event) => {
        const selectedWorkout = event.target.value;
        const workoutInfo = workoutData[selectedWorkout];

        function countTotalSets() {
          let totalSets = 0; // Variable zur Speicherung der Gesamtsumme
      
          // Annahme: workoutInfo.data ist ein Array von Objekten mit einer Eigenschaft 'sets'
          for (let i = 0; i < workoutInfo.data.length; i++) {
            totalSets += Number(workoutInfo.data[i].sets); // Konvertiere sets zu einer Zahl und addiere
          }
      
          return totalSets; // Rückgabe der Gesamtsumme
        }
      
        if (workoutInfo) {
          let totalSets = countTotalSets();
          
          displayWorkoutInfo(
            workoutInfo.title,
            workoutInfo.warmup,
            workoutInfo.frequency,
            workoutInfo.reps,
            workoutInfo.weight,
            workoutInfo.goal,
            totalSets,
            `${selectedWorkout}_start_data`
          );
        }
      });

      // Initialize with the default workout
      workoutChoose.dispatchEvent(new Event("change"));
    })
    .catch((error) => console.error(error));
});

function displayWorkoutInfo(title, warmup, frequency, reps, weight, goal, totalSets, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear previous content

  const card = document.createElement("div");
  card.className = "card";

  const titleElement = document.createElement("h1");
  titleElement.textContent = title;
  titleElement.className = "title";
  card.appendChild(titleElement);

  
  const headerElement = document.createElement("h2");
  headerElement.textContent = "Warm-Up";
  headerElement.className = "header";
  card.appendChild(headerElement);

  const warmupElement = document.createElement("p");
  warmupElement.textContent = warmup;
  warmupElement.className = "warmup";
  card.appendChild(warmupElement);

  const descriptionElement = document.createElement("h2");
  descriptionElement.textContent = "Skillz-Guide";
  descriptionElement.className = "header";
  card.appendChild(descriptionElement);

  const frequencyElement = document.createElement("p");
  frequencyElement.textContent = frequency;
  frequencyElement.className = "frequency";
  card.appendChild(frequencyElement);

  const repsElement = document.createElement("p");
  repsElement.textContent = reps;
  repsElement.className = "reps";
  card.appendChild(repsElement);

  const weightElement = document.createElement("p");
  weightElement.textContent = weight;
  weightElement.className = "weight";
  card.appendChild(weightElement);

  const totalSetsElement = document.createElement("p");
  totalSetsElement.textContent = `Absolviere insgesamt ${totalSets} Sätze`;
  totalSetsElement.className = "totalSets";
  card.appendChild(totalSetsElement);

  const goalElement = document.createElement("p");
  goalElement.textContent = goal;
  goalElement.className = "goal";
  card.appendChild(goalElement);

  container.appendChild(card);
}


function startWorkout() {
  window.location.href = "../pages/cards.html";
}


const startTrainingButton = document.getElementById("startTrainingButton");
startTrainingButton.addEventListener("click", startWorkout);