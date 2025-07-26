document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const introLogo = document.querySelector('.intro-logo');
    const introSection = document.querySelector('.intro');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }

        // Logo animation
        const introRect = introSection.getBoundingClientRect();
        const scrollProgress = Math.min(Math.max(-introRect.top / introRect.height, 0), 1);

        const startWidth = 240;
        const endWidth = 48;
        const startHeight = 260;
        const endHeight = 52;
        const startMarginLeft = 0;
        const endMarginLeft = 60; // Align with container padding

        const newWidth = startWidth + (endWidth - startWidth) * scrollProgress;
        const newHeight = startHeight + (endHeight - startHeight) * scrollProgress;
        const newMarginLeft = startMarginLeft + (endMarginLeft - startMarginLeft) * scrollProgress;

        introLogo.style.width = `${newWidth}px`;
        introLogo.style.height = `${newHeight}px`;
        introLogo.style.marginLeft = `${newMarginLeft}px`;

        // Move intro text
        const introText = document.querySelector('.intro-text');
        const maxTranslateX = -newMarginLeft;
        introText.style.transform = `translateX(${maxTranslateX * scrollProgress}px)`;
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
