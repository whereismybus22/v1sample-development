function isIOS() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

let deferredPrompt; // Store the install prompt

document.addEventListener("DOMContentLoaded", function () {
  const installBtn = document.getElementById("installBtn"); // Your install/download button
  const downloadPopup = document.getElementById("downloadPopup");
  const closeDownloadPopup = document.getElementById("closeDownloadPopup");
  const acknowledgeDownload = document.getElementById("ackok");
  const contactButton = document.getElementById("contactusButton1");
  const statusMessage = document.getElementById("installStatusMsg"); // Optional

  // iOS handling
  if (typeof isIOS === "function" && isIOS()) {
    // Show the install button
    installBtn.style.display = "inline";

    installBtn.addEventListener("click", function (e) {
      e.preventDefault();
      downloadPopup.classList.remove("hidden"); // Show custom iOS popup
    });
  } else {
    // Non-iOS: Listen for the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault(); // Prevent automatic prompt
      deferredPrompt = e;

      // Show the install button
      installBtn.style.display = "inline";

      installBtn.addEventListener("click", function () {
        // Show the install prompt
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the A2HS prompt");
            if (statusMessage) {
              statusMessage.textContent = "App installation started!";
              statusMessage.style.color = "green";
            }
          } else {
            console.log("User dismissed the A2HS prompt");
            if (statusMessage) {
              statusMessage.textContent = "App installation was cancelled.";
              statusMessage.style.color = "red";
            }
          }
          deferredPrompt = null; // Clean up
        });
      }, { once: true }); // Add listener only once to avoid multiple prompts
    });
  }

  // Close iOS popup
  closeDownloadPopup.addEventListener("click", function () {
    downloadPopup.classList.add("hidden");
  });

  acknowledgeDownload.addEventListener("click", function () {
    downloadPopup.classList.add("hidden");
  });

  // Contact Us
  if (contactButton) {
    contactButton.addEventListener("click", function () {
      window.location.href = "../pages/contactus.html";
    });
  }
});
