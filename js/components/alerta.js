export function criarAlerta({ tipo = 'info', titulo, conteudo }) {
  const alerta = document.getElementById('tpl-alerta').content.firstElementChild.cloneNode(true);
  alerta.classList.add(`alerta--${tipo}`);
  alerta.setAttribute('role', tipo === 'erro' ? 'alert' : 'status');
  alerta.querySelector('.alerta__titulo').textContent = titulo;
  const area = alerta.querySelector('.alerta__conteudo');
  if (typeof conteudo === 'string') area.textContent = conteudo;
  else if (conteudo) area.append(conteudo);
  return alerta;
}
