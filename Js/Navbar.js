document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });

    // Optional: Close nav on link click (for mobile)
    const links = navLinks.querySelectorAll("a");
    links.forEach(link => {
        link.addEventListener("click", () => {
            if (navLinks.classList.contains("show")) {
                navLinks.classList.remove("show");
            }
        });
    });
});