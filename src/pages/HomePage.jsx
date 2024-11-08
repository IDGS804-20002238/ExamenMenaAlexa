import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { getItems } from '../services/apiService';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const items = await getItems();
      const filteredItems = searchTerm
        ? items.filter(item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.price.toString().includes(searchTerm)
          )
        : items;
      navigate('/items', { state: { items: filteredItems } });
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="text-center">
        <img src="/img/image.png" alt="Bazar Online" width="100px" />
        <h1>Bazar Online</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="input-group-append">
          <button className="btn btn-primary" type="button" onClick={handleSearch}>Buscar</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;