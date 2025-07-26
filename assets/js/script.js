const logoWrapper = document.querySelector('.logo-wrapper');
const navbar = document.querySelector('.navbar');
const introText = document.querySelector('.intro-text');
const scrollBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const maxScroll = 300;
  const progress = Math.min(scrollY / maxScroll, 1);

  // 初始位置與大小
  const startLeft = 72;
  const startTop = window.innerHeight * 0.5 - 130; // centered - half of height 260px
  const startWidth = 240;
  const startHeight = 260;

  // 最終位置與大小
  const endLeft = 60; // navbar padding
  const endTop = 12; // navbar vertical center alignment
  const endWidth = 48;
  const endHeight = 52;

  // 線性內插
  const currentLeft = startLeft + (endLeft - startLeft) * progress;
  const currentTop = startTop + (endTop - startTop) * progress;
  const currentWidth = startWidth + (endWidth - startWidth) * progress;
  const currentHeight = startHeight + (endHeight - startHeight) * progress;

  logoWrapper.style.position = 'absolute';
  logoWrapper.style.left = `${currentLeft}px`;
  logoWrapper.style.top = `${currentTop}px`;
  logoWrapper.style.width = `${currentWidth}px`;
  logoWrapper.style.height = `${currentHeight}px`;

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
