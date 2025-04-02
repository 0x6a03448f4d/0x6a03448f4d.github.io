// Mobile Menu Toggle
const mobileOpen = document.querySelector(".mobile-toggle.mobile-open");
const mobileClose = document.querySelector(".mobile-toggle.mobile-close");
const sidebar = document.querySelector(".sidebar");

if (mobileOpen && sidebar) {
    mobileOpen.addEventListener("click", () => {
        sidebar.classList.add("active");
    });
}

if (mobileClose && sidebar) {
    mobileClose.addEventListener("click", () => {
        sidebar.classList.remove("active");
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        document.querySelectorAll(".nav-link").forEach(i => i.classList.remove("active"));
        targetElement.classList.add("active");
        targetElement.scrollIntoView({ behavior: "smooth" });
        if (window.innerWidth <= 768) {
            sidebar.classList.remove("active");
        }
    });
});

// Intersection Observer for Sections
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            const sectionId = entry.target.id;
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));

// Back to Top Button
const backToTop = document.querySelector(".back-to-top");
if (backToTop) {
    window.addEventListener("scroll", () => {
        backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// Counter Animation for Data-Count Elements
document.querySelectorAll("[data-count]").forEach(element => {
    const targetCount = parseInt(element.getAttribute("data-count"));
    let currentCount = 0;
    const increment = targetCount / 50;

    const updateCount = () => {
        currentCount += increment;
        if (currentCount >= targetCount) {
            element.textContent = targetCount;
        } else {
            element.textContent = Math.round(currentCount);
            requestAnimationFrame(updateCount);
        }
    };

    const parent = element.closest("section");
    const countObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            updateCount();
            countObserver.unobserve(parent);
        }
    }, { threshold: 0.5 });

    countObserver.observe(parent);
});

// Theme Switch Functionality
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    if (themeToggle) {
        // Carrega o tema salvo ou usa "light" como padrão
        const savedTheme = localStorage.getItem("theme") || "light";
        body.classList.remove("light", "dark"); // Remove ambas as classes
        body.classList.add(savedTheme);
        themeToggle.checked = savedTheme === "dark";

        // Evento de mudança de tema
        themeToggle.addEventListener("change", () => {
            if (themeToggle.checked) {
                body.classList.remove("light");
                body.classList.add("dark");
                localStorage.setItem("theme", "dark");
            } else {
                body.classList.remove("dark");
                body.classList.add("light");
                localStorage.setItem("theme", "light");
            }
        });
    }
});

// Project Card Click Handler
document.querySelectorAll(".projeto-card").forEach(card => {
    card.addEventListener("click", () => {
        const link = card.getAttribute("data-link");
        if (link) {
            window.open(link, "_blank");
        }
    });
});

// Modal Close Handler (Assuming a modal exists)
const modalClose = document.querySelector(".modal-close");
const modal = document.querySelector(".modal");
if (modalClose && modal) {
    modalClose.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", e => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
};

// Navegação suave adicional
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});