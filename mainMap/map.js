var istTime = new Date().getHours();
// console.log(istTime);

let previousBusLocation = [0, 0];
let presentBusLocation = [0, 0];
let toLocation;


if (localStorage.getItem('defaultBusStop')) {
  var studentStopLocation = [JSON.parse(localStorage.getItem('defaultBusStop')).lat, JSON.parse(localStorage.getItem('defaultBusStop')).lng];
  toLocation = studentStopLocation;
}

// var studentStopLocation = [17.595580940309862, 78.44159359579915];

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function parseCoordinates(coordinates) {
  return coordinates
    .replace("[", "")
    .replace("]", "")
    .split(",")
    .map((coord) => parseFloat(coord.trim()));
}

let busMarker;
let shouldFollowMarker = false;
let shouldCalculateRoute = false;

function calculateDistanceTimeSpeed(locationOne, locationTwo, speed) {
  return new Promise((resolve, reject) => {
    const map = L.map(document.createElement("div")).setView(
      [20.5937, 78.9629],
      5
    );

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(locationOne[0], locationOne[1]),
        L.latLng(locationTwo[0], locationTwo[1]),
      ],
      createMarker: () => null,
      routeWhileDragging: false,
      addWaypoints: false,
      fitSelectedRoutes: false,
      show: false,
    }).addTo(map);

    routingControl.on("routesfound", function (e) {
      const routes = e.routes;
      const summary = routes[0].summary;
      const distanceKm = summary.totalDistance / 1000;
      let timeHr = 0;

      // if (speed != 0) {
      timeHr = distanceKm / 20;
      // }
      // console.log(summary.totalTime / 60);

      let distance, time;
      if (distanceKm < 1) {
        distance = summary.totalDistance.toFixed(0) + "m";
      } else {
        const km = Math.floor(distanceKm);
        const meters = ((distanceKm - km) * 1000).toFixed(0);
        distance = `${km}km ${meters}m`;
      }

      // if (speed != 0) {
      if (timeHr < 1) {
        time = (timeHr * 60).toFixed(0) + "min";
      } else {
        const hours = Math.floor(timeHr);
        const minutes = ((timeHr - hours) * 60).toFixed(0);
        time = `${hours}hr ${minutes}min`;
      }
      // } else {
      //     time = 'Stationary';
      // }

      resolve({
        distance,
        time,
      });
    });

    routingControl.on("routingerror", function (err) {
      reject(err);
    });
  });
}

