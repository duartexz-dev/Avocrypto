let moeda = "brl";

/* =========================================================
   TOP 3
========================================================= */

function formatarMoeda(valor, maximumFractionDigits = 2) {
    const locale = moeda === "brl" ? "pt-BR" : "en-US";

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: moeda.toUpperCase(),
        minimumFractionDigits: Math.min(2, maximumFractionDigits),
        maximumFractionDigits
    }).format(valor);
}

async function rankingTop3() {

    const resposta = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${moeda}&order=market_cap_desc&per_page=3&page=1`
    );

    const dados = await resposta.json();

    let ranking3 = document.getElementById("rankingtop3");

    ranking3.innerHTML = "";

    dados.forEach((crypto, index) => {

        const variacao = crypto.price_change_percentage_24h ?? 0;

        ranking3.innerHTML += `

            <div class="col-12 col-md-6 col-xl-4">

                <div class="crypto-card">

                    <div class="card-top">

                        <div class="coin-info">

                            <div class="coin-icon">

                                <img
                                    src="${crypto.image}"
                                    alt="Logo da ${crypto.name}"
                                    loading="lazy"
                                >

                            </div>

                            <div>

                                <h3>
                                    ${crypto.name}
                                </h3>

                                <span>
                                    ${crypto.symbol.toUpperCase()}
                                </span>

                            </div>

                        </div>


                        <button
                            class="star-button"
                            type="button"
                            aria-label="Adicionar ${crypto.name} aos favoritos"
                        >

                            <i class="bi bi-star"></i>

                        </button>

                    </div>


                    <div class="price">

                        ${formatarMoeda(crypto.current_price, 8)}

                    </div>


                    <div class="change ${variacao >= 0 ? "positive" : "negative"}">

                        ${variacao >= 0 ? "↑" : "↓"}

                        ${Math.abs(variacao).toFixed(2)}%

                    </div>


                    <div class="mini-chart">

                        <div class="chart-line"></div>

                    </div>

                </div>

            </div>

        `;
    });
}

async function buscarBitcoin() {

    let result = document.getElementById("ResultSearch");

    let nameCrypto = document
        .getElementById("cryptoSearch")
        .value
        .trim()
        .toLowerCase();


    if (!nameCrypto) {

        result.innerHTML = "";

        return;
    }


    const resposta = await fetch(
        `https://api.coingecko.com/api/v3/coins/${nameCrypto}`
    );


    const dados = await resposta.json();


    const id = dados.id;
    const nome = dados.name;
    const simbolo = dados.symbol;

    const imagem = dados.image?.small;

    const marketCap =
        dados.market_data.market_cap[moeda];

    const volume =
        dados.market_data.total_volume[moeda];

    const variacao24h =
        dados.market_data.price_change_percentage_24h;

    const maxima24h =
        dados.market_data.high_24h[moeda];

    const minima24h =
        dados.market_data.low_24h[moeda];

    const preco =
        dados.market_data.current_price[moeda];


    const dadosCrypto = `

        ID: ${id}

        Nome: ${nome}

        Símbolo: ${simbolo}

        Preço: ${formatarMoeda(preco, 8)}

        Market Cap: ${formatarMoeda(marketCap, 0)}

        Volume 24h: ${formatarMoeda(volume, 0)}

        Variação 24h: ${variacao24h}%

        Máxima 24h: ${formatarMoeda(maxima24h, 8)}

        Mínima 24h: ${formatarMoeda(minima24h, 8)}

    `;


    console.log(dadosCrypto);


    result.innerHTML = `

        <div class="crypto-result p-3">

            <div class="d-flex align-items-center justify-content-between gap-3">


                <!-- MOEDA -->

                <div class="table-coin d-flex align-items-center gap-3">

                    <div class="coin-icon small">

                        <img
                            src="${imagem}"
                            alt="Logo da ${nome}"
                        >

                    </div>


                    <div class="crypto-result-info">

                        <strong>
                            ${nome}
                        </strong>

                        <small>
                            ${simbolo}
                        </small>

                    </div>

                </div>


                <!-- PREÇO -->

                <div class="crypto-result-price">

                    <strong>

                        ${formatarMoeda(preco, 8)}

                    </strong>


                    <small class="${variacao24h >= 0 ? "positive" : "negative"}">

                        ${variacao24h >= 0 ? "↑" : "↓"}

                        ${Math.abs(variacao24h).toFixed(2)}%

                    </small>

                </div>

            </div>


            <!-- INFORMAÇÕES -->

            <div class="crypto-result-meta">


                <div>

                    <span>
                        Market Cap
                    </span>

                    <strong>
                        ${formatarMoeda(marketCap, 0)}
                    </strong>

                </div>


                <div>

                    <span>
                        Volume 24h
                    </span>

                    <strong>
                        ${formatarMoeda(volume, 0)}
                    </strong>

                </div>


                <div>

                    <span>
                        Máxima 24h
                    </span>

                    <strong>
                        ${formatarMoeda(maxima24h, 8)}
                    </strong>

                </div>


                <div>

                    <span>
                        Mínima 24h
                    </span>

                    <strong>
                        ${formatarMoeda(minima24h, 8)}
                    </strong>

                </div>


            </div>

        </div>

    `;

}



