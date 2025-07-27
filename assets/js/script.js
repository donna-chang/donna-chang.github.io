// JavaScript for scroll effects and scroll-to-top button

document.addEventListener('DOMContentLoaded', function() {
    const logo = document.getElementById('logo');
    const introText = document.getElementById('intro-text');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    // Function to handle scroll events
    function onScroll() {
        // Logo animation: when intro section is out of viewport
        const introBottom = introText.getBoundingClientRect().bottom;
        if (introBottom <= 0) {
            logo.classList.add('logo-fixed');
            introText.classList.add('text-shift');
        } else {
            logo.classList.remove('logo-fixed');
            introText.classList.remove('text-shift');
        }

        // Show or hide scroll-to-top button
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    }

    // Attach scroll event
    window.addEventListener('scroll', onScroll);
    // Initialize state on load
    onScroll();

    // Scroll to top behavior
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
