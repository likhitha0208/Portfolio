/* ==========================================================================
   Likhitha Swamy — Portfolio JS
   Vanilla JS only. No external libraries.
   Sections: scroll-reveal, hero typing effect, mobile nav, scroll-spy,
   navbar scrolled state, canvas network background.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  initScrollReveal();
  initTypingEffect(prefersReducedMotion);
  initMobileNav();
  initScrollSpy();
  initNavbarScrolled();
  initCanvasNetwork(prefersReducedMotion);

  /* ------------------------------------------------------------------
     1. Scroll reveal — IntersectionObserver adds .active to .reveal
     ------------------------------------------------------------------ */
  function initScrollReveal() {
    var revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    if (!('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) {
        el.classList.add('active');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------------
     2. Hero typing effect — cycles through data-roles JSON array
     ------------------------------------------------------------------ */
  function initTypingEffect(reducedMotion) {
    var typedEl = document.querySelector('.typed-text');
    if (!typedEl) return;

    var rolesHost =
      document.querySelector('[data-roles]') || typedEl.closest('#hero');
    var roles = ['Network Engineer'];

    if (rolesHost && rolesHost.hasAttribute('data-roles')) {
      try {
        var parsed = JSON.parse(rolesHost.getAttribute('data-roles'));
        if (Array.isArray(parsed) && parsed.length) {
          roles = parsed;
        }
      } catch (e) {
        /* fall back to default roles on malformed JSON */
      }
    }

    if (reducedMotion) {
      typedEl.textContent = roles[0];
      return;
    }

    var TYPE_SPEED = 90; // ms per character while typing
    var DELETE_SPEED = 45; // ms per character while deleting
    var PAUSE_AFTER_TYPE = 1600; // ms pause once word fully typed
    var PAUSE_AFTER_DELETE = 400; // ms pause once word fully deleted

    var roleIndex = 0;
    var charIndex = 0;
    var deleting = false;

    function tick() {
      var currentRole = roles[roleIndex % roles.length];

      if (!deleting) {
        charIndex++;
        typedEl.textContent = currentRole.slice(0, charIndex);

        if (charIndex === currentRole.length) {
          deleting = true;
          setTimeout(tick, PAUSE_AFTER_TYPE);
          return;
        }
        setTimeout(tick, TYPE_SPEED);
      } else {
        charIndex--;
        typedEl.textContent = currentRole.slice(0, charIndex);

        if (charIndex === 0) {
          deleting = false;
          roleIndex++;
          setTimeout(tick, PAUSE_AFTER_DELETE);
          return;
        }
        setTimeout(tick, DELETE_SPEED);
      }
    }

    setTimeout(tick, TYPE_SPEED);
  }

  /* ------------------------------------------------------------------
     3. Mobile nav toggle + close on link click + smooth scroll
     ------------------------------------------------------------------ */
  function initMobileNav() {
    var navbar = document.getElementById('navbar');
    var navToggle = document.querySelector('.nav-toggle');
    var navLinksContainer = document.querySelector('.nav-links');
    var navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navLinksContainer) {
      navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        var expanded = navToggle.classList.contains('active');
        navToggle.setAttribute('aria-expanded', String(expanded));
      });
    }

    navLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (navToggle) {
          navToggle.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
        }
        if (navLinksContainer) {
          navLinksContainer.classList.remove('active');
        }

        var targetId =
          link.getAttribute('data-target') ||
          (link.getAttribute('href') && link.getAttribute('href').charAt(0) === '#'
            ? link.getAttribute('href').slice(1)
            : null);

        if (!targetId) return;

        var targetEl = document.getElementById(targetId);
        if (!targetEl) return;

        e.preventDefault();

        var navbarHeight = navbar ? navbar.offsetHeight : 0;
        var targetPosition =
          targetEl.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      });
    });
  }

  /* ------------------------------------------------------------------
     4. Scroll-spy — highlight active nav link based on section in view
     ------------------------------------------------------------------ */
  function initScrollSpy() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;

    var linkMap = {};
    navLinks.forEach(function (link) {
      var id =
        link.getAttribute('data-target') ||
        (link.getAttribute('href') && link.getAttribute('href').charAt(0) === '#'
          ? link.getAttribute('href').slice(1)
          : null);
      if (id) linkMap[id] = link;
    });

    function setActiveLink(id) {
      navLinks.forEach(function (link) {
        link.classList.remove('active');
      });
      if (linkMap[id]) {
        linkMap[id].classList.add('active');
      }
    }

    if (!('IntersectionObserver' in window)) {
      return;
    }

    var navbar = document.getElementById('navbar');
    var navbarHeight = navbar ? navbar.offsetHeight : 0;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      {
        rootMargin:
          '-' + (navbarHeight + 10) + 'px 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ------------------------------------------------------------------
     5. Navbar scrolled state
     ------------------------------------------------------------------ */
  function initNavbarScrolled() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    var THRESHOLD = 60;

    function onScroll() {
      if (window.scrollY > THRESHOLD) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------
     6. Canvas background — slow drifting particle/network animation
     ------------------------------------------------------------------ */
  function initCanvasNetwork(reducedMotion) {
    var canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var particles = [];
    var PARTICLE_COUNT = 50;
    var MAX_LINK_DIST = 140;
    var SPEED = 0.15; // slow drift
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var width = 0;
    var height = 0;
    var rafId = null;
    var running = false;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createParticles() {
      particles = [];
      for (var i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * SPEED,
          vy: (Math.random() - 0.5) * SPEED,
          r: Math.random() * 1.5 + 0.8,
        });
      }
    }

    function step() {
      ctx.clearRect(0, 0, width, height);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      }

      ctx.fillStyle = 'rgba(79, 209, 255, 0.45)';
      for (var j = 0; j < particles.length; j++) {
        var pt = particles[j];
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (var a = 0; a < particles.length; a++) {
        for (var b = a + 1; b < particles.length; b++) {
          var p1 = particles[a];
          var p2 = particles[b];
          var dx = p1.x - p2.x;
          var dy = p1.y - p2.y;
          var dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_LINK_DIST) {
            var opacity = (1 - dist / MAX_LINK_DIST) * 0.15;
            ctx.strokeStyle = 'rgba(79, 209, 255, ' + opacity + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    }

    function loop() {
      if (!running) return;
      step();
      rafId = window.requestAnimationFrame(loop);
    }

    function start() {
      if (running) return;
      running = true;
      rafId = window.requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    resize();
    createParticles();

    if (reducedMotion) {
      // Draw a single static frame and skip the animation loop entirely.
      step();
    } else {
      start();

      document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
          stop();
        } else {
          start();
        }
      });
    }

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        resize();
        createParticles();
        if (reducedMotion) {
          step();
        }
      }, 150);
    });
  }
});
