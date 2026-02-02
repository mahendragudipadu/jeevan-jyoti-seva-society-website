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
 * Initialize donor interest form with validation and Netlify submission
 */
function initDonationForm() {
    const form = document.getElementById('donation-form');

    if (!form) return;

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (validateForm(form)) {
            const formData = new FormData(form);
            const firstName = formData.get('firstName');

            try {
                // Submit to Netlify Forms
                const response = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                });

                if (response.ok) {
                    alert(`Thank you for your interest, ${firstName}!\n\nWe have received your information and will contact you shortly with more information about supporting our mission.`);
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Sorry, there was an error submitting your form. Please try again or contact us directly at jeevanjyotisevasociety4@gmail.com');
            }
        }
    });
}

// ==========================================================================
// Contact Form
// ==========================================================================

/**
 * Initialize contact form with validation and Netlify submission
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (validateForm(form)) {
            const formData = new FormData(form);
            const name = formData.get('name');

            try {
                // Submit to Netlify Forms
                const response = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                });

                if (response.ok) {
                    alert(`Thank you for your message, ${name}!\n\nWe have received your inquiry and will respond within 24-48 hours.`);
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Sorry, there was an error submitting your form. Please try again or contact us directly at jeevanjyotisevasociety4@gmail.com');
            }
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
// Contributions Carousel
// ==========================================================================

/**
 * Initialize the contributions carousel with auto-play and navigation
 */
function initContributionsCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let autoPlayInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dot');

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
        resetAutoPlay();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        goToSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(currentIndex);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const carouselInView = track.getBoundingClientRect().top < window.innerHeight &&
                               track.getBoundingClientRect().bottom > 0;
        if (carouselInView) {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        }
    });

    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    track.addEventListener('mouseleave', () => resetAutoPlay());

    // Start auto-play
    autoPlayInterval = setInterval(nextSlide, 5000);
}

// ==========================================================================
// Donor Highlights - Click to Show Supported Projects
// ==========================================================================

// Donor project data - use 'image' for real images, 'class' for gradient placeholders
const donorProjects = {
    1: {
        name: 'Donor',
        projects: [
            { image: 'images/donors/donor-1/project-1.jpeg', alt: 'Project 1' },
            { image: 'images/donors/donor-1/project-2.jpeg', alt: 'Project 2' },
            { image: 'images/donors/donor-1/project-3.jpeg', alt: 'Project 3' },
            { image: 'images/donors/donor-1/project-4.jpeg', alt: 'Project 4' }
        ]
    },
    2: {
        name: 'Donor',
        projects: [
            { image: 'images/donors/donor-2/project-1.jpeg', alt: 'Project 1' },
            { image: 'images/donors/donor-2/project-2.jpeg', alt: 'Project 2' },
            { image: 'images/donors/donor-2/project-3.jpeg', alt: 'Project 3' },
            { image: 'images/donors/donor-2/project-4.jpeg', alt: 'Project 4' },
            { image: 'images/donors/donor-2/project-5.jpeg', alt: 'Project 5' }
        ]
    },
    3: {
        name: 'Carol Ann Cyr',
        projects: [
            { image: 'images/donors/donor-3/project-1.jpeg', alt: 'Project 1' },
            { image: 'images/donors/donor-3/project-2.jpeg', alt: 'Project 2' },
            { image: 'images/donors/donor-3/project-3.jpeg', alt: 'Project 3' }
        ]
    },
    4: {
        name: 'Dr. Prince',
        projects: [
            { image: 'images/donors/donor-4/project-1.jpeg', alt: 'Project 1' },
            { image: 'images/donors/donor-4/project-2.jpeg', alt: 'Project 2' },
            { image: 'images/donors/donor-4/project-3.jpeg', alt: 'Project 3' },
            { image: 'images/donors/donor-4/project-4.jpeg', alt: 'Project 4' }
        ]
    }
};

/**
 * Initialize donor highlights functionality
 */
