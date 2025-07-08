import { useEffect, useState } from 'react';

function App() {
  const [tg, setTg] = useState(null);
  const [coin, setCoin] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const telegram = window.Telegram.WebApp;
    telegram.expand();
    setTg(telegram);
  }, []);

  const handleSubmit = () => {
    if (!tg) return;
    tg.sendData(JSON.stringify({ coin, amount }));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Крипто-портфель</h1>
      <input
        placeholder="Монета (BTC, ETH)"
        value={coin}
        onChange={(e) => setCoin(e.target.value.toUpperCase())}
      />
      <input
        type="number"
        placeholder="Количество"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleSubmit}>Сохранить</button>
    </div>
  );
}

export default App;
