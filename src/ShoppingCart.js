import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';

import './Style/ShoppingCart.css';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      // Update item quantity in the database
      await fetch(`http://localhost/SEM%202/A2_KidsFashionStore/Cart_API.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: itemId,
          quantity: newQuantity,
        }),
      });

      // Update the local state
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      // Remove item from the database
      await fetch(`http://localhost/SEM%202/A2_KidsFashionStore/Cart_API.php`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: itemId,
        }),
      });

      // Update the local state
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };


  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost/SEM%202/A2_KidsFashionStore/Cart_API.php');
        const cartItemsWithDetails = await response.json();
  
        // Now cartItemsWithDetails should contain all the necessary data for creating an order
        setCartItems(cartItemsWithDetails);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
  
    fetchCartItems();
  }, []);

  const calculateTotal = () => {
    const total = cartItems.reduce((acc, item) => {
      const itemPrice = parseFloat(item.pricing) || 0;
      const itemQuantity = parseFloat(item.quantity) || 0;
      return acc + itemPrice * itemQuantity;
    }, 0);
    return total.toFixed(2);
  };

  const handleFinalizePurchase = async () => {
    try {
      const orderData = cartItems.map((item) => ({
        user_id: parseInt(item.user_id),
        product_id: item.product_id,
        quantity: parseInt(item.quantity, 10),
        total_amount: item.pricing * parseInt(item.quantity, 10),
      }));

      // Send a POST request to insert orders into the database
      const apiUrl = 'http://localhost/SEM%202/A2_KidsFashionStore/Orders_API.php';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orders: orderData }),
      });
  
      if (response.ok) {
        // Clear the cartItems
        setCartItems([]);
  
        // Delete items from the cart table
        await fetch('http://localhost/SEM%202/A2_KidsFashionStore/Cart_API.php', {
          method: 'DELETE',
        });
  
        // Set the orderPlaced state to true
        setOrderPlaced(true);
      } else {
        // If the response is not successful, throw an error
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      // Log any errors that occurred during the process
      console.error('Error finalizing purchase:', error);
    }
  };
  
  return (
    <div className="container2">
      <h2>Shopping Cart</h2>
      <table className="shopping-cart-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={`/Images/${item.image}`}  alt={item.name} className="cart-item-image" />
              </td>
              <td>
                {item.name}
              </td>
              <td>
                <button onClick={() => updateQuantity(item.id, parseInt(item.quantity, 10) - 1)}>-</button>
                {parseInt(item.quantity, 10)}
                <button onClick={() => updateQuantity(item.id, parseInt(item.quantity, 10) + 1)}>+</button>
              </td>
              <td>${item.pricing}</td>
              <td>${item.pricing * item.quantity}</td>
              <td>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="total-row">
            <td colSpan="4">Total</td>
            <td>${calculateTotal()}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      {orderPlaced ? (
        <p>Order placed successfully! Thank you for shopping with us.</p>
      ) : (
        <button onClick={handleFinalizePurchase} className="button">
          Finalize Purchase
        </button>
      )}
    </div>
  );
};

export default ShoppingCart;
