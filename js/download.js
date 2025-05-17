document.addEventListener("DOMContentLoaded", function () {
  const downloadButton = document.getElementById("download-pwa"); // your button for PWA download
  const downloadPopup = document.getElementById("downloadPopup");
  const closeDownloadPopup = document.getElementById("closeDownloadPopup");
  const acknowledgeDownload = document.getElementById("ackok");
  const contactButton = document.getElementById("contactusButton1");
  const textContent = document.getElementById("text-content");

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


let deferredPrompt; // Variable to hold the deferred prompt event

// Set up the 'beforeinstallprompt' event listener once when the script loads
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault(); // Prevent the default mini-infobar or install prompt
  deferredPrompt = e; // Save the event for later use
});

// Handle click event on the "download-pwa" button
document.getElementById("downloadButton").addEventListener("click", () => {
  if (isIOS()) {
    // Redirect to help page for iPhone users
    downloadPopup.classList.remove("hidden");
  } else if (deferredPrompt) {
    // Show the prompt if it's available
    deferredPrompt.prompt(); // Show the PWA install prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the PWA prompt");
        document.getElementById("text-content").innerHTML =
          "Hang on !!  App Installing ...";
      } else {
        console.log("User dismissed the PWA prompt");
      }
      deferredPrompt = null; // Clear the deferred prompt after use
    });
  } 
});
