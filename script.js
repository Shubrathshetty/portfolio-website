// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const html = document.documentElement;

function getStoredTheme() {
    return localStorage.getItem('theme');
}

function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'light' ? 'dark' : 'light');
}

// Initialize theme
const savedTheme = getStoredTheme();
setTheme(savedTheme || getSystemTheme());

themeToggle.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);

// ===== Mobile Menu =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const hamburger = mobileMenuBtn.querySelector('.hamburger');

function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
}

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
});

// Close menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// ===== Scroll Animations (Intersection Observer) =====
const animateElements = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
    }
);

animateElements.forEach((el) => {
    observer.observe(el);
});

// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 100) {
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===== Smooth scroll for nav links =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== Active nav link highlight =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--accent)';
        }
    });
});

// ===== Particle Network Background =====
(function () {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];
    let mouse = { x: -9999, y: -9999 };
    let animationId;

    const CONFIG = {
        particleCount: 80,
        maxDistance: 140,
        particleSize: { min: 1.5, max: 3 },
        speed: 0.4,
        mouseRadius: 120,
        lineOpacity: 0.15,
        particleOpacity: 0.35,
    };

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function isDark() {
        return document.documentElement.getAttribute('data-theme') === 'dark';
    }

    function getColor() {
        return isDark() ? '255, 255, 255' : '0, 0, 0';
    }

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = CONFIG.particleSize.min + Math.random() * (CONFIG.particleSize.max - CONFIG.particleSize.min);
            this.speedX = (Math.random() - 0.5) * CONFIG.speed;
            this.speedY = (Math.random() - 0.5) * CONFIG.speed;
            // Unique sine offset for organic floating
            this.sinOffset = Math.random() * Math.PI * 2;
            this.sinSpeed = 0.005 + Math.random() * 0.01;
            this.sinAmplitude = 0.3 + Math.random() * 0.5;
        }

        update(time) {
            // Organic sine-wave drift
            this.x += this.speedX + Math.sin(time * this.sinSpeed + this.sinOffset) * this.sinAmplitude * 0.1;
            this.y += this.speedY + Math.cos(time * this.sinSpeed + this.sinOffset) * this.sinAmplitude * 0.1;

            // Mouse repulsion
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONFIG.mouseRadius) {
                const force = (CONFIG.mouseRadius - dist) / CONFIG.mouseRadius;
                this.x += (dx / dist) * force * 2;
                this.y += (dy / dist) * force * 2;
            }

            // Wrap around edges
            if (this.x < -20) this.x = width + 20;
            if (this.x > width + 20) this.x = -20;
            if (this.y < -20) this.y = height + 20;
            if (this.y > height + 20) this.y = -20;
        }

        draw() {
            const color = getColor();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color}, ${CONFIG.particleOpacity})`;
            ctx.fill();
        }
    }

    function init() {
        resize();
        particles = [];
        // Scale particle count based on screen size
        const count = Math.min(CONFIG.particleCount, Math.floor((width * height) / 15000));
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function drawLines() {
        const color = getColor();
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONFIG.maxDistance) {
                    const opacity = (1 - dist / CONFIG.maxDistance) * CONFIG.lineOpacity;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${color}, ${opacity})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
    }

    function animate(time) {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.update(time);
            p.draw();
        });

        drawLines();
        animationId = requestAnimationFrame(animate);
    }

    // Track mouse
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = -9999;
        mouse.y = -9999;
    });

    window.addEventListener('resize', () => {
        resize();
        // Re-initialize if screen size changed significantly
        if (Math.abs(particles.length - Math.floor((width * height) / 15000)) > 10) {
            init();
        }
    });

    // Start
    init();
    animate(0);
})();
