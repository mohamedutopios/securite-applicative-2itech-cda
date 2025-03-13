import axios from 'axios';

const API_URL = 'http://localhost:5182/api/products';

const ProductService = {
  getProducts: () => axios.get(API_URL),
  getProductById: (id) => axios.get(`${API_URL}/${id}`),
  createProduct: (product) => axios.post(API_URL, product),
  updateProduct: (id, product) => axios.put(`${API_URL}/${id}`, product),
  deleteProduct: (id) => axios.delete(`${API_URL}/${id}`)
};

export default ProductService;