// ============================================================
// FEEDBACK PAGE — Form interactivity
// Live character counter, form validation, confirmation
// Student 3
// ============================================================

// Live character counter for message textarea
var messageField = document.getElementById('message');
var charCountEl = document.getElementById('charCount');

messageField.addEventListener('input', function() {
    var remaining = 500 - messageField.value.length;
    charCountEl.textContent = remaining;
});

// Form validation and submission
var form = document.getElementById('feedbackForm');
var successMsg = document.getElementById('successMsg');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Reset all error messages
    var errors = document.querySelectorAll('.error-msg');
    errors.forEach(function(err) { err.classList.remove('show'); });
    successMsg.classList.remove('show');

    var isValid = true;

    // Validate full name
    var name = document.getElementById('fullName');
    if (name.value.trim() === '') {
        document.getElementById('nameError').classList.add('show');
        isValid = false;
    }

    // Validate email
    var email = document.getElementById('email');
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        document.getElementById('emailError').classList.add('show');
        isValid = false;
    }

    // Validate phone (optional but if filled, check format)
    var phone = document.getElementById('phone');
    if (phone.value.trim() !== '' && phone.value.trim().length < 7) {
        document.getElementById('phoneError').classList.add('show');
        isValid = false;
    }

    // Validate message
    if (messageField.value.trim().length < 10) {
        document.getElementById('messageError').classList.add('show');
        isValid = false;
    }

    // Show confirmation or scroll to first error
    if (isValid) {
        successMsg.classList.add('show');
        form.reset();
        charCountEl.textContent = '500';
    }
});
