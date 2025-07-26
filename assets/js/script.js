const logoWrapper = document.querySelector('.logo-wrapper');
const navbar = document.querySelector('.navbar');
const introText = document.querySelector('.intro-text');
const scrollBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const maxScroll = 300;
  const progress = Math.min(scrollY / maxScroll, 1);

  // 初始位置與大小
  const startX = 72;
  const startY = window.innerHeight * 0.5 - 130; // 260/2

  // 最終位置與大小（垂直置中）
  const endX = 60;
  const navbarHeight = navbar.offsetHeight;
  const endY = navbarHeight / 2 - 26; // 52/2

  const startScale = 1;
  const endScale = 48 / 240; // 0.2

  const currentX = startX + (endX - startX) * progress;
  const currentY = startY + (endY - startY) * progress;
  const currentScale = startScale + (endScale - startScale) * progress;

  logoWrapper.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;

  // intro 文字也向左推 72px，避免重疊
  introText.style.transform = `translateX(${-progress * 72}px)`;

  // 控制 navbar 左上角小 logo 顯示
  if (progress === 1) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  scrollBtn.style.display = scrollY > 300 ? 'block' : 'none';
});
