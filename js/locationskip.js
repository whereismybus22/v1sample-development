document.getElementById('skipButton2').addEventListener('click', function () {
  window.location.href = '../pages/tutorial.html';
});

document.addEventListener("DOMContentLoaded", function () {
  const locationPopup = document.getElementById("locationPopup");
  const countdownCircle = document.getElementById("countdownCircle");
  const acknowledgeBtn = document.getElementById("ackok");
  const locationButton = document.getElementById("locationButton");

  const locationSuccess = document.getElementById("locationSuccess");
  const successClosePopup = document.getElementById("successClosePopup");
  const successAcknowledge = document.querySelector("#locationSuccess #ackSuccessok");

  let countdownInterval;

  function requestGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          localStorage.setItem("userDeviceLocation", JSON.stringify(coords));
          locationSuccess.classList.remove("hidden");
        },
        function (error) {
          if (error.code === error.PERMISSION_DENIED) {
            alert("Denied !");
          } else {
            alert("Contact us");
          }
        },
        {
          timeout: 5000 // 5 seconds
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  locationButton.addEventListener("click", () => {
    locationPopup.classList.remove("hidden");

    let countdown = 10;
    countdownCircle.textContent = countdown;
    countdownInterval = setInterval(() => {
      countdown--;
      countdownCircle.textContent = countdown;
      if (countdown <= 0) {
        clearInterval(countdownInterval);
        locationPopup.classList.add("hidden");
        requestGeolocation();
      }
    }, 1000);
  });

  acknowledgeBtn.addEventListener("click", () => {
    clearInterval(countdownInterval);
    locationPopup.classList.add("hidden");
    requestGeolocation();
  });

  successClosePopup.addEventListener("click", function () {
    locationSuccess.classList.add("hidden");
  });

  successAcknowledge.addEventListener("click", function () {
    locationSuccess.classList.add("hidden");
  });
});


  



  /* if (!navigator.geolocation) {
      window.location.href = '../pages/tutorial.html'; 
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        localStorage.setItem("userLocation", JSON.stringify(coords));
        window.location.href = '../pages/tutorial.html'; 
    },
      () => {
        window.location.href = '../pages/tutorial.html'; 
    }
    );*/