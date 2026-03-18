/* =============================================
   OPENTECHIZ - Main JavaScript
   ============================================= */

/* --- Theme: prevent flash of wrong theme (runs immediately) --- */
(function () {
  if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.add('light');
  }
})();

document.addEventListener('DOMContentLoaded', () => {

  /* --- Theme toggle --- */
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.classList.toggle('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }

  /* --- Navbar scroll effect --- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  /* --- Mobile nav toggle --- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* --- Active nav link --- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* --- Scroll reveal animation --- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* --- Animated counter --- */
  function animateCounter(el, target, duration = 1800) {
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = eased * target;

      el.textContent = isDecimal
        ? value.toFixed(1)
        : Math.floor(value).toLocaleString();

      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    };

    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* --- Add stagger delays to grid children --- */
  document.querySelectorAll('.stagger-children').forEach(parent => {
    parent.querySelectorAll(':scope > *').forEach((child, i) => {
      child.classList.add('reveal', `reveal-delay-${Math.min(i + 1, 5)}`);
    });
  });

  /* --- Prefers reduced motion --- */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('visible');
    });
  }

  /* --- AI Tech Carousel --- */
  (function () {
    const track = document.getElementById('aisTechTrack');
    if (!track) return;

    const cards = Array.from(track.querySelectorAll('.ais-tc-card'));
    const prevBtn = document.getElementById('aisTcPrev');
    const nextBtn = document.getElementById('aisTcNext');
    const dotsContainer = document.getElementById('aisTcDots');

    let currentIndex = 0;
    let autoPlayTimer = null;

    function getCardsVisible() {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }

    function getMaxIndex() {
      return Math.max(0, cards.length - getCardsVisible());
    }

    function updateCarousel(animate) {
      if (animate === false) track.style.transition = 'none';
      else track.style.transition = '';

      const card = cards[0];
      const gap = 24;
      const offset = currentIndex * (card.offsetWidth + gap);
      track.style.transform = `translateX(-${offset}px)`;

      const max = getMaxIndex();
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= max;

      const dots = dotsContainer.querySelectorAll('.ais-tc-dot');
      dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
    }

    function buildDots() {
      dotsContainer.innerHTML = '';
      const max = getMaxIndex();
      for (let i = 0; i <= max; i++) {
        const dot = document.createElement('button');
        dot.className = 'ais-tc-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', () => { currentIndex = i; updateCarousel(); stopAuto(); startAuto(); });
        dotsContainer.appendChild(dot);
      }
    }

    function goNext() {
      const max = getMaxIndex();
      currentIndex = currentIndex < max ? currentIndex + 1 : 0;
      updateCarousel();
    }

    function goPrev() {
      const max = getMaxIndex();
      currentIndex = currentIndex > 0 ? currentIndex - 1 : max;
      updateCarousel();
    }

    function startAuto() {
      autoPlayTimer = setInterval(goNext, 4000);
    }

    function stopAuto() {
      clearInterval(autoPlayTimer);
    }

    prevBtn.addEventListener('click', () => { goPrev(); stopAuto(); startAuto(); });
    nextBtn.addEventListener('click', () => { goNext(); stopAuto(); startAuto(); });

    const outer = document.querySelector('.ais-tc-outer');
    if (outer) {
      outer.addEventListener('mouseenter', stopAuto);
      outer.addEventListener('mouseleave', startAuto);
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        currentIndex = Math.min(currentIndex, getMaxIndex());
        buildDots();
        updateCarousel(false);
        setTimeout(() => { track.style.transition = ''; }, 50);
      }, 150);
    });

    buildDots();
    updateCarousel();
    startAuto();
  })();

});
