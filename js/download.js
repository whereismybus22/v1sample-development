document.addEventListener("DOMContentLoaded", function () {
  const downloadButton = document.getElementById("downloadButton");
  const downloadPopup = document.getElementById("downloadPopup");
  const closeDownloadPopup = document.getElementById("closeDownloadPopup");
  const acknowledgeDownload = document.getElementById("ackok");

  downloadButton.addEventListener("click", function (e) {
    e.preventDefault();
    downloadPopup.classList.remove("hidden");
  });

  closeDownloadPopup.addEventListener("click", function () {
    downloadPopup.classList.add("hidden");
  });

  acknowledgeDownload.addEventListener("click", function () {
    downloadPopup.classList.add("hidden");
  });
});
