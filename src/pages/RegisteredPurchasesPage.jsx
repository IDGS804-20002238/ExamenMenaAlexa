import React, { useEffect, useState } from 'react';
import { getSales } from '../Services/apiService.js';

const RegisteredPurchasesPage = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const data = await getSales();
        setSales(data);
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    };

    fetchSales();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Registered Purchases</h1>
      {sales.length > 0 ? (
        <ul className="list-group">
          {sales.map(sale => (
            <li key={sale.saleId} className="list-group-item">
              <h5>{sale.salesTitle}</h5>
              <p>Price: ${sale.salesPrice}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No registered purchases found.</p>
      )}
    </div>
  );
};

export default RegisteredPurchasesPage;