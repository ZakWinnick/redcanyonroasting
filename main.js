// ==========================================
// Shared nav + footer injection
// ==========================================
// Nav and footer are defined once here and injected into placeholder
// elements (#nav-root, #footer-root) on each page.

const PAGE = location.pathname.split('/').pop() || 'index.html';
const IS_INNER = PAGE !== 'index.html';
const SITE_ORIGIN = 'https://redcanyonroasting.co';
const NEWSLETTER_ENDPOINT_DEFAULT = 'https://buttondown.com/api/emails/embed-subscribe/redcanyonroasting';

function activeClass(href) {
  return PAGE === href ? ' class="active"' : '';
}

const LOGO_SVG = `<svg viewBox="0 0 170 160" xmlns="http://www.w3.org/2000/svg">
  <path d="M10,140 L50,45 L70,75 L95,30 L120,75 L140,55 L160,140 Z" fill="#D4A574" opacity="0.5"/>
  <path d="M25,140 L60,60 L80,90 L105,40 L125,85 L150,140 Z" fill="#B4232A" opacity="0.7"/>
  <path d="M0,140 L40,55 L65,95 L85,50 L110,95 L135,65 L170,140 Z" fill="#B4232A"/>
  <path d="M65,140 L75,95 L85,95 L95,140 Z" fill="#2C2C2C"/>
  <circle cx="105" cy="28" r="6" fill="#D4A574"/>
</svg>`;

function trackEvent(name, props = {}) {
  try {
    if (typeof window.tinylytics?.track === 'function') {
      window.tinylytics.track(name, props);
    }
    if (typeof window.plausible === 'function') {
      window.plausible(name, { props });
    }
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, props);
    }
  } catch (e) {
    // Never break UX because analytics failed.
  }
}

// Nav
const navRoot = document.getElementById('nav-root');
if (navRoot) {
  navRoot.innerHTML = `
<nav id="navbar"${IS_INNER ? ' class="nav-dark"' : ''}>
  <a href="index.html" class="nav-logo">
    ${LOGO_SVG}
    <span class="nav-logo-text">Red Canyon</span>
  </a>
  <ul class="nav-links">
    <li><a href="origins.html"${activeClass('origins.html')}>Origins</a></li>
    <li><a href="story.html"${activeClass('story.html')}>Our Story</a></li>
    <li><a href="rangeway.html"${activeClass('rangeway.html')}>Rangeway</a></li>
    <li><a href="community.html"${activeClass('community.html')}>Community</a></li>
    <li><a href="https://shop.redcanyonroasting.co" class="nav-cta" data-track="nav_shop_click">Shop</a></li>
    <li class="nav-social"><a href="https://instagram.com/redcanyonroasts" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a></li>
    <li class="nav-social"><a href="https://x.com/redcanyonroasts" target="_blank" rel="noopener noreferrer" aria-label="X"><i class="fa-brands fa-x-twitter"></i></a></li>
  </ul>
  <button class="nav-mobile-toggle" id="mobileToggle" aria-label="Menu" aria-controls="mobileMenu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>
<div class="mobile-menu" id="mobileMenu" aria-hidden="true">
  <a href="origins.html">Origins</a>
  <a href="story.html">Our Story</a>
  <a href="rangeway.html">Rangeway</a>
  <a href="community.html">Community</a>
  <a href="https://shop.redcanyonroasting.co" class="mobile-menu-cta" data-track="mobile_shop_click">Shop</a>
  <div class="mobile-menu-social">
    <a href="https://instagram.com/redcanyonroasts" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
    <a href="https://x.com/redcanyonroasts" target="_blank" rel="noopener noreferrer" aria-label="X"><i class="fa-brands fa-x-twitter"></i></a>
  </div>
</div>`;
}

