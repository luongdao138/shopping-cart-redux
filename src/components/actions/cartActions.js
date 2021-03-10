import { ADD_TO_CART, REMOVE_FROM_CART } from '../../types';

export const addToCart = (items, product) => {
  return (dispatch) => {
    let alreadyInCart = false;

    const newCartItems = items.map((item) => {
      if (item.id === product.id) {
        alreadyInCart = true;
        return { ...item, count: item.count + 1 };
      } else {
        return item;
      }
    });

    if (!alreadyInCart) {
      newCartItems.push({ ...product, count: 1 });
    }

    dispatch({
      type: ADD_TO_CART,
      payload: {
        cartItems: newCartItems,
      },
    });

    localStorage.setItem('carts', JSON.stringify(newCartItems));
  };
};

export const removeFromCart = (items, product) => {
  return (dispatch) => {
    const newCartItems = items.filter((item) => {
      return item.id !== product.id;
    });
    dispatch({
      type: REMOVE_FROM_CART,
      payload: {
        cartItems: newCartItems,
      },
    });
    localStorage.setItem('carts', JSON.stringify(newCartItems));
  };
};
