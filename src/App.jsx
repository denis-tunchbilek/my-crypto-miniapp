import { useEffect, useState } from 'react';

function App() {
  const [tg, setTg] = useState(null);
  const [coin, setCoin] = useState('');
  const [amount, setAmount] = useState('');
  const [portfolio, setPortfolio] = useState([]);
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const telegram = window.Telegram.WebApp;
    telegram.expand();
    setTg(telegram);
  }, []);

  const addAsset = () => {
    setPortfolio([...portfolio, { coin: coin.toLowerCase(), amount: parseFloat(amount) }]);
    setCoin('');
    setAmount('');
  };

  const fetchPrices = async () => {
    const ids = portfolio.map(p => p.coin).join(',');
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
    const data = await res.json();
    setPrices(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Крипто-портфель</h1>

      <input
        placeholder="Монета (bitcoin, ethereum)"
        value={coin}
        onChange={(e) => setCoin(e.target.value)}
      />
      <input
        type="number"
        placeholder="Количество"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={addAsset}>Добавить</button>
      <button onClick={fetchPrices}>Обновить цены</button>

      <hr />

      {portfolio.map((asset, index) => {
        const price = prices[asset.coin]?.usd || 0;
        const total = (price * asset.amount).toFixed(2);
        return (
          <div key={index}>
            {asset.coin.toUpperCase()} — {asset.amount} × ${price} = <b>${total}</b>
          </div>
        );
      })}
    </div>
  );
}

export default App;
