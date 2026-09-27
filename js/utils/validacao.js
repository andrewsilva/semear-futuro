export function cpfValido(valor) {
  const cpf = String(valor).replace(/\D/g, '');
  if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(valor) || /^(\d)\1{10}$/.test(cpf)) return false;
  const digito = (base) => {
    const soma = [...base].reduce((acc, n, i) => acc + Number(n) * (base.length + 1 - i), 0);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };
  return digito(cpf.slice(0, 9)) === Number(cpf[9]) && digito(cpf.slice(0, 10)) === Number(cpf[10]);
}

export function idade(dataIso, hoje = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dataIso)) return -1;
  const nascimento = new Date(dataIso);
  let anos = hoje.getFullYear() - nascimento.getFullYear();
  const aindaNaoFez = hoje.getMonth() < nascimento.getMonth()
    || (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate());
  if (aindaNaoFez) anos -= 1;
  return anos;
}

export const regras = {
  nome: (v) => (/^[A-Za-zÀ-ÿ']+( [A-Za-zÀ-ÿ']+)+$/.test(v.trim()) ? '' : 'Informe nome e sobrenome.'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Digite um e-mail válido, como nome@exemplo.com.'),
  nascimento: (v) => (idade(v) >= 18 ? '' : 'O cadastro de voluntário é para maiores de 18 anos.'),
  cpf: (v) => (cpfValido(v) ? '' : 'CPF inválido. Confira os números digitados.'),
  telefone: (v) => (/^\(\d{2}\) 9\d{4}-\d{4}$/.test(v) ? '' : 'Digite o celular com DDD: (51) 99999-9999.'),
  cep: (v) => (/^\d{5}-\d{3}$/.test(v) ? '' : 'Digite o CEP no formato 00000-000.'),
  endereco: (v) => (v.trim().length >= 5 ? '' : 'Informe a rua e o número.'),
  cidade: (v) => (v.trim().length >= 2 ? '' : 'Informe a cidade.'),
  estado: (v) => (v ? '' : 'Selecione o estado.'),
};

export function validarCampo(nome, valor) {
  return regras[nome] ? regras[nome](valor) : '';
}
