// js/script.js
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Optional form submission alert for contact.html
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for reaching out! Nancy will be in contact with you shortly.');
            contactForm.reset();
        });
    }

    // Force iOS Safari to respect CSS :hover states
    document.body.addEventListener('touchstart', function() {}, {passive: true});

    // iPad / Mobile Touch Fix for Testimonial Cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Check if this card is already active
            const isActive = this.classList.contains('is-active');
            
            // Remove active class from all cards first
            testimonialCards.forEach(c => c.classList.remove('is-active'));
            
            // If it wasn't active, make it active
            if (!isActive) {
                this.classList.add('is-active');
            }
        });
    });
});
