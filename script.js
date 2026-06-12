const header = document.getElementById("header");
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

function updateHeader() {
    header.classList.toggle("scrolled", window.scrollY > 24);
}

window.addEventListener("scroll", updateHeader);
updateHeader();

hamburger.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");
    header.classList.toggle("menu-open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    hamburger.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        header.classList.remove("menu-open");
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

const sections = Array.from(document.querySelectorAll("main section[id]"));

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            navLinks.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    },
    {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
    }
);

sections.forEach((section) => observer.observe(section));

const gallerySlides = Array.from(document.querySelectorAll(".gallery-slide"));
const galleryIndicators = Array.from(document.querySelectorAll(".gallery-indicator"));
let galleryIndex = 0;

function showGallerySlide(index) {
    gallerySlides.forEach((slide, slideIndex) => {
        slide.classList.toggle("active", slideIndex === index);
    });

    galleryIndicators.forEach((indicator, indicatorIndex) => {
        indicator.classList.toggle("active", indicatorIndex === index);
    });
}

if (gallerySlides.length > 1) {
    window.setInterval(() => {
        galleryIndex = (galleryIndex + 1) % gallerySlides.length;
        showGallerySlide(galleryIndex);
    }, 3000);
}
