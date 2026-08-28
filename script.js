async function searchBook() {
    let alert = document.getElementById("Alerta")
    let results = document.getElementById("results")
    let nameBook = document.getElementById("nameBook").value
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(nameBook)}`;

    const respost = await fetch(url);
    const dados = await respost.json();


    if (!dados.items) {
        alert.style.display = "flex"
    }

    else {
        const livro = dados.items[0].volumeInfo;
        results.innerHTML += `  <div class="book-card">

        <img
            src="${livro.imageLinks?.thumbnail || 'imagem-padrao.jpg'}"
            alt="Capa de ${livro.title}"
            class="book-cover"
        >

        <div class="book-info">

            <h3 class="book-title">
                ${livro.title || "Título desconhecido"}
            </h3>

            <p class="book-author">
                ${livro.authors?.join(", ") || "Autor desconhecido"}
            </p>

            <p class="book-description">
                ${livro.description || "Sem descrição disponível."}
            </p>

            <div class="book-badges">

                <span class="book-badge">
                    📅 ${livro.publishedDate || "Data desconhecida"}
                </span>

                <span class="book-badge">
                    🏢 ${livro.publisher || "Editora desconhecida"}
                </span>

                <span class="book-badge">
                    📖 ${livro.pageCount || "?"} páginas
                </span>

                <span class="book-badge">
                    📚 ${livro.categories?.join(", ") || "Sem categoria"}
                </span>

                <span class="book-badge">
                    ⭐ ${livro.averageRating || "Sem avaliação"}
                </span>

                <span class="book-badge">
                    🌐 ${livro.language || "Idioma desconhecido"}
                </span>

            </div>

            <button class="book-button">
                Ver detalhes
            </button>

        </div>

    </div>`
    }

}
function fecharAlerta() {
    let alert = document.getElementById("Alerta")
    alert.style.display = "none"
}