const mapa = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function escapeHtml(texto) {
  return String(texto).replace(/[&<>"']/g, (c) => mapa[c]);
}
