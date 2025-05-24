function displayRoute() {
  // Get the pathname from the URL, e.g., "/route1/" or "/route1"
  const path = window.location.pathname;

  // Remove leading/trailing slashes and extract the route part
  const route = path.replace(/^\/|\/$/g, ''); // removes both starting and ending slash

  // Return the route
  return route;
}
