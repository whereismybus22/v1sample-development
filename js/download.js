let deferredPrompt = null;

// Listen for beforeinstallprompt event and save the event
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

document.addEventListener("DOMContentLoaded", () => {
  const downloadButton = document.getElementById("downloadButton");
  const downloadPopup = document.getElementById("downloadPopup");
  const closeDownloadPopup = document.getElementById("closeDownloadPopup");
  const acknowledgeDownload = document.getElementById("ackok");
  const contactButton = document.getElementById("contactusButton1");

  downloadButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (typeof isIOS === "function" && isIOS()) {
      // iOS: Show custom install popup
      downloadPopup.classList.remove("hidden");
    } else if (deferredPrompt) {
      // Android or PWA supported: Show native install prompt
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        deferredPrompt = null;
      });
    } else {
      alert("Install prompt not available on your device.");
    }
  });

  // Close buttons for popup
  closeDownloadPopup.addEventListener("click", () => {
    downloadPopup.classList.add("hidden");
  });

  acknowledgeDownload.addEventListener("click", () => {
    downloadPopup.classList.add("hidden");
  });

  if (contactButton) {
    contactButton.addEventListener("click", () => {
      window.location.href = "../pages/contactus.html";
    });
  }
});
