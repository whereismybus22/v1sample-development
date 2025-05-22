document.addEventListener("DOMContentLoaded", function () {
  const mlrit = { lat: 17.595580940309862, lng: 78.44159359579915 }; 
  const map = new google.maps.Map(document.getElementById("map"), {
    center: mlrit,
    zoom: 18,
    disableDefaultUI: true,
    gestureHandling: "greedy",
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }],
  });

  const marker = new google.maps.Marker({
    position: mlrit,
    map: map,
    draggable: true,
    icon: {
      url: "../assets/images/default_bus_stop_icon.svg",
      scaledSize: new google.maps.Size(40, 40)
    }
  });

  // Load default bus stop from local storage
  const storedBusStop = localStorage.getItem("defaultBusStop");
  if (storedBusStop) {
    const busStopData = JSON.parse(storedBusStop);
    const busStopPosition = { lat: busStopData.lat, lng: busStopData.lng };
    marker.setPosition(busStopPosition);
    map.panTo(busStopPosition);
    updateLocationInfo("Default Bus Stop", "Location loaded from storage");
  }

  const input = document.getElementById("search-input");
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);
  autocomplete.addListener("place_changed", function () {
    const place = autocomplete.getPlace();
    if (!place.geometry) return;
    map.panTo(place.geometry.location);
    marker.setPosition(place.geometry.location);
    updateLocationInfo(place.name, place.formatted_address);
  });

  marker.addListener("dragend", () => {
    const pos = marker.getPosition();
    reverseGeocode(pos.lat(), pos.lng());
  });

  map.addListener("click", function (event) {
    const pos = event.latLng;
    marker.setPosition(pos);
    map.panTo(pos);
    reverseGeocode(pos.lat(), pos.lng());
  });

  function reverseGeocode(lat, lng) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, function (results, status) {
      if (status === "OK" && results[0]) {
        const name = results[0].name || results[0].formatted_address.split(",")[0];
        const address = results[0].formatted_address;
        updateLocationInfo(name, address);
      }
    });
  }

  function updateLocationInfo(name, address) {
    document.getElementById("location-name").textContent = name;
    document.getElementById("location-address").textContent = address;
  }

  let isSatellite = false;
  const toggleBtn = document.getElementById("map-toggle");
  toggleBtn.addEventListener("click", function () {
    isSatellite = !isSatellite;
    map.setMapTypeId(
      isSatellite
        ? google.maps.MapTypeId.HYBRID
        : google.maps.MapTypeId.ROADMAP
    );
    toggleBtn.querySelector("img").src = isSatellite
      ? "../assets/images/hybrid_layer_icon.png"
      : "../assets/images/satellite_layer_icon.png";
  });

  document
    .getElementById("current-location")
    .addEventListener("click", function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.panTo(pos);
          marker.setPosition(pos);
          reverseGeocode(pos.lat, pos.lng);
        });
      }
    });

  document.getElementById("refresh").addEventListener("click", function () {
    location.reload();
  });

  // Save and Cancel button
  document.getElementById("save-btn").addEventListener("click", function () {
    const pos = marker.getPosition();
    const busStopData = { lat: pos.lat(), lng: pos.lng() };

    localStorage.setItem("defaultBusStop", JSON.stringify(busStopData));
    document.getElementById("busSelectSave").classList.remove("hidden");
  });

  document.getElementById("cancel-btn").addEventListener("click", function () {
    const busStopData = localStorage.getItem("defaultBusStop");

    if (busStopData) {
      window.location.href = "/index.html"; 
    } else {
      document.getElementById("busSelectCancel").classList.remove("hidden");
    }
  });

  document.getElementById("ackSaveok").addEventListener("click", function () {
    document.getElementById("busSelectSave").classList.add("hidden");
    window.location.href = "/index.html"; 
  });

  document.getElementById("ackCancelok").addEventListener("click", function () {
    document.getElementById("busSelectCancel").classList.add("hidden");
  });
  window.onload = function() {
  const infoBtn = document.getElementById("info-btn");

  const isFirstVisit = localStorage.getItem("visitedBusStopPage") === null;
  console.log("isFirstVisit:", isFirstVisit);


  if (isFirstVisit) {
    setTimeout(() => {
    infoBtn.classList.add("expanded");
    localStorage.setItem("visitedBusStopPage", "true");
    }, 400);
  }

  infoBtn.addEventListener("click", function () {
    infoBtn.classList.toggle("expanded");
  });
}
});
