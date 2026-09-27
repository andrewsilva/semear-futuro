import { iniciarRouter, fecharMenu } from './router/router.js';
import { iniciarModal, fecharModal } from './components/modal.js';
import { iniciarToasts } from './components/toast.js';
import { aoClicarQueroAjudar } from './views/projetos.js';

function iniciarMenu() {
  const toggle = document.querySelector('.menu-toggle');
  toggle.addEventListener('click', () => {
    const aberto = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!aberto));
    toggle.setAttribute('aria-label', aberto ? 'Abrir menu' : 'Fechar menu');
  });
  document.querySelector('.nav-list').addEventListener('click', (event) => {
    if (event.target.closest('a')) fecharMenu();
  });
}

function iniciarDelegacao() {
  document.getElementById('app').addEventListener('click', (event) => {
    const botao = event.target.closest('[data-projeto]');
    if (botao && !botao.disabled) aoClicarQueroAjudar(botao);
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  fecharModal();
  const toggle = document.querySelector('.menu-toggle');
  if (toggle.getAttribute('aria-expanded') === 'true') {
    fecharMenu();
    toggle.focus();
  }
});

iniciarMenu();
iniciarModal();
iniciarToasts();
iniciarDelegacao();
iniciarRouter();
