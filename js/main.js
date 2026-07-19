/* =====================================================
   HM TECH — JavaScript Principal (Site Público)
===================================================== */

// ===== CONFIGURAÇÕES =====
const API = {
  banners:      'tables/banners',
  config:       'tables/site_config',
  services:     'tables/services',
  testimonials: 'tables/testimonials',
  quotes:       'tables/quotes',
};

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader')?.classList.add('fade-out');
  }, 1800);
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initLogoSecretClick();
  initRevealObserver();
  initBackToTop();
  loadBanners();
  loadBio();
  loadServices();
  loadTestimonials();
  initStatsCounter();
  document.getElementById('footerYear').textContent = new Date().getFullYear();
});

// ===== NAVBAR =====
function initNavbar() {
  const header = document.getElementById('header');
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveLink();
  });

  toggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    toggle.innerHTML = navLinks.classList.contains('open')
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

function updateActiveLink() {
  const sections = ['inicio', 'servicos', 'depoimentos', 'orcamento', 'contato'];
  const links = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 120) current = id;
    }
  });
  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

// ===== LOGO SECRET CLICK (5 cliques = login admin) =====
function initLogoSecretClick() {
  const logo = document.getElementById('navLogo');
  let clicks = 0;
  let timer = null;

  logo?.addEventListener('click', () => {
    clicks++;
    clearTimeout(timer);
    timer = setTimeout(() => { clicks = 0; }, 3000);

    if (clicks >= 5) {
      clicks = 0;
      clearTimeout(timer);
      openLoginModal();
    }
  });
}

// ===== MODAL DE LOGIN =====
function openLoginModal() {
  const modal = document.getElementById('loginModal');
  modal?.classList.remove('hidden');
  document.getElementById('loginUser')?.focus();
}

function closeLoginModal() {
  document.getElementById('loginModal')?.classList.add('hidden');
  document.getElementById('loginError')?.classList.add('hidden');
  document.getElementById('loginForm')?.reset();
}

// Fechar modal clicando fora
document.getElementById('loginModal')?.addEventListener('click', function(e) {
  if (e.target === this) closeLoginModal();
});

function togglePass() {
  const input = document.getElementById('loginPass');
  const icon = document.getElementById('eyeIcon');
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fas fa-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'fas fa-eye';
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('loginBtn');
  const errEl = document.getElementById('loginError');
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verificando...';
  btn.disabled = true;
  errEl.classList.add('hidden');

  try {
    // Busca credenciais salvas na tabela de config
    const res = await fetch(`${API.config}?limit=50`);
    const data = await res.json();
    const rows = data.data || [];
    const cfgUser = rows.find(r => r.key === 'admin_user')?.value || 'admin';
    const cfgPass = rows.find(r => r.key === 'admin_pass')?.value || 'hmtech2024';

    if (user === cfgUser && pass === cfgPass) {
      // Salva sessão simples
      sessionStorage.setItem('hmtech_admin', 'true');
      sessionStorage.setItem('hmtech_user', user);
      closeLoginModal();
      // Redireciona para painel
      window.location.href = 'admin.html';
    } else {
      errEl.classList.remove('hidden');
      btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Entrar no Painel';
      btn.disabled = false;
    }
  } catch {
    errEl.classList.remove('hidden');
    btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Entrar no Painel';
    btn.disabled = false;
  }
}

// ===== CARROSSEL =====
let carouselIndex = 0;
let carouselTotal = 0;
let carouselTimer = null;
let carouselPaused = false;

async function loadBanners() {
  try {
    const res = await fetch(`${API.banners}?limit=20&sort=order`);
    const data = await res.json();
    const banners = (data.data || []).filter(b => b.active !== false);
    if (!banners.length) return renderDefaultBanner();
    renderCarousel(banners);
  } catch {
    renderDefaultBanner();
  }
}

function renderDefaultBanner() {
  const slides = [
    {
      title: 'Assistência Técnica <span>Especializada</span>',
      subtitle: 'Reparos em celulares, notebooks e tablets com garantia de qualidade',
      button_text: 'Solicitar Orçamento',
      button_link: '#orcamento',
      image_url: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1400&q=80',
    },
    {
      title: 'Buscamos e <span>Levamos</span> seu Aparelho!',
      subtitle: 'Sem sair de casa — atendimento em toda a região',
      button_text: 'Falar no WhatsApp',
      button_link: 'https://wa.me/5518996241953',
      image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1400&q=80',
    },
  ];
  buildCarousel(slides);
}

