document.addEventListener('DOMContentLoaded', () => {
  fetch('topbar.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('topbar-container').innerHTML = html;
    })
    .catch(err => console.error('Failed to load topbar:', err));
});
