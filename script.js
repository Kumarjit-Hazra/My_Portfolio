// ===== MINIMAL GEN Z PORTFOLIO JAVASCRIPT =====
// Clean, elegant interactions with smooth animations and modern UX

// ===== CUSTOM CURSOR TRAIL ANIMATION =====
class CursorTrail {
    constructor() {
        this.cursor = document.querySelector('.cursor-trail');
        this.dots = document.querySelectorAll('.cursor-dot');
        this.mouse = { x: 0, y: 0 };
        this.dotsPos = Array.from({ length: this.dots.length }, () => ({ x: 0, y: 0 }));
        this.isMoving = false;

        this.init();
    }

    init() {
        // Only initialize on desktop devices
        if (window.innerWidth > 768) {
            document.addEventListener('mousemove', (e) => this.updateMouse(e));
            this.animate();
        }
    }

    updateMouse(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        this.isMoving = true;
    }

    animate() {
        this.dots.forEach((dot, index) => {
            const speed = 0.15 + (index * 0.05);
            const delay = index * 0.1;

            this.dotsPos[index].x += (this.mouse.x - this.dotsPos[index].x) * speed;
            this.dotsPos[index].y += (this.mouse.y - this.dotsPos[index].y) * speed;

            dot.style.left = this.dotsPos[index].x + 'px';
            dot.style.top = this.dotsPos[index].y + 'px';
            dot.style.opacity = this.isMoving ? (0.8 - index * 0.2) : 0;
        });

        this.isMoving = false;
        requestAnimationFrame(() => this.animate());
    }
}

// ===== REALISTIC SLOW LAG TYPING EFFECT CLASS =====
class TypeWriter {
    constructor(element, text, speed = 200) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.isDeleting = false;
        this.currentText = '';
        this.cursorVisible = true;
        this.lagDelay = 0;
        this.typingPause = false;
    }

    type() {
        const fullText = this.text;

        if (this.isDeleting) {
            this.currentText = fullText.substring(0, this.currentText.length - 1);
        } else {
            this.currentText = fullText.substring(0, this.currentText.length + 1);
        }

        // Add realistic slow lag cursor with enhanced styling
        let displayText = this.currentText;
        if (this.cursorVisible) {
            displayText += '<span class="typing-cursor">|</span>';
        }

        this.element.innerHTML = displayText;

        // Variable speed with realistic lag effects
        let typeSpeed = this.speed;

        // Slower base speed
        if (this.isDeleting) {
            typeSpeed = this.speed * 0.8;
        }

        // Add realistic typing patterns
        if (this.currentText.endsWith(' ')) {
            typeSpeed += 150; // Pause after spaces
        }

        if (this.currentText.endsWith(',')) {
            typeSpeed += 200; // Pause after commas
        }

        if (this.currentText.endsWith('.')) {
            typeSpeed += 300; // Longer pause after periods
        }

        // Add random lag for more realistic typing (increased frequency)
        if (Math.random() < 0.25) {
            typeSpeed += Math.random() * 300 + 100;
        }

        // Occasional longer pauses (thinking moments)
        if (Math.random() < 0.08) {
            typeSpeed += Math.random() * 800 + 400;
        }

        if (!this.isDeleting && this.currentText === fullText) {
            typeSpeed = 4000; // Much longer pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            typeSpeed = 1200; // Longer pause before restart
        }

        setTimeout(() => this.type(), typeSpeed);
    }

    start() {
        // Add a longer delay before starting for dramatic effect
        setTimeout(() => {
            this.element.style.borderRight = '2px solid var(--color-accent)';
            this.element.style.animation = 'cursorFlicker 0.15s ease-in-out infinite alternate';
            this.type();
        }, 1500);
    }
}

// ===== SMOOTH SCROLLING FUNCTION =====
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed header
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===== FADE IN ANIMATION ON SCROLL =====
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// ===== MOBILE NAVIGATION TOGGLE =====
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');

    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (hamburger.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
    });
}

// ===== CONTACT FORM HANDLING =====
function handleContactForm(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.submit-button');
    const originalContent = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Show success message
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'rgba(255, 255, 255, 0.2)';

        // Reset form
        form.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
            submitBtn.style.background = 'var(--glass-bg)';
        }, 3000);

        // Show success notification
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    }, 2000);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        color: var(--color-accent);
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        box-shadow: 0 8px 32px var(--glass-shadow);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        border: 1px solid var(--glass-border);
        max-width: 400px;
        font-weight: var(--font-weight-medium);
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// ===== NAVIGATION SCROLL EFFECT =====
function handleNavigationScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 15, 15, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(15, 15, 15, 0.8)';
        header.style.boxShadow = 'none';
    }
}

// ===== PARALLAX EFFECT FOR HERO SECTION =====
function handleParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const gradientOrbs = document.querySelectorAll('.gradient-orb');

    if (hero && gradientOrbs.length > 0) {
        const rate = scrolled * -0.1;
        hero.style.transform = `translateY(${rate}px)`;

        // Animate gradient orbs
        gradientOrbs.forEach((orb, index) => {
            const orbRate = scrolled * (0.05 + index * 0.02);
            orb.style.transform = `translateY(${orbRate}px)`;
        });
    }
}