function initDonorHighlights() {
    const donorCards = document.querySelectorAll('.donor-card');
    const modalOverlay = document.getElementById('donor-modal-overlay');
    const projectsGrid = document.getElementById('donor-projects-grid');
    const selectedDonorName = document.getElementById('selected-donor-name');
    const closeBtn = document.querySelector('.donor-modal-close');

    if (!donorCards.length || !modalOverlay) return;

    // Create image lightbox for full-size viewing
    const imageLightbox = document.createElement('div');
    imageLightbox.className = 'image-lightbox';
    imageLightbox.innerHTML = `
        <button class="image-lightbox-close" aria-label="Close">&times;</button>
        <button class="image-lightbox-prev" aria-label="Previous image">&#10094;</button>
        <img src="" alt="Project image" class="image-lightbox-img">
        <button class="image-lightbox-next" aria-label="Next image">&#10095;</button>
    `;
    document.body.appendChild(imageLightbox);

    const lightboxImg = imageLightbox.querySelector('.image-lightbox-img');
    const lightboxClose = imageLightbox.querySelector('.image-lightbox-close');
    const lightboxPrev = imageLightbox.querySelector('.image-lightbox-prev');
    const lightboxNext = imageLightbox.querySelector('.image-lightbox-next');

    let currentProjectImages = [];
    let currentImageIndex = 0;

    // Open image in lightbox
    function openImageLightbox(images, index) {
        currentProjectImages = images;
        currentImageIndex = index;
        updateLightboxImage();
        imageLightbox.classList.add('active');
    }

    // Update lightbox image
    function updateLightboxImage() {
        const project = currentProjectImages[currentImageIndex];
        lightboxImg.src = project.image;
        lightboxImg.alt = project.alt;
    }

    // Navigate to next image
    function nextLightboxImage() {
        currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
        updateLightboxImage();
    }

    // Navigate to previous image
    function prevLightboxImage() {
        currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
        updateLightboxImage();
    }

    // Close image lightbox
    function closeImageLightbox() {
        imageLightbox.classList.remove('active');
        lightboxImg.src = '';
        currentProjectImages = [];
    }

    lightboxClose.addEventListener('click', closeImageLightbox);
    lightboxPrev.addEventListener('click', prevLightboxImage);
    lightboxNext.addEventListener('click', nextLightboxImage);
    imageLightbox.addEventListener('click', (e) => {
        if (e.target === imageLightbox) {
            closeImageLightbox();
        }
    });

    // Handle donor card clicks
    donorCards.forEach(card => {
        card.addEventListener('click', () => {
            const donorId = card.dataset.donor;
            const donor = donorProjects[donorId];

            if (!donor) return;

            // Remove active class from all cards
            donorCards.forEach(c => c.classList.remove('active'));

            // Add active class to clicked card
            card.classList.add('active');

            // Update donor name
            selectedDonorName.textContent = donor.name;

            // Clear and populate projects grid
            projectsGrid.innerHTML = '';
            // Filter projects that have real images for lightbox navigation
            const imageProjects = donor.projects.filter(p => p.image);

            donor.projects.forEach((project, index) => {
                const projectItem = document.createElement('div');
                projectItem.className = 'donor-project-item';
                if (project.image) {
                    projectItem.innerHTML = `<img src="${project.image}" alt="${project.alt}" class="donor-project-image">`;
                    // Add click handler for image lightbox with navigation
                    projectItem.style.cursor = 'pointer';
                    const imageIndex = imageProjects.indexOf(project);
                    projectItem.addEventListener('click', () => {
                        openImageLightbox(imageProjects, imageIndex);
                    });
                } else {
                    projectItem.innerHTML = `<div class="donor-project-placeholder ${project.class}" title="${project.alt}"></div>`;
                }
                projectsGrid.appendChild(projectItem);
            });

            // Show modal popup
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close button handler
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close on overlay click (outside modal)
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (imageLightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeImageLightbox();
            } else if (e.key === 'ArrowLeft') {
                prevLightboxImage();
            } else if (e.key === 'ArrowRight') {
                nextLightboxImage();
            }
        } else if (modalOverlay.classList.contains('active') && e.key === 'Escape') {
            closeModal();
        }
    });

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        donorCards.forEach(c => c.classList.remove('active'));
    }
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
    initContributionsCarousel();
    initGallery();
    initDonationForm();
    initContactForm();
    setCurrentYear();
    initScrollAnimations();
    initDonorHighlights();

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
