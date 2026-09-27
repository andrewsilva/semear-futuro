# Changelog

Todas as mudanças relevantes deste projeto são registradas aqui. O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o projeto usa [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.1.0]

### Adicionado
- Página inicial com destaque em foto, números da ONG, projetos em andamento e faixa de chamada para voluntários
- Fotos reais do Unsplash, com `srcset` em WebP e JPEG
- Cadastro em duas colunas com etapas do voluntariado ao lado do formulário
- Rodapé com contato, navegação e créditos das fotos

### Corrigido
- Coluna do formulário ocupando só uma coluna do grid por causa da classe `lg-start-3`
- Opções de "Como quero ajudar" transformadas em cartões clicáveis alinhados
- Margem padrão de `figure` desalinhando a imagem da página inicial
- Cabeçalho no celular com o seletor de tema e o menu na mesma linha

## [1.0.0]

### Adicionado
- Build de produção com Vite, minificação de HTML, CSS e JS e nomes de arquivo com hash
- Imagens em 400 e 800 px, com `srcset` e `sizes`
- Temas escuro e alto contraste, com seletor salvo no navegador
- Link "Pular para o conteúdo" e revisão WCAG 2.1 AA
- Deploy automático no GitHub Pages e CI com testes, build e Lighthouse
- README, CHANGELOG, licença MIT e template de pull request

## [0.3.0]

### Adicionado
- SPA com roteamento por hash e views montadas a partir de templates
- Validação do cadastro em JavaScript, máscaras e verificação dos dígitos do CPF
- Persistência de inscrições, rascunho e cadastros no localStorage
- Gráfico de transparência com Chart.js

### Corrigido
- Cálculo de idade no dia do aniversário, que lia a data em UTC

## [0.2.0]

### Adicionado
- Design system com variáveis de cor, tipografia e espaçamento
- Grid de 12 colunas com 5 breakpoints e componentes em Flexbox
- Menu hambúrguer no celular e dropdown no desktop
- Estados de botões, cartões e formulários, badges, alertas, toast e modal

## [0.1.0]

### Adicionado
- Páginas inicial, de projetos e de cadastro em HTML5 semântico
- Formulário com validações nativas e padrões para CPF, telefone e CEP
