document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // MOBILE NAVIGATION
    // =========================================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        function closeMenu() {
            navLinks.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }

        menuToggle.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });

        // Close menu after selecting a link
        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", closeMenu);

        });

        // Close menu when clicking outside
        document.addEventListener("click", event => {

            if (
                !menuToggle.contains(event.target) &&
                !navLinks.contains(event.target)
            ) {
                closeMenu();
            }

        });

        // Close menu with Escape
        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

    }


    // =========================================
    // HERO BACKGROUND SLIDESHOW
    // =========================================

    const slides = Array.from(
        document.querySelectorAll(".hero-slide")
    );

    const dots = Array.from(
        document.querySelectorAll(".slide-dot")
    );

    const hero = document.querySelector(".hero");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    let currentSlide = 0;
    let slideshowTimer = null;

    const slideDuration = 5500;

    function showSlide(index) {

        if (slides.length === 0) return;

        currentSlide =
            (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {

            const isActive = i === currentSlide;

            slide.classList.toggle("active", isActive);

        });

        dots.forEach((dot, i) => {

            const isActive = i === currentSlide;

            dot.classList.toggle("active", isActive);

            dot.setAttribute(
                "aria-pressed",
                String(isActive)
            );

        });

    }


    function stopSlideshow() {

        if (slideshowTimer !== null) {

            window.clearInterval(slideshowTimer);
            slideshowTimer = null;

        }

    }


    function startSlideshow() {

        stopSlideshow();

        // Respect the visitor's reduced-motion preference.
        if (reducedMotion.matches || slides.length < 2) {
            return;
        }

        slideshowTimer = window.setInterval(() => {

            showSlide(currentSlide + 1);

        }, slideDuration);

    }


    // Click indicators to select a photograph
    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            showSlide(index);

            // Restart the timer after manual navigation
            startSlideshow();

        });

    });


    // Pause the slideshow while visitors hover over it
    if (hero) {

        hero.addEventListener("mouseenter", stopSlideshow);

        hero.addEventListener("mouseleave", startSlideshow);

        hero.addEventListener("focusin", stopSlideshow);

        hero.addEventListener("focusout", event => {

            if (!hero.contains(event.relatedTarget)) {
                startSlideshow();
            }

        });

    }


    // Respond to changes in motion preferences
    if (reducedMotion.addEventListener) {

        reducedMotion.addEventListener("change", () => {

            if (reducedMotion.matches) {

                stopSlideshow();

            } else {

                startSlideshow();

            }

        });

    }


    // Start with the first slide
    if (slides.length > 0) {

        showSlide(0);
        startSlideshow();

    }


    // =========================================
    // DYNAMIC COPYRIGHT YEAR
    // =========================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent = new Date().getFullYear();

    }

});

