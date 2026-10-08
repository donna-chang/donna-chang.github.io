document.addEventListener('DOMContentLoaded', function () {

  // === 首頁問候語輪播 ===
  const greeting = document.querySelector('.language-greeting');
  const greetingWord = greeting?.querySelector('.language-greeting__word');
  const greetings = ['Hallo', 'Hello', '您好', '안녕하세요'];

  if (greeting && greetingWord) {
    const greetingStyles = document.createElement('style');
    greetingStyles.textContent = `
      .language-greeting {
        display: inline-grid;
        overflow: hidden;
        line-height: 1.2;
        vertical-align: top;
      }

      .language-greeting__word {
        grid-area: 1 / 1;
        display: block;
        transition: transform 1000ms cubic-bezier(.22, .61, .36, 1), opacity 700ms ease;
      }

      .language-greeting__word.is-leaving {
        transform: translateY(-110%);
        opacity: 0;
      }

      .language-greeting__word.is-entering {
        transform: translateY(110%);
        opacity: 0;
      }

      .language-greeting__word.is-visible {
        transform: translateY(0);
        opacity: 1;
      }

      @media (prefers-reduced-motion: reduce) {
        .language-greeting__word { transition: none; }
      }
    `;
    document.head.appendChild(greetingStyles);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let greetingIndex = greetings.indexOf(greetingWord.textContent.trim());
    let currentGreetingWord = greetingWord;
    let greetingTimer;

    function showNextGreeting() {
      if (reducedMotion.matches) return;

      greetingIndex = (greetingIndex + 1) % greetings.length;
      const nextGreetingWord = document.createElement('span');
      nextGreetingWord.className = 'language-greeting__word is-entering';
      nextGreetingWord.setAttribute('aria-hidden', 'true');
      nextGreetingWord.textContent = greetings[greetingIndex];
      greeting.appendChild(nextGreetingWord);
      greeting.setAttribute('aria-label', greetings[greetingIndex]);

      // 舊字上移與新字上移進場同步進行，畫面不會出現空白。
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          currentGreetingWord.classList.remove('is-visible');
          currentGreetingWord.classList.add('is-leaving');
          nextGreetingWord.classList.replace('is-entering', 'is-visible');
        });
      });

      window.setTimeout(() => {
        currentGreetingWord.remove();
        currentGreetingWord = nextGreetingWord;
      }, 1000);
    }

    function startGreetingLoop() {
      window.clearInterval(greetingTimer);
      if (!reducedMotion.matches) {
        greetingTimer = window.setInterval(showNextGreeting, 2400);
      }
    }

    startGreetingLoop();
    reducedMotion.addEventListener?.('change', startGreetingLoop);
  }

  // === Liquid Glass Navbar ===
  if (typeof liquidGL === 'function') {
    liquidGL({
      snapshot: "body",
      target: ".navbar-glass",
    
      resolution: 1.5,
      refraction: 0.045,
      aberration: 0.018,
      bevelDepth: 0.10,
      bevelWidth: 0.18,
      frost: 1.1,
    
      shadow: false,
      specular: false,
    
      reveal: "none",
      tilt: false,
      magnify: 1
    });
  }

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

  // === Navbar text color ===
  const navbar = document.querySelector('.navbar');
  const banner = document.querySelector('.banner');
  
  function updateNavbarColor() {
    if (!navbar || !banner) return;
  
    const bannerBottom = banner.getBoundingClientRect().bottom;
    const navbarBottom = navbar.getBoundingClientRect().bottom;
  
    navbar.classList.toggle('on-dark', bannerBottom > navbarBottom);
  }
  
  updateNavbarColor();
  window.addEventListener('scroll', updateNavbarColor, { passive: true });
  window.addEventListener('resize', updateNavbarColor);
  
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
  const tocTriggerSection = document.getElementById('overview');
  const tocLinks = toc ? toc.querySelectorAll('a') : [];

  // ✅ 改為使用 data-id，過濾有效 section
  const tocSections = Array.from(tocLinks)
    .map(a => document.getElementById(a.dataset.id))
    .filter(Boolean);

  if (toc && tocWrapper && tocTriggerSection && tocSections.length) {
    // TOC 顯示邏輯：Overview 標題進入畫面上方約 35% 時顯示
    const updateTocVisibility = () => {
      const triggerTop = tocTriggerSection.getBoundingClientRect().top;
      const revealLine = window.innerHeight * 0.35;
      tocWrapper.classList.toggle('visible', triggerTop <= revealLine);
    };

    updateTocVisibility();
    window.addEventListener('scroll', updateTocVisibility, { passive: true });
    window.addEventListener('resize', updateTocVisibility);

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
