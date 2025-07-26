const logo = document.querySelector('.intro-logo');
const navLogo = document.querySelector('.nav-logo');
const introText = document.querySelector('.intro-text');
const introSection = document.querySelector('.intro-section');
const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const maxScroll = introSection.offsetHeight;

  // logo animation
  const scale = Math.max(0.2, 1 - scrollY / maxScroll);
  const translateY = Math.min(120, scrollY * 0.4);
  const translateX = Math.min(72, scrollY * 0.3);
  logo.style.transform = `translate(${translateX}px, -${translateY}px) scale(${scale})`;

  // text move left
  introText.style.transform = `translateX(-${Math.min(translateX, 60)}px)`;

  // when fully scrolled past, show navbar logo
  if (scrollY > maxScroll - 100) {
    navLogo.classList.add('visible');
  } else {
    navLogo.classList.remove('visible');
  }

  // show scroll to top
  scrollToTopBtn.style.display = scrollY > 400 ? 'block' : 'none';
});

// Scroll to top
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
