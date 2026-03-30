(() => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.getElementById('navLinks');

  if (nav && toggle && navLinks) {
    const closeNav = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeNav();
    });

    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target)) closeNav();
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById('requestForm');
  const note = document.getElementById('formNote');

  if (form && note) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const address = String(data.get('address') || '').trim();
      const details = String(data.get('details') || '').trim();
      const timeline = String(data.get('timeline') || '').trim();
      const method = String(data.get('method') || '').trim();

      const body = [
        'Project request from website',
        '',
        `Name: ${name}`,
        `Phone: ${phone}`,
        address ? `Address / neighborhood: ${address}` : null,
        timeline ? `Ideal timeline: ${timeline}` : null,
        method ? `Preferred contact method: ${method}` : null,
        '',
        'Project details:',
        details
      ].filter(Boolean).join('
');

      try {
        await navigator.clipboard.writeText(body);
        note.textContent = 'Copied your request to clipboard. Opening an email draft…';
      } catch (error) {
        note.textContent = 'Opening an email draft…';
      }

      const subject = `Project request — ${name || 'New customer'}`;
      window.location.href = `mailto:tollec22@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
})();
