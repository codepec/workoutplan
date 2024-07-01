const workoutChoose = document.getElementById("workoutChoose");

workoutChoose.addEventListener("change", function () {
  if (workoutChoose.value === "fullbodyWorkout") {
    // Display fullbody workout data
    document.getElementById("fullbodyWorkout_data").style.display = "block";
    document.getElementById("threeSplitWorkout1_data").style.display = "none";
    document.getElementById("threeSplitWorkout2_data").style.display = "none";
    document.getElementById("threeSplitWorkout3_data").style.display = "none";
    document.getElementById("fiveSplitWorkout_data").style.display = "none";
  } else if (workoutChoose.value === "threeSplitWorkout1") {
    // Display 3-split workout data
    document.getElementById("fullbodyWorkout_data").style.display = "none";
    document.getElementById("threeSplitWorkout1_data").style.display = "block";
    document.getElementById("threeSplitWorkout2_data").style.display = "none";
    document.getElementById("threeSplitWorkout3_data").style.display = "none";
    document.getElementById("fiveSplitWorkout_data").style.display = "none";
  } else if (workoutChoose.value === "threeSplitWorkout2") {
    document.getElementById("fullbodyWorkout_data").style.display = "none";
    document.getElementById("threeSplitWorkout1_data").style.display = "none";
    document.getElementById("threeSplitWorkout2_data").style.display = "block";
    document.getElementById("threeSplitWorkout3_data").style.display = "none";
    document.getElementById("fiveSplitWorkout_data").style.display = "none";
  } else if (workoutChoose.value === "threeSplitWorkout3") {
    document.getElementById("fullbodyWorkout_data").style.display = "none";
    document.getElementById("threeSplitWorkout1_data").style.display = "none";
    document.getElementById("threeSplitWorkout2_data").style.display = "none";
    document.getElementById("threeSplitWorkout3_data").style.display = "block";
    document.getElementById("fiveSplitWorkout_data").style.display = "none";
  } else if (workoutChoose.value === "fiveSplitWorkout") {
    // Display 5-split workout data
    document.getElementById("fullbodyWorkout_data").style.display = "none";
    document.getElementById("threeSplitWorkout1_data").style.display = "none";
    document.getElementById("threeSplitWorkout2_data").style.display = "none";
    document.getElementById("threeSplitWorkout3_data").style.display = "none";
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
