// Minimal page transition script
(function(){
  const DURATION = 400; // ms, samakan dengan CSS
  // On load: switch from is-loading -> is-loaded
  window.addEventListener('DOMContentLoaded', () => {
    // next frame to ensure CSS transition runs
    requestAnimationFrame(() => {
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-loaded');
    });
  });

  // Intercept link clicks
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    // skip external, blank target, downloads, JS links, or links with class "no-anim"
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || a.target === '_blank' || a.hasAttribute('download') ) return;
    const isExternal = a.href && a.href.indexOf(location.origin) !== 0;
    if (isExternal) return;

    e.preventDefault();
    // play exit animation
    document.body.classList.remove('is-loaded');
    document.body.classList.add('is-exiting');

    // navigate after duration
    setTimeout(() => {
      window.location.href = a.href;
    }, DURATION);
  });

  // Optional: close transition on history navigation
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      document.body.classList.remove('is-exiting');
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-loaded');
    }
  });
})();