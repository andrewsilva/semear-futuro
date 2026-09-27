import { renderInicio } from '../views/inicio.js';
import { renderProjetos } from '../views/projetos.js';
import { renderCadastro } from '../views/cadastro.js';

const rotas = {
  '/inicio': { titulo: 'Início', render: renderInicio },
  '/projetos': { titulo: 'Projetos sociais', render: renderProjetos },
  '/cadastro': { titulo: 'Cadastro de voluntário', render: renderCadastro },
};

const app = document.getElementById('app');
let limparViewAtual = null;

export function fecharMenu() {
  document.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');
}

function atualizarMenu(caminho) {
  document.querySelectorAll('.nav-list > li > a').forEach((link) => {
    if (link.getAttribute('href') === `#${caminho}`) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function navegar() {
  const hash = location.hash.slice(1);
  if (hash === 'app') return;
  const caminho = rotas[hash] ? hash : '/inicio';
  const rota = rotas[caminho];

  limparViewAtual?.();
  const { conteudo, limpar } = rota.render();
  limparViewAtual = limpar ?? null;

  app.replaceChildren(conteudo);
  document.title = `Semear Futuro | ${rota.titulo}`;
  atualizarMenu(caminho);
  fecharMenu();
  window.scrollTo(0, 0);
  (app.querySelector('h1') ?? app).focus();
}

export function iniciarRouter() {
  window.addEventListener('hashchange', navegar);
  navegar();
}
