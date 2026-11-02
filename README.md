# Avocrypto

Avocrypto é uma demonstração estática para consultar preços e movimentações de criptomoedas. A página inicial oferece acesso direto ao painel, que reúne pesquisa, rankings e notícias.

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
- Login apenas demonstrativo com usuário `banana` e senha `123`; esses valores são fictícios e validados localmente no navegador.
- Link direto ao dashboard sem login. A interface não protege o painel nem representa autenticação real.

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
│   ├── cleanup-legacy-credentials.js
│   └── ui/
│       ├── animations.js
│       └── theme.js
├── pages/
│   └── dashboard.html
├── styles/
│   ├── tokens.css
│   ├── base.css
│   ├── auth.css
│   ├── auth-redesign.css
│   ├── dashboard.css
│   └── dashboard-redesign.css
├── .gitignore
├── index.html
└── README.md
```

A marca geométrica é SVG inline original; os ícones dos ativos vêm da resposta da CoinGecko. Não foram adicionadas imagens remotas.

## Executar localmente

Abra o projeto por um servidor HTTP em vez de usar `file://`.

```bash
git clone https://github.com/duartexz-dev/Avocrypto.git
cd Avocrypto
npx serve .
```

Também é possível usar a extensão Live Server no VS Code. Acesse a URL local apresentada pelo servidor e abra o painel pelo link visível na página inicial.

## Organização e fluxo dos módulos

- `index.html` carrega as animações, o formulário local de demonstração e o link de acesso direto ao painel.
- O formulário da página inicial aceita somente usuário `banana` e senha `123`, exibe feedback e abre o dashboard após uma breve confirmação. A validação fica em `js/pages/auth.js`; não envia nem persiste os valores. Essas credenciais são exemplos públicos, não são um mecanismo de segurança.
- `pages/dashboard.html` carrega a limpeza legada, animações, mercado, notícias e tema.
- `js/cleanup-legacy-credentials.js` tenta remover as chaves de credenciais legadas do `localStorage` nas duas páginas; a limpeza é de melhor esforço e pode ser impedida pelas permissões do navegador.
- `js/api/coingecko.js` contém o script existente de pesquisa e dados de mercado, incluindo a chamada à CoinGecko e a renderização dos rankings.
- `js/features/news.js` contém a chamada à fonte de notícias e a apresentação dos resultados.
- `js/ui/theme.js` mantém a preferência `avocrypto-theme`.
- `js/ui/animations.js` contém as animações existentes do projeto.
- Os arquivos foram realocados e renomeados sem converter os scripts para módulos nem reescrever sua lógica.
- `styles/tokens.css` centraliza tokens e temas; `styles/base.css` contém estilos comuns; `styles/auth-redesign.css` e `styles/dashboard-redesign.css` são folhas autônomas das páginas. `styles/auth.css` e `styles/dashboard.css` permanecem no repositório, mas não são carregadas.

## Limitações conhecidas

- As chamadas para serviços externos partem diretamente do navegador. A CoinGecko ou a fonte de notícias podem impor limites de uso, falhar ou ser bloqueadas por CORS conforme o serviço e o ambiente. O projeto não inclui proxy nem backend.
- A aplicação é pública e estática: o formulário de demonstração aceita apenas `banana` / `123` no navegador, sem enviar, armazenar ou registrar esses valores. Não há autenticação real, e o dashboard pode ser acessado diretamente; nunca use credenciais reais. A remoção de chaves de credenciais legadas do `localStorage` é uma tentativa de melhor esforço; o navegador pode bloquear esse acesso.
- Preços e notícias dependem da disponibilidade, formato e atraso das fontes externas.

## Publicação no GitHub Pages

O workflow `.github/workflows/pages.yml` publica os arquivos estáticos em cada push para `main` e também pode ser iniciado manualmente. Não há etapa de build.

Para habilitar a publicação no repositório, abra **Settings → Pages** e selecione **GitHub Actions** como fonte de build e deploy. A configuração da fonte é feita nas configurações do GitHub e não é alterada por este repositório. Como o projeto é publicado em `/Avocrypto/`, os caminhos internos são relativos às páginas e continuam funcionando no subdiretório do GitHub Pages.

---

