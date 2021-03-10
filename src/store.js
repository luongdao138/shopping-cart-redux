import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { productReducers } from './reducers/productReducers';
import thunk from 'redux-thunk';
import { cartReducers } from './reducers/cartReducers';

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    products: productReducers,
    carts: cartReducers,
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
