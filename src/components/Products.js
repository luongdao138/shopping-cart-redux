import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import { fetchProducts, updateAddCartStatus } from './actions/productActions';
import { connect } from 'react-redux';
import { addToCart } from './actions/cartActions';
// import App from '../App';

class Products extends Component {
  constructor(props) {
    super(props);
    // Modal.setAppElement(null);
    this.state = {
      product: null,
    };
  }

  componentDidMount() {
    this.props.fetchProducts();
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
    const { products, addToCart, cartItems, updateAddCartStatus } = this.props;
    return (
      <div>
        <Fade bottom cascade>
          {!products ? (
            <div>Loading...</div>
          ) : (
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
                            addToCart(cartItems, product);
                            // updateAddCartStatus(products, product);
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
          )}
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
                        addToCart(cartItems, product);
                        // updateAddCartStatus(products, product);
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

export default connect(
  (state) => {
    return {
      products: state.products.filteredItems,
      cartItems: state.carts.cartItems,
    };
  },
  { fetchProducts, addToCart, updateAddCartStatus }
)(Products);
