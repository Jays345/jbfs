(() => {
const toggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');


if (!toggle || !navLinks) return;

// Detect the current page
const currentFile = (
    window.location.pathname.split('/').pop() || 'index.html'
).toLowerCase();

// Automatically underline the link for the current page
navLinks.querySelectorAll('a').forEach(link => {
    const linkFile = link.getAttribute('href')
        .split('/')
        .pop()
        .toLowerCase();

    const isCurrent = linkFile === currentFile;

    link.classList.toggle('active', isCurrent);

    if (isCurrent) {
        link.setAttribute('aria-current', 'page');
    } else {
        link.removeAttribute('aria-current');
    }
});

// Mobile menu toggle
toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');

    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu' : 'Open navigation menu'
    );
});

// Close the mobile menu after selecting a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
    });
});

// Reset the mobile menu when resizing to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
    }
});


})();
