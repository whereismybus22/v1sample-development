document.getElementById('skipButton2').addEventListener('click', function() {
    window.location.href = '../pages/tutorial.html'; 
});

document.getElementById("downloadButton").addEventListener("click", () => {
    if (!navigator.geolocation) {
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
    );
  });
  