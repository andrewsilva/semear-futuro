const soDigitos = (v) => v.replace(/\D/g, '');

export const mascaras = {
  cpf: (v) => soDigitos(v).slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d{1,2})$/, '.$1-$2'),
  telefone: (v) => soDigitos(v).slice(0, 11)
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2'),
  cep: (v) => soDigitos(v).slice(0, 8).replace(/^(\d{5})(\d{1,3})$/, '$1-$2'),
};

export function aplicarMascara(input) {
  const tipo = input.dataset.mascara;
  if (!mascaras[tipo]) return;
  const digitosAntes = soDigitos(input.value.slice(0, input.selectionStart)).length;
  input.value = mascaras[tipo](input.value);
  let pos = 0;
  let contados = 0;
  while (pos < input.value.length && contados < digitosAntes) {
    if (/\d/.test(input.value[pos])) contados += 1;
    pos += 1;
  }
  input.setSelectionRange(pos, pos);
}
