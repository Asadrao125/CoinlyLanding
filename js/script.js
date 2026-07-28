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
