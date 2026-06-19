const nav = document.getElementById('nav');
const navOpen = document.getElementById('navOpen');
const navClose = document.getElementById('navClose');
const overlay = document.getElementById('overlay');
const navLinks = document.querySelectorAll('.header__link');

function openMenu() {
  nav.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  nav.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

navOpen.addEventListener('click', openMenu);
navClose.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

navLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('active')) {
    closeMenu();
  }
});

const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  const fields = [name, email, message];
  let isValid = true;

  fields.forEach(field => field.classList.remove('error'));

  if (!name.value.trim()) {
    name.classList.add('error');
    isValid = false;
  }

  if (!email.value.trim() || !isValidEmail(email.value)) {
    email.classList.add('error');
    isValid = false;
  }

  if (!message.value.trim()) {
    message.classList.add('error');
    isValid = false;
  }

  if (isValid) {
    const submitBtn = form.querySelector('.contact__submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Mensagem Enviada!';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    form.reset();

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '';
    }, 3000);
  } else {
    const firstError = fields.find(f => f.classList.contains('error'));
    if (firstError) firstError.focus();
  }
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .about__skill-tag').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
