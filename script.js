// Année automatique
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Menu mobile
const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.style.display === 'block';
    links.style.display = open ? 'none' : 'block';
    toggle.setAttribute('aria-expanded', String(!open));
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=> {
    if (window.innerWidth <= 720) links.style.display = 'none';
  }));
}

// Filtres catégories
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.menu-card');
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const f = chip.dataset.filter;
    cards.forEach(card => {
      card.style.display = (f === 'all' || card.dataset.cat === f) ? 'block' : 'none';
    });
    const first = Array.from(cards).find(c => c.style.display !== 'none');
    if (first) first.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// Apparition douce
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.transform = 'translateY(0)';
      e.target.style.opacity = '1';
      observer.unobserve(e.target);
    }
  });
},{threshold:.12});

document.querySelectorAll('.card,.h-card,.map-card,.promo').forEach(el=>{
  el.style.transform = 'translateY(10px)';
  el.style.opacity = '.01';
  el.style.transition = 'all .5s ease';
  observer.observe(el);
});
