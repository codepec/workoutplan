const dbName = "workoutDB";
const storeName = "selectedWorkouts";

// Open or create the database
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 2); // Increment version if you change schema

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(`Database error: ${event.target.errorCode}`);
    };
  });
}

// Save the workout state
async function saveWorkoutState(workout) {
  try {
    const db = await openDB();
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);

    const workoutData = {
      workout: workout,
      timestamp: new Date().toISOString(),
    };

    const request = store.add(workoutData);

    request.onsuccess = () => {
      console.log("Workout saved:", workoutData);
    };

    request.onerror = (event) => {
      console.error("Error saving workout:", event.target.errorCode);
    };
  } catch (error) {
    console.error("Error in saveWorkoutState:", error);
  }
}

// Get the workout state
async function getWorkoutState() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 2); // Increment version if you change schema

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction([storeName], "readonly");
      const objectStore = transaction.objectStore(storeName);

      const getRequest = objectStore.openCursor();
      getRequest.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          resolve(cursor.value.workout);
        } else {
          resolve(null); // No data found
        }
      };

      getRequest.onerror = () => {
        reject("Error fetching workout state");
      };
    };

    request.onerror = (event) => {
      reject("Database error: " + event.target.errorCode);
    };
  });
}
