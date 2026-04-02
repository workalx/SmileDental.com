// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .service-card, .gallery-item').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('active'); ring.classList.add('active'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('active'); ring.classList.remove('active'); });
});

// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.stat-item, .about-image-wrap, .about-content, .service-card, .process-step, .gallery-item, .contact-info, .contact-form').forEach(el => {
  observer.observe(el);
});

// Counter animation
function animateCounter(el, target) {
  let current = 0;
  const duration = 1800;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + (target === 98 ? '%' : (target > 100 ? '+' : ''));
    if (current >= target) clearInterval(timer);
  }, 16);
}

const statsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    document.querySelectorAll('.stat-num').forEach(el => {
      animateCounter(el, parseInt(el.dataset.target));
    });
    statsObserver.disconnect();
  }
}, { threshold: 0.3 });
statsObserver.observe(document.getElementById('stats'));

// Service card stagger
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

// Duplicate testimonials for infinite scroll
const inner = document.getElementById('testimonials-inner');
inner.innerHTML += inner.innerHTML;

// Process step stagger
document.querySelectorAll('.process-step').forEach((step, i) => {
  step.style.transitionDelay = `${i * 0.15}s`;
});

// Gallery stagger
document.querySelectorAll('.gallery-item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.1}s`;
});

// Form submit
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  btn.textContent = '✓ Запит надіслано!';
  btn.style.background = 'linear-gradient(135deg, #1D9E75, #0F6E56)';
  setTimeout(() => {
    btn.textContent = 'Надіслати запит →';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}

// Parallax hero orbs
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  document.querySelector('.orb1').style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
  document.querySelector('.orb2').style.transform = `translate(${-x * 0.3}px, ${-y * 0.3}px)`;
  document.querySelector('.orb3').style.transform = `translate(${x * 0.8}px, ${y * 0.8}px)`;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});