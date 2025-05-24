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
