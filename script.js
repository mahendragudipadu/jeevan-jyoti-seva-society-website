/**
 * Jeevan Jyoti Seva Society - JavaScript
 * Handles all interactive functionality for the website
 */

// ==========================================================================
// Alert Bar - Rotating Messages
// ==========================================================================

const alertMessages = [
    "🚨 Emergency Relief: Supporting flood victims in Kerala - Your donations are making a difference!",
    "📢 New Program Launch: Computer literacy classes now available for 500 students",
    "💝 Child Sponsorship: 50 children still waiting for sponsors - Change a life today!",
    "📊 Annual Report Available: See how your donations transformed 5,000+ lives this year"
];

let currentAlertIndex = 0;
let alertInterval;

/**
 * Initialize the alert bar with rotating messages
 */
function initAlertBar() {
    const alertBar = document.getElementById('alert-bar');
    const alertMessage = document.getElementById('alert-message');
    const alertClose = document.getElementById('alert-close');

    if (!alertBar || !alertMessage || !alertClose) return;

    // Set initial message
    alertMessage.textContent = alertMessages[currentAlertIndex];

    // Rotate messages every 5 seconds
    alertInterval = setInterval(() => {
        currentAlertIndex = (currentAlertIndex + 1) % alertMessages.length;
        alertMessage.textContent = alertMessages[currentAlertIndex];
    }, 5000);

    // Close alert bar
    alertClose.addEventListener('click', () => {
        alertBar.style.display = 'none'; // Completely remove from layout
        clearInterval(alertInterval);
    });
}

// ==========================================================================
// Sticky Header - Change on Scroll
// ==========================================================================

/**
 * Add scrolled class to header when user scrolls down
 */
function initStickyHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ==========================================================================
// Mobile Menu Toggle
// ==========================================================================

/**
 * Toggle mobile navigation menu
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Update ARIA attribute
        const isExpanded = navMenu.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ==========================================================================
// Smooth Scroll Navigation
// ==========================================================================

/**
 * Smooth scroll to anchor sections
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80; // Account for sticky header
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================================================
// Photo Gallery Lightbox
// ==========================================================================

let currentImageIndex = 0;
const galleryImages = [];

/**
 * Initialize photo gallery with lightbox functionality
 */
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    if (!lightbox || !lightboxImage || !closeBtn || !prevBtn || !nextBtn) return;

    // Collect all gallery images
    galleryItems.forEach((item, index) => {
        const placeholder = item.querySelector('.gallery-placeholder');
        if (placeholder) {
            const computedStyle = window.getComputedStyle(placeholder);
            galleryImages.push({
                background: computedStyle.background,
                index: index
            });
        }
    });

    /**
     * Open lightbox with specific image
     */
    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImage.style.background = galleryImages[index].background;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    /**
     * Close lightbox
     */
    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore scrolling
    }

    /**
     * Show next image
     */
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        lightboxImage.style.background = galleryImages[currentImageIndex].background;
    }

    /**
     * Show previous image
     */
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImage.style.background = galleryImages[currentImageIndex].background;
    }

    // Click events for gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));

        // Keyboard support for gallery items
        item.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });
    });

    // Lightbox controls
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    // Click outside image to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
}

// ==========================================================================
// Donor Interest Form
// ==========================================================================

/**
 * Initialize donor interest form with validation
 */
function initDonationForm() {
    const form = document.getElementById('donation-form');

    if (!form) return;

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm(form)) {
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Show success message
            alert(`Thank you for your interest, ${data.firstName}!\n\nWe have received your information:\n\nName: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nPhone: ${data.phone}\nInterest Area: ${data.program}\n\nWe will contact you shortly with more information about supporting our mission.\n\nNote: In production, this form would send an email to mahendragudipadu@gmail.com with these details.`);

            // Reset form
            form.reset();
        }
    });
}

// ==========================================================================
// Contact Form
// ==========================================================================

/**
 * Initialize contact form with validation
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm(form)) {
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Show success message
            alert(`Thank you for your message, ${data.name}!\n\nWe have received your inquiry and will respond within 24-48 hours.\n\nThis is a demo form. In production, this would send an actual email.`);

            // Reset form
            form.reset();
        }
    });
}

// ==========================================================================
// Form Validation
// ==========================================================================

/**
 * Validate form fields
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - True if form is valid
 */
function validateForm(form) {
    const inputs = form.querySelectorAll('[required]');
    let isValid = true;

    inputs.forEach(input => {
        // Remove previous error state
        input.classList.remove('error');

        // Check if field is empty
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
            return;
        }

        // Validate email
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.classList.add('error');
                isValid = false;
            }
        }

        // Validate number
        if (input.type === 'number') {
            if (isNaN(input.value) || parseFloat(input.value) <= 0) {
                input.classList.add('error');
                isValid = false;
            }
        }
    });

    if (!isValid) {
        alert('Please fill in all required fields correctly.');
    }

    return isValid;
}

// ==========================================================================
// Current Year in Footer
// ==========================================================================

/**
 * Set current year in footer copyright
 */
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ==========================================================================
// Intersection Observer - Animate on Scroll (Optional Enhancement)
// ==========================================================================

/**
 * Add fade-in animation when elements come into view
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe stat cards, program cards, etc.
    const animatedElements = document.querySelectorAll(
        '.stat-card, .program-card, .serve-card, .testimonial-card, .involvement-card'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ==========================================================================
// Initialize All Functions on DOM Load
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initAlertBar();
    initStickyHeader();
    initMobileMenu();
    initSmoothScroll();
    initGallery();
    initDonationForm();
    initContactForm();
    setCurrentYear();
    initScrollAnimations();

    // Log initialization (can be removed in production)
    console.log('Jeevan Jyoti Seva Society website initialized successfully!');
});

// ==========================================================================
// Service Worker Registration (Optional - for PWA)
// ==========================================================================

/**
 * Register service worker for offline functionality (commented out - enable if needed)
 */
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed'));
    });
}
*/

// ==========================================================================
// Export functions for testing (if using module system)
// ==========================================================================

// Uncomment if using ES6 modules
/*
export {
    initAlertBar,
    initStickyHeader,
    initMobileMenu,
    initSmoothScroll,
    initGallery,
    initDonationForm,
    initContactForm,
    validateForm,
    setCurrentYear,
    initScrollAnimations
};
*/
