import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItemById, createSale } from '../services/apiService';

const ItemDetailPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getItemById(id);
        setItem(data);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [id]);

  const handleBuy = async () => {
    if (item) {
      const sale = {
        saleId: 0,
        salesTitle: item.title,
        salesPrice: item.price,
      };
      console.log('sale:', sale);
      try {
        await createSale(sale);
        alert('Compra realizada con éxito');
      } catch (error) {
        console.error('Error creating sale:', error);
        alert('Error al realizar la compra');
      }
    }
  };

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', padding: '15px' }}>
          {item.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={item.title}
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
          ))}
        </div>
        <div className="card-body" style={{ flex: '1' }}>
          <h5 className="card-title">
            {item.title}
            <span style={{ fontSize: '0.8em', color: 'gray', marginLeft: '10px' }}>{item.category}</span>
          </h5>
          <p className="card-text">{item.description}</p>
          <p className="card-text" style={{ fontWeight: 'bold', fontSize: '1.2em', color: '#333' }}>
            ${item.price}
          </p>
          <div>
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index} style={{ color: index < Math.floor(item.rating) ? '#FFD700' : 'lightgray' }}>
                ★
              </span>
            ))}
          </div>
          <div>
            <button  className="btn btn-success" onClick={handleBuy} style={{ alignItems: 'center' }}>Comprar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;