import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaInfoCircle } from "react-icons/fa"; // Import the info icon
import "./CryptCurr.css";

const CryptCurr = () => {
  const [prices, setPrices] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice.json"
        );
        setPrices(response.data.bpi);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!prices) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Cryptocurrency Prices</h1>
      <div className="cards-container">
        {Object.keys(prices).map((currencyCode) => {
          const currency = prices[currencyCode];
          return (
            <div className="card" key={currencyCode}>
              <div className="card-title">
              <div className="circle">{currencyCode[0]}</div>
              <h3>{currency.description}</h3>
              </div>
              <div className="card-description">
              <p dangerouslySetInnerHTML={{ __html: currency.symbol }} /> {currency.rate}
              </div>
              <div className="card-footer">
                <FaInfoCircle className="info-icon" />
                <button className="trade-button">Trade</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CryptCurr;
