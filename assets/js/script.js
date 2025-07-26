const logoWrapper = document.querySelector('.intro-logo-wrapper');
const introText = document.querySelector('.intro-text');
const scrollBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const introHeight = introText.offsetHeight + 160; // offset top from margin
  const progress = Math.min(scrollY / introHeight, 1);

  // Interpolate values
  const width = 240 - (192 * progress); // 240 -> 48
  const height = 260 - (208 * progress); // 260 -> 52
  const top = 140 - (60 * progress); // 140 -> 80
  const left = 60; // Fixed padding

  // Update CSS variables
  document.documentElement.style.setProperty('--logo-width', `${width}px`);
  document.documentElement.style.setProperty('--logo-height', `${height}px`);
  document.documentElement.style.setProperty('--logo-top', `${top}px`);

  // Move intro text to align left
  introText.style.paddingLeft = `${60 * progress}px`;

  // Show scroll to top
  scrollBtn.style.display = scrollY > 300 ? 'block' : 'none';
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
