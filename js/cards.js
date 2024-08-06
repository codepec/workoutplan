document.addEventListener("DOMContentLoaded", async () => {
  const workoutCards = document.getElementById("workoutCards");
  const workoutChoosen = document.getElementById("workoutChoosen");

  // Load the audio files
  const audio4 = new Audio("../sounds/break-converted_final.wav");
  const audio3 = new Audio("../sounds/3-converted_final.wav");
  const audio2 = new Audio("../sounds/2-converted_final.wav");
  const audio1 = new Audio("../sounds/1-converted_final.wav");
  const audio0 = new Audio("../sounds/continue2-converted_final.wav");

  async function fetchExercises() {
    try {
      const workoutType = await getWorkoutState() || "data_fullbody"; // Default to "data_fullbody"
      console.log(`Fetched workout type: ${workoutType}`); // Debugging log
  
      const response = await fetch('../data.json');
      if (!response.ok) {
        throw new Error('Netzwerkantwort war nicht okay.');
      }
      
      const allWorkouts = await response.json();
      console.log('Fetched all workouts:', allWorkouts); // Log fetched workouts
  
      const exercises = allWorkouts[workoutType];
      if (!exercises) {
        throw new Error('Übungen nicht gefunden.');
      }
      displayExerciseCards(exercises);
    } catch (error) {
      console.error('Fehler beim Laden der Übungen:', error);
      workoutCards.innerHTML = "<p>Fehler beim Laden der Übungen.</p>";
    }
  }

  function updateWorkoutChoosen(exercise) {
    workoutChoosen.textContent = `${exercise.title}`;
  }

  function displayExerciseCards(exercises) {
    let currentExerciseIndex = 0;
    let currentSet = 0;

    function showNextExercise() {
      if (currentExerciseIndex < exercises.length) {
        currentSet = 0;
        const exercise = exercises[currentExerciseIndex];
        const card = createExerciseCard(exercise, currentSet);
        workoutCards.innerHTML = ""; // Clear previous cards
        workoutCards.appendChild(card);

        const pauseButton = card.querySelector("#pauseButton");
        const pauseElement = card.querySelector("#pause");

        pauseButton.addEventListener("click", () => {
          handleSetCompletion(card, exercise, pauseButton, pauseElement);
        });

        updateWorkoutChoosen(exercise); // Update chosen workout title
      } else {
        displayCompletionMessage(); // All exercises complete
      }
    }

    function handleSetCompletion(card, exercise, pauseButton, pauseElement) {
      startPauseCountdown(exercise.pause, pauseElement, pauseButton, () => {
        currentSet++;
        console.log("Current set incremented:", currentSet); // Log to verify increment

        const setDisplay = card.querySelector(".set-display");

        if (setDisplay) {
          setDisplay.textContent = `Sätze: ${currentSet} / ${exercise.sets}`;
        } else {
          console.error("Set display element not found in card:", card);
        }

        if (currentSet >= exercise.sets) {
          pauseButton.textContent = "Next Exercise";
          pauseButton.disabled = true;  // Disable button briefly
          setTimeout(() => {
            workoutCards.removeChild(card);
            currentExerciseIndex++;
            showNextExercise();
          }, 1000);
        } else {
          updateProgressBar(card, exercise.sets);
        }
      });
    }

    function updateProgressBar(card, totalSets) {
      const progressBarFill = card.querySelector(".progress-bar-fill");
      const progressPercentage = (currentSet / totalSets) * 100;
      progressBarFill.style.width = `${progressPercentage}%`;
    }

    showNextExercise();
  }

  function createExerciseCard(exercise, currentSet) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2>${exercise.exercise}</h2>
      <p class="set-display">Sätze: ${currentSet} / ${exercise.sets}</p>
      <div class="progress-bar">
        <div class="progress-bar-fill" style="width: 0%;"></div>
      </div>
      <p>Wiederholungen: ${exercise.repetitions}</p>
      <p>Gewicht: ${exercise.weight} kg</p>
      <p id="pause">Pause: ${exercise.pause} Sekunden</p>
      <button id="pauseButton">Take a Break</button>
    `;
    return card;
  }

  function startPauseCountdown(initialPause, pauseElement, pauseButton, callback) {
    pauseButton.disabled = true;
    let remainingTime = initialPause;
    pauseElement.textContent = `Pause: ${remainingTime} Sekunden`;

    const countdownInterval = setInterval(() => {
      remainingTime -= 1;
      pauseElement.textContent = `Pause: ${remainingTime} Sekunden`;

      if (remainingTime === 4) {
        audio4.play();
      } else if (remainingTime === 3) {
        audio3.play();
      } else if (remainingTime === 2) {
        audio2.play();
      } else if (remainingTime === 1) {
        audio1.play();
      } else if (remainingTime === 0) {
        audio0.play();
      }

      if (remainingTime < 0) {
        clearInterval(countdownInterval);
        pauseElement.textContent = `Pause: ${initialPause} Sekunden`;
        pauseButton.disabled = false;
        pauseButton.textContent = "Take a Break";

        if (callback && typeof callback === "function") {
          callback();
        }
      }
    }, 1000);
  }

  function displayCompletionMessage() {
    workoutCards.innerHTML = "<p>Workout abgeschlossen!</p>";
  }

  fetchExercises();
});
