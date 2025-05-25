document.getElementById('skipButton2').addEventListener('click', function () {
  sessionStorage.setItem('localAccessPagesSkip', true);
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
  const iosHelpPopup = document.getElementById("IOSlocationhelpPopup");
  const iosClosePopup = document.getElementById("IOSclosePopup");
  const androidHelpPopup = document.getElementById("andriodhelpPopup");
  const androidClosePopup = document.getElementById("androidClosePopup");
  const contactUsButtons = document.querySelectorAll("#contactusButton");
  const  helpPopupButton = document.querySelectorAll("helpPopup");

  let countdownInterval;
function showLoader() {
  document.getElementById("loadingOverlay").classList.remove("hidden");
}

function hideLoader() {
  document.getElementById("loadingOverlay").classList.add("hidden");
}
  function requestGeolocation() {
    showLoader();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          localStorage.setItem("userDeviceLocation", JSON.stringify(coords));
          hideLoader();
          locationSuccess.classList.remove("hidden");
        },
        function (error) {
          hideLoader();
          if (error.code === error.PERMISSION_DENIED) {
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
           if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
             document.getElementById("IOSlocationhelpPopup").classList.remove("hidden");
            } else {
              document.getElementById("andriodhelpPopup").classList.remove("hidden");
            }
          } else {
            document.getElementById("helpPopupButton").classList.remove("hidden");
          }
        }
      );
    } else {
      hideLoader();
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
  window.location.href = "/index.html";
});

successAcknowledge.addEventListener("click", function () {
  locationSuccess.classList.add("hidden");
  window.location.href = "/index.html"; 
});
  if (iosClosePopup) {
    iosClosePopup.addEventListener("click", function () {
      iosHelpPopup.classList.add("hidden");
    });
  }
  if (androidClosePopup) {
    androidClosePopup.addEventListener("click", function () {
      androidHelpPopup.classList.add("hidden");
    });
  }

contactUsButtons.forEach(button => {
  button.addEventListener("click", function () {
    window.location.href = "../pages/contactus.html";
  });
});

});