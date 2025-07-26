// Scroll to top button
const scrollBtn = document.querySelector('.scroll-to-top');
window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll-triggered logo shrink
const logoIntro = document.querySelector('.logo-intro');
const logoFixed = document.querySelector('.logo-fixed');
const intro = document.querySelector('.intro-wrapper');

window.addEventListener('scroll', () => {
  const introBottom = intro.getBoundingClientRect().bottom;
  const windowHeight = window.innerHeight;

  // percent visible of intro
  const progress = Math.min(Math.max(1 - introBottom / windowHeight, 0), 1);

  // scale from 1 to 0.2
  const scale = 1 - progress * 0.8;

  logoIntro.style.transform = `scale(${scale})`;

  // When intro fully gone, show fixed nav logo
  if (progress >= 1) {
    logoIntro.style.opacity = 0;
    logoFixed.style.opacity = 1;
  } else {
    logoIntro.style.opacity = 1;
    logoFixed.style.opacity = 0;
  }
});
