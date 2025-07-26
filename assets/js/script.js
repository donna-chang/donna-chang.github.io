const logo = document.querySelector('.intro-logo');
const introText = document.querySelector('.intro-text');
const scrollTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Logo 動畫
  const maxScroll = 300;
  const progress = Math.min(scrollY / maxScroll, 1);

  const logoWidth = 240 - (192 * progress);  // 240 -> 48
  const logoHeight = 260 - (208 * progress); // 260 -> 52
  const logoTranslateX = -progress * 60;
  const logoTranslateY = -progress * 100;

  logo.style.width = `${logoWidth}px`;
  logo.style.height = `${logoHeight}px`;
  logo.style.transform = `translate(${logoTranslateX}px, ${logoTranslateY}px)`;

  // Intro 文字動畫
  introText.style.transform = `translateX(${-progress * 40}px)`;
  introText.style.opacity = `${1 - progress}`;

  // Scroll To Top
  scrollTopBtn.style.display = scrollY > 200 ? 'block' : 'none';
});

// Scroll to top click
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
