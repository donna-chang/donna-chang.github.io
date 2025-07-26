const logo = document.querySelector('.logo-animated');
const logoSmall = document.querySelector('.logo-small');
const introText = document.querySelector('.intro-text');
const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const triggerPoint = 300;

  // Animate logo shrink + position
  if (scrollY < triggerPoint) {
    const progress = scrollY / triggerPoint;
    const size = 240 - (192 * progress); // from 240 to 48
    const height = 260 - (208 * progress); // from 260 to 52
    logo.style.width = `${size}px`;
    logo.style.height = `${height}px`;
    introText.style.transform = `translateX(${-72 * progress}px)`;
    logoSmall.style.opacity = 0;
  } else {
    logo.style.width = `48px`;
    logo.style.height = `52px`;
    introText.style.transform = `translateX(-72px)`;
    logoSmall.style.opacity = 1;
  }

  // Scroll-to-top button visibility
  if (scrollY > 400) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
