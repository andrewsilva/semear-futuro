import { fotos } from '../data/fotos.js';
import { preencherFoto } from '../utils/imagens.js';

const nomesCategoria = {
  educacao: 'Educação',
  'meio-ambiente': 'Meio ambiente',
  tecnologia: 'Tecnologia',
  vagas: 'Vagas abertas',
};


export function criarBadge(categoria) {
  const badge = document.getElementById('tpl-badge').content.firstElementChild.cloneNode(true);
  badge.classList.add(`badge--${categoria}`);
  badge.textContent = nomesCategoria[categoria] ?? categoria;
  return badge;
}

export function criarCardProjeto(projeto, inscrito = false) {
  const card = document.getElementById('tpl-card-projeto').content.firstElementChild.cloneNode(true);
  card.querySelector('.card-titulo').textContent = projeto.titulo;
  card.querySelector('.card-descricao').textContent = projeto.descricao;

  preencherFoto(card.querySelector('picture'), fotos[projeto.id]);

  const badges = card.querySelector('.card-badges');
  badges.append(criarBadge(projeto.categoria));
  if (projeto.vagas <= 5) badges.append(criarBadge('vagas'));

  const botao = card.querySelector('.btn');
  botao.dataset.projeto = projeto.id;
  botao.setAttribute('aria-label', `Quero ajudar no projeto ${projeto.titulo}`);
  if (inscrito) {
    botao.textContent = 'Inscrito';
    botao.disabled = true;
    botao.setAttribute('aria-label', `Inscrito no projeto ${projeto.titulo}`);
  }
  return card;
}
