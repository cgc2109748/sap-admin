import axios from 'axios';

const API_URL = '/api/productGroups/';

// Create new ProductGroup
const createProductGroup = async (ProductGroupData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}create`, ProductGroupData, config);

  return response.data;
};

// Get user productGroup
const getProductGroups = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Update user ProductGroup
const updateProductGroup = async (ProductGroupData, token) => {
  const { _id } = ProductGroupData;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + _id, ProductGroupData, config);

  return response.data;
};

// Delete user ProductGroup
const deleteProductGroup = async (ProductGroupId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + ProductGroupId, config);

  return response.data;
};

const productGroupService = {
  createProductGroup,
  getProductGroups,
  updateProductGroup,
  deleteProductGroup,
};

export default productGroupService;
