import { ADD_TO_CART, REMOVE_FROM_CART } from '../types';

const initialState = {
  cartItems: localStorage.getItem('carts')
    ? JSON.parse(localStorage.getItem('carts'))
    : JSON.parse('[]'),
};

export const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, cartItems: action.payload.cartItems };
    case REMOVE_FROM_CART:
      return { ...state, cartItems: action.payload.cartItems };
    default:
      return state;
  }
};
