
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Opendata = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState('');
  const [conversionResult, setConversionResult] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch data: " + error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const convertToBitcoin = () => {
    if (!amount || isNaN(amount) || !selectedCurrency) return;
    const rate = data.bpi[selectedCurrency].rate_float;
    const result = (amount / rate).toFixed(6);
    setConversionResult(result);
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  const { bpi } = data;

  return (
    <div>
      <h1>Bitcoin Prices</h1>
      <ul>
        {Object.keys(bpi).map((key) => (
          <li key={key}>
            {bpi[key].description}: {bpi[key].code} {bpi[key].rate}
          </li>
        ))}
      </ul>

      <h2>Convert to Bitcoin</h2>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={handleAmountChange}
      />

      <select value={selectedCurrency} onChange={handleCurrencyChange}>
        <option value="">Select currency</option>
        {Object.keys(bpi).map((key) => (
          <option key={key} value={key}>
            {bpi[key].description} ({bpi[key].code})
          </option>
        ))}
      </select>

      <button onClick={convertToBitcoin}>Convert to Bitcoin</button>

      {conversionResult && (
        <p>
          {amount} {selectedCurrency} equals {conversionResult} BTC
        </p>
      )}
    </div>
  );
};

export default Opendata;
