
async function news() {

    let lastnews = document.getElementById("lastNews")
    lastnews.innerHTML = ``;

    try {
        const resposta = await fetch("https://cryptocurrency.cv/api/news");

        const dados = await resposta.json();

        dados.articles.forEach(noticia => {
            lastnews.innerHTML += `      <div class="col-12 col-md-6 col-lg-4">

            <article class="news-card h-100">

                <div class="news-content">

                    <span class="news-source">
                        ${noticia.source || "Fonte desconhecida"}
                    </span>

                    <h3>
                        ${noticia.title || "Sem título"}
                    </h3>

                    <p>
                        ${noticia.description || "Sem descrição disponível."}
                    </p>

                    <div class="news-footer">

                        <small>
                            ${noticia.timeAgo || noticia.pubDate || ""}
                        </small>

                        <a
                            href="${noticia.link}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="news-link"
                        >
                            Ler notícia →
                        </a>

                    </div>

                </div>

            </article>

        </div>`
        });
    } catch {
        console.log("Erro", erro)
    }
}

news()