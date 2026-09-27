import { describe, it, expect } from 'vitest';
import { cpfValido, idade, regras } from '../js/utils/validacao.js';
import { mascaras } from '../js/utils/mascaras.js';

describe('cpfValido', () => {
  it('aceita um CPF com dígitos verificadores corretos', () => {
    expect(cpfValido('529.982.247-25')).toBe(true);
  });
  it('recusa dígito verificador errado', () => {
    expect(cpfValido('529.982.247-26')).toBe(false);
  });
  it('recusa sequências repetidas', () => {
    expect(cpfValido('111.111.111-11')).toBe(false);
  });
  it('recusa formato sem máscara', () => {
    expect(cpfValido('52998224725')).toBe(false);
  });
});

describe('idade', () => {
  const hoje = new Date(2026, 8, 27);
  it('conta 18 anos exatamente no dia do aniversário', () => {
    expect(idade('2008-09-27', hoje)).toBe(18);
  });
  it('ainda tem 17 anos um dia antes do aniversário', () => {
    expect(idade('2008-09-28', hoje)).toBe(17);
  });
  it('tem 18 anos um dia depois do aniversário', () => {
    expect(idade('2008-09-26', hoje)).toBe(18);
  });
  it('devolve -1 para data inválida', () => {
    expect(idade('27/09/2008', hoje)).toBe(-1);
  });
});

describe('regras', () => {
  it('exige nome e sobrenome', () => {
    expect(regras.nome('Maria')).not.toBe('');
    expect(regras.nome('Maria da Silva')).toBe('');
  });
  it('exige celular com 9 depois do DDD', () => {
    expect(regras.telefone('(51) 99999-9999')).toBe('');
    expect(regras.telefone('(51) 3333-3333')).not.toBe('');
  });
  it('valida o CEP no formato 00000-000', () => {
    expect(regras.cep('91000-000')).toBe('');
    expect(regras.cep('91000000')).not.toBe('');
  });
});

describe('mascaras', () => {
  it('formata CPF', () => expect(mascaras.cpf('52998224725')).toBe('529.982.247-25'));
  it('formata celular', () => expect(mascaras.telefone('51999998888')).toBe('(51) 99999-8888'));
  it('formata CEP', () => expect(mascaras.cep('91000000')).toBe('91000-000'));
  it('ignora letras', () => expect(mascaras.cep('9a1b000')).toBe('91000'));
});
