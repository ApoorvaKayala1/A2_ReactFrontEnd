import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Style/ProductsList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost/SEM%202/A2_KidsFashionStore/products_api.php');
        const data = await response.json();
        // Adding 'quantity' property to each product object
        const productsWithQuantity = data.map(product => ({ ...product, quantity: 0 }));
        setProducts(productsWithQuantity);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h2>Product List</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} className="product-link">
              <img src={`./Images/${product.image}`} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;