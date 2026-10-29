async function news() {
    const lastNews = document.getElementById("lastNews");
    if (!lastNews) return;

    const showMessage = (message) => {
        const emptyState = document.createElement("p");
        emptyState.className = "news-empty";
        emptyState.textContent = message;
        lastNews.replaceChildren(emptyState);
    };

    lastNews.setAttribute("aria-busy", "true");
    showMessage("Carregando as notícias mais recentes...");

    try {
        const response = await fetch("https://cryptocurrency.cv/api/news");
        if (!response.ok) {
            throw new Error(`A API de notícias respondeu com status ${response.status}.`);
        }

        const data = await response.json();
        if (!Array.isArray(data.articles)) {
            throw new Error("A resposta da API de notícias está em um formato inesperado.");
        }

        const articles = data.articles;
        if (articles.length === 0) {
            showMessage("Nenhuma notícia disponível no momento. Tente novamente mais tarde.");
            return;
        }

        const fragment = document.createDocumentFragment();

        articles.forEach((article, index) => {
            const column = document.createElement("div");
            column.className = "col-12 col-md-6 col-lg-4";

            const card = document.createElement("article");
            card.className = "news-card";
            card.style.animationDelay = `${Math.min(index, 8) * 70}ms`;

            const content = document.createElement("div");
            content.className = "news-content";

            const meta = document.createElement("div");
            meta.className = "news-meta";

            const kicker = document.createElement("span");
            kicker.className = "news-kicker";
            kicker.textContent = "NOTÍCIA";

            const source = document.createElement("span");
            source.className = "news-source";
            source.textContent = article.source || "Fonte desconhecida";
            meta.append(kicker, source);

            const title = document.createElement("h3");
            title.textContent = article.title || "Sem título";

            const description = document.createElement("p");
            description.textContent = article.description || "Sem descrição disponível.";

            const footer = document.createElement("div");
            footer.className = "news-footer";

            const date = document.createElement("small");
            date.textContent = article.timeAgo || article.pubDate || "";
            footer.append(date);

            if (article.link) {
                try {
                    const url = new URL(article.link);
                    if (url.protocol === "https:" || url.protocol === "http:") {
                        const link = document.createElement("a");
                        link.href = url.href;
                        link.target = "_blank";
                        link.rel = "noopener noreferrer";
                        link.className = "news-link";
                        link.textContent = "Ler notícia";
                        link.setAttribute("aria-label", `Ler notícia: ${title.textContent}`);
                        footer.append(link);
                    }
                } catch (error) {
                    console.warn("Link de notícia inválido; o botão de leitura foi omitido.", error);
                }
            }

            content.append(meta, title, description, footer);
            card.append(content);
            column.append(card);
            fragment.append(column);
        });

        lastNews.replaceChildren(fragment);
    } catch (error) {
        console.error("Não foi possível carregar as notícias.", error);
        showMessage("Não foi possível carregar as notícias agora. Tente novamente mais tarde.");
    } finally {
        lastNews.setAttribute("aria-busy", "false");
    }
}

news();
