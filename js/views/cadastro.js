import { validarCampo } from '../utils/validacao.js';
import { aplicarMascara } from '../utils/mascaras.js';
import { ler, salvar, remover } from '../services/storage.js';
import { criarAlerta } from '../components/alerta.js';
import { criarToast } from '../components/toast.js';

const CAMPOS = ['nome', 'email', 'nascimento', 'cpf', 'telefone', 'cep', 'endereco', 'cidade', 'estado'];

function mostrarErro(campo, mensagem) {
  const wrapper = campo.closest('.form-field');
  wrapper.classList.add('campo--erro');
  wrapper.classList.remove('campo--ok');
  campo.setAttribute('aria-invalid', 'true');
  wrapper.querySelector('.mensagem-erro').textContent = mensagem;
}

function mostrarSucesso(campo) {
  const wrapper = campo.closest('.form-field');
  wrapper.classList.remove('campo--erro');
  wrapper.classList.add('campo--ok');
  campo.removeAttribute('aria-invalid');
  wrapper.querySelector('.mensagem-erro').textContent = '';
}

function conferir(campo) {
  const mensagem = validarCampo(campo.name, campo.value);
  if (mensagem) mostrarErro(campo, mensagem);
  else mostrarSucesso(campo);
  return mensagem;
}

function validarFormulario(form) {
  const erros = [];
  CAMPOS.forEach((nome) => {
    const campo = form.elements[nome];
    const mensagem = conferir(campo);
    if (mensagem) erros.push({ campo, mensagem });
  });
  const interesse = form.querySelector('[name="interesse"]:checked');
  const erroInteresse = form.querySelector('#erro-interesse');
  erroInteresse.textContent = interesse ? '' : 'Escolha como você quer ajudar.';
  if (!interesse) erros.push({ campo: form.querySelector('[name="interesse"]'), mensagem: erroInteresse.textContent });
  const consentimento = form.elements.consentimento;
  form.querySelector('#erro-consentimento').textContent = consentimento.checked ? '' : 'É preciso autorizar o contato.';
  if (!consentimento.checked) erros.push({ campo: consentimento, mensagem: 'É preciso autorizar o contato.' });
  return erros;
}

function resumoDeErros(erros) {
  const lista = document.createElement('ul');
  erros.forEach(({ campo, mensagem }) => {
    const link = document.createElement('a');
    link.href = `#${campo.id || campo.name}`;
    link.textContent = mensagem;
    link.addEventListener('click', (event) => { event.preventDefault(); campo.focus(); });
    lista.insertAdjacentElement('beforeend', document.createElement('li')).append(link);
  });
  return lista;
}

function lerRascunho(form) {
  const dados = Object.fromEntries(new FormData(form));
  delete dados.cpf;
  return dados;
}

function restaurarRascunho(form, areaAlertas) {
  const rascunho = ler('rascunho-cadastro', null);
  if (!rascunho) return;
  Object.entries(rascunho).forEach(([nome, valor]) => {
    const campo = form.elements[nome];
    if (!campo) return;
    if (campo instanceof RadioNodeList) {
      [...campo].forEach((opcao) => { opcao.checked = opcao.value === valor; });
    } else if (campo.type === 'checkbox') {
      campo.checked = valor === 'on';
    } else {
      campo.value = valor;
    }
  });
  areaAlertas.append(criarAlerta({ tipo: 'info', titulo: 'Rascunho recuperado', conteudo: 'Preenchemos os campos com o que você digitou antes. Por segurança, o CPF precisa ser informado de novo.' }));
}

export function renderCadastro() {
  const conteudo = document.getElementById('tpl-cadastro').content.cloneNode(true);
  const form = conteudo.querySelector('#form-cadastro');
  const areaAlertas = conteudo.querySelector('.area-alertas');
  const botao = form.querySelector('[type="submit"]');
  form.noValidate = true;
  form.elements.nascimento.max = new Date().toISOString().slice(0, 10);
  restaurarRascunho(form, areaAlertas);

  let temporizador;
  let enviando = false;

  form.addEventListener('input', (event) => {
    const campo = event.target;
    if (campo.dataset.mascara) aplicarMascara(campo);
    if (campo.closest('.campo--erro') && !validarCampo(campo.name, campo.value)) mostrarSucesso(campo);
    clearTimeout(temporizador);
    temporizador = setTimeout(() => salvar('rascunho-cadastro', lerRascunho(form)), 400);
  });

  form.addEventListener('focusout', (event) => {
    const campo = event.target;
    if (CAMPOS.includes(campo.name) && campo.value !== '') conferir(campo);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (enviando) return;
    areaAlertas.replaceChildren();
    const erros = validarFormulario(form);
    if (erros.length) {
      const titulo = erros.length === 1 ? '1 campo precisa de correção' : `${erros.length} campos precisam de correção`;
      areaAlertas.append(criarAlerta({ tipo: 'erro', titulo, conteudo: resumoDeErros(erros) }));
      erros[0].campo.focus();
      return;
    }
    enviando = true;
    botao.disabled = true;
    botao.textContent = 'Enviando...';
    const dados = { ...Object.fromEntries(new FormData(form)), enviadoEm: new Date().toISOString() };
    salvar('voluntarios', [...ler('voluntarios', []), dados]);
    remover('rascunho-cadastro');
    clearTimeout(temporizador);
    form.reset();
    form.querySelectorAll('.campo--ok').forEach((el) => el.classList.remove('campo--ok'));
    areaAlertas.append(criarAlerta({ tipo: 'sucesso', titulo: 'Cadastro enviado', conteudo: 'Obrigado! Nossa equipe vai entrar em contato em até 3 dias úteis.' }));
    criarToast('Cadastro enviado com sucesso.');
    enviando = false;
    botao.disabled = false;
    botao.textContent = 'Enviar cadastro';
  });

  return { conteudo, limpar: () => clearTimeout(temporizador) };
}
