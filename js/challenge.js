const cities = [
  {
    name: "Munich",
    tasks: [
      "Crush the Oktoberfest with your incredible squats",
      "Flex your muscles in the Englischer Garten with pull-ups",
      "Sprint through the Munich Airport terminals",
    ],
    enabled: true,
  },
  {
    name: "Barcelona",
    tasks: [
      "Power through a stair climb at the Sagrada Familia",
      "Perform beach sprints at Barceloneta",
      "Master push-ups in the Park Güell",
    ],
    enabled: false,
  },
  {
    name: "Tokyo",
    tasks: [
      "Conquer the steps to Tokyo Tower",
      "Engage in a cardio session through Shinjuku Gyoen Park",
      "Stretch and meditate at the Meiji-Schrein",
    ],
    enabled: false,
  },
  {
    name: "New York",
    tasks: [
      "Power walk to the top of the Statue of Liberty",
      "Run a lap around Central Park",
      "Do jumping jacks at Times Square",
    ],
    enabled: false,
  },
  {
    name: "Paris",
    tasks: [
      "Climb the Eiffel Tower stairs",
      "Do lunges at the Louvre",
      "Jog along the Seine River",
    ],
    enabled: false,
  },
  {
    name: "London",
    tasks: [
      "Perform push-ups at Buckingham Palace",
      "Sprint around the Tower of London",
      "Do yoga in Hyde Park",
    ],
    enabled: false,
  },
];

const workoutsContainer = document.getElementById("workoutsContainer");

window.onload = function () {
  createXPBar();
  createCityWorkouts();
  enableCity(1);
};

function createXPBar() {
  const xpBars = document.getElementById("xpBars");
  // Add logic to create XP bars for all cities if needed
}

function createCityWorkouts() {
  cities.forEach((city, index) => {
    const cityDiv = document.createElement("div");
    cityDiv.className = "workout";
    cityDiv.id = `city${index + 1}`;
    cityDiv.dataset.enabled = city.enabled;

    const cityHeader = document.createElement("h2");
    cityHeader.textContent = city.name;
    const trophySpan = document.createElement("span");
    trophySpan.className = "trophy tooltip";
    trophySpan.title = "Trophäe für alle Aufgaben abgeschlossen";
    trophySpan.textContent = "🏆";
    cityHeader.appendChild(trophySpan);

    const xpSpan = document.createElement("span");
    xpSpan.className = "xp";
    xpSpan.textContent = "0"; // Initial XP

    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";

    const progressFill = document.createElement("div");
    progressFill.className = "progress-fill";
    progressFill.id = `city${index + 1}-progress`;
    progressBar.appendChild(progressFill);

    cityDiv.appendChild(cityHeader);
    cityDiv.appendChild(xpSpan);
    cityDiv.appendChild(progressBar);

    city.tasks.forEach((task, taskIndex) => {
      const taskP = document.createElement("p");
      taskP.className = `task${taskIndex + 1}`;
      taskP.textContent = `${taskIndex + 1}. ${task}`;

      const taskButton = document.createElement("button");
      taskButton.className = "complete-btn";
      taskButton.textContent = "Abschließen";
      taskButton.onclick = () => {
        console.log(
          `Button clicked for task ${taskIndex + 1} in city ${index + 1}`
        ); // Debug log
        completeTask(index + 1, taskIndex + 1);
      };
      taskButton.disabled = !city.enabled;

      cityDiv.appendChild(taskP);
      cityDiv.appendChild(taskButton);
    });

    workoutsContainer.appendChild(cityDiv);
  });
}

function completeTask(cityIndex, taskIndex) {
  const taskElement = document.querySelector(
    `#city${cityIndex} .task${taskIndex}`
  );
  if (taskElement && !taskElement.classList.contains("complete")) {
    taskElement.classList.add("complete");
    addXP(cityIndex, 10); // XP hinzufügen, wenn die Aufgabe noch nicht abgeschlossen ist
    const completeButton = taskElement.nextElementSibling; // Nächster Geschwisterknoten ist der Button
    if (completeButton) {
      completeButton.disabled = true; // Button deaktivieren, um erneutes Klicken zu verhindern
    }
    checkAllTasksCompleted(cityIndex); // Überprüfen, ob alle Aufgaben abgeschlossen sind
  }
}

function checkAllTasksCompleted(cityIndex) {
  const cityTasks = cities[cityIndex - 1].tasks; // Index beachten, da cityIndex 1-basiert ist
  const completedTasks = document.querySelectorAll(
    `#city${cityIndex} .task.complete`
  );

  if (completedTasks.length === cityTasks.length) {
    unlockTrophy(cityIndex); // Alle Aufgaben abgeschlossen, Trophäe anzeigen
  }
}

function unlockTrophy(cityIndex) {
  const trophyElement = document.querySelector(`#city${cityIndex} .trophy`);
  if (trophyElement) {
    trophyElement.style.display = "inline-block";
  }
  if (cityIndex < cities.length) {
    enableCity(cityIndex + 1);
  }
}

function addXP(cityIndex, xpToAdd) {
  const xpElement = document.querySelector(`#city${cityIndex} .xp`);
  const progressFill = document.querySelector(`#city${cityIndex}-progress`);

  let currentXP = parseInt(xpElement.textContent);
  console.log(`Current XP for city ${cityIndex}: ${currentXP}`); // Debug log
  let newXP = currentXP + xpToAdd;
  console.log(`New XP for city ${cityIndex} (before limit check): ${newXP}`); // Debug log

  // Ensure XP does not exceed 30
  if (newXP > 30) {
    newXP = 30;
  }
  console.log(`New XP for city ${cityIndex} (after limit check): ${newXP}`); // Debug log

  xpElement.textContent = newXP;

  const maxXP = 30;
  const progressPercentage = (newXP / maxXP) * 100;
  console.log(
    `Progress percentage for city ${cityIndex}: ${progressPercentage}%`
  ); // Debug log
  progressFill.style.width = `${progressPercentage}%`;

  if (newXP >= maxXP) {
    unlockTrophy(cityIndex);
  }
}

function updateStrengthBar() {
  const overallProgress = document.getElementById("overall-progress");
  const maxTotalXP = 180;
  const progressPercentage = (totalXP / maxTotalXP) * 100;
  overallProgress.style.width = `${progressPercentage}%`;
}

function unlockTrophy(cityIndex) {
  const trophyElement = document.querySelector(`#city${cityIndex} .trophy`);
  if (trophyElement) {
    trophyElement.style.display = "inline-block";
  }
  if (cityIndex < cities.length) {
    enableCity(cityIndex + 1);
  }
}

function enableCity(cityIndex) {
  const cityDiv = document.getElementById(`city${cityIndex}`);
  if (cityDiv) {
    cityDiv.dataset.enabled = true;
    cityDiv
      .querySelectorAll("button.complete-btn")
      .forEach((button) => (button.disabled = false));
  }
}
