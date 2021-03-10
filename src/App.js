import React from 'react';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import data from './data.json';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: '',
      sort: '',
      cartItems: [],
    };
  }

  removeFromCart = (item) => {
    const { id } = item;
    this.setState((state) => {
      let newCarItems = state.cartItems.filter((cartItem) => {
        return cartItem.id !== id;
      });
      this.setState({ ...state, cartItems: newCarItems });
    });
  };

  handleAddToCart = (product) => {
    const { id } = product;
    this.setState((state) => {
      const { cartItems } = state;
      let alreadyInCart = false;
      let newCartItems = cartItems.map((cartItem) => {
        if (cartItem.id === id) {
          alreadyInCart = true;
          const { count } = cartItem;
          return { ...cartItem, count: count + 1 };
        } else {
          return cartItem;
        }
      });
      if (!alreadyInCart) {
        newCartItems.push({ ...product, count: 1 });
      }

      return { ...state, cartItems: newCartItems };
    });
  };

  filterProducts = (size) => {
    this.setState((state) => {
      const { sort } = this.state;
      const newProducts =
        size === ''
          ? data.products.slice().sort((a, b) => {
              switch (sort) {
                case 'lowest':
                  return a.price - b.price;
                case 'highest':
                  return b.price - a.price;

                default:
                  return b.id - a.id;
              }
            })
          : data.products
              .filter((product) => product.availableSizes.indexOf(size) >= 0)
              .slice()
              .sort((a, b) => {
                switch (sort) {
                  case 'lowest':
                    return a.price - b.price;
                  case 'highest':
                    return b.price - a.price;

                  default:
                    return b.id - a.id;
                }
              });
      return { ...state, size, products: newProducts };
    });
  };

  sortProducts = (sort) => {
    this.setState((state) => {
      const newProducts = state.products.slice().sort((a, b) => {
        switch (sort) {
          case 'lowest':
            return a.price - b.price;
          case 'highest':
            return b.price - a.price;

          default:
            return b.id - a.id;
        }
      });
      return { ...state, sort, products: newProducts };
    });
  };

  render() {
    const { products, size, sort } = this.state;
    return (
      <div className='grid-container'>
        <header>
          <a href='/'>React Shopping cart</a>
        </header>
        <main>
          <div className='content'>
            <div className='main'>
              <Filter
                count={products.length}
                {...this.state}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products
                products={products}
                handleAddToCart={this.handleAddToCart}
              />
            </div>
            <div className='sidebar'>
              <Cart {...this.state} removeFromCart={this.removeFromCart} />
            </div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    );
  }
}

export default App;
