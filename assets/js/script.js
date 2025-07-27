// assets/js/script.js

document.addEventListener('DOMContentLoaded', function() {
  const logo = document.getElementById('logo');
  const introText = document.getElementById('introText');
  const nav = document.querySelector('.navbar');
  const scrollBtn = document.getElementById('scrollTopBtn');
  
  const intro = document.querySelector('.intro');
  const introMargin = 60; // as defined in CSS

  function updateAnimation() {
    const scrollY = window.scrollY;
    const navHeight = nav.offsetHeight;
    const introHeight = intro.offsetHeight;
    const threshold = introHeight + introMargin;
    const ratio = Math.min(Math.max(scrollY / threshold, 0), 1);
    
    // Logo scaling from 1 to 0.2
    const scale = 1 - 0.8 * ratio;
    // Initial and final top positions for logo
    const initialLogoTop = navHeight + introMargin;
    const finalLogoHeight = 52; // 260 * 0.2
    const finalLogoTop = (navHeight - finalLogoHeight) / 2;
    const translateY = finalLogoTop - initialLogoTop;
    logo.style.transform = `translateY(${translateY * ratio}px) scale(${scale})`;
    
    // Text block moves left by 72px
    const textTranslateX = -72 * ratio;
    introText.style.transform = `translateX(${textTranslateX}px)`;
    
    // Show or hide scroll-to-top button
    if (scrollY > 100) {
      scrollBtn.style.display = 'flex';
    } else {
      scrollBtn.style.display = 'none';
    }
  }
  
  // Scroll to top on button click
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  window.addEventListener('scroll', updateAnimation);
});
