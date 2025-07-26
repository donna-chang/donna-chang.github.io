const logo = document.querySelector('.intro-logo');
const introText = document.querySelector('.intro-text');
const introSection = document.querySelector('.intro-section');

function updateOnScroll() {
  const scrollY = window.scrollY;
  const introBottom = introSection.offsetTop + introSection.offsetHeight;

  const startScroll = 0;
  const endScroll = introBottom - 100; // adjust point where logo finishes transition
  const scrollProgress = Math.min(1, scrollY / endScroll);

  // Scale from 240×260 to 48×52
  const scale = 1 - scrollProgress * 0.8;
  const translateX = -scrollProgress * 80;
  const translateY = -scrollProgress * 120;

  logo.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;

  // Align intro text to left as user scrolls
  introText.style.transform = `translateX(-${scrollProgress * 20}px)`;
  introText.style.transition = 'transform 0.2s ease';

  requestAnimationFrame(updateOnScroll);
}

requestAnimationFrame(updateOnScroll);
