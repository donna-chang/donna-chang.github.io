// script.js
// Toggle mobile navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Scroll-to-top button
const scrollButton = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  // Show/hide scroll-top button
  if (scrollY > 100) {
    scrollButton.style.display = 'block';
  } else {
    scrollButton.style.display = 'none';
  }
  // Intro logo and text animation
  const intro = document.querySelector('.intro');
  const logo = document.querySelector('.intro-logo');
  const text = document.querySelector('.intro-text');
  const introTop = intro.offsetTop;
  const introHeight = intro.offsetHeight;
  // Calculate scroll fraction through intro section
  let fraction = (scrollY - introTop) / (introHeight - 60);
  fraction = Math.min(Math.max(fraction, 0), 1);
  // Shrink logo dimensions
  const startWidth = 240, startHeight = 260;
  const endWidth = 48, endHeight = 52;
  const newWidth = startWidth + (endWidth - startWidth) * fraction;
  const newHeight = startHeight + (endHeight - startHeight) * fraction;
  logo.style.width = newWidth + 'px';
  logo.style.height = newHeight + 'px';
  // Move logo towards navbar
  const startTop = 60; // initial top offset
  const endTop = (60 - endHeight) / 2; // center in navbar
  const newTop = startTop + (endTop - startTop) * fraction;
  logo.style.position = 'fixed';
  logo.style.left = '60px';
  logo.style.top = newTop + 'px';
  // Slide intro text left
  const textOffset = 72 * fraction;
  text.style.transform = `translateX(${-textOffset}px)`;
});

// Smooth scroll to top on button click
scrollButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
