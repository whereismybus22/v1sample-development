window.addEventListener('DOMContentLoaded', () => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true;

    const installOption = document.getElementById('installAppOption');
    if (installOption) {
      installOption.style.display = isStandalone ? 'none' : 'block';
    }
  });