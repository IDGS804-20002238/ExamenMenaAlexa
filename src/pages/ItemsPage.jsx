import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ItemsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const items = location.state?.items || [];
  const [searchTerm, setSearchTerm] = useState('');

  const handleCardClick = (id) => {
    navigate(`/item/${id}`);
  };

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.price.toString().includes(searchTerm)
  );

  return (
    <div className="mt-4">
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        <img src="/img/image.png" alt="Bazar Online" width="50px" />
        <input
          type="text"
          className="form-control ml-2"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mt-4">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div
              key={item.id}
              className="card mb-3"
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => handleCardClick(item.id)}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }}
              />
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
              </div>
            </div>
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
}

export default ItemsPage;