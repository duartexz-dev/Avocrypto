const chave_api = process.env.chave_api;


async function buscarBitcoin() {

    const resposta = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl"
    );

    const dados = await resposta.json();

    console.log(dados);
}

buscarBitcoin();










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