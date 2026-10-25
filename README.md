# 🥑 Avocrypto

Monitoramento de criptomoedas direto pelo navegador — busca, rankings e dados de mercado em tempo real usando a **CoinGecko API**.

[![Demo](https://img.shields.io/badge/demo-online-7fa858?style=flat-square)](https://duartexz-dev.github.io/Avocrypto/)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white)

**[➜ Acessar o projeto](https://duartexz-dev.github.io/Avocrypto/)**

<!--
  Coloque aqui um screenshot ou GIF curto do app rodando.
  Exemplo: ![preview](./docs/preview.png)
  É a melhor forma de mostrar o resultado sem precisar abrir o link.
-->

## Sobre o projeto

O Avocrypto permite consultar e acompanhar informações de diferentes criptomoedas através de uma interface simples e responsiva.

Foi desenvolvido como projeto de estudo para praticar integração com APIs, manipulação de dados e construção de interfaces — transformando os dados de uma API externa em algo fácil de visualizar.

## Funcionalidades

- Busca por criptomoedas
- Ranking das principais moedas e top 3 em destaque
- Preço atual, variação de 24h, máxima e mínima
- Market cap e volume de negociação
- Interface responsiva, com animações e efeitos visuais

## Como rodar localmente

O projeto não tem build — é HTML/CSS/JS puro. Para rodar:

```bash
git clone https://github.com/duartexz-dev/Avocrypto.git
cd Avocrypto
```

Depois, abra o `index.html` diretamente no navegador, ou sirva a pasta com um servidor local (recomendado, evita bloqueios de CORS do navegador em `file://`):

```bash
npx serve .
# ou, com a extensão Live Server do VS Code
```

## Tecnologias

- HTML5 / CSS3 / JavaScript
- Bootstrap
- [CoinGecko API](https://www.coingecko.com/en/api)

## Estrutura

```
Avocrypto/
├── Home/
├── jS/
│   ├── animations.js
│   ├── api.js
│   ├── login.js
│   ├── news.js
│   └── system.js
├── index.html
├── script.js
├── style.css
└── README.md
```

## Objetivo

O principal objetivo do Avocrypto foi colocar em prática conceitos de desenvolvimento web:

- Consumo de APIs e requisições com `fetch()`
- Manipulação do DOM e exibição dinâmica de dados
- Organização de JavaScript em múltiplos módulos
- Criação de interfaces responsivas
- Animações para melhorar a experiência do usuário

## Limitação conhecida — CORS

Atualmente, o navegador faz as requisições diretamente para a CoinGecko:

```
Avocrypto → JavaScript → CoinGecko API
```

Dependendo da configuração da API e do ambiente em que o projeto roda, o navegador pode bloquear essas requisições por política de CORS. A solução correta seria adicionar uma camada intermediária:

```
Avocrypto → Backend / Proxy → CoinGecko API
```

**Por que ainda não foi resolvido:** o objetivo principal do projeto foi aprendizado e prática. Implementar uma infraestrutura intermediária adicionaria custo e complexidade fora do escopo inicial. Por isso o Avocrypto permanece como projeto de estudo — documentando também essa limitação real e o caminho para resolvê-la numa versão futura.

## Aprendizados

```
JavaScript → Fetch API → APIs externas → Manipulação do DOM
→ Dados dinâmicos → Responsividade → Animações → Problemas de CORS
```

## Status

Projeto de estudo em desenvolvimento contínuo. Próximas melhorias devem focar na arquitetura de comunicação com a API (resolver CORS) e em refinar a experiência do usuário.

---

Desenvolvido por [Arthur Duarte](https://github.com/duartexz-dev)
