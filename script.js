const workoutDays = document.getElementById("workoutDays");

workoutDays.addEventListener("change", function () {
  if (workoutDays.value === "threeDays") {
  } else {
    alert("Workout-Pläne werden noch erstellt.");
  }
});

const chooseLanguage = document.getElementById("chooseLanguage");

chooseLanguage.addEventListener("change", function () {
  if (chooseLanguage.value === "german") {
  } else {
    alert("work in progress");
  }
});


  /* When the user clicks on the button,
  toggle between hiding and showing the dropdown content */
  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