// Footer
const footerRoot = document.getElementById('footer-root');
if (footerRoot) {
  footerRoot.innerHTML = `
<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <a href="index.html" class="nav-logo" style="margin-bottom: 0;">
        <svg width="32" height="32" viewBox="0 0 170 160" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,140 L50,45 L70,75 L95,30 L120,75 L140,55 L160,140 Z" fill="#D4A574" opacity="0.5"/>
          <path d="M25,140 L60,60 L80,90 L105,40 L125,85 L150,140 Z" fill="#B4232A" opacity="0.7"/>
          <path d="M0,140 L40,55 L65,95 L85,50 L110,95 L135,65 L170,140 Z" fill="#B4232A"/>
          <path d="M65,140 L75,95 L85,95 L95,140 Z" fill="#2C2C2C"/>
          <circle cx="105" cy="28" r="6" fill="#D4A574"/>
        </svg>
        <span class="nav-logo-text" style="font-size: 12px;">Red Canyon</span>
      </a>
      <p>Single origin coffee roasted with intention. Sourced from Africa and Hawai'i. The exclusive roaster for all Rangeway Basecamps.</p>
    </div>
    <div class="footer-col">
      <div class="footer-col-title">Shop</div>
      <a href="https://shop.redcanyonroasting.co" data-track="footer_shop_all_origins">All Origins</a>
      <a href="https://shop.redcanyonroasting.co" data-track="footer_shop_subscriptions">Subscriptions</a>
      <a href="https://shop.redcanyonroasting.co" data-track="footer_shop_gift_cards">Gift Cards</a>
      <a href="https://shop.redcanyonroasting.co" data-track="footer_shop_merch">Merch</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-title">Company</div>
      <a href="story.html">Our Story</a>
      <a href="rangeway.html">Rangeway Partnership</a>
      <a href="community.html">Events</a>
      <a href="mailto:hello@redcanyonroasting.co">Contact</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-title">Learn</div>
      <a href="brew-guides.html">Brew Guides</a>
      <a href="origin-stories.html">Origin Stories</a>
      <a href="event-recaps.html">Event Recaps</a>
      <a href="mailto:hello@redcanyonroasting.co">Wholesale</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© ${new Date().getFullYear()} Red Canyon Roasting Company. All rights reserved.</p>
    <div class="footer-social">
      <a href="https://instagram.com/redcanyonroasts" target="_blank" rel="noopener noreferrer">Instagram</a>
      <a href="https://x.com/redcanyonroasts" target="_blank" rel="noopener noreferrer">X</a>
    </div>
  </div>
</footer>`;
}

// ==========================================
// Nav scroll effect + back-to-top visibility
// ==========================================
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

if (backToTop) {
  backToTop.addEventListener('click', () => {
    trackEvent('back_to_top_click', { page: PAGE });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==========================================
// Mobile menu toggle + accessibility
// ==========================================
const toggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

function setMenuState(open) {
  if (!toggle || !mobileMenu) return;
  mobileMenu.classList.toggle('open', open);
  mobileMenu.setAttribute('aria-hidden', String(!open));
  toggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
}

if (toggle && mobileMenu) {
  const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  toggle.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('open');
    setMenuState(isOpen);
    if (isOpen) {
      const firstLink = mobileMenu.querySelector('a');
      if (firstLink) firstLink.focus();
      trackEvent('mobile_menu_open', { page: PAGE });
    }
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      setMenuState(false);
      toggle.focus();
      return;
    }

    if (e.key === 'Tab' && mobileMenu.classList.contains('open')) {
      const focusable = Array.from(mobileMenu.querySelectorAll(focusableSelector));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

// ==========================================
// Scroll-triggered animations
// ==========================================
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

// ==========================================
// Events renderer (community page)
// ==========================================
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
    arrow.textContent = '→';
    row.appendChild(arrow);
  }

  return row;
}

function addEventSchema(events) {
  if (PAGE !== 'community.html') return;
  const script = document.createElement('script');
  script.type = 'application/ld+json';

  const upcoming = events.slice(0, 8).map((event) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    startDate: event.date,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: event.location,
      address: event.location
    },
    organizer: {
      '@type': 'Organization',
      name: 'Red Canyon Roasting Company',
      url: SITE_ORIGIN
    }
  }));

  script.textContent = JSON.stringify(upcoming.length === 1 ? upcoming[0] : upcoming);
  document.head.appendChild(script);
}

