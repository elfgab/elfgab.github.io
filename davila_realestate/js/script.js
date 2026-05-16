// js/script.js
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        const toggleMenu = () => {
            const isActive = navLinks.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);
        };

        hamburger.addEventListener('click', toggleMenu);
        
        // Accessibility: Allow toggling menu with Enter or Space key
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
    }

    // Removed mock form submission alert to allow native Formspree POST

    // Force iOS Safari to respect CSS :hover states
    document.body.addEventListener('touchstart', function() {}, {passive: true});

    // iPad / Mobile Touch Fix for Testimonial Cards using Event Delegation (Performance Optimization)
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (testimonialsGrid) {
        testimonialsGrid.addEventListener('click', function(e) {
            const card = e.target.closest('.testimonial-card');
            if (!card) return; // Ignore clicks outside cards

            const isActive = card.classList.contains('is-active');
            
            // Remove active class from all cards first
            const allCards = testimonialsGrid.querySelectorAll('.testimonial-card');
            allCards.forEach(c => c.classList.remove('is-active'));
            
            // If it wasn't active, make it active
            if (!isActive) {
                card.classList.add('is-active');
            }
        });
    }

    // Highlight current page in nav
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('current-page');
        }
    });
});