async function fetchBusLocation() {

  // const auth = await hypegpstracker(whereismybus);
  const auth = '$2y$10$mUiiGZjTiDatqMEvRhlRAeqVpQlLAW5psz/IchLS/JzBh0HQ9uHDy';
  const url = `https://portal.hypegpstracker.com/api/get_devices?user_api_hash=${auth}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const filteredData = filterData(data);

    if (!filteredData) {
      console.error(
        "MLR Institute of Technology or the item with id 446 not found"
      );
      return;
    }

    previousBusLocation = [...presentBusLocation];
    presentBusLocation = [filteredData.lat, filteredData.lng];
    // console.log(presentBusLocation);
    // console.log(shouldFollowMarker);

    if (isUserBusSet) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const bounds = L.latLngBounds([
              [latitude, longitude],
              presentBusLocation
            ]);
            map.fitBounds(bounds, { padding: [40, 80, 40, 40] });

            // Add or update user location marker with custom icon
            if (userLocationMarker) {
              userLocationMarker.setLatLng([latitude, longitude]).update();
            } else {
              userLocationMarker = L.marker([latitude, longitude], { icon: userLocationIcon }).addTo(map);
            }
            // userLocationMarker.bindPopup(`[${latitude},${longitude}]`).openPopup();
            userLocationMarker.bindPopup("<b>It's You</b>").openPopup();
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                alert("You denied the request for Geolocation. Please enable location services in your browser settings.");
                break;
              case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                alert("The request to get your location timed out.");
                break;
              case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
            }
          },
          { enableHighAccuracy: true }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }


    if (
      previousBusLocation[0] !== presentBusLocation[0] ||
      previousBusLocation[1] !== presentBusLocation[1]
    ) {
      if (!busMarker) {
        busMarker = L.marker(presentBusLocation, {
          icon: L.icon({
            iconUrl: "../img/logo.svg",
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          }),
        }).addTo(map);

        busMarker.on("click", function () {
          shouldFollowMarker = true;
          polyline.setStyle({ weight: 0 });
          document.querySelector(
            ".follow-marker-button"
          ).style.backgroundColor = "white";
          map.flyTo(presentBusLocation, 19, {
            animate: true,
          });
          map.once("zoomend", function () {
            polyline.setStyle({ weight: 3 });
            shouldFollowMarker = true;
            document.querySelector(
              ".follow-marker-button"
            ).style.backgroundColor = "white";
          });
          isUserBusSet = false;  // Variable to keep track of toggle state 
          document.querySelector('.set-user-bus-button img').src = "../img/follow_user.png";
        });
      } else {
        animateMarker(busMarker, previousBusLocation, presentBusLocation, 3000);
      }

      if (shouldFollowMarker) {
        map.flyTo(presentBusLocation, 19, {
          animate: true,
        });
      }
      /*fetch adreess*/
      const address = await getAddressFromCoords({ lat: presentBusLocation[0], lon: presentBusLocation[1] });
      document.getElementById("location").textContent = address;

      if (!shouldFollowMarker) {
        map.invalidateSize();
        map.fitBounds(polyline.getBounds(), { padding: [40, 40, 40, 40] });
      }

      const speedd = Math.round(filteredData.speed);
      if (localStorage.getItem("defaultBusStop") !== null) {
        const result = await calculateDistanceTimeSpeed(
          presentBusLocation,
          toLocation,
          filteredData.speed
        );
        document.getElementById("distance").textContent = result.distance;
        document.getElementById("time").textContent = result.time;
        document.getElementById("speed").textContent = `${speedd}kmph`;
      }
      else {
        document.getElementById("speed-value").textContent = speedd;
      }
    } else {
      if (shouldCalculateRoute === true) {
        const speedd = Math.round(filteredData.speed);
        if (localStorage.getItem("defaultBusStop") !== null) {
          const result = await calculateDistanceTimeSpeed(
            presentBusLocation,
            toLocation,
            filteredData.speed
          );
          document.getElementById("distance").textContent = result.distance;
          document.getElementById("time").textContent = result.time;
          document.getElementById("speed").textContent = `${speedd}kmph`;
        }
        else {
          document.getElementById("speed-value").textContent = speedd;
        }
        shouldCalculateRoute = false;
      }
    }
  } catch (error) {
    console.error("Error fetching bus location:", error);
  }
}

function filterData(data) {
  const mlrInstitute = data.find((entry) => entry.title === "mlrit.whereismybus@gmail.com");
  if (!mlrInstitute) return null;

  const item = mlrInstitute.items.find((item) => item.id === thisRouteID);
  if (!item) return null;

  const { lat, lng, speed } = item;
  return { lat, lng, speed };
}


function interpolatePosition(start, end, progress) {
  const lat = start[0] + (end[0] - start[0]) * progress;
  const lng = start[1] + (end[1] - start[1]) * progress;
  return [lat, lng];
}

function animateMarker(marker, start, end, duration) {
  const startTime = performance.now();

  function animate() {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const position = interpolatePosition(start, end, progress);
    marker.setLatLng(position);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

function toggleFollowMarker() {
  shouldFollowMarker = true;
  // console.log(shouldFollowMarker);
  polyline.setStyle({ weight: 0 });
  document.querySelector(".follow-marker-button").style.backgroundColor =
    "white";
  map.flyTo(presentBusLocation, 19, {
    animate: true,
  });
  map.once("zoomend", function () {
    polyline.setStyle({ weight: 3 });
    document.querySelector(".follow-marker-button").style.backgroundColor =
      "white";
  });
  isUserBusSet = false;  // Variable to keep track of toggle state 
  document.querySelector('.set-user-bus-button img').src = "../img/follow_user.png";

}
async function getAddressFromCoords({ lat, lon }) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    return data.display_name || 'Address not found';
  } catch (error) {
    console.error('Error fetching address:', error);
    return 'Error fetching address';
  }
}

var sourceLocation;
var destinationLocation;
var polyline;

var streetLayer = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors",
  }
);

var satelliteLayer = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors",
  }
);

var baseMaps = {
  "Street View": streetLayer,
  "Satellite View": satelliteLayer,
};

var map = L.map("map", {
  zoomControl: false,
  attributionControl: true,
  attribution: "© OpenStreetMap contributors",
  layers: [streetLayer], // Default layer is street view
  zoomSnap: 0.25, // Adjust this value as needed
}).setView([0, 0], 19);

var path = "";
if (istTime >= 2 && istTime <= 13) {
  path = `/vehicleRoutes/morning/${thisRoute}.json`;
} else {
  path = `/vehicleRoutes/evening/${thisRoute}.json`;
}

fetch(path)
  .then((response) => response.json())
  .then((data) => {
    var coordinates = data;
    polyline = L.polyline(coordinates, { color: "black", weight: 3 }).addTo(
      map
    );
    map.fitBounds(polyline.getBounds(), { padding: [30, 30, 30, 30] });

    sourceLocation = coordinates[0];
    var sourceMarker = L.marker(sourceLocation, {
      icon: L.icon({
        iconUrl: "../img/firstStop.svg",
        iconSize: [40, 40],
        iconAnchor: [16, 32],
      }),
    }).addTo(map);

    sourceMarker.on("click", function () {
      polyline.setStyle({ weight: 0 });
      map.flyTo(sourceLocation, 19, {
        animate: true,
      });
      map.once("zoomend", function () {
        polyline.setStyle({ weight: 3 });
      });
      isUserBusSet = false;  // Variable to keep track of toggle state 
      document.querySelector('.set-user-bus-button img').src = "../img/follow_user.png";

    });
    destinationLocation = coordinates[coordinates.length - 1];
    var destinationMarker = L.marker(destinationLocation, {
      icon: L.icon({
        iconUrl: "../img/college.svg",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      }),
    }).addTo(map);

    destinationMarker.on("click", function () {
      polyline.setStyle({ weight: 0 });
      map.flyTo(destinationLocation, 19, {
        animate: true,
      });
      map.once("zoomend", function () {
        polyline.setStyle({ weight: 3 });
      });
      isUserBusSet = false;  // Variable to keep track of toggle state 
      document.querySelector('.set-user-bus-button img').src = "../img/follow_user.png";

    });
  })
  .catch((error) => console.error("Error fetching coordinates.json:", error));

var isStreetView = true;

function toggleMapLayer() {
  if (isStreetView) {
    map.removeLayer(streetLayer);
    map.addLayer(satelliteLayer);
    polyline.setStyle({ color: "#1036cc", weight: 3 });
    document.getElementById("layerButtonImg").src = "../img/toStreet.svg";
    document.getElementById("layerButton").classList.add("active");
  } else {
    map.removeLayer(satelliteLayer);
    map.addLayer(streetLayer);
    polyline.setStyle({ color: "black", weight: 3 });
    document.getElementById("layerButtonImg").src = "../img/toSatellite.svg";
    document.getElementById("layerButton").classList.remove("active");
  }
  isStreetView = !isStreetView;
}

if (studentStopLocation) {
  var studentStopMarker = L.marker(studentStopLocation, {
    icon: L.icon({
      iconUrl: "../img/studentStop.svg",
      iconSize: [35, 35],
      iconAnchor: [16, 32],
    }),
  }).addTo(map);

  studentStopMarker.on("click", function () {
    polyline.setStyle({ weight: 0 });
    map.flyTo(studentStopLocation, 19, {
      animate: true,
    });
    map.once("zoomend", function () {
      polyline.setStyle({ weight: 3 });
    });
    isUserBusSet = false;  // Variable to keep track of toggle state 
    document.querySelector('.set-user-bus-button img').src = "../img/follow_user.png";

  });
}

map.on("dragstart", function () {
  shouldFollowMarker = false;
  // console.log(shouldFollowMarker);
  document.querySelector(".follow-marker-button").style.backgroundColor =
    "yellow";
  isUserBusSet = false;  // Variable to keep track of toggle state 
  document.querySelector('.set-user-bus-button img').src = "../img/follow_user.png";
  if (userLocationMarker) {
    userLocationMarker.remove();  // This hides the marker
    userLocationMarker = null;
  }

});

fetchBusLocation();
setInterval(fetchBusLocation, 10000);
