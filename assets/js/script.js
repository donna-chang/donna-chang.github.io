// Toggle nav menu for mobile
document.getElementById('hamburger').addEventListener('click', function () {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('active');
});

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.onscroll = function () {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};

scrollTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
