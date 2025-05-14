document.addEventListener("DOMContentLoaded", function () {
    const helpButton = document.getElementById("helpButton");
    const helpPopup = document.getElementById("helpPopup");
    const closeButton = document.getElementById("closePopup");
    helpButton.addEventListener("click", function (e) {
      e.preventDefault();
      helpPopup.classList.remove("hidden");
    });
    closeButton.addEventListener("click", function () {
      helpPopup.classList.add("hidden");
    });
  });
  