const SELETOR_FOCAVEL = 'button:not([disabled]), a[href], input, select, [tabindex]:not([tabindex="-1"])';

let origem = null;
let aoConfirmar = null;

const fundo = () => document.getElementById('modal');
const fundoDaPagina = () => [document.querySelector('.site-header'), document.getElementById('app'), document.querySelector('.site-footer')];

export function abrirModal({ texto, confirmar }) {
  origem = document.activeElement;
  aoConfirmar = confirmar;
  fundo().querySelector('.modal__texto').textContent = texto;
  fundo().hidden = false;
  fundoDaPagina().forEach((el) => { el.inert = true; });
  fundo().querySelector(SELETOR_FOCAVEL).focus();
}

export function fecharModal() {
  if (fundo().hidden) return;
  fundo().hidden = true;
  fundoDaPagina().forEach((el) => { el.inert = false; });
  origem?.focus();
}

export function iniciarModal() {
  const modal = fundo();
  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.closest('[data-fechar-modal]')) fecharModal();
    if (event.target.closest('[data-confirmar]')) {
      const acao = aoConfirmar;
      fecharModal();
      acao?.();
    }
  });
  modal.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const focaveis = [...modal.querySelectorAll(SELETOR_FOCAVEL)];
    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];
    if (event.shiftKey && document.activeElement === primeiro) {
      event.preventDefault();
      ultimo.focus();
    } else if (!event.shiftKey && document.activeElement === ultimo) {
      event.preventDefault();
      primeiro.focus();
    }
  });
}
