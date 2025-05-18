document.addEventListener("DOMContentLoaded", function () {
  const iosPopup = document.getElementById("iosDownloadPopup");
  const androidPopup = document.getElementById("androidDownloadPopup");
  const closeBtns = document.querySelectorAll("#closeDownloadPopup");
  const ackButtons = document.querySelectorAll("#ackok");
  const contactButton = document.getElementById("contactusButton1");
  const helpPopup = document.getElementById("helpPopup");
  const suggestPopup = document.getElementById("suggestPopup");
  const textContent = document.getElementById("text-content");
  
  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      iosPopup?.classList.add("hidden");
      androidPopup?.classList.add("hidden");
    });
  });

  ackButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      iosPopup?.classList.add("hidden");
      androidPopup?.classList.add("hidden");
    });
  });
  if (contactButton) {
    contactButton.addEventListener("click", function () {
      window.location.href = "../pages/contactus.html";
    });
  }
});

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

document.getElementById("downloadButton").addEventListener("click", () => {
  const iosPopup = document.getElementById("iosDownloadPopup");
  const androidPopup = document.getElementById("androidDownloadPopup");
  const textContent = document.getElementById("text-content");

  if (isIOS()) {
    iosPopup.classList.remove("hidden");
  } else if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        androidPopup.classList.remove("hidden");  //Android installation popup
        textContent.innerHTML = "Hang on !! App Installing ...";
      } else {
        suggestPopup.classList.remove("hidden");

        // Safe setup after popup is visible
        const ackInstall = document.getElementById("ackSuggest");
        const closeSuggest = document.getElementById("closeSuggestPopup");

        // Ensure we only attach the listener once
        if (ackInstall && !ackInstall.dataset.bound) {
          ackInstall.dataset.bound = "true";
          ackInstall.addEventListener("click", () => {
            suggestPopup.classList.add("hidden");
            // Retry the prompt
            if (deferredPrompt) {
              deferredPrompt.prompt();
              deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                  androidPopup.classList.remove("hidden");
                  textContent.innerHTML = "Hang on !! App Installing ...";
                }
                deferredPrompt = null;
              });
            }
          });
        }

        if (closeSuggest && !closeSuggest.dataset.bound) {
          closeSuggest.dataset.bound = "true";
          closeSuggest.addEventListener("click", () => {
            suggestPopup.classList.add("hidden");
          });
        }
      }
      deferredPrompt = null;
    });
  } else {
    helpPopup.classList.remove("hidden");
  }
});

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}
