let deferredPrompt = null;

// Listen for beforeinstallprompt event to save it
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});


document.addEventListener("DOMContentLoaded", function () {
  const downloadButton = document.getElementById("download-pwa"); // your button for PWA download
  const downloadPopup = document.getElementById("downloadPopup");
  const closeDownloadPopup = document.getElementById("closeDownloadPopup");
  const acknowledgeDownload = document.getElementById("ackok");
  const contactButton = document.getElementById("contactusButton1");
  const textContent = document.getElementById("text-content");

  downloadButton.addEventListener("click", function (e) {
    e.preventDefault();

    if (isIOS()) {
      // Show your custom popup on iOS instead of native prompt
      downloadPopup.classList.remove("hidden");
      // Alternatively you could redirect to help page:
      // window.location = '/pwaInstallation/help.html';
    } else if (deferredPrompt) {
      // Show native install prompt for Android or supported platforms
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the PWA prompt");
          if (textContent) {
            textContent.innerHTML = 'Hang on !!  App Installing ...';
          }
        } else {
          console.log("User dismissed the PWA prompt");
        }
        deferredPrompt = null;
      });
    } else if (textContent && textContent.innerHTML === 'Hang on !!  App Installing ...') {
      alert('App is Installing ... or already Installed !! \n Please check your device App Screen.');
    } 
  });

  // Close popup handlers
  closeDownloadPopup.addEventListener("click", function () {
    downloadPopup.classList.add("hidden");
  });

  acknowledgeDownload.addEventListener("click", function () {
    downloadPopup.classList.add("hidden");
  });

  // Contact button handler
  if (contactButton) {
    contactButton.addEventListener("click", function () {
      window.location.href = "../pages/contactus.html";
    });
  }
});
