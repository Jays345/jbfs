// Admissions page: responsive navigation and automatic footer year.
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".nav-links");
    const year = document.getElementById("currentYear");

    if (year) year.textContent = new Date().getFullYear();
    if (!menuToggle || !navigation) return;

    const closeMenu = () => {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    };

    menuToggle.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

    document.addEventListener("click", event => {
        if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeMenu();
    });
});
