// Nav scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const toggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}
