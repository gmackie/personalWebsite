// Scroll-triggered animations for gmacko.com "Digital Zine" treatment
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.addEventListener('DOMContentLoaded', function () {
      document.querySelectorAll('.scroll-sticker-slap, .scroll-rule-draw').forEach(function (el) {
        el.classList.add('visible');
      });
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.scroll-sticker-slap, .scroll-rule-draw').forEach(function (el) {
      observer.observe(el);
    });
  });
})();
