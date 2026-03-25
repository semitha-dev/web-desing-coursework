// ============================================================
// ACTION IMPACT SIMULATOR — Interactivity
// Card selection, score calculation, impact levels,
// background image changes, and reset.
// Student 2
//
// Impact thresholds:
//   Low    = 0-5 points
//   Medium = 6-10 points
//   High   = 11+ points
// ============================================================

var cards = document.querySelectorAll('.action-card');
var selectedCountEl = document.getElementById('selectedCount');
var impactScoreEl = document.getElementById('impactScore');
var impactLevelEl = document.getElementById('impactLevel');
var impactMessageEl = document.getElementById('impactMessage');
var feedbackArea = document.getElementById('feedbackArea');
var resetBtn = document.getElementById('resetBtn');

// Background images for three impact levels
var backgrounds = {
    low: 'images/backgrounds/low-impact.jpg',
    medium: 'images/backgrounds/medium-impact.jpg',
    high: 'images/backgrounds/high-impact.jpg'
};

// Toggle selection on card click
cards.forEach(function(card) {
    card.addEventListener('click', function() {
        card.classList.toggle('selected');
        updateScore();
    });
});

// Calculate total score and update feedback
function updateScore() {
    var totalPoints = 0;
    var selectedCards = 0;

    cards.forEach(function(card) {
        if (card.classList.contains('selected')) {
            totalPoints += parseInt(card.getAttribute('data-points'));
            selectedCards++;
        }
    });

    selectedCountEl.textContent = selectedCards;
    impactScoreEl.textContent = totalPoints;

    // Determine impact level and update display
    var level, message, bgImage;

    if (totalPoints === 0) {
        level = '—';
        message = 'Select some actions above to see your impact level.';
        bgImage = '';
    } else if (totalPoints <= 5) {
        level = 'Low Impact';
        message = 'A good start! Every small action matters. Consider adding more actions to increase your impact.';
        bgImage = backgrounds.low;
    } else if (totalPoints <= 10) {
        level = 'Medium Impact';
        message = 'Great commitment! You are making a meaningful difference for ocean life.';
        bgImage = backgrounds.medium;
    } else {
        level = 'High Impact';
        message = 'Excellent commitment! Consider sharing these actions with others to multiply the impact.';
        bgImage = backgrounds.high;
    }

    impactLevelEl.textContent = 'Impact level: ' + level;
    impactMessageEl.textContent = message;

    // Change background image based on impact level using JavaScript
    if (bgImage) {
        feedbackArea.style.backgroundImage = 'linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.92)), url(' + bgImage + ')';
        feedbackArea.style.backgroundSize = 'cover';
        feedbackArea.style.backgroundPosition = 'center';
    } else {
        feedbackArea.style.backgroundImage = '';
    }
}

// Reset all selections
resetBtn.addEventListener('click', function() {
    cards.forEach(function(card) {
        card.classList.remove('selected');
    });
    updateScore();
});
