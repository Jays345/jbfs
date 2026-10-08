(() => {
const toggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');


if (!toggle || !navLinks) return;


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


toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');

    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu' : 'Open navigation menu'
    );
});


navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
    });
});


window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
    }
});


})();
