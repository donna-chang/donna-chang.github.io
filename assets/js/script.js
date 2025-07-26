document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const introLogo = document.querySelector('.intro-logo');
    const introSection = document.querySelector('.intro');
    const logoContainer = document.querySelector('.logo-container');

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
        const windowHeight = window.innerHeight;
        const scrollProgress = Math.min(Math.max((introRect.bottom - windowHeight) / (introRect.height - windowHeight), 0), 1);

        const startWidth = 240;
        const endWidth = 48;
        const startHeight = 260;
        const endHeight = 52;

        // Calculate initial and final positions
        const introContainer = document.querySelector('.intro-container');
        const introContainerRect = introContainer.getBoundingClientRect();
        const logoContainerRect = logoContainer.getBoundingClientRect();
        const startLeft = (introContainerRect.width - (240 + 312 + introText.offsetWidth)) / 2; // Center logo+text
        const startTop = 60; // Navbar height
        const endLeft = logoContainerRect.left;
        const endTop = logoContainerRect.top + (logoContainerRect.height - endHeight) / 2; // Center vertically in navbar

        const newWidth = startWidth + (endWidth - startWidth) * scrollProgress;
        const newHeight = startHeight + (endHeight - startHeight) * scrollProgress;
        const newLeft = startLeft + (endLeft - startLeft) * scrollProgress;
        const newTop = startTop + (endTop - startTop) * scrollProgress;

        introLogo.style.width = `${newWidth}px`;
        introLogo.style.height = `${newHeight}px`;
        introLogo.style.left = `${newLeft}px`;
        introLogo.style.top = `${newTop}px`;

        // Move intro text to maintain centering initially, then align left
        const introText = document.querySelector('.intro-text');
        const startTextLeft = startLeft + 240 + 72; // Logo width + gap
        const endTextLeft = 60; // Container padding
        const newTextLeft = startTextLeft + (endTextLeft - startTextLeft) * scrollProgress;
        introText.style.marginLeft = `${newTextLeft}px`;
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initial positioning
    const introContainer = document.querySelector('.intro-container');
    const introContainerRect = introContainer.getBoundingClientRect();
    const introText = document.querySelector('.intro-text');
    const initialLeft = (introContainerRect.width - (240 + 72 + introText.offsetWidth)) / 2;
    introLogo.style.left = `${initialLeft}px`;
    introText.style.marginLeft = `${initialLeft + 240 + 72}px`;
});
