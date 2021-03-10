import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
// import App from '../App';

export default class Products extends Component {
  constructor(props) {
    super(props);
    // Modal.setAppElement(null);
    this.state = {
      product: null,
    };
  }

  openModal = (e, product) => {
    e.preventDefault();
    this.setState((state) => {
      return { ...state, product };
    });
  };

  closeModal = () => {
    this.setState((state) => {
      return { ...state, product: null };
    });
  };

  render() {
    const { product } = this.state;
    const { products, handleAddToCart } = this.props;
    return (
      <div>
        <Fade bottom cascade>
          <ul className='products'>
            {products.map((product) => {
              const { id, image, title, price } = product;
              return (
                <li key={id}>
                  <div className='product'>
                    <a href={`#${id}`}>
                      <img
                        src={image}
                        alt={title}
                        onClick={(e) => {
                          this.openModal(e, product);
                        }}
                      />
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
        </Fade>

        {product && (
          <Modal
            isOpen={true}
            ariaHideApp={false}
            onRequestClose={this.closeModal}
          >
            <Zoom>
              <button className='close-modal' onClick={this.closeModal}>
                {' '}
                X{' '}
              </button>
              <div className='product-details'>
                <img src={product.image} alt={product.title} />
                <div className='product-details-description'>
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>{product.description}</p>
                  <p>
                    Available sizes:
                    {product.availableSizes.map((size, index) => {
                      return (
                        <span key={index}>
                          {' '}
                          <button className='button'>{size}</button>
                        </span>
                      );
                    })}
                  </p>
                  <div className='product-price'>
                    <div>Price: {formatCurrency(product.price)}</div>
                    <button
                      className='button primary'
                      onClick={() => {
                        handleAddToCart(product);
                        this.closeModal();
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
