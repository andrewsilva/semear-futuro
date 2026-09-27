import { projetos, recursos } from '../data/projetos.js';
import { criarCardProjeto } from '../components/cardProjeto.js';
import { criarGraficoRecursos } from '../components/graficoRecursos.js';
import { abrirModal } from '../components/modal.js';
import { criarToast } from '../components/toast.js';
import { ler, salvar } from '../services/storage.js';

function preencherTabela(tbody) {
  recursos.forEach(({ destino, percentual }) => {
    const linha = tbody.insertRow();
    linha.insertCell().textContent = destino;
    linha.insertCell().textContent = `${percentual}%`;
  });
}

export function inscrever(id) {
  const inscricoes = ler('inscricoes', []);
  if (!inscricoes.includes(id)) salvar('inscricoes', [...inscricoes, id]);
}

export function aoClicarQueroAjudar(botao) {
  const projeto = projetos.find((p) => p.id === botao.dataset.projeto);
  if (!projeto) return;
  abrirModal({
    texto: `Você está se inscrevendo como voluntário no projeto ${projeto.titulo}. Nossa equipe entrará em contato para combinar os horários.`,
    confirmar: () => {
      inscrever(projeto.id);
      botao.textContent = 'Inscrito';
      botao.disabled = true;
      criarToast(`Inscrição no ${projeto.titulo} registrada. Obrigado!`);
    },
  });
}

export function renderProjetos() {
  const conteudo = document.getElementById('tpl-projetos').content.cloneNode(true);
  const inscricoes = ler('inscricoes', []);
  conteudo.querySelector('.lista-projetos')
    .append(...projetos.map((p) => criarCardProjeto(p, inscricoes.includes(p.id))));
  preencherTabela(conteudo.querySelector('tbody'));

  let grafico = null;
  let ativo = true;
  const canvas = conteudo.querySelector('#grafico-recursos');
  queueMicrotask(async () => {
    const instancia = await criarGraficoRecursos(canvas, recursos);
    if (ativo) grafico = instancia;
    else instancia?.destroy();
  });

  return {
    conteudo,
    limpar: () => {
      ativo = false;
      grafico?.destroy();
    },
  };
}
