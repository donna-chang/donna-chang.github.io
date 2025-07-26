const scrollBtn = document.getElementById('scrollTopBtn');
const logo = document.getElementById('logo');

// 顯示 scroll-to-top 按鈕
window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 200 ? 'block' : 'none';

  // 縮小 logo 動畫
  if (window.scrollY > 100) {
    logo.style.width = '48px';
    logo.style.height = '52px';
  } else {
    logo.style.width = '240px';
    logo.style.height = '260px';
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
stener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
