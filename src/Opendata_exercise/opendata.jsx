import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Opendata = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  const { bpi } = data;

  return (
    <div>
      <h1>Current Bitcoin Price</h1>
      <ul>
        {Object.keys(bpi).map((key) => (
          <li key={key}>
            <h2>{bpi[key].description}</h2>
            <p>Code: {bpi[key].code}</p>
            <p>Rate: {bpi[key].rate}</p>
            <p>Rate Float: {bpi[key].rate_float}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Opendata;
