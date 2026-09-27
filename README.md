# Semear Futuro

Plataforma web da Semear Futuro, organização da sociedade civil de Porto Alegre que atende cerca de 180 crianças e adolescentes no contraturno escolar. O site divulga os projetos da ONG, mostra como os recursos são aplicados e recebe o cadastro de novos voluntários.

Site publicado: https://andrewsilva.github.io/semear-futuro/

Projeto desenvolvido nas Experiências Práticas I a IV da disciplina de Desenvolvimento Front-end.

## Funcionalidades

- Navegação de página única (SPA) com roteamento por hash: `#/inicio`, `#/projetos` e `#/cadastro`
- Cartões de projetos gerados a partir de dados, com inscrição por modal
- Cadastro de voluntário com validação em tempo real, máscaras de CPF, celular e CEP, e verificação dos dígitos do CPF
- Rascunho do cadastro salvo automaticamente no navegador
- Gráfico de transparência da aplicação dos recursos, com tabela acessível
- Temas claro, escuro e alto contraste

## Tecnologias

| Camada | Ferramentas |
| --- | --- |
| Estrutura | HTML5 semântico |
| Estilo | CSS3 com variáveis, Grid de 12 colunas e Flexbox |
| Lógica | JavaScript com ES Modules, sem framework |
| Biblioteca | Chart.js 4, carregado sob demanda |
| Build | Vite 5 |
| Testes | Vitest |
| CI/CD | GitHub Actions e GitHub Pages |

## Estrutura de pastas

```
semear-futuro/
├── html/            index.html (casca da SPA e templates)
├── css/             tokens, layout, navegação, componentes e feedback
├── img/             imagens em WebP e JPEG, em 400 e 800 px
├── js/
│   ├── main.js      ponto de entrada
│   ├── router/      roteamento por hash
│   ├── views/       início, projetos e cadastro
│   ├── components/  cartão, alerta, toast, modal e gráfico
│   ├── services/    storage.js, único acesso ao localStorage
│   ├── utils/       validação, máscaras e escape de HTML
│   └── data/        dados dos projetos e dos recursos
├── tests/           testes das funções de validação
└── .github/         workflows e template de pull request
```

## Como executar localmente

Pré-requisitos: Git e Node.js 20 ou superior.

```bash
# 1. Clonar o repositório
git clone https://github.com/andrewsilva/semear-futuro.git
cd semear-futuro

# 2. Instalar as dependências de desenvolvimento
npm install

# 3. Rodar em modo de desenvolvimento (http://localhost:5173/semear-futuro/)
npm run dev

# 4. Gerar a build de produção na pasta dist
npm run build

# 5. Conferir a build localmente
npm run preview

# 6. Executar os testes
npm test
```

## Acessibilidade

O projeto segue as diretrizes WCAG 2.1 nível AA:

- Contraste mínimo de 4,5:1 em textos e 3:1 em bordas de componentes, nos temas claro e escuro
- Navegação completa por teclado, com link "Pular para o conteúdo" e foco sempre visível
- Landmarks únicos (`header`, `nav`, `main`, `footer`) e hierarquia de títulos sem saltos
- Foco levado ao título da nova tela a cada navegação da SPA
- Modal com foco preso, fechamento por Esc e retorno do foco ao botão de origem
- Erros de formulário ligados aos campos por `aria-describedby` e resumo com `role="alert"`
- Respeito a `prefers-reduced-motion`, `prefers-color-scheme`, `prefers-contrast` e `forced-colors`

Testado com teclado, NVDA e Lighthouse.

## Versionamento e contribuição

O repositório usa GitFlow:

| Branch | Uso |
| --- | --- |
| `main` | Código publicado. Protegida, recebe apenas merge de `release/*` e `hotfix/*` |
| `develop` | Integração das funcionalidades |
| `feature/*` | Uma branch por funcionalidade, criada a partir da `develop` |
| `release/*` | Preparação de uma versão, como `release/1.0.0` |
| `hotfix/*` | Correção urgente a partir da `main` |

As mensagens de commit seguem o [Conventional Commits](https://www.conventionalcommits.org/pt-br/), por exemplo `feat(spa): roteamento por hash` ou `fix(validacao): corrige cálculo de idade`. As versões seguem o [Versionamento Semântico](https://semver.org/lang/pt-BR/): `fix` gera PATCH, `feat` gera MINOR e mudanças incompatíveis geram MAJOR. O histórico está no [CHANGELOG](CHANGELOG.md).

Para contribuir:

1. Crie uma branch a partir da `develop`: `git checkout -b feature/minha-melhoria develop`
2. Faça commits pequenos no padrão Conventional Commits
3. Abra um pull request para a `develop` preenchendo o template
4. O CI roda testes, build e Lighthouse. O merge só acontece com tudo aprovado

## Licença e contato

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE).

Semear Futuro: contato@semearfuturo.org.br · (51) 3000-0000
