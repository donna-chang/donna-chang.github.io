// assets/js/script.js
document.addEventListener('DOMContentLoaded', function() {
  const logo = document.querySelector('.logo');
  const intro = document.querySelector('.intro');
  const introText = document.querySelector('.intro-text');

  // 初始與最終狀態參數
  const initialLeft = parseFloat(getComputedStyle(logo).left);    // 20px
  const initialTop  = parseFloat(getComputedStyle(logo).top);     // 100px
  const finalLeft = 20;   // 縮小後對齊左側 (可調整)
  const finalTop  = 4;    // 縮小後距導覽列上邊約 4px
  const deltaX = finalLeft - initialLeft;  // 水平位移總量
  const deltaY = finalTop  - initialTop;   // 垂直位移總量
  const initialScale = 1;
  const finalScale = 0.2; // 48/240 = 0.2

  const introHeight = intro.offsetHeight;

  window.addEventListener('scroll', function() {
    // 計算動畫進度（0~1）
    let scrollY = window.scrollY;
    let progress = scrollY / introHeight;
    progress = Math.max(0, Math.min(1, progress));

    // 計算並設置 Logo 的 transform
    let translateX = deltaX * progress;
    let translateY = deltaY * progress;
    let scale = initialScale + (finalScale - initialScale) * progress;
    logo.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;

    // 同步移動文字區塊向左（不縮放文字）
    // 我們將文字塊向左移動原先間隔距離 (72px)
    introText.style.transform = `translateX(${-72 * progress}px)`;
  });
});
