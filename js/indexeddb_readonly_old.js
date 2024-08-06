const dbName = "workoutDB";
const storeName = "selectedWorkouts";

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

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

function getWorkoutState(key) {
  return new Promise((resolve, reject) => {
    openDB().then((db) => {
      const transaction = db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);

      const getRequest = store.get(1);  // Assuming ID 1 is used for storing workout state
      getRequest.onsuccess = () => {
        const result = getRequest.result;
        resolve(result ? result.workout : null);
      };
      getRequest.onerror = () => {
        reject("Error fetching workout state");
      };
    }).catch((error) => {
      reject("Database error: " + error);
    });
  });
}
