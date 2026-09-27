const area = () => document.querySelector('.toast-area');

export function criarToast(mensagem, duracao = 5000) {
  const toast = document.getElementById('tpl-toast').content.firstElementChild.cloneNode(true);
  toast.querySelector('.toast__mensagem').textContent = mensagem;
  area().append(toast);
  setTimeout(() => toast.remove(), duracao);
  return toast;
}

export function iniciarToasts() {
  area().addEventListener('click', (event) => {
    event.target.closest('.toast__fechar')?.closest('.toast')?.remove();
  });
}
