import axios from 'axios';

const API_URL = '/api/products/';

// Create new Product
const createProduct = async (ProductData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}create`, ProductData, config);

  return response.data;
};

// Get user product
const getProducts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user Product
const deleteProduct = async (ProductId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + ProductId, config);

  return response.data;
};

// queryProductByType
const queryProductByType = async (ProductData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}queryProductByType`, ProductData, config);
  return response.data;
};

const productervice = {
  createProduct,
  getProducts,
  deleteProduct,
  queryProductByType,
};

export default productervice;
