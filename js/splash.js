// ============================================================
// SPLASH SCREEN — Countdown timer & skip functionality
// Student 2
// ============================================================

// Countdown timer: updates every second from 4 to 1
var timeLeft = 4;
var countdownEl = document.getElementById('countdown');
var skipBtn = document.getElementById('skipBtn');

var timer = setInterval(function() {
    timeLeft--;
    if (timeLeft > 0) {
        countdownEl.textContent = 'Entering site in ' + timeLeft + '...';
    } else {
        countdownEl.textContent = 'Redirecting...';
        clearInterval(timer);
    }
}, 1000);

// Skip button: navigate immediately and cancel auto-redirect
skipBtn.addEventListener('click', function(e) {
    e.preventDefault();
    clearInterval(timer);
    window.location.href = 'home.html';
});
