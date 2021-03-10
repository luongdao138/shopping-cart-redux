import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  ORDER_PRODUCTS_BY_PRICE,
} from '../../types';
import data from '../../data.json';

export const fetchProducts = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_PRODUCTS,
      payload: data.products,
    });
  };
};

export const filterProducts = (products, size, currentSort) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_PRODUCTS_BY_SIZE,
      payload: {
        size,
        items:
          size === ''
            ? products
            : products
                .filter((product) => product.availableSizes.indexOf(size) >= 0)
                .slice()
                .sort((a, b) => {
                  switch (currentSort) {
                    case 'lowest':
                      return a.price - b.price;
                    case 'highest':
                      return b.price - a.price;

                    default:
                      return b.id - a.id;
                  }
                }),
      },
    });
  };
};

export const sortProducts = (products, sort) => {
  return (dispatch) => {
    dispatch({
      type: ORDER_PRODUCTS_BY_PRICE,
      payload: {
        sort,
        items: products.slice().sort((a, b) => {
          switch (sort) {
            case 'lowest':
              return a.price - b.price;
            case 'highest':
              return b.price - a.price;

            default:
              return b.id - a.id;
          }
        }),
      },
    });
  };
};
