import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREASE_ITEM_NUMBER,
  REMOVE_FROM_CART,
} from '../types';

const initialState = {
  cartItems: localStorage.getItem('carts')
    ? JSON.parse(localStorage.getItem('carts'))
    : [],
};

export const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, cartItems: action.payload.cartItems };
    case REMOVE_FROM_CART:
      return { ...state, cartItems: action.payload.cartItems };
    case DECREASE_ITEM_NUMBER:
      return { ...state, cartItems: action.payload.cartItems };
    case CLEAR_CART:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};
