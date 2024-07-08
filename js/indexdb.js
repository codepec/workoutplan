let db;
const request = indexedDB.open("workoutDB", 1);

request.onupgradeneeded = (event) => {
  db = event.target.result;
  if (!db.objectStoreNames.contains("workouts")) {
    db.createObjectStore("workouts", { keyPath: "exercise" });
  }
};

request.onsuccess = (event) => {
  db = event.target.result;
  console.log("IndexedDB initialized");
};

request.onerror = (event) => {
  console.error("IndexedDB error:", event.target.errorCode);
};

const saveWorkoutState = (exercise, state) => {
  const transaction = db.transaction(["workouts"], "readwrite");
  const store = transaction.objectStore("workouts");
  store.put({ exercise, state });
};

const getWorkoutState = async (exercise) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["workouts"], "readonly");
    const store = transaction.objectStore("workouts");
    const request = store.get(exercise);
    request.onsuccess = (event) => {
      resolve(event.target.result ? event.target.result.state : 0);
    };
    request.onerror = (event) => {
      reject(event.target.errorCode);
    };
  });
};

const resetWorkout = () => {
  clearIndexedDBData();
  resetUI();
};

const clearIndexedDBData = () => {
  const request = indexedDB.open("workoutDB", 1);

  request.onerror = function (event) {
    console.error("IndexedDB error: ", event.target.error);
  };

  request.onsuccess = function (event) {
    const db = event.target.result;
    if (db.objectStoreNames.contains("workouts")) {
      const transaction = db.transaction(["workouts"], "readwrite");
      const objectStore = transaction.objectStore("workouts");
      const clearRequest = objectStore.clear();

      clearRequest.onsuccess = function (event) {
        console.log("IndexedDB: All workout states cleared");
      };

      clearRequest.onerror = function (event) {
        console.error("IndexedDB error: ", event.target.error);
      };
    } else {
      console.error("IndexedDB: 'workouts' object store not found");
    }
  };
};

const resetUI = () => {
  const workoutChoose = document.getElementById("workoutChoose");
  workoutChoose.selectedIndex = 0;
  workoutChoose.dispatchEvent(new Event("change"));
};

const finishTrainingButton = document.getElementById("finishTrainingButton");
finishTrainingButton.addEventListener("click", resetWorkout);
