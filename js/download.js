document.addEventListener("DOMContentLoaded", function () {
  const iosPopup = document.getElementById("iosDownloadPopup");
  const androidPopup = document.getElementById("androidDownloadPopup");
  const closeBtns = document.querySelectorAll("#closeDownloadPopup");
  const ackButtons = document.querySelectorAll("#ackok");
  const contactButton = document.getElementById("contactusButton1");
  const helpPopup = document.getElementById("helpPopup");
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
        console.log("User dismissed the PWA prompt");
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
