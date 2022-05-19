import axios from 'axios';

const API_URL = '/api/productLogs/';

// Create new ProductLogs
const createProductLog = async (ProductLogsData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}create`, ProductLogsData, config);

  return response.data;
};

// Get user product
const getProductLogs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user ProductLogs
const deleteProductLogs = async (ProductLogsId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + ProductLogsId, config);

  return response.data;
};

const productLogsService = {
  createProductLog,
  getProductLogs,
  deleteProductLogs,
};

export default productLogsService;