function renderCarousel(banners) {
  const slides = banners.map(b => ({
    title: b.title,
    subtitle: b.subtitle,
    button_text: b.button_text,
    button_link: b.button_link,
    image_url: b.image_url,
  }));
  buildCarousel(slides);
}

function buildCarousel(slides) {
  const track = document.getElementById('carouselTrack');
  const dotsEl = document.getElementById('carouselDots');
  if (!track || !dotsEl) return;
  carouselTotal = slides.length;

  track.innerHTML = slides.map((s, i) => `
    <div class="carousel-slide" aria-label="Slide ${i + 1}">
      <img src="${s.image_url}" alt="${s.title || 'Banner'}" loading="${i === 0 ? 'eager' : 'lazy'}" />
      <div class="carousel-content">
        <div class="slide-badge"><i class="fas fa-bolt"></i> HM TECH — Assistência Premium</div>
        <h1 class="carousel-title">${s.title || ''}</h1>
        ${s.subtitle ? `<p class="carousel-subtitle">${s.subtitle}</p>` : ''}
        <div class="carousel-actions">
          ${s.button_text && s.button_link ? `<a href="${s.button_link}" class="btn-primary">${s.button_text}</a>` : ''}
          <a href="https://wa.me/5518996241953" class="btn-outline" style="border-color:white;color:white" onmouseover="this.style.background='white';this.style.color='#0a0a0f'" onmouseout="this.style.background='transparent';this.style.color='white'">
            <i class="fab fa-whatsapp"></i> WhatsApp
          </a>
        </div>
      </div>
    </div>
  `).join('');

  dotsEl.innerHTML = slides.map((_, i) =>
    `<button class="carousel-dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})" aria-label="Ir para slide ${i + 1}"></button>`
  ).join('');

  // Eventos
  document.getElementById('carouselPrev')?.addEventListener('click', () => prevSlide());
  document.getElementById('carouselNext')?.addEventListener('click', () => nextSlide());

  const carousel = document.getElementById('carousel');
  carousel?.addEventListener('mouseenter', () => { carouselPaused = true; });
  carousel?.addEventListener('mouseleave', () => { carouselPaused = false; });

  // Touch/swipe
  let touchStartX = 0;
  carousel?.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  carousel?.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) dx < 0 ? nextSlide() : prevSlide();
  });

  startAutoplay();
  updateCarousel();
}

function goToSlide(index) {
  carouselIndex = index;
  updateCarousel();
  restartAutoplay();
}

function prevSlide() {
  carouselIndex = (carouselIndex - 1 + carouselTotal) % carouselTotal;
  updateCarousel();
  restartAutoplay();
}

function nextSlide() {
  carouselIndex = (carouselIndex + 1) % carouselTotal;
  updateCarousel();
  restartAutoplay();
}

