(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile nav
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('navLinks');

  if (nav && toggle && links) {
    const closeNav = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close when a link is clicked
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => closeNav());
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) closeNav();
    });
  }

  // Swap word in hero (subtle)
  const swap = document.getElementById('swapWord');
  if (swap && !prefersReducedMotion) {
    const words = ['homes', 'rentals', 'cabins', 'second homes'];
    let i = 0;

    const fade = (toOpacity) => {
      swap.style.transition = 'opacity 220ms ease';
      swap.style.opacity = String(toOpacity);
    };

    setInterval(() => {
      fade(0);
      setTimeout(() => {
        i = (i + 1) % words.length;
        swap.textContent = words[i];
        fade(1);
      }, 240);
    }, 2600);
  }

  // Footer year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Contact form: open a mailto with the details + copy to clipboard
  const form = document.getElementById('requestForm');
  const note = document.getElementById('formNote');

  if (form && note) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const address = String(data.get('address') || '').trim();
      const details = String(data.get('details') || '').trim();
      const timeline = String(data.get('timeline') || '').trim();
      const method = String(data.get('method') || '').trim();

      const lines = [
        'Project request from website',
        '',
        `Name: ${name}`,
        `Phone: ${phone}`,
        address ? `Address: ${address}` : null,
        timeline ? `Ideal timeline: ${timeline}` : null,
        method ? `Best contact method: ${method}` : null,
        '',
        'Details:',
        details,
      ].filter(Boolean);

      const body = lines.join('
');
      const subject = `Project request — ${name || 'New customer'}`;

      // Copy to clipboard if possible
      try {
        await navigator.clipboard.writeText(body);
        note.textContent = 'Copied your request to clipboard. Opening an email draft…';
      } catch {
        note.textContent = 'Opening an email draft…';
      }

      const mailto = `mailto:tollec22@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    });
  }
})();
