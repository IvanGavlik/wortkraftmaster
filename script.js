// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');

        // Toggle animation for menu icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (mobileMenuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// ==========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==========================================
// HIDE LOGO ON SCROLL (Desktop only)
// ==========================================

const logo = document.querySelector('.logo');

window.addEventListener('scroll', () => {
    // Only hide logo on desktop/laptop (width > 768px)
    if (window.innerWidth > 768) {
        if (window.scrollY > 100) {
            logo.style.opacity = '0';
            logo.style.pointerEvents = 'none';
        } else {
            logo.style.opacity = '1';
            logo.style.pointerEvents = 'auto';
        }
    } else {
        // On mobile, always show logo
        logo.style.opacity = '1';
        logo.style.pointerEvents = 'auto';
    }
});

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all process steps, work items, and sections
const animatedElements = document.querySelectorAll('.services-center, .process-step, .work-item, .about-content, .contact-content');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==========================================
// FORM SUBMISSION
// ==========================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        console.log('Form submitted:', { name, email, message });

        // Show success message
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Message Sent!';
        submitButton.style.backgroundColor = '#10b981';

        // Reset form
        contactForm.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.backgroundColor = '';
        }, 3000);
    });
}

// ==========================================
// HERO VISUAL CARDS PARALLAX EFFECT
// ==========================================

const heroVisual = document.querySelector('.hero-visual');
const visualCards = document.querySelectorAll('.visual-card');

if (heroVisual && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const moveX = (clientX - centerX) / 50;
        const moveY = (clientY - centerY) / 50;

        visualCards.forEach((card, index) => {
            const depth = (index + 1) * 0.5;
            card.style.transform = `
                translate(${moveX * depth}px, ${moveY * depth}px)
                rotate(${card.classList.contains('card-1') ? -6 : card.classList.contains('card-2') ? 3 : -3}deg)
            `;
        });
    });
}

// ==========================================
// SCROLL PROGRESS INDICATOR (Optional)
// ==========================================

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // You can use this to show a progress bar if you add one to the HTML
    // For example: progressBar.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ==========================================
// STATS COUNTER ANIMATION
// ==========================================

const stats = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const numericValue = parseInt(target.replace(/\D/g, ''));
    const duration = 2000;
    const increment = numericValue / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (isPercentage ? '%' : '+');
        }
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            animateCounter(entry.target);
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

// ==========================================
// PRICING SWITCH
// ==========================================

const pricingSwitch = document.querySelectorAll('.switch-option');
const pricingCards = document.querySelectorAll('.pricing-card');

pricingSwitch.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        pricingSwitch.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Get the selected option
        const selectedOption = button.getAttribute('data-option');

        // Show/hide pricing cards
        pricingCards.forEach(card => {
            if (card.getAttribute('data-plan') === selectedOption) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ==========================================
// COOKIE CONSENT
// ==========================================

const cookieConsent = document.getElementById('cookieConsent');
const acceptAllButton = document.getElementById('acceptAll');
const acceptNecessaryButton = document.getElementById('acceptNecessary');

// Check if user has already made a choice
const cookiePreference = localStorage.getItem('cookiePreference');

if (!cookiePreference) {
    // Show cookie banner after a short delay
    setTimeout(() => {
        cookieConsent.classList.add('show');
    }, 1000);
}

// Function to hide cookie banner
function hideCookieBanner() {
    cookieConsent.style.animation = 'slideDown 0.3s ease-out';
    setTimeout(() => {
        cookieConsent.classList.remove('show');
        cookieConsent.style.animation = '';
    }, 300);
}

// Handle "Accept All" button click
if (acceptAllButton) {
    acceptAllButton.addEventListener('click', () => {
        // Store full consent in localStorage
        localStorage.setItem('cookiePreference', 'all');

        // Here you would enable analytics, marketing cookies, etc.
        // Example: loadGoogleAnalytics();

        hideCookieBanner();
    });
}

// Handle "Necessary Only" button click
if (acceptNecessaryButton) {
    acceptNecessaryButton.addEventListener('click', () => {
        // Store minimal consent in localStorage
        localStorage.setItem('cookiePreference', 'necessary');

        // Only necessary cookies are allowed
        // Do not load analytics or marketing scripts

        hideCookieBanner();
    });
}

// Add slideDown animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    @keyframes slideDown {
        from { transform: translateY(0); }
        to { transform: translateY(100%); }
    }
`, styleSheet.cssRules.length);

// Optional: Function to load analytics only if user accepted all cookies
function initializeOptionalScripts() {
    const preference = localStorage.getItem('cookiePreference');

    if (preference === 'all') {
        // Load Google Analytics or other tracking scripts here
        // Example:
        // loadGoogleAnalytics();
        console.log('Analytics enabled');
    } else {
        console.log('Only necessary cookies enabled');
    }
}

// Call on page load
initializeOptionalScripts();

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log('%c🎨 Wortkraftmaster Portfolio', 'font-size: 20px; font-weight: bold; color: #ff3700;');
console.log('%cBuilt with modern web technologies', 'font-size: 12px; color: #666;');
