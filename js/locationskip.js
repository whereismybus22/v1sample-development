document.getElementById('skipButton2').addEventListener('click', function() {
    window.location.href = '../pages/tutorial.html'; 
});

document.addEventListener("DOMContentLoaded", function () {
  const locationPopup = document.getElementById("locationPopup");
const countdownCircle = document.getElementById("countdownCircle");
const acknowledgeBtn = document.getElementById("ackok");
const locationButton = document.getElementById("locationButton");

let countdownInterval;

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
    }
  }, 2000);
});
acknowledgeBtn.addEventListener("click", () => {
  clearInterval(countdownInterval); 
  locationPopup.classList.add("hidden"); 
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