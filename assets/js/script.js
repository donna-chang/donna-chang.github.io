const scrollBtn = document.getElementById('scrollTopBtn');
const introLogo = document.getElementById('introLogo');
const navLogo = document.getElementById('navLogo');
const introText = document.getElementById('introText');
const introWrapper = document.getElementById('introWrapper');

// Scroll event
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Scroll-to-top button
  scrollBtn.style.display = scrollY > 300 ? 'block' : 'none';

  // Logo & text animation
  const shrinkPoint = 200;
  if (scrollY > shrinkPoint) {
    introLogo.style.width = '48px';
    introLogo.style.height = '52px';
    introText.style.opacity = 0;
    introText.style.transform = 'translateX(-20px)';
  } else {
    const progress = 1 - scrollY / shrinkPoint;
    const size = 48 + (192 * progress);
    const height = 52 + (208 * progress);
    introLogo.style.width = `${size}px`;
    introLogo.style.height = `${height}px`;
    introText.style.opacity = progress;
    introText.style.transform = `translateX(${72 * progress}px)`;
  }
});

// Scroll to top
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
