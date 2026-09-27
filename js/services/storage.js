const PREFIXO = 'semear:';

export function salvar(chave, valor) {
  try {
    localStorage.setItem(PREFIXO + chave, JSON.stringify(valor));
    return true;
  } catch {
    return false;
  }
}

export function ler(chave, padrao) {
  try {
    const bruto = localStorage.getItem(PREFIXO + chave);
    return bruto === null ? padrao : JSON.parse(bruto);
  } catch {
    remover(chave);
    return padrao;
  }
}

export function remover(chave) {
  try {
    localStorage.removeItem(PREFIXO + chave);
  } catch {
    /* armazenamento indisponível */
  }
}
