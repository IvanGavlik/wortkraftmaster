// ==========================================
// SEQUENTIAL VIDEO PLAYBACK
// ==========================================

// Detect if we're in a subfolder (like /en/)
const isInSubfolder = window.location.pathname.includes('/en/');
const videoBasePath = isInSubfolder ? '../video/' : 'video/';

// Array of video sources in order
const videoSources = [
    videoBasePath + 'videoplayback.mp4',
    videoBasePath + 'videoplayback-1.mp4'
];

let currentVideoIndex = 0;

// Get video elements
const videoSource = document.getElementById('videoSource');
const heroVideo = document.getElementById('heroVideo');

// Function to load and play a video
function playVideo(index) {
    if (videoSource && heroVideo) {
        videoSource.src = videoSources[index];
        heroVideo.load();
        heroVideo.play().catch(err => console.log('Autoplay prevented:', err));
    }
}

// Play the first video on page load
playVideo(currentVideoIndex);

// When current video ends, play the next one
if (heroVideo) {
    heroVideo.addEventListener('ended', () => {
        currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
        playVideo(currentVideoIndex);
    });
}

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

// Observe all process steps, work items, and sections (excluding about-content for typewriter)
const animatedElements = document.querySelectorAll('.services-center, .process-step, .work-item, .contact-content, .pricing-text, .pricing-card');
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
// INTERACTIVE HERO CARDS (Cursor Tracking)
// ==========================================

const interactiveCards = document.querySelectorAll('[data-tilt]');

if (interactiveCards.length > 0 && window.innerWidth > 768) {
    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ==========================================
// STATS TICKER ANIMATION
// ==========================================

const statValues = document.querySelectorAll('.stat-value');

function animateStats() {
    statValues.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCount = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };

        updateCount();
    });
}

// Trigger stats animation when hero comes into view
const heroSection = document.querySelector('.hero-minimal');
if (heroSection && statValues.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(heroSection);
}

// ==========================================
// PROCESS CARDS SCROLL-TRIGGERED POP-IN
// ==========================================

const processCards = document.querySelectorAll('.process-step');

const processObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Get the card index from all process cards
            const cardIndex = Array.from(processCards).indexOf(entry.target);
            // Stagger the animation based on index
            setTimeout(() => {
                entry.target.classList.add('pop-in');
            }, cardIndex * 150); // 150ms delay between each card

            // Unobserve after animation
            processObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px'
});

processCards.forEach(card => {
    processObserver.observe(card);
});

// ==========================================
// PROCESS CARDS 3D TILT EFFECT
// ==========================================

processCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ==========================================
// TYPEWRITER EFFECT FOR ABOUT SECTION
// ==========================================

function typeWriter(element, text, speed = 30) {
    return new Promise((resolve) => {
        let index = 0;
        element.textContent = '';
        element.classList.add('typing');

        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else {
                element.classList.remove('typing');
                element.classList.add('typing-complete');
                resolve();
            }
        }

        type();
    });
}

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        console.log('About section intersecting:', entry.isIntersecting, 'Already typed:', entry.target.dataset.typed);

        if (entry.isIntersecting && !entry.target.dataset.typed) {
            entry.target.dataset.typed = 'true';
            console.log('Starting typewriter animation...');

            const aboutText = entry.target.querySelector('.about-text');
            const descriptions = aboutText.querySelectorAll('.about-description');
            console.log('Found descriptions:', descriptions.length);

            // Store original text and hide initially
            descriptions.forEach((desc, idx) => {
                if (!desc.dataset.originalText) {
                    desc.dataset.originalText = desc.textContent.trim();
                    console.log(`Description ${idx} text:`, desc.dataset.originalText.substring(0, 50) + '...');
                }
                desc.textContent = ''; // Clear immediately
            });

            // Type first paragraph
            console.log('Typing paragraph 1...');
            typeWriter(descriptions[0], descriptions[0].dataset.originalText, 25).then(() => {
                console.log('Paragraph 1 complete, waiting 1s for paragraph 2...');
                // Wait 1 second, then type second paragraph
                setTimeout(() => {
                    if (descriptions[1]) {
                        console.log('Typing paragraph 2...');
                        typeWriter(descriptions[1], descriptions[1].dataset.originalText, 25);
                    }
                }, 1000);
            });

            aboutObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px'
});

const aboutSection = document.querySelector('.about-content');
console.log('About section found:', !!aboutSection);
if (aboutSection) {
    aboutObserver.observe(aboutSection);
    console.log('Observer attached to about section');
}

// ==========================================
// MAGNETIC BUTTON EFFECT
// ==========================================

const magneticButtons = document.querySelectorAll('.btn-primary');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Limit the movement to make it subtle
        const moveX = x * 0.3;
        const moveY = y * 0.3;

        button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0) scale(1)';
    });
});

// ==========================================
// PRICING FEATURES ANIMATED CHECKMARKS
// ==========================================

const pricingCardsWithFeatures = document.querySelectorAll('.pricing-card');

const pricingFeaturesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';

            const features = entry.target.querySelectorAll('.pricing-features li');

            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.classList.add('animate');
                }, index * 100); // 100ms stagger between each feature
            });

            pricingFeaturesObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px'
});

pricingCardsWithFeatures.forEach(card => {
    pricingFeaturesObserver.observe(card);
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log('%c🎨 Wortkraftmaster Portfolio', 'font-size: 20px; font-weight: bold; color: #ff3700;');
console.log('%cBuilt with modern web technologies', 'font-size: 12px; color: #666;');
