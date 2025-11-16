(function () {
  const splash = document.getElementById('splash');
  const core = document.getElementById('core');
  const particles = Array.from(document.querySelectorAll('.particle'));
  const logoWrap = document.getElementById('logoWrap');
  const page = document.getElementById('page');
  const sfx = document.getElementById('sfx-explosion');

  const TIMINGS = {
    chargeStart: 0,          // start immediately
    explosionAt: 1000,       // explosion moment (1s)
    formationStart: 1350,    // particles begin to gather (1.35s)
    logoShowAt: 3500,        // logo visible (3.5s)
    finishAt: 5000           // end of animation (5s)
  };

  // Start sequence
  function startSplash() {
    // Reset
    splash.classList.remove('done');
    page.classList.remove('visible');
    logoWrap.classList.remove('show');

    // Show core (charge)
    core.style.opacity = '1';

    // small delay to allow CSS pulse
    setTimeout(() => {

      // ---- EXPLOSION ----
      setTimeout(() => {
        // play sound (might be blocked by browser)
        if (sfx && sfx.play) {
          sfx.currentTime = 0;
          const p = sfx.play();
          if (p && p.catch) p.catch(() => {});
        }

        particles.forEach(p => p.classList.add('explode'));
      }, TIMINGS.explosionAt);

      // ---- FORMATION ----
      setTimeout(() => {
        logoWrap.classList.add('show');

        particles.forEach((p, i) => {
          p.classList.add('to-logo');
          p.style.animationDelay = (1.35 + i * 0.01) + 's';
        });

      }, TIMINGS.formationStart);

      // ---- FIN DE L'ANIMATION + REDIRECTION ----
      setTimeout(() => {
        splash.style.transition = 'opacity .5s ease';
        splash.style.opacity = '0';

        // rendre la page visible (si tu veux montrer le contenu avant la redirection)
        page.classList.add('visible');

        // après fade-out du splash
        setTimeout(() => {
          splash.style.display = 'none';
        }, 600);

        // 👉 REDIRECTION AUTOMATIQUE VERS index.html
        setTimeout(() => {
          window.location.href = "index.html";
        }, 800); // petite pause le temps du fade-out

      }, TIMINGS.finishAt);

    }, 50);
  }

  // Start when window loads
  window.addEventListener('load', () => {
    setTimeout(startSplash, 80);
  });

})();
