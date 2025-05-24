
let startTime = Date.now();
let timerInterval;
let elapsedTime = 0;
function updateTimer() {
  elapsedTime++;
  document.getElementById('loadingTime').innerText = `${elapsedTime} seconds`;
}

timerInterval = setInterval(updateTimer, 1000);

setTimeout(() => {
  clearInterval(timerInterval); 
  document.getElementById('splashScreen').style.display = 'none';
  document.getElementById('trackerContent').style.display = 'block';
}, 5000); 
window.addEventListener("DOMContentLoaded", () => {
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
});