function updateCarousel() {
  const track = document.getElementById('carouselTrack');
  const dots = document.querySelectorAll('.carousel-dot');
  if (track) track.style.transform = `translateX(-${carouselIndex * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === carouselIndex));
}

function startAutoplay() {
  carouselTimer = setInterval(() => {
    if (!carouselPaused && carouselTotal > 1) nextSlide();
  }, 5000);
}

function restartAutoplay() {
  clearInterval(carouselTimer);
  startAutoplay();
}

// ===== BIO =====
async function loadBio() {
  const bioEl = document.getElementById('bioText');
  if (!bioEl) return;

  const defaults = [
    '📱 Seu celular quebrou? Nós resolvemos!',
    '⚡ Atendimento ágil com peças de qualidade',
    '👇🏼 Chame agora ou solicite orçamento online!',
  ];

  try {
    const res = await fetch(`${API.config}?limit=50`);
    const data = await res.json();
    const rows = data.data || [];
    const l1 = rows.find(r => r.key === 'bio_line1')?.value || defaults[0];
    const l2 = rows.find(r => r.key === 'bio_line2')?.value || defaults[1];
    const l3 = rows.find(r => r.key === 'bio_line3')?.value || defaults[2];
    renderBio([l1, l2, l3]);
  } catch {
    renderBio(defaults);
  }
}

function renderBio(lines) {
  const bioEl = document.getElementById('bioText');
  if (!bioEl) return;
  bioEl.innerHTML = lines.map(l =>
    `<p class="bio-line">${l}</p>`
  ).join('');
}

// ===== SERVIÇOS =====
async function loadServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;

  try {
    const res = await fetch(`${API.services}?limit=20&sort=order`);
    const data = await res.json();
    const services = (data.data || []).filter(s => s.active !== false);
    if (!services.length) return renderDefaultServices();
    grid.innerHTML = services.map(s => serviceCard(s)).join('');
    observeCards();
  } catch {
    renderDefaultServices();
  }
}

function serviceCard(s) {
  return `
    <div class="service-card reveal">
      <div class="service-img-wrap">
        <img class="service-img"
          src="${s.image_url || 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80'}"
          alt="${s.title}" loading="lazy" />
        <div class="service-icon-overlay"><i class="fas ${s.icon || 'fa-wrench'}"></i></div>
      </div>
      <div class="service-body">
        <h3 class="service-title">${s.title}</h3>
        <p class="service-desc">${s.description || ''}</p>
        ${s.price_from ? `<span class="service-price"><i class="fas fa-tag"></i> ${s.price_from}</span>` : ''}
      </div>
    </div>
  `;
}

function renderDefaultServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;
  const items = [
    { icon: 'fa-mobile-screen', title: 'Troca de Tela', desc: 'iPhone, Samsung, Xiaomi, Motorola – tela original com garantia' },
    { icon: 'fa-battery-full', title: 'Troca de Bateria', desc: 'Bateria nova original em 30 minutos' },
    { icon: 'fa-microchip', title: 'Conserto de Placa', desc: 'Especialista em placa-mãe, curto, não liga, superaquecimento' },
    { icon: 'fa-laptop-code', title: 'Formatação', desc: 'Formatação completa, remoção de vírus, instalação de sistemas' },
    { icon: 'fa-hard-drive', title: 'Recuperação de Dados', desc: 'Recuperamos fotos, contatos e arquivos de celulares danificados' },
  ];
  grid.innerHTML = items.map(s => `
    <div class="service-card reveal">
      <div class="service-img-wrap" style="background:var(--dark-4);display:flex;align-items:center;justify-content:center;">
        <i class="fas ${s.icon}" style="font-size:3rem;color:var(--primary);"></i>
      </div>
      <div class="service-body">
        <h3 class="service-title">${s.title}</h3>
        <p class="service-desc">${s.desc}</p>
      </div>
    </div>
  `).join('');
  observeCards();
}

// ===== DEPOIMENTOS =====
async function loadTestimonials() {
  const grid = document.getElementById('testimonialsGrid');
  if (!grid) return;

  try {
    const res = await fetch(`${API.testimonials}?limit=20`);
    const data = await res.json();
    const list = (data.data || []).filter(t => t.active !== false);
    if (!list.length) return;
    grid.innerHTML = list.map(t => testimonialCard(t)).join('');
    observeCards();
  } catch {}
}

function testimonialCard(t) {
  const stars = Array.from({ length: 5 }, (_, i) =>
    `<i class="${i < (t.rating || 5) ? 'fas' : 'far'} fa-star"></i>`
  ).join('');
  const initials = (t.name || 'C').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return `
    <div class="testimonial-card reveal">
      <div class="testimonial-quote">"</div>
      <div class="testimonial-stars">${stars}</div>
      <p class="testimonial-text">${t.text}</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${initials}</div>
        <div>
          <div class="testimonial-name">${t.name}</div>
          ${t.device ? `<div class="testimonial-device">${t.device}</div>` : ''}
        </div>
      </div>
    </div>
  `;
}

// ===== FORMULÁRIO DE ORÇAMENTO =====
async function handleQuote(e) {
  e.preventDefault();
  const btn = document.getElementById('quoteSubmitBtn');
  const successEl = document.getElementById('quoteSuccess');
  const errorEl = document.getElementById('quoteError');

  successEl.classList.add('hidden');
  errorEl.classList.add('hidden');

  const name = document.getElementById('qName').value.trim();
  const phone = document.getElementById('qPhone').value.trim();
  const device = document.getElementById('qDevice').value.trim();
  const problem = document.getElementById('qProblem').value.trim();

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  btn.disabled = true;

  try {
    const res = await fetch(API.quotes, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, device, problem, status: 'pendente' }),
    });

    if (res.ok || res.status === 201) {
      successEl.classList.remove('hidden');
      document.getElementById('quoteForm').reset();
    } else {
      errorEl.classList.remove('hidden');
    }
  } catch {
    errorEl.classList.remove('hidden');
  } finally {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Solicitação';
    btn.disabled = false;
  }
}

// ===== SCROLL REVEAL =====
function initRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function observeCards() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
}

// ===== STATS COUNTER =====
function initStatsCounter() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        animateCount(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(el => observer.observe(el));
}

function animateCount(el, target) {
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString('pt-BR');
  }, 25);
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    btn?.classList.toggle('visible', window.scrollY > 400);
  });
  btn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== TOAST =====
function showToast(msg, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}
