/* ================================================
   HM TECH — script.js v2.0
   ================================================ */

// ===== LOADER =====
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 400);
});

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== BOTÃO VOLTAR AO TOPO =====
const btnTopo = document.getElementById('btn-topo');
window.addEventListener('scroll', () => {
  btnTopo.classList.toggle('visible', window.scrollY > 400);
});
btnTopo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== MENU HAMBÚRGUER =====
const hamburger   = document.getElementById('hamburger');
const nav         = document.getElementById('nav');
const navOverlay  = document.getElementById('nav-overlay');

function openMenu() {
  nav.classList.add('open');
  navOverlay.classList.add('active');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  nav.classList.remove('open');
  navOverlay.classList.remove('active');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  nav.classList.contains('open') ? closeMenu() : openMenu();
});

navOverlay.addEventListener('click', closeMenu);

// Fecha ao clicar num link do nav
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// ===== ACTIVE NAV LINK no scroll =====
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ===== FADE-IN ON SCROLL =====
const fadeEls = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // delay escalonado para cards
      const delay = entry.target.closest('.cards') ? i * 80 : 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => fadeObserver.observe(el));

// ===== MÁSCARA TELEFONE =====
const whatsappInput = document.getElementById('whatsapp');
whatsappInput.addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '').slice(0, 11);
  if (v.length > 6) {
    v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
  } else if (v.length > 2) {
    v = `(${v.slice(0,2)}) ${v.slice(2)}`;
  }
  e.target.value = v;
});

// ===== VALIDAÇÃO FORMULÁRIO =====
function setError(fieldId, errorId, msg) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  if (msg) {
    error.textContent = msg;
    field.closest('.form-group').classList.add('error');
    return false;
  } else {
    error.textContent = '';
    field.closest('.form-group').classList.remove('error');
    return true;
  }
}

function validarFormulario() {
  const nome     = document.getElementById('nome').value.trim();
  const whatsapp = document.getElementById('whatsapp').value.trim();
  const marca    = document.getElementById('marca').value;
  const problema = document.getElementById('problema').value;
  let ok = true;

  ok &= setError('nome', 'erro-nome',
    !nome ? 'Por favor, informe seu nome.' : '');

  ok &= setError('whatsapp', 'erro-whatsapp',
    !whatsapp ? 'Por favor, informe seu WhatsApp.' :
    whatsapp.replace(/\D/g,'').length < 10 ? 'Número inválido. Use DDD + número.' : '');

  ok &= setError('marca', 'erro-marca',
    !marca ? 'Selecione a marca do aparelho.' : '');

  ok &= setError('problema', 'erro-problema',
    !problema ? 'Selecione o problema principal.' : '');

  return !!ok;
}

// ===== ENVIO DO FORMULÁRIO =====
document.getElementById('form-solicitacao').addEventListener('submit', function (e) {
  e.preventDefault();

  if (!validarFormulario()) return;

  // Feedback visual no botão
  const btnText    = this.querySelector('.btn-text');
  const btnLoading = this.querySelector('.btn-loading');
  btnText.style.display    = 'none';
  btnLoading.style.display = 'inline-flex';

  const nome      = document.getElementById('nome').value.trim();
  const whatsapp  = document.getElementById('whatsapp').value.trim();
  const marca     = document.getElementById('marca').value;
  const modelo    = document.getElementById('modelo').value.trim();
  const problema  = document.getElementById('problema').value;
  const descricao = document.getElementById('descricao').value.trim();

  const acessorios = [];
  if (document.getElementById('acessorio-capa').checked)       acessorios.push('Capa');
  if (document.getElementById('acessorio-pelicula').checked)   acessorios.push('Película');
  if (document.getElementById('acessorio-carregador').checked) acessorios.push('Carregador/cabo');
  if (document.getElementById('acessorio-caixa').checked)      acessorios.push('Caixa original');

  let mensagem = `🔧 *Nova solicitação de orçamento — HM TECH*\n\n`;
  mensagem += `👤 *Nome:* ${nome}\n`;
  mensagem += `📱 *WhatsApp:* ${whatsapp}\n`;
  mensagem += `🏷️ *Marca:* ${marca}\n`;
  if (modelo)    mensagem += `📋 *Modelo:* ${modelo}\n`;
  mensagem += `⚠️ *Problema:* ${problema}\n`;
  if (descricao) mensagem += `📝 *Detalhes:* ${descricao}\n`;
  if (acessorios.length) mensagem += `🎒 *Acessórios:* ${acessorios.join(', ')}\n`;
  mensagem += `\n_Enviado pelo site HM TECH_`;

  const url = `https://wa.me/5518996241953?text=${encodeURIComponent(mensagem)}`;

  // Pequeno delay para o efeito de loading
  setTimeout(() => {
    window.open(url, '_blank');
    document.getElementById('form-solicitacao').style.display = 'none';
    document.getElementById('sucesso').style.display = 'block';
  }, 800);
});

// ===== BOTÃO "NOVA SOLICITAÇÃO" =====
document.getElementById('btn-nova-solicitacao')?.addEventListener('click', () => {
  const form = document.getElementById('form-solicitacao');
  form.reset();
  form.style.display = 'block';
  document.getElementById('sucesso').style.display = 'none';
  const btnText    = form.querySelector('.btn-text');
  const btnLoading = form.querySelector('.btn-loading');
  btnText.style.display    = 'inline-flex';
  btnLoading.style.display = 'none';
});

// ===== NEWSLETTER =====
document.getElementById('newsletter-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const input = this.querySelector('input[type="email"]');
  const btn   = this.querySelector('button');
  btn.textContent = '✅ Cadastrado!';
  btn.disabled = true;
  input.value  = '';
  setTimeout(() => {
    btn.textContent = 'Cadastrar';
    btn.disabled = false;
  }, 3000);
});
