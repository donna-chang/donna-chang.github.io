function toggleMenu() {
  const nav = document.getElementById('nav-links');
  nav.classList.toggle('show');
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', function () {
  const btn = document.querySelector('.back-to-top');
  const navbar = document.querySelector('.navbar');
  const introContainer = document.querySelector('.intro-container');
  const logoLarge = document.querySelector('.logo-large');
  const logoSmall = document.querySelector('.logo-small');

  const scrollY = window.scrollY || window.pageYOffset;

  // 顯示或隱藏 back-to-top 按鈕
  if (scrollY > 100) {
    btn.classList.add('show');
  } else {
    btn.classList.remove('show');
  }

  // 參考 intro-container 的底部位置做 scroll 動態變化的最大距離
  const introHeight = introContainer.offsetHeight;
  const maxScroll = introHeight + introContainer.offsetTop; // intro 結束的 scrollY

  // 根據 scrollY 與 maxScroll 計算比例，0~1
  let progress = scrollY / maxScroll;
  if (progress > 1) progress = 1;
  if (progress < 0) progress = 0;

  // navbar 縮小觸發點：進度超過 0 就縮小，反之恢復
  if (progress > 0) {
    navbar.classList.add('shrunk');
  } else {
    navbar.classList.remove('shrunk');
  }

  // 動態改變大 logo 尺寸（從 240x260 縮小到 48x52）
  const logoWidthStart = 240;
  const logoHeightStart = 260;
  const logoWidthEnd = 48;
  const logoHeightEnd = 52;

  const newWidth = logoWidthStart - (logoWidthStart - logoWidthEnd) * progress;
  const newHeight = logoHeightStart - (logoHeightStart - logoHeightEnd) * progress;

  logoLarge.style.width = `${newWidth}px`;
  logoLarge.style.height = `${newHeight}px`;

  // intro-container 的 gap 從 72px 到 20px（文字跟 logo 靠近）
  const gapStart = 72;
  const gapEnd = 20;
  const newGap = gapStart - (gapStart - gapEnd) * progress;
  introContainer.style.gap = `${newGap}px`;

  // intro-text 左移：用 transform translateX，從 0 到 -100px (調整可再調整數值)
  const translateStart = 0;
  const translateEnd = -100;
  const translateX = translateStart + (translateEnd - translateStart) * progress;
  introContainer.querySelector('.intro-text').style.transform = `translateX(${translateX}px)`;

  // 大 logo 跟 intro-text 整體往左靠攏（用 margin 或 padding 調整）
  // 這邊用 padding-left 從初始值 0 到 60px
  const paddingLeftStart = 0;
  const paddingLeftEnd = 60;
  const paddingLeft = paddingLeftStart + (paddingLeftEnd - paddingLeftStart) * progress;
  introContainer.style.paddingLeft = `${paddingLeft}px`;

  // navbar 顯示小 logo（.logo-small）隱藏大 logo（.logo）
  // 這部分用 CSS class 已控制，這裡不再手動設定

});
