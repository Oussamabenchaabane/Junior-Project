import axios from 'axios';

export const fetchProducts = async () => {
  const response = await axios.get('/api/products');
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post('/api/products', product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await axios.put(`/api/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`/api/products/${id}`);
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`/api/products/${id}`);
  return response.data;
}; 