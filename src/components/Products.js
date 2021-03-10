import React, { Component } from 'react';
import formatCurrency from '../util';

export default class Products extends Component {
  render() {
    const { products, handleAddToCart } = this.props;
    return (
      <div>
        <ul className='products'>
          {products.map((product) => {
            const { id, image, title, price } = product;
            return (
              <li key={id}>
                <div className='product'>
                  <a href={`#${id}`}>
                    <img src={image} alt={title} />
                    <p>{title}</p>
                  </a>
                  <div className='product-price'>
                    <div>{formatCurrency(price)}</div>
                    <button
                      className='button primary'
                      onClick={() => {
                        handleAddToCart(product);
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
