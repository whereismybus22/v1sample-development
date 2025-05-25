document.getElementById('skipButton').addEventListener('click', function() {
    sessionStorage.setItem('pwaPageSkip', true);
    window.location.href = '../pages/location.html'; 
});
