// Nav scroll effect + back-to-top visibility
const nav = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (nav) {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  if (backToTop) {
    if (window.scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
});

// Back to top smooth scroll
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Dynamic footer year
document.querySelectorAll('.footer-year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Mobile menu toggle
const toggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

// Scroll-triggered animations (IntersectionObserver)
const scrollElements = document.querySelectorAll('.animate-on-scroll');

if (scrollElements.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  scrollElements.forEach(el => observer.observe(el));
}

// Events renderer (community page) — uses safe DOM methods
function createEventRow(event) {
  const date = new Date(event.date + 'T12:00:00');
  const formatted = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const isLink = Boolean(event.link);
  const row = document.createElement(isLink ? 'a' : 'div');
  row.className = 'upcoming-event-row';

  if (isLink) {
    row.href = event.link;
    row.target = '_blank';
    row.rel = 'noopener noreferrer';
  }

  const dateEl = document.createElement('div');
  dateEl.className = 'upcoming-event-date';
  dateEl.textContent = formatted;

  const nameEl = document.createElement('div');
  nameEl.className = 'upcoming-event-name';
  nameEl.textContent = event.name;

  const locEl = document.createElement('div');
  locEl.className = 'upcoming-event-location';
  locEl.textContent = event.location;

  row.appendChild(dateEl);
  row.appendChild(nameEl);
  row.appendChild(locEl);

  if (isLink) {
    const arrow = document.createElement('span');
    arrow.className = 'upcoming-event-arrow';
    arrow.textContent = '\u2192';
    row.appendChild(arrow);
  }

  return row;
}

async function renderEvents() {
  const container = document.getElementById('events-container');
  if (!container) return;

  try {
    const res = await fetch('data/events.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const events = await res.json();

    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const upcoming = events
      .filter(e => e.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date));

    container.replaceChildren();

    if (upcoming.length === 0) {
      const msg = document.createElement('p');
      msg.className = 'no-events';
      msg.textContent = 'No upcoming events \u2014 check back soon!';
      container.appendChild(msg);
      return;
    }

    upcoming.forEach(event => {
      container.appendChild(createEventRow(event));
    });
  } catch (e) {
    container.replaceChildren();
    const msg = document.createElement('p');
    msg.className = 'no-events';
    msg.textContent = 'Unable to load events \u2014 check back soon!';
    container.appendChild(msg);
  }
}

renderEvents();

// Newsletter form mock submit
document.querySelectorAll('.newsletter-form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.newsletter-btn');
    const input = form.querySelector('.newsletter-input');
    if (btn) {
      btn.textContent = 'Subscribed!';
      btn.classList.add('success');
    }
    if (input) {
      input.disabled = true;
      input.value = '';
      input.placeholder = "Thanks! We'll be in touch.";
    }
  });
});
