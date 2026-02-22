// ==========================================
// Shared nav + footer injection
// ==========================================
// Nav and footer are defined once here and injected into placeholder
// elements (#nav-root, #footer-root) on each page.
// NOTE: innerHTML is used intentionally with hardcoded template literals
// (no user input), which is safe from XSS.

const PAGE = location.pathname.split('/').pop() || 'index.html';
const IS_INNER = PAGE !== 'index.html';
const SITE_ORIGIN = 'https://redcanyonroasting.co';
const NEWSLETTER_ENDPOINT_DEFAULT = 'https://buttondown.com/api/emails/embed-subscribe/redcanyonroastingco';

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

// Build nav markup (hardcoded, no user input)
function buildNavMarkup() {
  const navClass = IS_INNER ? ' class="nav-dark"' : '';
  const nav = document.createElement('div');

  // Build nav element
  const navbar = document.createElement('nav');
  navbar.id = 'navbar';
  if (IS_INNER) navbar.className = 'nav-dark';

  // Logo
  const logoLink = document.createElement('a');
  logoLink.href = 'index.html';
  logoLink.className = 'nav-logo';
  const logoSvgContainer = document.createElement('span');
  logoSvgContainer.insertAdjacentHTML('afterbegin', LOGO_SVG); // safe: hardcoded SVG
  logoLink.appendChild(logoSvgContainer.firstChild);
  const logoText = document.createElement('span');
  logoText.className = 'nav-logo-text';
  logoText.textContent = 'Red Canyon';
  logoLink.appendChild(logoText);
  navbar.appendChild(logoLink);

  // Nav links (built via DOM)
  const ul = document.createElement('ul');
  ul.className = 'nav-links';

  const links = [
    { href: 'origins.html', text: 'Origins' },
    { href: 'story.html', text: 'Our Story' },
    { href: 'rangeway.html', text: 'Rangeway' },
    { href: 'community.html', text: 'Community' }
  ];

  links.forEach(({ href, text }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = href;
    a.textContent = text;
    if (PAGE === href) a.className = 'active';
    li.appendChild(a);
    ul.appendChild(li);
  });

  // Shop CTA
  const shopLi = document.createElement('li');
  const shopA = document.createElement('a');
  shopA.href = 'https://shop.redcanyonroasting.co';
  shopA.className = 'nav-cta';
  shopA.dataset.track = 'nav_shop_click';
  shopA.target = '_blank';
  shopA.rel = 'noopener noreferrer';
  shopA.textContent = 'Shop';
  shopLi.appendChild(shopA);
  ul.appendChild(shopLi);

  // Social icons
  const socials = [
    { href: 'https://instagram.com/redcanyonroasts', label: 'Instagram', icon: 'fa-instagram' },
    { href: 'https://x.com/redcanyonroasts', label: 'X', icon: 'fa-x-twitter' }
  ];

  socials.forEach(({ href, label, icon }) => {
    const li = document.createElement('li');
    li.className = 'nav-social';
    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', label);
    const i = document.createElement('i');
    i.className = `fa-brands ${icon}`;
    a.appendChild(i);
    li.appendChild(a);
    ul.appendChild(li);
  });

  navbar.appendChild(ul);

  // Mobile toggle
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'nav-mobile-toggle';
  toggleBtn.id = 'mobileToggle';
  toggleBtn.setAttribute('aria-label', 'Menu');
  toggleBtn.setAttribute('aria-controls', 'mobileMenu');
  toggleBtn.setAttribute('aria-expanded', 'false');
  for (let s = 0; s < 3; s++) toggleBtn.appendChild(document.createElement('span'));
  navbar.appendChild(toggleBtn);

  nav.appendChild(navbar);

  // Mobile menu
  const mobileMenuEl = document.createElement('div');
  mobileMenuEl.className = 'mobile-menu';
  mobileMenuEl.id = 'mobileMenu';
  mobileMenuEl.setAttribute('aria-hidden', 'true');

  const mobileLinks = [
    { href: 'origins.html', text: 'Origins' },
    { href: 'story.html', text: 'Our Story' },
    { href: 'rangeway.html', text: 'Rangeway' },
    { href: 'community.html', text: 'Community' }
  ];

  mobileLinks.forEach(({ href, text }) => {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = text;
    mobileMenuEl.appendChild(a);
  });

  const mobileShopA = document.createElement('a');
  mobileShopA.href = 'https://shop.redcanyonroasting.co';
  mobileShopA.className = 'mobile-menu-cta';
  mobileShopA.dataset.track = 'mobile_shop_click';
  mobileShopA.target = '_blank';
  mobileShopA.rel = 'noopener noreferrer';
  mobileShopA.textContent = 'Shop';
  mobileMenuEl.appendChild(mobileShopA);

  const mobileSocialDiv = document.createElement('div');
  mobileSocialDiv.className = 'mobile-menu-social';
  socials.forEach(({ href, label, icon }) => {
    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', label);
    const i = document.createElement('i');
    i.className = `fa-brands ${icon}`;
    a.appendChild(i);
    mobileSocialDiv.appendChild(a);
  });
  mobileMenuEl.appendChild(mobileSocialDiv);

  nav.appendChild(mobileMenuEl);
  return nav;
}

