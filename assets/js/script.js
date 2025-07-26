window.addEventListener('scroll', function () {
  const btn = document.querySelector('.back-to-top');
  const logoLarge = document.querySelector('.logo-large');
  const logoSmall = document.querySelector('.logo-small');
  const introContainer = document.querySelector('.intro-container');
  const introText = introContainer.querySelector('.intro-text');

  const scrollY = window.scrollY || window.pageYOffset;

  // back-to-top 按鈕顯示控制
  if (scrollY > 100) {
    btn.classList.add('show');
  } else {
    btn.classList.remove('show');
  }

  // intro-container 高度及底部距離
  const introHeight = introContainer.offsetHeight;
  const maxScroll = introHeight + introContainer.offsetTop;

  // 計算 scroll 進度 0~1
  let progress = scrollY / maxScroll;
  if (progress > 1) progress = 1;
  if (progress < 0) progress = 0;

  // 大 logo 縮小尺寸從 240x260 到 48x52
  const logoWidthStart = 240;
  const logoHeightStart = 260;
  const logoWidthEnd = 48;
  const logoHeightEnd = 52;

  const newWidth = logoWidthStart - (logoWidthStart - logoWidthEnd) * progress;
  const newHeight = logoHeightStart - (logoHeightStart - logoHeightEnd) * progress;

  logoLarge.style.width = `${newWidth}px`;
  logoLarge.style.height = `${newHeight}px`;

  // intro-container gap 從 72px 到 20px
  const gapStart = 72;
  const gapEnd = 20;
  const newGap = gapStart - (gapStart - gapEnd) * progress;
  introContainer.style.gap = `${newGap}px`;

  // intro-text 水平位移，從 0 到 -100px
  const translateStart = 0;
  const translateEnd = -100;
  const translateX = translateStart + (translateEnd - translateStart) * progress;
  introText.style.transform = `translateX(${translateX}px)`;

  // intro-container padding-left 從 0 到 60px
  const paddingLeftStart = 0;
  const paddingLeftEnd = 60;
  const paddingLeft = paddingLeftStart + (paddingLeftEnd - paddingLeftStart) * progress;
  introContainer.style.paddingLeft = `${paddingLeft}px`;

  // 控制小 logo 顯示（scroll > 100 顯示，否則隱藏）
  if (scrollY > 100) {
    logoSmall.classList.add('visible');
  } else {
    logoSmall.classList.remove('visible');
  }

  // *** 移除 navbar 縮小 class 操作 ***
  // 不要動 navbar，保持固定大小及位置

});
