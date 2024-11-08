// services/apiService.js

const API_BASE_URL = 'https://bazaruniversalapi20241107172515.azurewebsites.net//api/Bazar';
const SALES_API_BASE_URL = 'https://bazaruniversalapi20241107172515.azurewebsites.net//api/Sales';

export const getItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/items`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const getItemById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/items/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching item with id ${id}:`, error);
    throw error;
  }
};

export const createSale = async (sale) => {
  try {
    const response = await fetch(`${SALES_API_BASE_URL}/sales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sale),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating sale:', error);
    throw error;
  }
};

export const getSales = async () => {
  try {
    const response = await fetch(`${SALES_API_BASE_URL}/sales`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching sales:', error);
    throw error;
  }
};