Desenvolvido por [Arthur Duarte](https://github.com/duartexz-dev).

## Estúdio de design com agentes do Copilot

O repositório também inclui perfis de agentes personalizados do GitHub Copilot em `.github/agents/`. Eles coordenam a criação e a revisão de interfaces sem alterar a aplicação até que exista um Design Brief aprovado. A implementação continua usando HTML, CSS e JavaScript puros, a estrutura existente e as funcionalidades do projeto.

### Agentes e responsabilidades

- **Design Orchestrator** (`design-orchestrator.agent.md`): único agente de entrada; conversa com o usuário, obtém aprovação da paleta e dos requisitos, organiza o Design Brief na conversa, escolhe especialistas e coordena o fluxo.
- **Minimalism Designer**: reduz ruído sem remover conteúdo, organizando hierarquia, tipografia, espaço, tarefas e navegação.
- **Maximalism Designer**: constrói uma gramática expressiva com composição, escala, cor e camadas, preservando leitura e prioridade das ações.
- **Glassmorphism Designer**: organiza superfícies translúcidas e profundidade, com fundos, contraste e fallbacks legíveis sem desfoque.
- **Neumorphism Designer**: aplica relevo tátil a componentes apropriados, com estados, bordas, foco e affordances distinguíveis.
- **Neobrutalism Designer**: usa bordas, geometria, sombras e contraste expressivos em um sistema consistente e responsivo.
- **Editorial Designer**: projeta arquitetura da informação, hierarquia tipográfica, grids, largura de leitura e ritmo para conteúdo.
- **Motion Graphics Designer**: concebe sequências narrativas, tipografia ou ilustração animadas; mantém conteúdo estático e respeita movimento reduzido.
- **Motion Designer**: projeta feedback causado por ações, estados, navegação e microinterações de interface — não narrativa gráfica.
- **Design QA/Repair**: revisa evidências de funcionamento, integração, responsividade e acessibilidade; corrige defeitos confirmados sem redesenhar e limita-se a três ciclos.
- **Design Security Auditor**: define um escopo de ameaça, verifica fluxos com evidências em modo somente leitura e declara limitações; não edita código.

Os oito especialistas, QA e auditoria não são invocáveis diretamente pelo usuário. O Orchestrator seleciona um especialista principal e só solicita contribuição complementar quando o brief justificar; não executa todos em cada projeto.

### Como usar

Abra este repositório no VS Code, escolha o agente **Design Orchestrator** no seletor de agentes do Chat e inicie a conversa. Ele começa perguntando **“O que você deseja criar?”**, conduz a aprovação da identidade visual e coleta plataforma, tipo de produto, animações e direção visual antes de delegar. O Design Brief é apresentado e mantido na conversa para ser encaminhado integralmente aos especialistas. Não é salvo no repositório por padrão: o workflow de Pages publica o conteúdo do repositório, então persistir um brief pode expor informações. Se o usuário pedir para salvá-lo, o agente deve explicar esse risco e obter consentimento explícito antes de gravar ou substituir um arquivo.

### Arquitetura e delegação

Os perfis usam arquivos Markdown com frontmatter YAML em `.github/agents/`, o local de workspace documentado pelo VS Code. O Orchestrator restringe a lista de subagentes autorizados por `agents` e recebe as ferramentas `agent` e `web`; os oito designers também recebem o alias `web`, enquanto QA/Repair e Design Security Auditor mantêm as ferramentas atuais sem acesso web. A disponibilidade efetiva de navegação depende do harness e das ferramentas que ele expõe; o alias não garante acesso, consulta automática nem integração com um serviço externo. Quando disponível e pertinente, `web` pode consultar MOTIONSITES.AI e 60fps.design como referências de motion/interações, e CTA.gallery e Unsection para chamadas de ação, seções e padrões visuais. Essas fontes são opcionais: não se deve exigir consulta, baixar ou usar assets, copiar código/design literalmente ou transformá-las em dependências. A inspiração deve ser traduzida para padrões existentes no repositório, respeitando a identidade e a acessibilidade aprovadas; o especialista informa apenas as fontes que realmente abriu e distingue consulta do que implementou. A execução depende da disponibilidade e habilitação de **Run Subagent** (`agent/runSubagent`) no harness **Local** do VS Code. Se esse recurso não estiver habilitado/disponível, a delegação não é automática: o Orchestrator deve declarar a limitação e fornecer a transferência de tarefa, sem fingir que outro agente executou o trabalho. Handoffs sugeridos trocam o agente ativo; não substituem a execução de subagentes.

Fluxo: conversa e aprovação → Design Brief → um especialista selecionado → QA/Repair → auditoria independente → reparo e reauditoria dos achados, se necessário → entrega com evidências e limitações. O auditor não pode editar; o Orchestrator encaminha seus achados ao QA. A execução só é serial: não delegue trabalhos concorrentes sobre os mesmos arquivos.

### Adicionar um especialista

Crie um perfil `.agent.md` em `.github/agents/` com `name`, `description`, `target: vscode`, `user-invocable: false` e ferramentas mínimas. Instrua o agente a exigir o Design Brief completo, preservar a arquitetura existente, limitar mudanças ao seu escopo e relatar validações reais. Depois, acrescente o nome exato do perfil à lista `agents` do Orchestrator e atualize esta documentação. Não crie outro coordenador, permissões de delegação ou fluxo concorrente sem verificar o suporte oficial do harness.

### Limitações

Os perfis descrevem papéis; não fornecem por si só agentes em execução, execução em segundo plano ou garantia de aprovação humana. Subagentes do VS Code Local precisam da ferramenta de delegação habilitada pelo ambiente. Este projeto é uma aplicação estática e não possui manifesto de dependências, scripts de build, lint ou testes automatizados; agentes não devem inventar essas validações. Testes em navegador, análise de dependências ou outras verificações só podem ser declarados quando ferramentas apropriadas estiverem disponíveis e forem realmente usadas. Agentes para VS Code não devem ser tratados como um pipeline de CI nem como prova de que a aplicação está segura.

Documentação oficial consultada:

- [Agentes personalizados no VS Code](https://code.visualstudio.com/docs/agent-customization/custom-agents)
- [Delegar trabalho a subagentes no VS Code](https://code.visualstudio.com/docs/agents/run/subagents)
- [Referência de configuração de agentes personalizados do GitHub Copilot](https://docs.github.com/en/copilot/reference/custom-agents-configuration)
