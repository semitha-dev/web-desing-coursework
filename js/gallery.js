// ============================================================
// GALLERY PAGE — Interactivity
// Hover, click-to-expand, close, and user customisation
// Student 1
// ============================================================

// Get all gallery items and modal elements
var galleryItems = document.querySelectorAll('.gallery-item');
var modal = document.getElementById('galleryModal');
var modalImg = document.getElementById('modalImg');
var modalTitle = document.getElementById('modalTitle');
var modalDesc = document.getElementById('modalDesc');
var modalBody = document.getElementById('modalBody');
var modalClose = document.getElementById('modalClose');
var colorSelect = document.getElementById('colorSelect');
var fontSelect = document.getElementById('fontSelect');

// Add hover and click event listeners to each gallery item
galleryItems.forEach(function(item) {

    // Hover interaction — add/remove a CSS class via JS
    item.addEventListener('mouseenter', function() {
        item.style.transform = 'translateY(-5px) scale(1.03)';
        item.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    });

    item.addEventListener('mouseleave', function() {
        item.style.transform = '';
        item.style.boxShadow = '';
    });

    // Click-to-expand — open modal with correct data
    item.addEventListener('click', function() {
        var title = item.getAttribute('data-title');
        var imgSrc = item.getAttribute('data-img');
        var desc = item.getAttribute('data-desc');

        modalImg.src = imgSrc;
        modalImg.alt = title;
        modalTitle.textContent = title;
        modalDesc.textContent = desc;

        // Reset customisation to default
        colorSelect.value = 'default';
        fontSelect.value = 'default';
        applyColourScheme('default');
        applyFontStyle('default');

        modal.classList.add('open');
    });

    // Keyboard support: Enter key opens modal
    item.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            item.click();
        }
    });
});

// Close modal — close button click
modalClose.addEventListener('click', function() {
    modal.classList.remove('open');
});

// Close modal — click outside modal content
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.remove('open');
    }
});

// Close modal — Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
        modal.classList.remove('open');
    }
});

// User customisation: change colour scheme of extended view
colorSelect.addEventListener('change', function() {
    applyColourScheme(this.value);
});

function applyColourScheme(scheme) {
    switch (scheme) {
        case 'dark':
            modalBody.style.backgroundColor = '#1a1a2e';
            modalBody.style.color = '#e0e0e0';
            break;
        case 'ocean':
            modalBody.style.backgroundColor = '#e3f2fd';
            modalBody.style.color = '#0d47a1';
            break;
        case 'warm':
            modalBody.style.backgroundColor = '#fff8e1';
            modalBody.style.color = '#5d4037';
            break;
        default:
            modalBody.style.backgroundColor = '';
            modalBody.style.color = '';
    }
}

// User customisation: change font style of extended view
fontSelect.addEventListener('change', function() {
    applyFontStyle(this.value);
});

function applyFontStyle(font) {
    switch (font) {
        case 'serif':
            modalBody.style.fontFamily = 'Georgia, "Times New Roman", serif';
            break;
        case 'mono':
            modalBody.style.fontFamily = '"Courier New", Courier, monospace';
            break;
        default:
            modalBody.style.fontFamily = '';
    }
}
