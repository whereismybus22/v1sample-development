window.addEventListener("DOMContentLoaded", () => {
  startTimer();

  const lottiePlayer = document.querySelector('dotlottie-player');

  lottiePlayer.addEventListener('complete', function() {
    document.getElementById("splashScreen").style.display = "none";
    document.getElementById("trackerContent").style.display = "block";
    document.getElementById("mapContainer").style.display = "flex";
  });
});

let timer = 0;
let timerInterval;

function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    document.getElementById("timerDisplay").textContent = `Timer: ${timer}`;
  }, 1000); 
}

const routeElement = document.getElementById("routeNumber");
const routeValue = localStorage.getItem("defaultBusRoute");

if (routeValue) {
  const routeNumberOnly = routeValue.match(/\d+/);
  if (routeNumberOnly) {
    routeElement.textContent = `Route ${routeNumberOnly[0]}`;
  } else {
    routeElement.textContent = "Route --"; 
  }
} 


[
  ["route1","Route 1",446],
  ["route2","Route 2",447],
  ["route3","Route 3",448],
  ["route4","Route 4",447],
  ["route1","Route 1",446],
  ["route1","Route 1",446],
]