document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const introLogo = document.querySelector('.intro-logo');
    const introSection = document.querySelector('.intro');
    const logoContainer = document.querySelector('.logo-container');
    const navLogo = document.querySelector('.logo');

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

        // Get the target position (logo container in navbar)
        const logoContainerRect = logoContainer.getBoundingClientRect();
        const startLeft = 60; // Container padding
        const startTop = 60; // Navbar height
        const endLeft = logoContainerRect.left;
        const endTop = logoContainerRect.top + (logoContainerRect.height - endHeight) / 2; // Center vertically

        const newWidth = startWidth + (endWidth - startWidth) * scrollProgress;
        const newHeight = startHeight + (endHeight - startHeight) * scrollProgress;
        const newLeft = startLeft + (endLeft - startLeft) * scrollProgress;
        const newTop = startTop + (endTop - startTop) * scrollProgress;

        introLogo.style.width = `${newWidth}px`;
        introLogo.style.height = `${newHeight}px`;
        introLogo.style.left = `${newLeft}px`;
        introLogo.style.top = `${newTop}px`;

        // Show/hide logos based on scroll position
        if (scrollProgress >= 1) {
            introLogo.style.opacity = '0';
            navLogo.style.opacity = '1';
        } else {
            introLogo.style.opacity = '1';
            navLogo.style.opacity = '0';
        }

        // Move intro text
        const introText = document.querySelector('.intro-text');
        const startMarginLeft = 312; // 240px logo + 72px gap
        const endMarginLeft = 60; // Align with container padding
        const newMarginLeft = startMarginLeft + (endMarginLeft - startMarginLeft) * scrollProgress;
        introText.style.marginLeft = `${newMarginLeft}px`;
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
