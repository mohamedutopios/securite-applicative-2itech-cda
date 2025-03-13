import React, { useEffect, useState } from 'react';
import ProductService from '../services/productService';
import AuthService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const ProductListComponent = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const role = AuthService.getUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    //console.log(role)
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await ProductService.getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await ProductService.deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await ProductService.createProduct(newProduct);
      setNewProduct({ name: '', price: '' });
      fetchProducts();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="container">
      <h2>Products</h2>
      <ul className="list-group">
        {products.map((product) => (
          <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span onClick={() => navigate(`/products/${product.id}`)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
              {product.name} - ${product.price}
            </span>
            {role === 'Admin' && (
              <div>
                <button className="btn btn-warning btn-sm mx-1" onClick={() => navigate(`/edit-product/${product.id}`)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {role === 'Admin' && (
        <div className="mt-3">
          <h3>Add Product</h3>
          <input type="text" className="form-control" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          <input type="number" className="form-control mt-2" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
          <button className="btn btn-primary mt-2" onClick={handleCreate}>Create</button>
        </div>
      )}
    </div>
  );
};

export default ProductListComponent;