/* ============================================================
   components.js — navbar + footer for sub-pages
   ============================================================ */

function injectNavbar() {
  const nav = document.createElement('nav');
  nav.className = 'navbar'; nav.id = 'navbar';
  nav.innerHTML = `
    <div class="nav-inner">
      <a href="../index.html" class="nav-logo">
        <img src="../images/logo.png" alt="Hands Save Lives" class="nav-logo-img" />
      </a>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links" id="navLinks">
        <li>
          <a href="../index.html">
            <span data-lang="el">Αρχική</span>
            <span data-lang="en">Home</span>
          </a>
        </li>
        <li class="has-dropdown">
          <a>
            <span data-lang="el">Σεμινάρια</span>
            <span data-lang="en">Seminars</span>
            <span class="chevron">▾</span>
          </a>
          <ul class="dropdown">
            <li><a href="erc-seminars.html">Σεμινάρια ERC</a></li>
            <li><a href="rti-seminars.html">Σεμινάρια RTI</a></li>
            <li><a href="first-aid-presentations.html">
              <span data-lang="el">Παρουσιάσεις Πρώτων Βοηθειών</span>
              <span data-lang="en">First Aid Presentations</span>
            </a></li>
          </ul>
        </li>
        <li><a href="about.html">
          <span data-lang="el">Σχετικά</span>
          <span data-lang="en">About</span>
        </a></li>
        <li><a href="gallery.html">
          <span data-lang="el">Γκαλερί</span>
          <span data-lang="en">Gallery</span>
        </a></li>
        <li><a href="contact.html">
          <span data-lang="el">Επικοινωνία</span>
          <span data-lang="en">Contact</span>
        </a></li>
        <li class="lang-switcher-item"><div class="lang-switcher"><button class="lang-btn" data-setlang="el"><span class="lang-flag">🇬🇷</span> ΕΛ</button><button class="lang-btn" data-setlang="en"><span class="lang-flag">🇬🇧</span> EN</button></div></li>
      </ul>
    </div>`;
  document.body.prepend(nav);
}

function injectFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="container footer-inner">
      <div class="footer-brand">
        <img src="../images/logo.png" alt="Hands Save Lives" class="footer-logo-img" />
        <p data-lang="el">Εκπαίδευση που σώζει ζωές.</p>
        <p data-lang="en">Training that saves lives.</p>
      </div>
      <div class="footer-links">
        <h4 data-lang="el">Σεμινάρια</h4>
        <h4 data-lang="en">Seminars</h4>
        <ul>
          <li><a href="erc-seminars.html">ERC</a></li>
          <li><a href="rti-seminars.html">RTI</a></li>
          <li><a href="first-aid-presentations.html">
            <span data-lang="el">Παρουσιάσεις Π.Β.</span>
            <span data-lang="en">First Aid Presentations</span>
          </a></li>
        </ul>
      </div>
      <div class="footer-links">
        <h4 data-lang="el">Σύνδεσμοι</h4>
        <h4 data-lang="en">Links</h4>
        <ul>
          <li><a href="about.html"><span data-lang="el">Σχετικά</span><span data-lang="en">About</span></a></li>
          <li><a href="gallery.html"><span data-lang="el">Γκαλερί</span><span data-lang="en">Gallery</span></a></li>
          <li><a href="contact.html"><span data-lang="el">Επικοινωνία</span><span data-lang="en">Contact</span></a></li>
        </ul>
      </div>
      <div class="footer-social">
        <h4>Social</h4>
        <a href="https://www.facebook.com/Handssavelives.gr" target="_blank" rel="noopener" class="social-btn">Facebook</a>
        <a href="https://www.instagram.com/handssavelives_edu" target="_blank" rel="noopener" class="social-btn">Instagram</a>
        <a href="https://www.linkedin.com/company/handssavelives" target="_blank" rel="noopener" class="social-btn">LinkedIn</a>
        <p style="margin-top:1rem;font-size:.85rem">+30 693 689 8320</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 HandsSaveLives.gr · <span data-lang="el">Όλα τα δικαιώματα διατηρούνται.</span><span data-lang="en">All rights reserved.</span></p>
    </div>`;
  document.body.appendChild(footer);
}

injectNavbar();
injectFooter();

// ---- All interactive logic ----
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

navToggle && navToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  navLinks.classList.toggle('open');
});

// Click-based dropdowns
document.querySelectorAll('.has-dropdown').forEach(item => {
  const trigger  = item.querySelector(':scope > a');
  const dropdown = item.querySelector('.dropdown');
  trigger && trigger.addEventListener('click', (e) => {
    e.preventDefault(); e.stopPropagation();
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.has-dropdown.open').forEach(d => {
      d.classList.remove('open');
      d.querySelector('.dropdown')?.classList.remove('open');
    });
    if (!isOpen) { item.classList.add('open'); dropdown?.classList.add('open'); }
  });
});

document.addEventListener('click', () => {
  document.querySelectorAll('.has-dropdown.open').forEach(d => {
    d.classList.remove('open');
    d.querySelector('.dropdown')?.classList.remove('open');
  });
  navLinks?.classList.remove('open');
});

// Language
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
  btn.addEventListener('click', (e) => { e.stopPropagation(); setLang(btn.dataset.setlang); });
});
setLang(currentLang);

// Scroll reveal
setTimeout(() => {
  const els = document.querySelectorAll('.card,.program-card,.stat,.content-block');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('revealed'); obs.unobserve(e.target); }});
  }, { threshold: 0.1 });
  els.forEach((el, i) => {
    el.style.cssText += `opacity:0;transform:translateY(18px);transition:opacity .45s ease ${i*.06}s,transform .45s ease ${i*.06}s`;
    obs.observe(el);
  });
}, 100);
