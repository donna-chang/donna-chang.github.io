document.addEventListener('DOMContentLoaded', function () {

  // === Banner 畫面輪播（Smart Remote）===
  // 動態照 thisisroman.com/spruit：每 3 秒所有卡片往左移一格（移動本身 1.1s，寫在 style.css）。
  // 中間那張原尺寸；兩側縮到 0.82、往中間轉 14°。
  document.querySelectorAll('.hero-carousel').forEach(function (carousel) {
    const INTERVAL = 3000;
    const SIDE_SCALE = 0.82;
    const TILT = 14;
    const VISIBLE_SIDE = 2;    // 中間左右各露出幾支；最外側那支的外緣對齊內文欄的邊
    const MIN_GAP = 0.06;      // 間距下限（× 卡片高度），手機等窄螢幕用
    const REPLAY_DELAY = 3000; // 影片播完停在最後一格多久再重播

    const MIN_CARDS = 10; // 手機畫面窄，卡片少於這個數時自動複製一輪，兩側才不會空掉

    const originals = Array.from(carousel.querySelectorAll('.hero-card'));
    if (originals.length < 3) return;
    const cards = originals.slice();
    while (cards.length < MIN_CARDS) {
      originals.forEach(function (card) {
        const copy = card.cloneNode(true);
        copy.setAttribute('aria-hidden', 'true');
        carousel.appendChild(copy);
        cards.push(copy);
      });
    }
    const count = cards.length;

    // 影片播完後停在最後一格，等 REPLAY_DELAY 後用淡入切回第一格再重播（HTML 裡的 video 不要加 loop）
    // 做法：第一格的封面圖（poster）蓋在影片上淡入，淡完把影片跳回開頭開始播，封面圖再淡出
    const FADE = 600; // 淡入時間（毫秒），要和 style.css 的 .replay-cover transition 一樣

    function setPlaying(video, shouldPlay) {
      video.shouldPlay = shouldPlay;
      if (!shouldPlay) {
        video.pause();
      } else if (!video.waiting && video.paused) {
        video.play().catch(function () {});
      }
    }

    cards.forEach(function (card) {
      const video = card.querySelector('video');
      if (!video) return;
      video.loop = false;

      const cover = document.createElement('img');
      cover.className = 'replay-cover';
      cover.src = video.poster;
      cover.alt = '';
      cover.setAttribute('aria-hidden', 'true');
      card.appendChild(cover);

      video.addEventListener('ended', function () {
        video.waiting = true;
        window.setTimeout(function () {
          cover.classList.add('is-visible');           // 第一格淡入，蓋住最後一格
          window.setTimeout(function () {
            video.currentTime = 0;
            video.addEventListener('seeked', function () {
              cover.classList.remove('is-visible');     // 影片已在第一格，封面圖再慢慢淡出
              video.waiting = false;
              if (video.shouldPlay) video.play().catch(function () {});
            }, { once: true });
          }, FADE);
        }, REPLAY_DELAY);
      });
    });

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cardWidth = function (card) {
      return parseFloat(getComputedStyle(card).getPropertyValue('--card-width')) || 0.4977;
    };
    let active = 0;
    let timer;
    let onScreen = true;

    // 每張卡片相對中間的位置：0 = 中間，負數在左、正數在右
    function offsetOf(index) {
      let offset = (index - active + count) % count;
      if (offset >= count - Math.floor(count / 2)) offset -= count;
      return offset;
    }

    // 依輪播寬度算間距，讓左右第 VISIBLE_SIDE 支手機的外緣剛好碰到邊
    function gapFor() {
      const h = cards[0].offsetHeight || 1;
      const w = cardWidth(cards[0]);
      const gap = (carousel.clientWidth / (2 * h) - w / 2) / VISIBLE_SIDE - w * SIDE_SCALE;
      return Math.max(MIN_GAP, gap);
    }

    function layout() {
      const GAP = gapFor();
      const offsets = cards.map(function (card, i) { return offsetOf(i); });
      const minOffset = -Math.floor(count / 2);
      const maxOffset = count - 1 + minOffset;

      cards.forEach(function (card, i) {
        const offset = offsets[i];
        const side = Math.sign(offset);

        // 從中間往外累加每張卡片的寬度和間距
        let x = 0;
        for (let step = 1; step <= Math.abs(offset); step++) {
          const prev = cards[offsets.indexOf(side * (step - 1))];
          const curr = cards[offsets.indexOf(side * step)];
          const prevScale = step === 1 ? 1 : SIDE_SCALE;
          x += cardWidth(prev) * prevScale / 2 + GAP + cardWidth(curr) * SIDE_SCALE / 2;
        }

        // 最左那張（下一步要繞到最右）和剛繞過去的那張藏起來，繞的過程才看不到
        const hidden = offset === minOffset || offset === maxOffset;

        card.style.setProperty('--x', (side * x).toFixed(3));
        card.style.setProperty('--scale', offset === 0 ? 1 : SIDE_SCALE);
        card.style.setProperty('--tilt', (-side * TILT) + 'deg');
        card.style.setProperty('--hide-after', hidden ? '1.1s' : '0s');
        card.style.opacity = hidden ? 0 : 1;

        // 看得到的影片才播放
        const video = card.querySelector('video');
        if (!video) return;
        setPlaying(video, !hidden && Math.abs(offset) <= 3 && onScreen);
      });
    }

    function next() {
      active = (active + 1) % count;
      layout();
    }

    function start() {
      window.clearInterval(timer);
      if (!reducedMotion.matches && onScreen && !document.hidden) {
        timer = window.setInterval(next, INTERVAL);
      }
    }

    // 滑出畫面或切到別的分頁時暫停，省電也不會一回來就連跳好幾格
    new IntersectionObserver(function (entries) {
      onScreen = entries[0].isIntersecting;
      layout();
      start();
    }).observe(carousel);
    document.addEventListener('visibilitychange', start);
    window.addEventListener('resize', layout);
    reducedMotion.addEventListener('change', start);

    // 第一次排版不要動畫，卡片直接出現在定位
    cards.forEach(function (card) { card.style.transition = 'none'; });
    layout();
    carousel.offsetHeight; // 強制套用定位後再恢復動畫
    cards.forEach(function (card) { card.style.transition = ''; });
    start();
  });

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
        transition: transform 1200ms cubic-bezier(.22, .61, .36, 1), opacity 820ms ease;
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
      }, 1200);
    }

    function startGreetingLoop() {
      window.clearInterval(greetingTimer);
      if (!reducedMotion.matches) {
        greetingTimer = window.setInterval(showNextGreeting, 2800);
      }
    }

    startGreetingLoop();
    reducedMotion.addEventListener?.('change', startGreetingLoop);
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

  
  // 使用 data-id，過濾有效 section
  const tocSections = Array.from(tocLinks)
    .map(a => document.getElementById(a.dataset.id))
    .filter(Boolean);

  if (toc && tocWrapper && tocTriggerSection && tocSections.length) {
    // Overview 到達觸發位置，且 Banner 下緣離開 TOC 頂部後才顯示
    const updateTocVisibility = () => {
      const triggerTop = tocTriggerSection.getBoundingClientRect().top;
      const revealLine = window.innerHeight * 0.35;

      const banner = document.querySelector('.banner');
      const bannerBottom = banner
        ? banner.getBoundingClientRect().bottom
        : Infinity;

      const tocTop = tocWrapper.getBoundingClientRect().top;

      const overviewReached = triggerTop <= revealLine;
      const bannerCleared = bannerBottom <= tocTop;

      tocWrapper.classList.toggle(
        'visible',
        overviewReached && bannerCleared
      );
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
