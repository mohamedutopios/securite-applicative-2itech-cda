import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductService from '../services/productService';

const ProductFormComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', price: '' });

  useEffect(() => {
    if (id) {
      ProductService.getProductById(id).then(response => {
        setProduct(response.data);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await ProductService.updateProduct(id, product);
    } else {
      await ProductService.createProduct(product);
    }
    navigate('/products');
  };

  return (
    <div className="container">
      <h2>{id ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
        </div>
        <div className="mb-3">
          <input type="number" className="form-control" placeholder="Price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
        </div>
        <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default ProductFormComponent;