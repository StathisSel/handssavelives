/* ============================================================
   HANDS SAVE LIVES — main.js (homepage)
   ============================================================ */

// --- Navbar scroll ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// --- Mobile toggle ---
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle && navToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  navLinks.classList.toggle('open');
});

// --- Click-based dropdowns (no hover flicker) ---
document.querySelectorAll('.has-dropdown').forEach(item => {
  const trigger  = item.querySelector(':scope > a');
  const dropdown = item.querySelector('.dropdown');
  trigger && trigger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = item.classList.contains('open');
    // Close all others
    document.querySelectorAll('.has-dropdown.open').forEach(d => {
      d.classList.remove('open');
      d.querySelector('.dropdown')?.classList.remove('open');
    });
    if (!isOpen) {
      item.classList.add('open');
      dropdown?.classList.add('open');
    }
  });
});

// Close dropdowns on outside click
document.addEventListener('click', () => {
  document.querySelectorAll('.has-dropdown.open').forEach(d => {
    d.classList.remove('open');
    d.querySelector('.dropdown')?.classList.remove('open');
  });
  navLinks?.classList.remove('open');
});

// --- Language switcher ---
let currentLang = localStorage.getItem('hsl-lang') || 'el';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('hsl-lang', lang);
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.classList.toggle('lang-active', el.dataset.lang === lang);
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.setlang === lang);
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    setLang(btn.dataset.setlang);
  });
});

// Init language
setLang(currentLang);

// --- Scroll reveal ---
const revealEls = document.querySelectorAll('.card, .seminar-card, .stat');
const observer  = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
  });
}, { threshold: 0.1 });
revealEls.forEach((el, i) => {
  el.style.cssText += `opacity:0;transform:translateY(20px);transition:opacity .5s ease ${i*.07}s,transform .5s ease ${i*.07}s`;
  observer.observe(el);
});
