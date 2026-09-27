const nomesCategoria = {
  educacao: 'Educação',
  'meio-ambiente': 'Meio ambiente',
  tecnologia: 'Tecnologia',
  vagas: 'Vagas abertas',
};

const imagens = (nome, largura, formato) => new URL(`../../img/${nome}-${largura}.${formato}`, import.meta.url).href;

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

  card.querySelector('source').srcset = `${imagens(projeto.imagem, 400, 'webp')} 400w, ${imagens(projeto.imagem, 800, 'webp')} 800w`;
  const img = card.querySelector('img');
  img.srcset = `${imagens(projeto.imagem, 400, 'jpg')} 400w, ${imagens(projeto.imagem, 800, 'jpg')} 800w`;
  img.src = imagens(projeto.imagem, 800, 'jpg');
  img.alt = projeto.alt;

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
