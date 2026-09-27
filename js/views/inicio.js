export function renderInicio() {
  return { conteudo: document.getElementById('tpl-inicio').content.cloneNode(true) };
}
