async function rankingTop3() {

    const resposta = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=3&page=1"
    )
    const dados = await resposta.json();

    let ranking3 = document.getElementById("rankingtop3")

    ranking3.innerHTML = ``;

    dados.forEach((crypto, index) => {

        ranking3.innerHTML += `<div class="col-12 col-md-6 col-xl-4">

            <div class="crypto-card">

                <div class="card-top">

                    <div class="coin-info">

                        <div class="coin-icon">
                            ${crypto.symbol.toUpperCase()}
                        </div>

                        <div>
                            <h3>${crypto.name}</h3>
                            <span>${crypto.symbol.toUpperCase()}</span>
                        </div>

                    </div>

                    <button class="star-button">
                        <i class="bi bi-star"></i>
                    </button>

                </div>

                <div class="price">
                    R$ ${crypto.current_price.toLocaleString("pt-BR")}
                </div>

                <div class="change ${crypto.price_change_percentage_24h >= 0 ? " positive" : "negative"}">

                ${crypto.price_change_percentage_24h >= 0 ? "↑" : "↓"}

                ${crypto.price_change_percentage_24h.toFixed(2)}%

            </div>

            <div class="mini-chart">
                <div class="chart-line"></div>
            </div>

        </div>

            </div >

            `;
    });
}

rankingTop3()

async function buscarBitcoin() {

    let result = document.getElementById("ResultSearch")
    let nameCrypto = document.getElementById("cryptoSearch").value.trim().toLowerCase();
    const resposta = await fetch(
        `https://api.coingecko.com/api/v3/coins/${nameCrypto}`
    );

    const dados = await resposta.json();

    const id = dados.id;
    const nome = dados.name;
    const simbolo = dados.symbol;

    const marketCap = dados.market_data.market_cap.brl;
    const volume = dados.market_data.total_volume.brl;

    const variacao24h =
        dados.market_data.price_change_percentage_24h;

    const maxima24h =
        dados.market_data.high_24h.brl;

    const minima24h =
        dados.market_data.low_24h.brl;

    const preco =
        dados.market_data.current_price.brl;

    const dadosCrypto = `
        ID: ${id}
        Nome: ${nome}
        Símbolo: ${simbolo}
        Preço: R$ ${preco}
        Market Cap: R$ ${marketCap}
        Volume 24h: R$ ${volume}
        Variação 24h: ${variacao24h}%
        Máxima 24h: R$ ${maxima24h}
        Mínima 24h: R$ ${minima24h}
    `;
    console.log(dadosCrypto);
    result.innerHTML = `
     <div class="table-row d-flex align-items-center justify-content-between p-3">

    <div class="table-coin d-flex align-items-center gap-3">

        <div class="coin-icon small ethereum d-flex align-items-center justify-content-center">
            ${simbolo.toUpperCase()}
        </div>

        <div class="d-flex flex-column">

            <strong class="fs-6">
                ${nome}
            </strong>

            <small class="text-secondary text-uppercase">
                ${simbolo}
            </small>

        </div>

    </div>

    <div class="text-end">

        <small class="d-block text-secondary">
            Market Cap
        </small>

        <strong class="fs-6">
            R$ ${marketCap.toLocaleString("pt-BR")}
        </strong>

    </div>

</div>
    `;

}

let input = document.getElementById("cryptoSearch")

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        buscarBitcoin();
    }
});



