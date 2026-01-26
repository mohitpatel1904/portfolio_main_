// ================================
// Portfolio Site JavaScript
// ================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initScrollEffects();
    initMobileMenu();
    initContactForm();
    initTypingEffect();
    initTestimonialSlider();
    initProjectSearch();
    initProjectFilters();
});

// ================================
// Navigation
// ================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                navMenu.classList.remove('active');
            }
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink && scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    });
}

// ================================
// Mobile Menu
// ================================
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const hamburger = navToggle.querySelector('.hamburger');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Animate hamburger
        if (navMenu.classList.contains('active')) {
            hamburger.style.background = 'transparent';
            hamburger.style.transform = 'rotate(45deg)';
        } else {
            hamburger.style.background = '';
            hamburger.style.transform = '';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.style.background = '';
            hamburger.style.transform = '';
        }
    });
}

// ================================
// Scroll Effects
// ================================
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll(
        '.glass-card, .section-title, .section-subtitle, .hero-text > *, .hero-avatar'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Make hero elements visible immediately
    setTimeout(() => {
        document.querySelectorAll('.hero-text > *, .hero-avatar').forEach(el => {
            el.style.opacity = '1';
        });
    }, 100);
}

// ================================
// Typing Effect
// ================================
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const roles = [
        'Data Engineer',
        'AI Specialist',
        'Web Scraping Expert',
        'Automation Pro'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at end
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing after a small delay
    setTimeout(type, 1000);
}

// ================================
// Contact Form
// ================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // For now, show success message (you can integrate with Formspree or similar)
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent! ✓';
            submitBtn.style.background = '#ffffff';
            submitBtn.style.color = '#000000';

            // Reset form
            form.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 1000);

        // To actually send emails, uncomment and configure:
        /*
        try {
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                submitBtn.textContent = 'Message Sent! ✓';
                form.reset();
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            submitBtn.textContent = 'Failed to send';
            console.error('Form submission error:', error);
        }
        */
    });
}

// ================================
// Utility: Debounce
// ================================
function debounce(func, wait) {
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

// Parallax effect removed to prevent background cropping

// ================================
// Testimonial Slider (v3)
// ================================
function initTestimonialSlider() {
    const slider = document.getElementById('testimonial-slider');
    const inner = slider?.querySelector('.testimonials-flex-inner');
    const cards = slider?.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const dots = document.querySelectorAll('.testimonials-nav .nav-dot');

    if (!slider || !cards || cards.length === 0) return;

    let currentIndex = 0;

    function updateSlider() {
        if (!inner || !cards[currentIndex]) return;

        const containerWidth = slider.offsetWidth;
        const cardWidth = cards[currentIndex].offsetWidth;

        // Add padding to inner container so first/last cards can center
        const sidePadding = (containerWidth / 2) - (cardWidth / 2);
        inner.style.paddingLeft = `${sidePadding}px`;
        inner.style.paddingRight = `${sidePadding}px`;

        const cardOffset = cards[currentIndex].offsetLeft;

        // Calculate scroll position to center the card
        const scrollTo = cardOffset - (containerWidth / 2) + (cardWidth / 2);

        slider.scrollTo({
            left: scrollTo,
            behavior: 'smooth'
        });

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        // Update Lucide icons (ensures icons in new cards are rendered)
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    prevBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : cards.length - 1;
        updateSlider();
    });

    nextBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });

    // Initialize position (center first card)
    window.addEventListener('load', () => {
        setTimeout(updateSlider, 100);
    });

    // Handle resize
    window.addEventListener('resize', debounce(() => {
        updateSlider();
    }, 250));
}

// ================================
// Project Search & Filtering
// ================================
function initProjectSearch() {
    const heroSearch = document.getElementById('hero-search');
    const projectSearch = document.getElementById('project-search');
    const projectCards = document.querySelectorAll('.project-card');

    function performSearch(query) {
        const searchTerm = query.toLowerCase().trim();

        projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.project-tag')).map(t => t.textContent.toLowerCase());
            const tech = Array.from(card.querySelectorAll('.project-tech i')).map(i => i.className.toLowerCase());

            if (title.includes(searchTerm) ||
                description.includes(searchTerm) ||
                tags.some(t => t.includes(searchTerm)) ||
                tech.some(t => t.includes(searchTerm))) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // If hero search, scroll to projects if not already there
        if (document.activeElement === heroSearch && searchTerm.length > 0) {
            const projectSection = document.getElementById('projects');
            const offsetTop = projectSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    heroSearch?.addEventListener('input', (e) => {
        if (projectSearch) projectSearch.value = e.target.value;
        performSearch(e.target.value);
    });

    projectSearch?.addEventListener('input', (e) => {
        if (heroSearch) heroSearch.value = e.target.value;
        performSearch(e.target.value);
    });
}

function initProjectFilters() {
    const heroFilters = document.querySelectorAll('.hero-quick-filters .filter-btn');
    const projectFilters = document.querySelectorAll('.project-filters .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    function applyFilter(category) {
        // Sync filter buttons
        const allFilters = [...heroFilters, ...projectFilters];
        allFilters.forEach(btn => {
            if (btn.dataset.filter === category || btn.dataset.category === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        projectCards.forEach(card => {
            const tags = Array.from(card.querySelectorAll('.project-tag')).map(t => t.textContent.toLowerCase());

            if (category === 'all') {
                card.style.display = 'block';
            } else {
                // Map short filters to project tags
                const matches = tags.some(tag => {
                    if (category === 'ai') return tag.includes('machine learning');
                    if (category === 'data') return tag.includes('deep learning');
                    if (category === 'rag') return tag.includes('rag');
                    if (category === 'selenium') return tag.includes('selenium');
                    if (category === 'langchain') return tag.includes('langchain');
                    if (category === 'cv') return tag.includes('computer vision');
                    if (category === 'automation') return tag.includes('automation');
                    if (category === 'ai-agent') return tag.includes('ai agent') || tag.includes('automation');
                    if (category === 'web') return tag.includes('scraping') || tag.includes('web');
                    return tag.includes(category);
                });
                card.style.display = matches ? 'block' : 'none';
            }
        });

        // Scroll to projects if clicked from hero
        if ([...heroFilters].some(btn => btn === document.activeElement)) {
            const projectSection = document.getElementById('projects');
            const offsetTop = projectSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    heroFilters.forEach(btn => {
        btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
    });

    projectFilters.forEach(btn => {
        btn.addEventListener('click', () => applyFilter(btn.dataset.category));
    });
}
