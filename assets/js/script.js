const logo = document.querySelector('.intro-logo');
const navLogo = document.querySelector('.logo');
const introSection = document.querySelector('.intro-section');
const scrollTopBtn = document.querySelector('.scroll-to-top');

// Logo Shrink on Scroll
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const introBottom = introSection.offsetTop + introSection.offsetHeight;

  // logo shrink animation
  if (scrollY > 20 && scrollY < introBottom) {
    const scale = Math.max(0.2, 1 - scrollY / introBottom);
    logo.style.width = `${240 * scale}px`;
    logo.style.height = `${260 * scale}px`;
  }

  // show scroll-to-top
  if (scrollY > 300) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

// Scroll to top
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll to top
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