async function renderEvents() {
  const container = document.getElementById('events-container');

  try {
    const res = await fetch('data/events.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const events = await res.json();

    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const upcoming = events
      .filter(e => e.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date));

    addEventSchema(upcoming);

    if (!container) return;
    container.replaceChildren();

    if (upcoming.length === 0) {
      const msg = document.createElement('p');
      msg.className = 'no-events';
      msg.textContent = 'No upcoming events — check back soon!';
      container.appendChild(msg);
      return;
    }

    upcoming.forEach(event => {
      container.appendChild(createEventRow(event));
    });
  } catch (e) {
    if (!container) return;
    container.replaceChildren();
    const msg = document.createElement('p');
    msg.className = 'no-events';
    msg.textContent = 'Unable to load events — check back soon!';
    container.appendChild(msg);
  }
}

renderEvents();

// ==========================================
// Structured data on origins page
// ==========================================
function addOriginProductSchema() {
  if (PAGE !== 'origins.html') return;

  const products = [
    {
      '@type': 'Product',
      name: 'Yirgacheffe',
      brand: 'Red Canyon Roasting Company',
      description: 'Washed Ethiopian single origin with citrus, jasmine, and honey notes.',
      offers: {
        '@type': 'Offer',
        price: '22',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://shop.redcanyonroasting.co'
      }
    },
    {
      '@type': 'Product',
      name: 'Nyeri AA',
      brand: 'Red Canyon Roasting Company',
      description: 'Kenyan AA single origin with blackcurrant, tomato acidity, and brown sugar finish.',
      offers: {
        '@type': 'Offer',
        price: '24',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://shop.redcanyonroasting.co'
      }
    },
    {
      '@type': 'Product',
      name: 'Kona Extra Fancy',
      brand: 'Red Canyon Roasting Company',
      description: 'Hawaiian single origin with caramel, macadamia, and cocoa notes.',
      offers: {
        '@type': 'Offer',
        price: '38',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://shop.redcanyonroasting.co'
      }
    }
  ];

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': products
  });
  document.head.appendChild(script);
}

addOriginProductSchema();

// ==========================================
// Newsletter form submit (real endpoint)
// ==========================================
async function submitNewsletter(form, email) {
  const endpoint =
    form.dataset.newsletterEndpoint ||
    document.body.dataset.newsletterEndpoint ||
    NEWSLETTER_ENDPOINT_DEFAULT;

  const payload = new URLSearchParams();
  payload.set('email', email);
  payload.set('tag', PAGE.replace('.html', ''));

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: payload.toString()
  });

  if (!res.ok) {
    throw new Error(`Newsletter request failed: ${res.status}`);
  }
}

document.querySelectorAll('.newsletter-form').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.newsletter-btn');
    const input = form.querySelector('.newsletter-input');
    const message = form.querySelector('.newsletter-status');
    const email = input?.value?.trim() || '';

    if (!email || !input?.checkValidity()) {
      if (message) {
        message.textContent = 'Enter a valid email address.';
        message.classList.add('error');
      }
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Submitting...';
    }

    if (message) {
      message.textContent = '';
      message.classList.remove('error');
    }

    try {
      await submitNewsletter(form, email);
      trackEvent('newsletter_submit', { page: PAGE, email_domain: email.split('@')[1] || 'unknown' });

      if (btn) {
        btn.textContent = 'Subscribed!';
        btn.classList.add('success');
      }
      if (input) {
        input.disabled = true;
        input.value = '';
        input.placeholder = "Thanks! We'll be in touch.";
      }
      if (message) {
        message.textContent = 'You are on the list.';
      }
    } catch (err) {
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Try Again';
      }
      if (message) {
        message.textContent = 'Subscription failed. Email hello@redcanyonroasting.co.';
        message.classList.add('error');
      }
    }
  });
});

// ==========================================
// CTA and outbound click analytics
// ==========================================
function isExternalLink(link) {
  try {
    const url = new URL(link.href, location.href);
    return url.origin !== location.origin;
  } catch {
    return false;
  }
}

document.querySelectorAll('a[href]').forEach((link) => {
  link.addEventListener('click', () => {
    const explicitEvent = link.dataset.track;
    if (explicitEvent) {
      trackEvent(explicitEvent, { page: PAGE, href: link.href });
      return;
    }

    if (isExternalLink(link)) {
      trackEvent('outbound_link_click', { page: PAGE, href: link.href });
    }
  });
});
