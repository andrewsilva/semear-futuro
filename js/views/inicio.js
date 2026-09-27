import { projetos } from '../data/projetos.js';
import { fotos } from '../data/fotos.js';
import { preencherFoto } from '../utils/imagens.js';
import { criarCardProjeto } from '../components/cardProjeto.js';
import { ler } from '../services/storage.js';

export function renderInicio() {
  const conteudo = document.getElementById('tpl-inicio').content.cloneNode(true);
  conteudo.querySelectorAll('[data-foto]').forEach((picture) => preencherFoto(picture, fotos[picture.dataset.foto]));
  const inscricoes = ler('inscricoes', []);
  conteudo.querySelector('.lista-projetos')
    .append(...projetos.map((p) => criarCardProjeto(p, inscricoes.includes(p.id))));
  return { conteudo };
}
