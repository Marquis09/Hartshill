document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.bento-item');
    
    // Intersection Observer Options
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of the card is visible
        rootMargin: "0px 0px -50px 0px" // Slightly offset the trigger point for a better feel
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a slight delay based on the card's index for a "staggered" effect
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }, index % 3 * 100); // Staggers every 3 cards to keep the flow natural

                // Stop observing once the animation is done
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial Setup & Start Observing
    cards.forEach(card => {
        // These styles ensure the card starts invisible and slightly lower
        card.style.opacity = "0";
        card.style.transform = "translateY(40px)"; 
        card.style.transition = "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)"; // Smoother easing
        
        observer.observe(card);
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});