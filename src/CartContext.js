import React, { createContext, useContext, useReducer } from 'react';

// Action Types
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };
    case UPDATE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    default:
      return state;
  }
};

// Action Creators
const addToCartAction = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

const removeFromCartAction = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

const updateQuantityAction = (productId, newQuantity) => ({
  type: UPDATE_QUANTITY,
  payload: { id: productId, quantity: newQuantity },
});

// Initial State
const initialState = {
  cartItems: [],
};

// Create Context
const CartContext = createContext();

// Cart Provider Component
const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch(addToCartAction(product));
  };

  const removeFromCart = (productId) => {
    dispatch(removeFromCartAction(productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    dispatch(updateQuantityAction(productId, newQuantity));
  };

  return (
    <CartContext.Provider value={{ cartState, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
