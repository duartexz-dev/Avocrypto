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






/*{
  "id": "bitcoin",
  "symbol": "btc",
  "name": "Bitcoin",
  "current_price": 600000,
  "market_cap": 12000000000000,
  "total_volume": 30000000000,
  "price_change_percentage_24h": 2.5,
  "high_24h": 610000,
  "low_24h": 580000
}
*/