let input = document.getElementById("cryptoSearch");


input.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        buscarBitcoin();

    }

});



async function rankingTop100() {

    const resposta = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${moeda}&order=market_cap_desc&per_page=100&page=1`
    );


    const dados = await resposta.json();


    let ranking100 =
        document.getElementById("ranking100");


    ranking100.innerHTML = "";


    dados.forEach((crypto, index) => {

        const variacao =
            crypto.price_change_percentage_24h ?? 0;


        ranking100.innerHTML += `

            <div class="table-row">


                <!-- POSIÇÃO -->

                <span class="rank">

                    ${index + 1}

                </span>



                <!-- MOEDA -->

                <div class="table-coin">


                    <div class="coin-icon small">

                        <img
                            src="${crypto.image}"
                            alt="Logo da ${crypto.name}"
                            loading="lazy"
                        >

                    </div>


                    <div>

                        <strong>
                            ${crypto.name}
                        </strong>

                        <small>
                            ${crypto.symbol.toUpperCase()}
                        </small>

                    </div>

                </div>



                <!-- PREÇO -->

                <strong>

                    ${formatarMoeda(crypto.current_price, 8)}

                </strong>



                <!-- 24H -->

                <span class="${variacao >= 0 ? "positive" : "negative"}">

                    ${variacao >= 0 ? "↑" : "↓"}

                    ${Math.abs(variacao).toFixed(2)}%

                </span>



                <!-- MARKET CAP -->

                <strong>

                    ${formatarMoeda(crypto.market_cap, 0)}

                </strong>


            </div>

        `;
    });
}




const currencyToggle = document.getElementById("currencyToggle");
const currencyCodes = document.querySelectorAll("[data-currency-code]");
const marketStatusText = document.getElementById("marketStatusText");

try {
    const savedCurrency = localStorage.getItem("avocrypto-currency");
    if (savedCurrency === "brl" || savedCurrency === "usd") {
        moeda = savedCurrency;
    }
} catch (error) {
    console.warn("A preferência de moeda não pôde ser carregada.", error);
}

function atualizarControlesMoeda() {
    const nextCurrency = moeda === "brl" ? "usd" : "brl";
    currencyToggle.querySelector("span").textContent = nextCurrency.toUpperCase();
    currencyToggle.setAttribute("aria-label", `Trocar para ${nextCurrency.toUpperCase()}`);
    marketStatusText.textContent = `Fonte: CoinGecko · ${moeda.toUpperCase()}`;
    currencyCodes.forEach((element) => {
        element.textContent = moeda.toUpperCase();
    });
}

atualizarControlesMoeda();

currencyToggle.addEventListener("click", () => {
    moeda = moeda === "brl" ? "usd" : "brl";
    atualizarControlesMoeda();

    try {
        localStorage.setItem("avocrypto-currency", moeda);
    } catch (error) {
        console.warn("A preferência de moeda não pôde ser salva.", error);
    }

    rankingTop100();
    rankingTop3();

    if (document.getElementById("cryptoSearch").value.trim()) {
        buscarBitcoin();
    }
});

rankingTop100();
rankingTop3();