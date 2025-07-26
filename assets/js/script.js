const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const backToTopBtn = document.querySelector('.back-to-top');
const logo = document.querySelector('.logo');
const intro = document.querySelector('.intro');

hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !expanded);
  navLinks.classList.toggle('show');
});

// back to top 顯示控制
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }

  // 計算 intro 距離頂部高度，控制 logo 縮放與文字平移
  const introBottom = intro.getBoundingClientRect().bottom;

  // 當 intro 底部往上移動至視窗頂端時，比例從0到1
  const progress = Math.min(Math.max((window.innerHeight - introBottom) / intro.offsetHeight, 0), 1);

  // Logo 大小從 240x260 到 48x52 線性縮放
  const logoWidthStart = 240;
  const logoHeightStart = 260;
  const logoWidthEnd = 48;
  const logoHeightEnd = 52;
  const newWidth = logoWidthStart - (logoWidthStart - logoWidthEnd) * progress;
  const newHeight = logoHeightStart - (logoHeightStart - logoHeightEnd) * progress;
  logo.style.width = `${newWidth}px`;
  logo.style.height = `${newHeight}px`;

  // 文字往左移動，最大移動 150px
  const maxTranslateX = 150;
  const translateX = maxTranslateX * progress;
  intro.style.transform = `translateX(-${translateX}px)`;
});

// back to top 按鈕動作
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
