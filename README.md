# 🥑 Avocrypto

Monitoramento de criptomoedas diretamente pelo navegador, com busca, rankings e informações de mercado utilizando a **CoinGecko API**.

O Avocrypto foi desenvolvido como um projeto para praticar integração com APIs, manipulação de dados, JavaScript e construção de interfaces responsivas.

## 📌 Sobre o projeto

O Avocrypto permite consultar e acompanhar informações de diferentes criptomoedas através de uma interface simples e responsiva.

O projeto foi pensado para transformar dados vindos de uma API em informações fáceis de visualizar, trabalhando principalmente com JavaScript e requisições HTTP.

## ⚙️ Funcionalidades

* 🔎 Busca por criptomoedas
* 📊 Ranking das principais criptomoedas
* 🏆 Top 3 criptomoedas
* 💰 Preço atual
* 📈 Variação de 24 horas
* 📉 Maior e menor preço
* 💵 Market Cap
* 📦 Volume de negociação
* 📱 Interface responsiva
* ✨ Animações e efeitos visuais
* 🌐 Integração com CoinGecko API

## 🛠️ Tecnologias

* HTML5
* CSS3
* JavaScript
* Bootstrap
* CoinGecko API

## 📂 Estrutura

```text
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

## 🎯 Objetivo

O principal objetivo do Avocrypto foi colocar em prática conceitos de desenvolvimento web, principalmente:

* consumo de APIs;
* requisições com `fetch()`;
* manipulação do DOM;
* organização de JavaScript;
* criação de interfaces responsivas;
* exibição dinâmica de dados;
* criação de animações para melhorar a experiência do usuário.

## 🌐 API

Os dados de mercado utilizados no projeto são fornecidos pela **CoinGecko API**.

Exemplo de informações utilizadas:

```text
Preço
Market Cap
Volume
Variação de 24h
Máxima
Mínima
Ranking
```

## ⚠️ Limitação conhecida — CORS

Durante o desenvolvimento, encontrei um problema relacionado ao **CORS (Cross-Origin Resource Sharing)**.

Atualmente, o navegador faz as requisições diretamente para a CoinGecko:

```text
Avocrypto
   ↓
JavaScript
   ↓
CoinGecko API
```

Dependendo da configuração da API e do ambiente em que o projeto está sendo executado, o navegador pode bloquear essas requisições por questões de segurança.

A solução mais adequada seria adicionar uma camada intermediária, como um backend, serverless function ou proxy:

```text
Avocrypto
   ↓
Backend / Proxy
   ↓
CoinGecko API
```

### Por que o problema ainda não foi resolvido?

Decidi manter essa limitação neste momento porque o objetivo principal do projeto foi **aprendizado e prática**. Implementar uma infraestrutura intermediária poderia gerar custos e adicionar uma camada maior de complexidade que não fazia parte do objetivo inicial do projeto.

Por isso, o Avocrypto permanece como um projeto de estudo, documentando também uma limitação real encontrada durante o desenvolvimento e uma possível solução para uma futura versão.

## 📚 Aprendizados

Durante o desenvolvimento, o projeto serviu para praticar principalmente:

```text
JavaScript
↓
Fetch API
↓
APIs externas
↓
Manipulação do DOM
↓
Dados dinâmicos
↓
Responsividade
↓
Animações
↓
Problemas de CORS
```

## 🚧 Status

**Projeto de estudo e desenvolvimento contínuo.**

Novas melhorias podem ser adicionadas futuramente, principalmente relacionadas à arquitetura da comunicação com APIs e à experiência do usuário.

---

**Desenvolvido por Arthur Duarte**
