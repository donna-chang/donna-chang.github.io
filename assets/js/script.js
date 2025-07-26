// Scroll logo and intro animation
const introLogo = document.querySelector('.intro-logo');
const navLogo = document.querySelector('.nav-logo');
const introText = document.querySelector('.intro-text');
const scrollBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const maxScroll = 300;

  // Animate logo size and position
  let scale = 1 - (scrollY / maxScroll);
  scale = Math.max(scale, 0.2); // never shrink below 0.2 (48/240)
  introLogo.style.width = `${240 * scale}px`;
  introLogo.style.height = `${260 * scale}px`;

  // Move text to align left
  introText.style.transform = `translateX(-${Math.min(scrollY, 60)}px)`;

  // Fade in nav logo when intro out of view
  if (scrollY > maxScroll - 20) {
    navLogo.style.opacity = 1;
  } else {
    navLogo.style.opacity = 0;
  }

  // Show scroll-to-top button
  scrollBtn.style.display = scrollY > 200 ? 'block' : 'none';
});

// Scroll to top
document.querySelector('.scroll-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
