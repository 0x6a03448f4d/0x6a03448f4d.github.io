// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'light';
body.classList.remove('light', 'dark'); 
body.classList.add(savedTheme);
themeToggle.checked = savedTheme === 'dark'; 

// Change theme on toggle
themeToggle.addEventListener('change', function() {
    if (this.checked) {
        body.classList.remove('light');
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        localStorage.setItem('theme', 'light');
    }
});

// Mobile Menu
const mobileOpen = document.querySelector('.mobile-toggle.mobile-open');
const mobileClose = document.querySelector('.mobile-toggle.mobile-close');
const sidebar = document.querySelector('.sidebar');

mobileOpen.addEventListener('click', () => sidebar.classList.add('active'));
mobileClose.addEventListener('click', () => sidebar.classList.remove('active'));

// Smooth Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        document.querySelectorAll('section').forEach(section => section.classList.remove('active'));
        targetSection.classList.add('active');
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        if (window.innerWidth <= 768) sidebar.classList.remove('active');
    });
});

// Active Section Observer
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            const sectionId = entry.target.id;
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) link.classList.add('active');
            });
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));

// Back to Top
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Animated Stats
document.querySelectorAll('.stat-number').forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    let count = 0;
    const increment = target / 50;
    const updateCount = () => {
        count += increment;
        if (count >= target) stat.textContent = target;
        else {
            stat.textContent = Math.ceil(count);
            requestAnimationFrame(updateCount);
        }
    };
    const section = stat.closest('section');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            updateCount();
            observer.unobserve(section);
        }
    }, { threshold: 0.5 });
    observer.observe(section);
});

// Contact Form Submission to Local File
const contactForm = document.getElementById('contact-form');
const sanitizedOutput = document.getElementById('sanitized-output');

function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML
        .replace(/&/g, '&')
        .replace(/</g, '<')
        .replace(/>/g, '>')
        .replace(/"/g, '"')
        .replace(/;/g, ';');
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = sanitizeInput(document.getElementById('name').value);
    const email = sanitizeInput(document.getElementById('email').value);
    const message = sanitizeInput(document.getElementById('message').value);
    
    sanitizedOutput.style.display = 'block';
    sanitizedOutput.innerHTML = `
        <strong>Sanitized Data:</strong><br>
        Name: ${name}<br>
        Email: ${email}<br>
        Message: ${message}
    `;
    
    const contactData = { name, email, message, timestamp: new Date().toISOString() };
    let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts.push(contactData);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    
    setTimeout(() => {
        sanitizedOutput.style.display = 'none';
        alert('Message saved successfully! Check your private contacts log.');
        contactForm.reset();
    }, 1000);
});

// Portfolio Click to Open Links
document.querySelectorAll('.projeto-card').forEach(card => {
    card.addEventListener('click', () => {
        const link = card.getAttribute('data-link');
        if (link) window.open(link, '_blank');
    });
});

// Modal Close
modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});