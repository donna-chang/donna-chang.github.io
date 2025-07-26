
function toggleMenu() {
  const nav = document.getElementById('nav-links');
  nav.classList.toggle('show');
}

window.onscroll = function () {
  const btn = document.querySelector('.back-to-top');
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    btn.style.display = 'block';
  } else {
    btn.style.display = 'none';
  }
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
