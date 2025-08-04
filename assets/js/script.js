document.addEventListener('DOMContentLoaded', function () {
  // === 漢堡選單 ===
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger?.addEventListener('click', function (event) {
    event.stopPropagation();
    navLinks?.classList.toggle('active');
  });

  document.addEventListener('click', function (event) {
    if (!navLinks?.contains(event.target) && !hamburger?.contains(event.target)) {
      navLinks?.classList.remove('active');
    }
  });

  // === Scroll to Top 按鈕 ===
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      scrollTopBtn?.classList.add('visible');
    } else {
      scrollTopBtn?.classList.remove('visible');
    }
  });

  scrollTopBtn?.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // === 卡片淡入動畫 ===
  const cards = document.querySelectorAll('.work-card');
  const cardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      } else {
        entry.target.classList.remove('fade-in');
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => cardObserver.observe(card));

  // === TOC 快捷目錄 ===
  const toc = document.getElementById('toc');
  const tocWrapper = document.getElementById('toc-wrapper');
  const tocTriggerSection = document.getElementById('user-study');
  const tocLinks = toc ? toc.querySelectorAll('a') : [];

  // ✅ 改為使用 data-id，過濾有效 section
  const tocSections = Array.from(tocLinks)
    .map(a => document.getElementById(a.dataset.id))
    .filter(Boolean);

  if (toc && tocWrapper && tocTriggerSection && tocSections.length) {
    tocWrapper.style.transition = 'opacity 0.3s ease';

     // TOC 顯示邏輯
    let tocTriggered = false;
    const tocVisibilityObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tocWrapper.classList.add('visible');
          tocTriggered = true;
        } else if (tocTriggered && entry.boundingClientRect.top > 0) {
          tocWrapper.classList.remove('visible');
          tocTriggered = false;
        }
      });
    }, { threshold: 0.1 });

    tocVisibilityObserver.observe(tocTriggerSection);

    // Scroll Spy 高亮功能
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = toc.querySelector(`a[data-id="${id}"]`);
        if (entry.isIntersecting) {
          tocLinks.forEach(a => a.classList.remove('active'));
          link?.classList.add('active');
        }
      });
    }, {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    });

    tocSections.forEach(sec => spy.observe(sec));

    // 點擊滑動功能
    tocLinks.forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.getElementById(a.dataset.id);
        if (!target) return;
        window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
      });
    });
  }
});