// Build footer markup (hardcoded, no user input)
function buildFooterMarkup() {
  const footer = document.createElement('footer');

  // Footer grid
  const grid = document.createElement('div');
  grid.className = 'footer-grid';

  // Brand column
  const brand = document.createElement('div');
  brand.className = 'footer-brand';

  const brandLink = document.createElement('a');
  brandLink.href = 'index.html';
  brandLink.className = 'nav-logo';
  brandLink.style.marginBottom = '0';

  const brandSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  brandSvg.setAttribute('width', '32');
  brandSvg.setAttribute('height', '32');
  brandSvg.setAttribute('viewBox', '0 0 170 160');
  const paths = [
    { d: 'M10,140 L50,45 L70,75 L95,30 L120,75 L140,55 L160,140 Z', fill: '#D4A574', opacity: '0.5' },
    { d: 'M25,140 L60,60 L80,90 L105,40 L125,85 L150,140 Z', fill: '#B4232A', opacity: '0.7' },
    { d: 'M0,140 L40,55 L65,95 L85,50 L110,95 L135,65 L170,140 Z', fill: '#B4232A' },
    { d: 'M65,140 L75,95 L85,95 L95,140 Z', fill: '#2C2C2C' }
  ];
  paths.forEach(({ d, fill, opacity }) => {
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', d);
    p.setAttribute('fill', fill);
    if (opacity) p.setAttribute('opacity', opacity);
    brandSvg.appendChild(p);
  });
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '105');
  circle.setAttribute('cy', '28');
  circle.setAttribute('r', '6');
  circle.setAttribute('fill', '#D4A574');
  brandSvg.appendChild(circle);
  brandLink.appendChild(brandSvg);

  const brandText = document.createElement('span');
  brandText.className = 'nav-logo-text';
  brandText.style.fontSize = '12px';
  brandText.textContent = 'Red Canyon';
  brandLink.appendChild(brandText);
  brand.appendChild(brandLink);

  const brandDesc = document.createElement('p');
  brandDesc.textContent = 'Single origin coffee roasted with intention. Sourced from Africa and Hawai\u2019i. The exclusive roaster for all Rangeway Basecamps.';
  brand.appendChild(brandDesc);
  grid.appendChild(brand);

  // Footer columns
  const columns = [
    {
      title: 'Shop',
      links: [
        { text: 'All Origins', href: 'https://shop.redcanyonroasting.co', track: 'footer_shop_all_origins', external: true },
        { text: 'Subscriptions', href: 'https://shop.redcanyonroasting.co', track: 'footer_shop_subscriptions', external: true },
        { text: 'Gift Cards', href: 'https://shop.redcanyonroasting.co', track: 'footer_shop_gift_cards', external: true },
        { text: 'Merch', href: 'https://shop.redcanyonroasting.co', track: 'footer_shop_merch', external: true }
      ]
    },
    {
      title: 'Company',
      links: [
        { text: 'Our Story', href: 'story.html' },
        { text: 'Rangeway Partnership', href: 'rangeway.html' },
        { text: 'Events', href: 'community.html' },
        { text: 'Contact', href: 'mailto:hello@redcanyonroasting.co' }
      ]
    },
    {
      title: 'Learn',
      links: [
        { text: 'Brew Guides', href: 'brew-guides.html' },
        { text: 'Origin Stories', href: 'origin-stories.html' },
        { text: 'Event Recaps', href: 'event-recaps.html' },
        { text: 'Wholesale', href: 'mailto:hello@redcanyonroasting.co' }
      ]
    }
  ];

  columns.forEach(({ title, links }) => {
    const col = document.createElement('div');
    col.className = 'footer-col';
    const titleEl = document.createElement('div');
    titleEl.className = 'footer-col-title';
    titleEl.textContent = title;
    col.appendChild(titleEl);

    links.forEach(({ text, href, track, external }) => {
      const a = document.createElement('a');
      a.href = href;
      a.textContent = text;
      if (track) a.dataset.track = track;
      if (external) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      col.appendChild(a);
    });

    grid.appendChild(col);
  });

  footer.appendChild(grid);

  // Footer bottom
  const bottom = document.createElement('div');
  bottom.className = 'footer-bottom';

  const copy = document.createElement('p');
  copy.textContent = `\u00A9 ${new Date().getFullYear()} Red Canyon Roasting Company. All rights reserved.`;
  bottom.appendChild(copy);

  const social = document.createElement('div');
  social.className = 'footer-social';
  [
    { text: 'Instagram', href: 'https://instagram.com/redcanyonroasts' },
    { text: 'X', href: 'https://x.com/redcanyonroasts' }
  ].forEach(({ text, href }) => {
    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = text;
    social.appendChild(a);
  });
  bottom.appendChild(social);

  footer.appendChild(bottom);
  return footer;
}

