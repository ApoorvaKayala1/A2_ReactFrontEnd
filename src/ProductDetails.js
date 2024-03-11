import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from './CartContext';

import './Style/ProductDetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Log the constructed API URL
    const apiUrl = `http://localhost/SEM%202/A2_KidsFashionStore/products_api.php?id=${productId}`;
    console.log('API URL:', apiUrl);

    const fetchProduct = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data); 
        console.log('Data received:', data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      const apiUrl = 'http://localhost/SEM%202/A2_KidsFashionStore/Cart_API.php';
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: '1', 
          product_id: product.id,
          quantity,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Data received:', data);
  
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div class="product-details">
      <h2>Product Details</h2>
      <div class="product-details-container">
        <div class="product-image">
          <img src={`/Images/${product.image}`} alt={product.name} />
        </div>
        <div class="product-info">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.pricing}</p>
          <div className="quantity-selection">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          <button onClick={handleAddToCart} class="button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
