import { FETCH_PRODUCTS } from '../../types';
import data from '../../data.json';

export const fetchProducts = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_PRODUCTS,
      payload: data.products,
    });
  };
};
