// Navbar scroll behavior
let lastScrollTop = 0;
const navbar = document.querySelector('.floating-navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop === 0) {
        navbar.classList.remove('hidden');
    } else {
        navbar.classList.add('hidden');
    }
    
    lastScrollTop = scrollTop;
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const sunIcon = darkModeToggle.querySelector('.sun-icon');
const moonIcon = darkModeToggle.querySelector('.moon-icon');

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.project-section, .about-section, .contact-section');
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Create mouse-following gradient bubble
    createCursorGlow();
});

// Mouse-following gradient bubble (lime green/yellow-green)
function createCursorGlow() {
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth animation with requestAnimationFrame
    function animate() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        cursorGlow.style.left = currentX + 'px';
        cursorGlow.style.top = currentY + 'px';
        
        requestAnimationFrame(animate);
    }
    
    animate();
}
