// ============================================================
// USER PROFILE — Progressive profile building
// Uses prompt(), variables/objects, functions,
// conditional logic, and DOM manipulation.
// Student 4
// ============================================================

// Profile data object to store all user responses
var profileData = {
    step1: { name: null, username: null, area: null },
    step2: { interest: null, content: null, time: null },
    step3: { action: null, goal: null, commit: null }
};

// Track which steps are complete
var stepStatus = { 1: false, 2: false, 3: false };
var currentStep = 1;
var totalPrompts = 9;

// DOM references
var progressBar = document.getElementById('progressBar');
var progressPercent = document.getElementById('progressPercent');
var progressDetail = document.getElementById('progressDetail');
var statusMsg = document.getElementById('statusMsg');
var confirmSection = document.getElementById('confirmSection');

// Step 1 prompts — Basic details
function runStep1() {
    var name = prompt('Step 1 of 3 — What is your name? (Leave blank to skip)');
    if (name !== null && name.trim() !== '') {
        profileData.step1.name = name.trim();
    }

    var username = prompt('Step 1 of 3 — Choose a username: (Leave blank to skip)');
    if (username !== null && username.trim() !== '') {
        profileData.step1.username = username.trim();
    }

    var area = prompt('Step 1 of 3 — What is your local area? (Leave blank to skip)');
    if (area !== null && area.trim() !== '') {
        profileData.step1.area = area.trim();
    }

    stepStatus[1] = true;
    updateDisplay();
}

// Step 2 prompts — Interests and preferences
function runStep2() {
    var interest = prompt('Step 2 of 3 — Which SDG topic interests you most? (e.g., Climate, Health, Education, Oceans) (Leave blank to skip)');
    if (interest !== null && interest.trim() !== '') {
        profileData.step2.interest = interest.trim();
    }

    var content = prompt('Step 2 of 3 — What content do you prefer? (e.g., Video, Articles, Podcasts) (Leave blank to skip)');
    if (content !== null && content.trim() !== '') {
        profileData.step2.content = content.trim();
    }

    var time = prompt('Step 2 of 3 — How much time per week can you dedicate? (e.g., 30mins, 1hr, 2hrs) (Leave blank to skip)');
    if (time !== null && time.trim() !== '') {
        profileData.step2.time = time.trim();
    }

    stepStatus[2] = true;
    updateDisplay();
}

// Step 3 prompts — Actions and commitments
function runStep3() {
    var action = prompt('Step 3 of 3 — Name one action you have already taken for ocean conservation: (Leave blank to skip)');
    if (action !== null && action.trim() !== '') {
        profileData.step3.action = action.trim();
    }

    var goal = prompt('Step 3 of 3 — What is your sustainability goal this month? (Leave blank to skip)');
    if (goal !== null && goal.trim() !== '') {
        profileData.step3.goal = goal.trim();
    }

    var commit = prompt('Step 3 of 3 — How committed are you? (Low / Medium / High) (Leave blank to skip)');
    if (commit !== null && commit.trim() !== '') {
        profileData.step3.commit = commit.trim();
    }

    stepStatus[3] = true;
    updateDisplay();
}

// Update the profile display and progress bar
function updateDisplay() {
    // Count completed prompts (non-null values)
    var completed = 0;
    var allFields = [
        profileData.step1.name, profileData.step1.username, profileData.step1.area,
        profileData.step2.interest, profileData.step2.content, profileData.step2.time,
        profileData.step3.action, profileData.step3.goal, profileData.step3.commit
    ];

    allFields.forEach(function(val) {
        if (val !== null) completed++;
    });

    // Update progress bar
    var percent = Math.round((completed / totalPrompts) * 100);
    progressBar.style.width = percent + '%';
    progressPercent.textContent = percent + '%';
    progressDetail.textContent = '(' + completed + '/' + totalPrompts + ' prompts completed)';

    // Update status message
    if (percent === 100) {
        statusMsg.textContent = 'Profile complete! All steps finished.';
        confirmSection.classList.add('visible');
        confirmSection.querySelector('p').textContent = 'Congratulations! Your ocean action profile is complete. Thank you for your commitment to protecting life below water.';
    } else if (percent > 0) {
        statusMsg.textContent = 'Completion is now ' + percent + '%. You may continue or revisit any step.';
        confirmSection.classList.remove('visible');
    } else {
        statusMsg.textContent = 'Click "Start / Continue Profile" to begin.';
        confirmSection.classList.remove('visible');
    }

    // Update step 1 output
    if (stepStatus[1]) {
        document.getElementById('step1Output').classList.add('visible');
        document.getElementById('outName').textContent = profileData.step1.name || '(skipped)';
        document.getElementById('outUsername').textContent = profileData.step1.username || '(skipped)';
        document.getElementById('outArea').textContent = profileData.step1.area || '(skipped)';
        document.getElementById('step1Btn').classList.add('completed');
    }

    // Update step 2 output
    if (stepStatus[2]) {
        document.getElementById('step2Output').classList.add('visible');
        document.getElementById('outInterest').textContent = profileData.step2.interest || '(skipped)';
        document.getElementById('outContent').textContent = profileData.step2.content || '(skipped)';
        document.getElementById('outTime').textContent = profileData.step2.time || '(skipped)';
        document.getElementById('step2Btn').classList.add('completed');
    }

    // Update step 3 output
    if (stepStatus[3]) {
        document.getElementById('step3Output').classList.add('visible');
        document.getElementById('outAction').textContent = profileData.step3.action || '(skipped)';
        document.getElementById('outGoal').textContent = profileData.step3.goal || '(skipped)';
        document.getElementById('outCommit').textContent = profileData.step3.commit || '(skipped)';
        document.getElementById('step3Btn').classList.add('completed');
    }
}

// Start / Continue button — runs the next incomplete step
document.getElementById('startBtn').addEventListener('click', function() {
    if (!stepStatus[1]) {
        currentStep = 1;
        runStep1();
    } else if (!stepStatus[2]) {
        currentStep = 2;
        runStep2();
    } else if (!stepStatus[3]) {
        currentStep = 3;
        runStep3();
    } else {
        alert('All steps are complete! Use the revisit buttons to update your profile.');
    }
});

// Revisit buttons — allow returning to previously completed or skipped steps
document.getElementById('revisit1').addEventListener('click', function() { runStep1(); });
document.getElementById('revisit2').addEventListener('click', function() { runStep2(); });
document.getElementById('revisit3').addEventListener('click', function() { runStep3(); });

// Step indicator buttons also trigger their step
document.getElementById('step1Btn').addEventListener('click', function() { runStep1(); });
document.getElementById('step2Btn').addEventListener('click', function() { runStep2(); });
document.getElementById('step3Btn').addEventListener('click', function() { runStep3(); });

// Reset profile
document.getElementById('resetBtn').addEventListener('click', function() {
    profileData = {
        step1: { name: null, username: null, area: null },
        step2: { interest: null, content: null, time: null },
        step3: { action: null, goal: null, commit: null }
    };
    stepStatus = { 1: false, 2: false, 3: false };
    currentStep = 1;

    // Hide all output sections
    document.querySelectorAll('.profile-step-section').forEach(function(el) {
        el.classList.remove('visible');
    });
    document.querySelectorAll('.step-btn').forEach(function(el) {
        el.classList.remove('completed', 'skipped');
    });

    updateDisplay();
});
