let moeda = "brl";

const hostsImagemCoinGecko = new Set([
    "coin-images.coingecko.com",
    "assets.coingecko.com"
]);

function criarElemento(tag, className = "") {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    return element;
}

function inserirTexto(parent, tag, className, value) {
    const element = criarElemento(tag, className);
    element.textContent = value == null ? "" : String(value);
    parent.append(element);
    return element;
}

function textoCoinGecko(value) {
    return value == null ? "" : String(value);
}

function imagemCoinGecko(url, name, className = "", loading = null) {
    const wrapper = criarElemento("div", className);
    const image = document.createElement("img");
    const label = textoCoinGecko(name);

    image.alt = `Logo da ${label}`;
    if (loading) {
        image.loading = loading;
    }

    try {
        const parsedUrl = new URL(url);
        if (parsedUrl.protocol === "https:" && hostsImagemCoinGecko.has(parsedUrl.hostname)) {
            image.src = parsedUrl.href;
            wrapper.append(image);
        }
    } catch (error) {
        // URL ausente ou inválida: mantém o espaço do ícone sem carregar origem externa.
    }

    return wrapper;
}

function numeroCoinGecko(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
}

function criarVariacao(value, className = "change", tagName = "span") {
    const variation = numeroCoinGecko(value);
    const classes = [className, variation >= 0 ? "positive" : "negative"].filter(Boolean);
    const element = criarElemento(tagName, classes.join(" "));
    element.textContent = `${variation >= 0 ? "↑" : "↓"} ${Math.abs(variation).toFixed(2)}%`;
    return element;
}

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
    }).format(numeroCoinGecko(valor));
}

async function rankingTop3() {

    const resposta = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${moeda}&order=market_cap_desc&per_page=3&page=1`
    );

    const dados = await resposta.json();

    let ranking3 = document.getElementById("rankingtop3");

    ranking3.replaceChildren();

    dados.forEach((crypto, index) => {

        const name = textoCoinGecko(crypto.name);
        const column = criarElemento("div", "col-12 col-md-6 col-xl-4");
        const card = criarElemento("div", "crypto-card");
        const cardTop = criarElemento("div", "card-top");
        const coinInfo = criarElemento("div", "coin-info");
        const coinDetails = criarElemento("div");
        const favorite = criarElemento("button", "star-button");
        const star = criarElemento("i", "bi bi-star");

        favorite.type = "button";
        favorite.setAttribute("aria-label", `Adicionar ${name} aos favoritos`);
        favorite.append(star);
        coinInfo.append(
            imagemCoinGecko(crypto.image, name, "coin-icon", "lazy"),
            coinDetails
        );
        inserirTexto(coinDetails, "h3", "", name);
        inserirTexto(coinDetails, "span", "", textoCoinGecko(crypto.symbol).toUpperCase());
        cardTop.append(coinInfo, favorite);
        const price = inserirTexto(card, "div", "price", formatarMoeda(crypto.current_price, 8));
        card.append(
            cardTop,
            price,
            criarVariacao(crypto.price_change_percentage_24h, "change", "div"),
            criarElemento("div", "mini-chart")
        );
        card.lastElementChild.append(criarElemento("div", "chart-line"));
        column.append(card);
        ranking3.append(column);
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

        result.replaceChildren();

        return;
    }


    const resposta = await fetch(
        `https://api.coingecko.com/api/v3/coins/${nameCrypto}`
    );


    const dados = await resposta.json();


    const id = textoCoinGecko(dados.id);
    const nome = textoCoinGecko(dados.name);
    const simbolo = textoCoinGecko(dados.symbol);

    const imagem = dados.image?.small;

    const marketCap =
        dados.market_data.market_cap[moeda];

    const volume =
        dados.market_data.total_volume[moeda];

    const variacao24h =
        dados.market_data.price_change_percentage_24h ?? 0;

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


    result.replaceChildren();
    const cryptoResult = criarElemento("div", "crypto-result p-3");
    const resultHeader = criarElemento("div", "d-flex align-items-center justify-content-between gap-3");
    const tableCoin = criarElemento("div", "table-coin d-flex align-items-center gap-3");
    const resultInfo = criarElemento("div", "crypto-result-info");
    const resultPrice = criarElemento("div", "crypto-result-price");
    const resultMeta = criarElemento("div", "crypto-result-meta");

    tableCoin.append(imagemCoinGecko(imagem, nome, "coin-icon small"), resultInfo);
    inserirTexto(resultInfo, "strong", "", nome);
    inserirTexto(resultInfo, "small", "", simbolo);
    resultPrice.append(
        criarElemento("strong"),
        criarVariacao(variacao24h, "", "small")
    );
    resultPrice.firstElementChild.textContent = formatarMoeda(preco, 8);
    resultHeader.append(tableCoin, resultPrice);

    [
        ["Market Cap", formatarMoeda(marketCap, 0)],
        ["Volume 24h", formatarMoeda(volume, 0)],
        ["Máxima 24h", formatarMoeda(maxima24h, 8)],
        ["Mínima 24h", formatarMoeda(minima24h, 8)]
    ].forEach(([label, value]) => {
        const item = criarElemento("div");
        inserirTexto(item, "span", "", label);
        inserirTexto(item, "strong", "", value);
        resultMeta.append(item);
    });

    cryptoResult.append(resultHeader, resultMeta);
    result.append(cryptoResult);

}



let input = document.getElementById("cryptoSearch");

document.addEventListener("keydown", (event) => {
    const target = event.target;
    const isEditing = target instanceof HTMLElement
        && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

    if (event.key === "/" && !isEditing && !event.altKey && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        input.focus();
    }
});

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


    ranking100.replaceChildren();


    dados.forEach((crypto, index) => {

        const name = textoCoinGecko(crypto.name);
        const row = criarElemento("div", "table-row");
        inserirTexto(row, "span", "rank", index + 1);
        const coin = criarElemento("div", "table-coin");
        const details = criarElemento("div");

        coin.append(imagemCoinGecko(crypto.image, name, "coin-icon small", "lazy"), details);
        inserirTexto(details, "strong", "", name);
        inserirTexto(details, "small", "", textoCoinGecko(crypto.symbol).toUpperCase());
        const price = criarElemento("strong");
        price.textContent = formatarMoeda(crypto.current_price, 8);
        const marketCap = criarElemento("strong");
        marketCap.textContent = formatarMoeda(crypto.market_cap, 0);
        row.append(
            coin,
            price,
            criarVariacao(crypto.price_change_percentage_24h, ""),
            marketCap
        );
        ranking100.append(row);
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