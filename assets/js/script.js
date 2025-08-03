document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  // Toggle nav menu for mobile
  hamburger.addEventListener('click', function (event) {
    event.stopPropagation();
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
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      } else {
        entry.target.classList.remove('fade-in');
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(card => observer.observe(card));

   // ======= TOC（大綱快捷）功能 =======
  const toc = document.getElementById('toc');
  const background = document.getElementById('background');  // 改成 Background 區塊
  const links = toc ? toc.querySelectorAll('a') : [];
  const sections = Array.from(links).map(a => document.getElementById(a.dataset.target));

  if (toc && background && links.length) {
    // 1) 用 IntersectionObserver 監聽 Background 是否在 viewport，決定 TOC 顯示/隱藏
    const tocVisibilityObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          toc.classList.add('visible');
        } else {
          toc.classList.remove('visible');
        }
      });
    }, { threshold: 0.1 });
    tocVisibilityObserver.observe(background);

    // 2) Scroll-spy：監測各 section 是否處於 viewport 中心
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = toc.querySelector(`a[data-target="${id}"]`);
        if (entry.isIntersecting) {
          links.forEach(a => a.classList.remove('active'));
          link?.classList.add('active');
        }
      });
    }, {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    });
    sections.forEach(sec => sec && spy.observe(sec));

    // 3) 點 TOC 滑動到對應段落
    links.forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.getElementById(a.dataset.target);
        if (!target) return;
        window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
      });
    });
  }
});

