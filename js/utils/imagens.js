const LARGURAS = [400, 800, 1200, 1600];

export function urlFoto(id, largura, formato, proporcao) {
  const altura = Math.round(largura * proporcao);
  return `https://images.unsplash.com/${id}?w=${largura}&h=${altura}&fit=crop&crop=faces,center&fm=${formato}&q=70`;
}

export function srcsetFoto(id, formato, proporcao, maxima = 1600) {
  return LARGURAS.filter((l) => l <= maxima)
    .map((l) => `${urlFoto(id, l, formato, proporcao)} ${l}w`)
    .join(', ');
}

export function preencherFoto(picture, foto) {
  const proporcao = Number(picture.dataset.proporcao || 0.667);
  const maxima = picture.dataset.prioridade === 'alta' ? 1600 : 1200;
  const sizes = picture.dataset.sizes || '100vw';
  const source = picture.querySelector('source');
  const img = picture.querySelector('img');
  source.srcset = srcsetFoto(foto.id, 'webp', proporcao, maxima);
  source.sizes = sizes;
  img.srcset = srcsetFoto(foto.id, 'jpg', proporcao, maxima);
  img.sizes = sizes;
  img.src = urlFoto(foto.id, 800, 'jpg', proporcao);
  img.alt = foto.alt;
  if (picture.dataset.prioridade === 'alta') {
    img.fetchPriority = 'high';
    img.loading = 'eager';
  }
}
