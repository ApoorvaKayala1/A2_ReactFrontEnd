import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import ProductsList from './ProductsList';
import ShoppingCart from './ShoppingCart';
import AccountPage from './AccountPage';
import ProductDetails from './ProductDetails';

import { CartProvider } from './CartContext';
import { UserProvider } from './UserContext';

import './App.css';

// const products = ([
//   { id: 1, name: 'Christmas Princess', description: 'Chamie Girl Dress for Birthday Wedding Party Special Occasion Sequins Tulle Princess', price: 34.99, image: '/Images/Product1.jpg' },
//   { id: 2, name: 'Chamie Girl Dress', description: 'Chamie Girl Dress for Birthday Wedding Party Special Occasion Sequins Tulle Princess', price: 27.39, image: '/Images/Product2.jpg' },
//   { id: 3, name: 'Baby Girl 3pcs Outfit', description: 'Toddler Baby Girl Clothes Long Sleeve Top + Flared Pants + Headband 3pcs Set', price: 29.99, image: '/Images/Product3.jpg' },
//   { id: 4, name: 'Gentleman Outfit', description: 'Birthday Outfits Formal Shirt + Overalls + Bow Tie Clothing Set for Toddler Baby Boys', price: 34.00, image: '/Images/Product4.jpg' },
//   { id: 5, name: 'Baby Boy Hoodie Set', description: 'Infant Baby Boys Clothes Toddler Long Sleeve Hoodie Pullover Tops Sweatsuit Pants Set', price: 26.99, image: '/Images/Product5.jpg' },
//   { id: 6, name: 'Boys Blazer Pants', description: 'Yuanlu Boys Tuxedo Blazer Pants Vest Shirt Tie Navy Blue Suits Dress Clothes for Kids', price: 59.55, image: '/Images/Product6.jpg' },
// ]);

// const App = () => {

//   const handleCreateAccount = (userData) => {
//     console.log('User data:', userData);
//   };

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost/SEM%202/A2_KidsFashionStore/products_api.php');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCreateAccount = (userData) => {
    console.log('User data:', userData);
  };

  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <header className="App-header">
            <h1>Kids Fashion Shop</h1>
          </header>
          <div class="nav-container">
            <div class="navigation">
              <ul>
                  <li>
                      <Link to="/">
                          <span class="icon"><img src="/Images/home.png" alt="Home Icon"></img></span>
                          <span class="title">Home</span>
                      </Link>
                  </li>

                  <li>
                      <Link to="/cart">
                          <span class="icon"><img src="/Images/cart.png" alt="Cart Icon"></img></span>
                          <span class="title">Cart</span>
                      </Link>
                  </li>

                  <li>
                      <Link to="/account">
                          <span class="icon"><img src="/Images/profile.png" alt="Profile Icon"></img></span>
                          <span class="title">Profile</span>
                      </Link>
                  </li>
                </ul>
              </div>  
            <div className="content-container">
              <Routes>
                <Route path="/" element={<ProductsList products={products} />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/product/:productId" element={<ProductDetails products={products} />} />
              </Routes>
            </div>
          </div>
        </CartProvider>
      </UserProvider>
    </Router>
  );
};

export default App;
