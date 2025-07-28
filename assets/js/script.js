document.addEventListener('DOMContentLoaded', function () {
  // Toggle nav menu for mobile
  document.getElementById('hamburger').addEventListener('click', function () {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
  });

  // Scroll to top button
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
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
          observer.unobserve(entry.target); // 只觸發一次
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

