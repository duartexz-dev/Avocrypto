# Avocrypto

Avocrypto é uma demonstração estática para consultar preços e movimentações de criptomoedas. A página inicial apresenta o fluxo de acesso demonstrativo; o painel reúne pesquisa, rankings e notícias.

[Abrir Avocrypto no GitHub Pages](https://duartexz-dev.github.io/Avocrypto/)

## Funcionalidades

- Pesquisa de ativos pelo identificador usado pela CoinGecko.
- Ranking das 100 maiores criptomoedas por capitalização e três ativos em destaque.
- Três ativos em destaque, cotação, variação em 24 horas, capitalização, volume, máxima e mínima quando disponíveis.
- Alternância entre BRL e USD, com preferência salva no navegador.
- Favoritos do top 3 salvos localmente.
- Notícias da fonte externa atual.
- Temas claro e escuro, preferência persistida em `avocrypto-theme`.
- Layout responsivo, animações de entrada e atalho `/` para focar a pesquisa.
- Página inicial com fluxo demonstrativo, sem autenticação real.

## Tecnologias

- HTML5, CSS3 e JavaScript puro.
- CoinGecko API para dados de mercado.
- Fonte atual de notícias: `https://cryptocurrency.cv/api/news`.
- Bootstrap Icons e Google Fonts para recursos visuais.
- GitHub Actions e GitHub Pages para publicação estática.

## Estrutura

```text
Avocrypto/
├── .github/
│   └── workflows/
│   └── pages.yml
├── js/
│   ├── api/
│   │   ├── coingecko.js
│   ├── features/
│   │   └── news.js
│   ├── pages/
│   │   └── auth.js
│   └── ui/
│       ├── animations.js
│       └── theme.js
├── pages/
│   └── dashboard.html
├── styles/
│   ├── tokens.css
│   ├── base.css
│   ├── auth.css
│   └── dashboard.css
├── .gitignore
├── index.html
└── README.md
```

Não há imagens locais utilizadas no projeto; os ícones dos ativos vêm da resposta da CoinGecko.

## Executar localmente

Abra o projeto por um servidor HTTP em vez de usar `file://`.

```bash
git clone https://github.com/duartexz-dev/Avocrypto.git
cd Avocrypto
npx serve .
```

Também é possível usar a extensão Live Server no VS Code. Acesse a URL local apresentada pelo servidor e entre no painel pelo formulário demonstrativo.

## Organização e fluxo dos módulos

- `index.html` carrega os scripts de animação e o fluxo demonstrativo de acesso.
- `pages/dashboard.html` carrega os scripts de animação, mercado, notícias e tema.
- `js/api/coingecko.js` contém o script existente de pesquisa e dados de mercado, incluindo a chamada à CoinGecko e a renderização dos rankings.
- `js/features/news.js` contém a chamada à fonte de notícias e a apresentação dos resultados.
- `js/pages/auth.js` contém o fluxo de acesso demonstrativo; `js/ui/theme.js` mantém a preferência `avocrypto-theme`.
- `js/ui/animations.js` contém as animações existentes do projeto.
- Os arquivos foram realocados e renomeados sem converter os scripts para módulos nem reescrever sua lógica.
- `styles/tokens.css` centraliza tokens e temas; `styles/base.css` contém estilos comuns; `styles/auth.css` e `styles/dashboard.css` mantêm as regras próprias de cada tela.

## Limitações conhecidas

- As chamadas para serviços externos partem diretamente do navegador. A CoinGecko ou a fonte de notícias podem impor limites de uso, falhar ou ser bloqueadas por CORS conforme o serviço e o ambiente. O projeto não inclui proxy nem backend.
- A tela inicial é somente um fluxo demonstrativo, não protege o dashboard e não deve ser apresentada como autenticação real. O fluxo JavaScript anterior ainda persiste `senhaUser` e `emailUser` no `localStorage`; não use credenciais reais. A remoção desse comportamento exige alteração de lógica, que não faz parte da reorganização estrutural.
- Preços e notícias dependem da disponibilidade, formato e atraso das fontes externas.

## Publicação no GitHub Pages

O workflow `.github/workflows/pages.yml` publica os arquivos estáticos em cada push para `main` e também pode ser iniciado manualmente. Não há etapa de build.

Para habilitar a publicação no repositório, abra **Settings → Pages** e selecione **GitHub Actions** como fonte de build e deploy. A configuração da fonte é feita nas configurações do GitHub e não é alterada por este repositório. Como o projeto é publicado em `/Avocrypto/`, os caminhos internos são relativos às páginas e continuam funcionando no subdiretório do GitHub Pages.

---

Desenvolvido por [Arthur Duarte](https://github.com/duartexz-dev).
