// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// ---- FAQ accordion ----
document.querySelectorAll('.faq-item').forEach((item) => {
  const question = item.querySelector('.faq-q');
  question?.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach((open) => open.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// ---- Scroll reveal ----
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => observer.observe(el));

// Safety net: anything already within the viewport when the page loads is revealed outright.
// IntersectionObserver normally fires for these on its first pass, but if it is unavailable or
// throttled the content must never be left invisible - it is real page copy, not decoration.
requestAnimationFrame(() => {
  revealEls.forEach((el) => {
    const box = el.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) el.classList.add('in-view');
  });
});

// ---- Reading progress bar ----
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

// ---- Nav: elevate once scrolled, and light up the section you're actually reading ----
const navWrap = document.getElementById('navWrap');
const navAnchors = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
// Sorted by position in the page, NOT by their order in the nav - the Privacy strip sits above
// Features in the document but fourth in the menu, and "last section I've scrolled past" is only
// meaningful walking down the page.
const sections = navAnchors
  .map((a) => document.getElementById(a.getAttribute('href').slice(1)))
  .filter(Boolean)
  .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);

// Matches css scroll-padding-top, so "which section am I in" agrees with where a click lands.
const navOffset = () => (navWrap?.offsetHeight || 80) + 20;

function onScroll() {
  const y = window.scrollY;

  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  progressBar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;

  navWrap?.classList.toggle('scrolled', y > 12);

  // The last section whose top has passed the nav is the one being read. Starts as null on
  // purpose: at the top of the page you are in the hero, which has no nav link of its own, so
  // nothing should be lit. Seeding this with the first section instead lit "Privacy" - the
  // topmost section in the document - before the visitor had scrolled anywhere near it.
  // The very bottom force-selects the last link, which a short final section can never win.
  let activeId = null;
  const line = y + navOffset();
  sections.forEach((sec) => {
    if (sec.getBoundingClientRect().top + y <= line) activeId = sec.id;
  });
  if (max - y < 4 && sections.length) activeId = sections[sections.length - 1].id;

  navAnchors.forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === `#${activeId}`);
  });
}

let ticking = false;
window.addEventListener(
  'scroll',
  () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      onScroll();
      ticking = false;
    });
  },
  { passive: true }
);
window.addEventListener('resize', onScroll, { passive: true });
onScroll();

// ---- Waitlist form ----
// No backend wired up yet — this opens the visitor's email client pre-addressed to you.
// Swap this handler for a real waitlist service (Formspree, Mailchimp, ConvertKit, etc.)
// once you have one, so submissions land somewhere durable instead of relying on mailto.
const NOTIFY_EMAIL = 'raoasad125@gmail.com';
const waitlistForm = document.getElementById('waitlistForm');
const ctaStatus = document.getElementById('ctaStatus');

waitlistForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const emailInput = document.getElementById('waitlistEmail');
  const email = emailInput.value.trim();

  if (!email) return;

  const subject = encodeURIComponent('Notify me when Coinly launches');
  const body = encodeURIComponent(`Please notify this email when Coinly launches: ${email}`);
  window.location.href = `mailto:${NOTIFY_EMAIL}?subject=${subject}&body=${body}`;

  ctaStatus.textContent = "Opening your email app to confirm — thanks for your interest!";
  emailInput.value = '';
});
