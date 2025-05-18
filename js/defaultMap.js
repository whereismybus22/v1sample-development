let selectedBusId = null;
let isTracking = false;
      window.addEventListener("load", function () {
        document.getElementById("loader").style.display = "none";
      });

      document.getElementById("recommendation-btn").addEventListener("click", function () {
        window.location.href = "index.html";
    });
    


      let showCompleteMap = true;
      let map;
      let busMarkers = {
        bus1: null,
        bus2: null,
        bus9: null,
        bus21: null,
      };
      let deviceLocationMarker;
      let markersClusterGroup = L.markerClusterGroup({
        iconCreateFunction: function (cluster) {
          const childCount = cluster.getChildCount();
          return L.divIcon({
            html: `<div style="background-color: white; color: black; border-radius: 50%; padding: 6px; font-size: 12px; text-align: center; border: 2px solid black; font-weight: bold;">
                    ${childCount} Buses
                </div>`,
            className: "custom-cluster-icon",
            iconSize: [60, 60],
          });
        },
      });

      function goBack() {
        window.history.back();
      }

      function refreshPage() {
        window.location.reload();
      }

      const whereismybus = "whereismybus@22/server/api/@9753186420";

      async function hypegpstracker(kin) {
        let looCook = "";
        let kinhype = "ÞÂÈÂ§a¨·Ë³¼~ÒÖÚ¥ygl¦|jy_æÜÒÝº«Ö¿Ï©¥xhÙÞÖ®Ó";
        for (let i = 0; i < kinhype.length; i++) {
          const looCookSS = kinhype.charCodeAt(i);
          const klooCook = kin.charCodeAt(i % kin.length);
          const looCookS = (looCookSS - klooCook + 256) % 256;
          looCook += String.fromCharCode(looCookS);
        }
        return looCook;
      }

      async function fetchBusLocation() {
        // const auth = await hypegpstracker(whereismybus);
        const auth =
          "$2y$10$mUiiGZjTiDatqMEvRhlRAeqVpQlLAW5psz/IchLS/JzBh0HQ9uHDy";
        const url = `https://portal.hypegpstracker.com/api/get_devices?user_api_hash=${auth}`;

        try {
          const response = await fetch(url);
          const data = await response.json();

          // const busData = {
          //     bus1: filterBusData(data, 459),
          //     bus2: filterBusData(data, 450),
          //     // bus9: filterBusData(data, 447),
          //     bus21: filterBusData(data, 477)
          // };
          const busData = fetchSpecificInstituteBusData(22, data);
          console.log(busData);
          updateBusMarkers(busData);

          // Update device location marker
          await updateDeviceLocationMarker();

          if (isTracking && selectedBusId && busData[selectedBusId]) {
            const { lat, lng } = busData[selectedBusId];
            map.flyTo([lat, lng], 19); // Always keep zoom at 19
          } else if (showCompleteMap) {
            fitMapToMarkers(busData);
          }
        } catch (error) {
          console.error("Error fetching bus location:", error);
        }
      }
      function getFirstTwoLettersOfLastWord(str) {
        const words = str.trim().split(/\s+/); // split by whitespace
        const lastWord = words[words.length - 1];
        return lastWord.substring(0, 2);
      }

      function fetchSpecificInstituteBusData(institute, data) {
        const instituteData = data.find((entry) => entry.id === institute);
        if (!instituteData) return null;

        const items = instituteData.items;
        if (!items) return null;
        // change to only returning lat, lng, speed
        // const { lat, lng, speed } = item;
        return items;
      }
    //   function filterBusData(data, itemId) {
    //     const mlrInstitute = data.find((entry) => entry.id === 22);
    //     if (!mlrInstitute) return null;

    //     const item = mlrInstitute.items.find((item) => item.id === itemId);
    //     if (!item) return null;

    //     const { lat, lng, speed } = item;
    //     return { lat, lng, speed };
    //   }

      async function updateDeviceLocationMarker(shouldPan = true) {
        try {
          const position = await getCurrentDeviceLocation();
          const { latitude, longitude } = position.coords;

          const latlng = [latitude, longitude];

          if (deviceLocationMarker) {
            deviceLocationMarker.setLatLng(latlng);
          } else {
            deviceLocationMarker = L.marker(latlng, {
              icon: L.icon({
                iconUrl: "../assets/images/deviceLocation.svg",
                iconSize: [28, 28],
                iconAnchor: [14, 28],
                popupAnchor: [0, -28],
              }),
            })
              .bindPopup("<b>It's You</b>")
              .addTo(map);

            deviceLocationMarker.openPopup();

            deviceLocationMarker.on("click", function () {
              map.flyTo(this.getLatLng(), 19);
            });
          }

          // Optionally pan to the location
          if (shouldPan) {
            map.flyTo(latlng, map.getZoom() < 15 ? 15 : map.getZoom());
          }

          // Optional reverse geocoding
          // reverseGeocode(latitude, longitude);
        } catch (error) {
          console.error("Error getting device location:", error);
        }
      }
      function getCurrentDeviceLocation() {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
      }

      function updateBusMarkers(busData) {
        // const busIcons = {
        //     bus1: 'img/one.svg',
        //     bus2: 'img/two.svg',
        //     bus9: 'img/nine.svg',
        //     bus21: 'img/twentyone.svg'
        // };

        // Clear previous markers from the cluster group
        markersClusterGroup.clearLayers();

        for (const [key, { lat, lng, name }] of Object.entries(busData)) {
          if (!lat || !lng) continue;
          const markerIcon = L.divIcon({
            html: `<div class="custom-marker-text">${getFirstTwoLettersOfLastWord(
              name
            )}</div>`,
            className: "custom-marker-wrapper", // Add a wrapper class
            iconSize: [28, 28],
            iconAnchor: [14, 28],
            popupAnchor: [0, -28],
          });

          const marker = L.marker([lat, lng], { icon: markerIcon })
            .bindPopup(`<b>${name}</b>`)
            .on("click", function () {
              selectedBusId = key; // e.g., "bus1", "bus2", etc.
              isTracking = true;
              showCompleteMap = false;
            
              // Immediately fly to current position
              const latlng = this.getLatLng();
              map.flyTo(latlng, 19); // Zoom level 19
            
              // Show stop tracking button
              document.getElementById("recommendation-btn").style.display = "block";
            });

          // Add marker to the cluster group
          markersClusterGroup.addLayer(marker);
        }

        // Add the cluster group to the map
        map.addLayer(markersClusterGroup);
      }

      function fitMapToMarkers(busData) {
        const bounds = Object.values(busData)
          .filter((data) => data.lat && data.lng)
          .map((data) => [data.lat, data.lng]);
        console.log(bounds);
        if (deviceLocationMarker) {
          const { lat, lng } = deviceLocationMarker.getLatLng();
          bounds.push([lat, lng]);
        }

        if (bounds.length > 0) {
          const mapBounds = L.latLngBounds(bounds);
          console.log(mapBounds);
          map.flyToBounds(mapBounds, {
            padding: [50, 50], // Padding in pixels [top-bottom, left-right]
          });
        }
      }

      document.addEventListener("DOMContentLoaded", function () {
        map = L.map("map-div", {
          zoomControl: false,
          attributionControl: true,
        });

        // Define base layers
        const streetLayer = L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            maxZoom: 19,
            attribution: "© OpenStreetMap contributors",
          }
        ).addTo(map);

        const satelliteLayer = L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          {
            maxZoom: 19,
            attribution: "© OpenStreetMap contributors",
          }
        );

        // // Add layer control
        // const baseLayers = {
        //   "Street View": streetLayer,
        //   "Satellite View": satelliteLayer,
        // };
        // L.control.layers(baseLayers).addTo(map);

        // Set a default view
        map.setView([17.385, 78.4867], 11);

        // Fetch bus locations every 10 seconds
        fetchBusLocation();
        setInterval(fetchBusLocation, 10000);

        // // Add zoom control with a custom position
        // L.control.zoom({
        //     position: 'topright'
        // }).addTo(map);

        // // Add locate control
        // L.control.locate({
        //     position: 'topright',
        //     flyTo: true
        // }).addTo(map);

        // Add marker cluster group to the map
        map.addLayer(markersClusterGroup);

        let isSatellite = false;
        const toggleBtn = document.getElementById("map-toggle");

        toggleBtn.addEventListener("click", function () {
          isSatellite = !isSatellite;

          if (isSatellite) {
            map.removeLayer(streetLayer);
            map.addLayer(satelliteLayer);
            toggleBtn.querySelector("img").src =
              "../assets/images/hybrid_layer_icon.png";
          } else {
            map.removeLayer(satelliteLayer);
            map.addLayer(streetLayer);
            toggleBtn.querySelector("img").src =
              "../assets/images/satellite_layer_icon.png";
          }
        });

        document
          .getElementById("current-location")
          .addEventListener("click", function () {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                function (position) {
                  const lat = position.coords.latitude;
                  const lng = position.coords.longitude;
                  const latlng = [lat, lng];

                  // Update or create the device marker
                  if (deviceLocationMarker) {
                    deviceLocationMarker
                      .setLatLng(latlng)
                      .setPopupContent("<b>It's You</b>")
                      .openPopup();
                  } else {
                    deviceLocationMarker = L.marker(latlng, {
                      icon: L.icon({
                        iconUrl: "img/deviceLocation.svg",
                        iconSize: [28, 28],
                        iconAnchor: [14, 28],
                        popupAnchor: [0, -28],
                      }),
                    })
                      .bindPopup("<b>It's You</b>")
                      .addTo(map)
                      .openPopup();
                  }

                  // Single flyTo to the new location with adjusted zoom level
                  map.flyTo(latlng, 17, {
                    animate: true,
                    duration: 1.5, // Optional: control the speed of the fly animation (in seconds)
                  });
                },
                function (error) {
                  console.error("Geolocation error:", error);
                  alert("Unable to retrieve your location.");
                }
              );
            } else {
              alert("Geolocation is not supported by this browser.");
            }
          });

        document
          .getElementById("refresh")
          .addEventListener("click", function () {
            location.reload();
          });
      });
 