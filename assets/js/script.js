
const logoWrapper = document.querySelector('.logo-wrapper');
const navbarLogo = document.querySelector('.navbar-logo');
const introText = document.querySelector('.intro-text');
const scrollBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const maxScroll = 300;

  const progress = Math.min(scrollY / maxScroll, 1);

  const scale = 1 - (0.8 * progress);
  const translateX = 0;
  const translateY = -progress * 140;

  logoWrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  introText.style.transform = `translateX(${-progress * 72}px)`;

  if (progress === 1) {
    navbarLogo.style.opacity = 1;
  } else {
    navbarLogo.style.opacity = 0;
  }

  scrollBtn.style.display = scrollY > 300 ? 'block' : 'none';
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
