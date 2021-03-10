import React, { Component } from 'react';
import formatCurrency from '../util';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: '',
      isShowCheckout: false,
    };
  }
  handleCloseForm = () => {
    this.setState((state) => {
      return {
        name: '',
        email: '',
        address: '',
        isShowCheckout: false,
      };
    });
  };

  createOrder = (e) => {
    e.preventDefault();
    const { name, email, address } = this.state;
    const { cartItems } = this.props;
    const order = { name, email, address, cartItems };
    this.props.createOrder(order);
  };

  handleInput = (e) => {
    this.setState((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };

  handleShowCheckout = () => {
    this.setState((state) => {
      return { ...state, isShowCheckout: true };
    });
  };

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
              <button
                className='button primary'
                onClick={this.handleShowCheckout}
              >
                Proceed
              </button>
            </div>
          </div>
        )}
        {this.state.isShowCheckout && (
          <>
            <div className='cart'>
              <form onSubmit={this.createOrder}>
                <ul className='form-container'>
                  <li>
                    {' '}
                    <label htmlFor='email'>Email</label>
                    <input
                      id='email'
                      type='text'
                      autoFocus
                      onChange={this.handleInput}
                      name='email'
                    />
                  </li>
                  <li>
                    {' '}
                    <label htmlFor='name'>Name</label>
                    <input
                      id='name'
                      type='text'
                      name='name'
                      onChange={this.handleInput}
                    />
                  </li>
                  <li>
                    {' '}
                    <label htmlFor='address'>Address</label>
                    <input
                      id='address'
                      name='address'
                      type='text'
                      onChange={this.handleInput}
                    />
                  </li>
                  <li id='button-wrappper'>
                    <button
                      className='button primary'
                      type='button'
                      onClick={this.handleCloseForm}
                    >
                      Cancel
                    </button>
                    <button className='button primary' type='submit'>
                      Checkout
                    </button>
                  </li>
                </ul>
              </form>
            </div>
          </>
        )}
      </>
    );
  }
}