// ===== ENHANCE GLASS CARDS WITH HOVER EFFECTS =====
function enhanceGlassCards() {
    const glassCards = document.querySelectorAll('.glass-card');

    glassCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
            card.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
            card.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 8px 32px var(--glass-shadow)';
            card.style.borderColor = 'var(--glass-border)';
        });
    });
}

// ===== ENHANCE BUTTONS WITH HOVER EFFECTS =====
function enhanceButtons() {
    const buttons = document.querySelectorAll('.cta-button, .submit-button, .project-link');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 8px 24px rgba(255, 255, 255, 0.1)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 4px 16px var(--glass-shadow)';
        });
    });
}

// ===== FORM VALIDATION =====
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'rgba(255, 0, 0, 0.5)';
            isValid = false;
        } else {
            input.style.borderColor = 'var(--glass-border)';
        }
    });

    // Email validation
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.style.borderColor = 'rgba(255, 0, 0, 0.5)';
            isValid = false;
        }
    }

    return isValid;
}

// ===== PERFORMANCE OPTIMIZATION =====
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== INITIALIZATION FUNCTION =====
function init() {
    // Initialize cursor trail
    new CursorTrail();

    // Add fade-in class to sections
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });

    // Initialize mobile navigation
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');

            // Reset hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Initialize contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            if (validateForm(e.target)) {
                handleContactForm(e);
            } else {
                showNotification('Please fill in all required fields correctly.', 'error');
            }
        });
    }

    // Initialize scroll animations
    const throttledScrollHandler = throttle(() => {
        handleScrollAnimations();
        handleNavigationScroll();
        handleParallax();
    }, 16);

    window.addEventListener('scroll', throttledScrollHandler);

    // Initialize on page load
    handleScrollAnimations();
    enhanceGlassCards();
    enhanceButtons();

    // Initialize typing effect for hero tagline
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const typingText = typingElement.textContent;
        typingElement.textContent = '';
        const typeWriter = new TypeWriter(typingElement, typingText, 100);
        typeWriter.start();
    }

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Add subtle animations to hero elements
    const heroName = document.querySelector('.hero-name');
    const heroTagline = document.querySelector('.hero-tagline');
    const ctaButton = document.querySelector('.cta-button');

    if (heroName) {
        setTimeout(() => {
            heroName.style.animation = 'fadeInUp 1s ease forwards';
        }, 500);
    }

    if (heroTagline) {
        setTimeout(() => {
            heroTagline.style.animation = 'fadeInUp 1s ease forwards';
        }, 1000);
    }

    if (ctaButton) {
        setTimeout(() => {
            ctaButton.style.animation = 'fadeInUp 1s ease forwards';
        }, 1500);
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
    // Gracefully handle errors without breaking the user experience
});

// ===== INITIALIZE WHEN DOM IS LOADED =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.scrollToSection = scrollToSection;
window.showNotification = showNotification;

// ===== ADDITIONAL UTILITY FUNCTIONS =====

// Function to handle form field focus effects
function enhanceFormFields() {
    const formFields = document.querySelectorAll('input, textarea');

    formFields.forEach(field => {
        field.addEventListener('focus', () => {
            field.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            field.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.1)';
        });

        field.addEventListener('blur', () => {
            if (!field.value) {
                field.style.borderColor = 'var(--glass-border)';
                field.style.boxShadow = 'none';
            }
        });
    });
}

// Function to add subtle animations to project cards
function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, { threshold: 0.2 });

    projectCards.forEach(card => {
        observer.observe(card);
    });
}

// Function to add subtle animations to timeline items
function animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// ===== ENHANCED SCROLL ANIMATIONS =====
function enhanceScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll('section, .glass-card, .project-card, .extra-card');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// ===== ENHANCED HOVER EFFECTS =====
function addAdvancedHoverEffects() {
    const cards = document.querySelectorAll('.glass-card, .project-card, .extra-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.transform = `translateY(-8px) rotateX(${(y - rect.height / 2) * 0.1}deg) rotateY(${(x - rect.width / 2) * 0.1}deg) scale(1.02)`;
            card.style.boxShadow = `
                0 25px 80px rgba(0, 0, 0, 0.3),
                0 0 0 1px rgba(255, 255, 255, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                0 0 30px rgba(255, 255, 255, 0.1)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
            card.style.boxShadow = '0 8px 32px var(--glass-shadow)';
        });
    });
}

// ===== SMOOTH SCROLL ENHANCEMENT =====
function enhanceSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
}

// Initialize additional enhancements
document.addEventListener('DOMContentLoaded', () => {
    enhanceFormFields();
    animateProjectCards();
    animateTimelineItems();
    enhanceScrollAnimations();
    addAdvancedHoverEffects();
    enhanceSmoothScroll();
});