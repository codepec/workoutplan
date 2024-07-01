const workoutChoose = document.getElementById("workoutChoose");

workoutChoose.addEventListener("change", function () {
  if (workoutChoose.value === "fullbodyWorkout") {
    console.log("hello fullbody");
    // Display fullbody workout data
    document.getElementById("fullbodyWorkout_data").style.display = "block";
    document.getElementById("threeSplitWorkout_data").style.display = "none";
    document.getElementById("fiveSplitWorkout_data").style.display = "none";
  } else if (workoutChoose.value === "threeSplitWorkout") {
    console.log("hello 3-split");
    // Display 3-split workout data
    document.getElementById("fullbodyWorkout_data").style.display = "none";
    document.getElementById("threeSplitWorkout_data").style.display = "block";
    document.getElementById("fiveSplitWorkout_data").style.display = "none";
  } else if (workoutChoose.value === "fiveSplitWorkout") {
    console.log("hello 5-split");
    // Display 5-split workout data
    document.getElementById("fullbodyWorkout_data").style.display = "none";
    document.getElementById("threeSplitWorkout_data").style.display = "none";
    document.getElementById("fiveSplitWorkout_data").style.display = "block";
  } else {
    alert("Workout-Pläne werden noch erstellt.");
    console.log(workoutChoose.value);
  }
});

/* When the user clicks on the button,
  toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
