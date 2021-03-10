import React, { Component } from 'react';
import formatCurrency from '../util';

export default class Cart extends Component {
  render() {
    const { cartItems, removeFromCart } = this.props;
    return (
      <>
        <div className='cart cart-header'>
          {cartItems.length === 0
            ? 'Your cart is empty!'
            : `You have ${cartItems.length} products in your cart!`}
        </div>
        <div className='cart'>
          <ul className='cart-items'>
            {cartItems.map((cartItem) => {
              const { id, image, title, price, count } = cartItem;
              return (
                <li key={id}>
                  <div>
                    <img src={image} alt={title} />
                  </div>
                  <div>
                    <div>{title}</div>
                    <div className='right'>
                      {formatCurrency(price)} x {count}{' '}
                      <button
                        className='button'
                        onClick={() => {
                          removeFromCart(cartItem);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        {cartItems.length > 0 && (
          <div className='cart'>
            <div className='total'>
              <div>
                Total{': '}
                {formatCurrency(
                  cartItems.reduce((acc, cartItem) => {
                    return acc + cartItem.price * cartItem.count;
                  }, 0)
                )}
              </div>
              <button className='button primary'>Proceed</button>
            </div>
          </div>
        )}
      </>
    );
  }
}