// Inject nav
const navRoot = document.getElementById('nav-root');
if (navRoot) {
  const navFragment = buildNavMarkup();
  while (navFragment.firstChild) {
    navRoot.appendChild(navFragment.firstChild);
  }
}

// Inject footer
const footerRoot = document.getElementById('footer-root');
if (footerRoot) {
  footerRoot.appendChild(buildFooterMarkup());
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
}, { passive: true });

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
// Scroll-triggered animations (enhanced)
// ==========================================
const scrollElements = document.querySelectorAll('.animate-on-scroll');

if (scrollElements.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        // Stagger children within grids
        const children = entry.target.querySelectorAll('.origin-card, .origin-featured, .event-card, .resource-link, .numbered-card, .rangeway-detail-card, .trust-item, .content-loop-card, .home-feature-card');
        children.forEach((child, i) => {
          child.style.opacity = '0';
          child.style.transform = 'translateY(16px)';
          child.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            });
          });
        });

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
    arrow.textContent = '\u2192';
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
      msg.textContent = 'No upcoming events \u2014 check back soon!';
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
    msg.textContent = 'Unable to load events \u2014 check back soon!';
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
    const btn = form.querySelector('.newsletter-btn');
    const input = form.querySelector('.newsletter-input');
    const message = form.querySelector('.newsletter-status');
    const email = input?.value?.trim() || '';
    const isButtondownForm = form.classList.contains('embeddable-buttondown-form');

    if (!email || !input?.checkValidity()) {
      e.preventDefault();
      if (message) {
        message.textContent = 'Enter a valid email address.';
        message.classList.add('error');
      }
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Submitting\u2026';
    }

    if (message) {
      message.textContent = '';
      message.classList.remove('error');
    }

    // Buttondown forms work best as native form posts.
    if (isButtondownForm) {
      trackEvent('newsletter_submit', { page: PAGE, email_domain: email.split('@')[1] || 'unknown' });
      return;
    }

    e.preventDefault();

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
