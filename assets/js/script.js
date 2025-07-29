document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  // Toggle nav menu for mobile
  hamburger.addEventListener('click', function (event) {
    event.stopPropagation(); // 防止點 hamburger 被當作點到外面
    navLinks.classList.toggle('active');
  });

  // 點擊畫面其他地方時，收起漢堡選單
  document.addEventListener('click', function (event) {
    if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
      navLinks.classList.remove('active');
    }
  });

  // Scroll to top button
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
  scrollTopBtn.classList.add("visible");
    } else {
  scrollTopBtn.classList.remove("visible");
    }
  });

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // card effect
  const cards = document.querySelectorAll('.work-card');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        } else {
          entry.target.classList.remove('fade-in');
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  cards.forEach(card => {
  observer.observe(card);
  });
});

