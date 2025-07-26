
window.addEventListener("scroll", function () {
  const logo = document.querySelector(".logo-animated");
  const intro = document.querySelector(".intro-section");
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  const introHeight = intro.offsetHeight;
  const maxScroll = introHeight;

  const progress = Math.min(scrollTop / maxScroll, 1);

  const startWidth = 240;
  const startHeight = 260;
  const endWidth = 48;
  const endHeight = 52;

  const scaleW = startWidth + (endWidth - startWidth) * progress;
  const scaleH = startHeight + (endHeight - startHeight) * progress;

  const translateX = 0 + (0 - 60) * progress;
  const translateY = 0 + (0 - 30) * progress;

  logo.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleW / startWidth}, ${scaleH / startHeight})`;

  const scrollBtn = document.querySelector(".scroll-to-top");
  scrollBtn.style.display = scrollTop > 200 ? "block" : "none";
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
