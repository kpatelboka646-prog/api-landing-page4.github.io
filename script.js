// script.js — API Studio V7
// Purpose: remove default mobile focus/highlight issues; ensure OPEN shows subtle rounded ring when tile focused/clicked
// Minimal changes from v6: focus the card on pointerdown and add/remove a helper focus-ring class
(function () {
  const cards = Array.from(document.querySelectorAll('.api-card'));

  function createRipple(card, clientX, clientY) {
    const rect = card.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height) * 1.2;
    ripple.style.position = 'absolute';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (clientY - rect.top - size / 2) + 'px';
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.background = 'radial-gradient(circle, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.02) 40%, transparent 60%)';
    ripple.style.opacity = '0';
    ripple.style.transform = 'scale(.6)';
    ripple.style.transition = 'transform 420ms cubic-bezier(.2,.9,.2,1), opacity 420ms';
    card.appendChild(ripple);
    requestAnimationFrame(() => {
      ripple.style.opacity = '1';
      ripple.style.transform = 'scale(1.6)';
    });
    setTimeout(() => {
      ripple.style.opacity = '0';
      setTimeout(() => ripple.remove(), 420);
    }, 420);
  }

  cards.forEach(card => {
    card.tabIndex = 0;
    card.setAttribute('role', 'link');

    card.addEventListener('pointerdown', (e) => {
      // focus the card immediately (this ensures :focus styles apply on mobile & desktop)
      try {
        card.focus({ preventScroll: true });
      } catch (err) {
        card.focus();
      }

      // add helper class used for OPEN ring (ensures visible on pointer interactions)
      card.classList.add('focus-ring');

      // create ripple for visual feedback
      try { createRipple(card, e.clientX, e.clientY); } catch (err) {}

      // pressed visual
      card.classList.add('pressed');
      card.style.opacity = '0.5';
    });

    ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => {
      card.addEventListener(ev, () => {
        card.classList.remove('pressed');
        card.style.opacity = '';
        // remove focus-ring after a short timeout so ring is visible briefly
        setTimeout(() => card.classList.remove('focus-ring'), 220);
      });
    });

    // keyboard activation (Enter / Space)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // Visual focus ring on keyboard activation
        card.classList.add('focus-ring');
        setTimeout(() => card.classList.remove('focus-ring'), 300);
        const href = card.getAttribute('href');
        if (href) window.location.href = href;
      }
    });

    // ensure a clean focus behavior for mouse/keyboard
    card.addEventListener('focus', () => card.classList.add('focus-ring'));
    card.addEventListener('blur', () => card.classList.remove('focus-ring'));
  });

  // Micro-optimisation: set svh on load (mobile view fix)
  (function setSVH(){
    try {
      const svh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--svh', `${svh}px`);
    } catch(e) {}
  })();

  // Expose debug API
  window.APIS_STUDIO_V7 = { cardsCount: cards.length };
})();
