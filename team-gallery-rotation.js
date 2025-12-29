(function () {
  const track = document.querySelector('.team-gallery-track');
  const cards = [...document.querySelectorAll('.team-member-card')];

  if (!track || cards.length === 0) return;

  let index = 0;
  let interval = null;

  function isDesktop() {
    return window.innerWidth > 768;
  }

  function applyRotation() {
    const total = cards.length;

    cards.forEach((card, i) => {
      card.classList.remove(
        'gallery-rotate-left',
        'gallery-rotate-center',
        'gallery-rotate-right',
        'active'
      );

      const pos = (i - index + total) % total;

      if (pos === 0) {
        card.classList.add('gallery-rotate-center', 'active');
      } else if (pos === 1) {
        card.classList.add('gallery-rotate-right');
      } else {
        card.classList.add('gallery-rotate-left');
      }
    });
  }

  function startDesktopMode() {
    track.classList.add('team-gallery-rotating');
    applyRotation();

    if (!interval) {
      interval = setInterval(() => {
        index = (index + 1) % cards.length;
        applyRotation();
      }, 4500);
    }
  }

  function stopDesktopMode() {
    track.classList.remove('team-gallery-rotating');
    clearInterval(interval);
    interval = null;

    // MOBILE → only center card visible
    cards.forEach((card, i) => {
      card.classList.remove(
        'gallery-rotate-left',
        'gallery-rotate-right'
      );
      if (i === index) {
        card.classList.add('gallery-rotate-center', 'active');
      } else {
        card.classList.remove('gallery-rotate-center', 'active');
      }
    });
  }

  function handleResize() {
    if (isDesktop()) {
      startDesktopMode();
    } else {
      stopDesktopMode();
    }
  }

  // Initial load
  handleResize();

  // Listen for resize
  window.addEventListener('resize', handleResize);
})();
