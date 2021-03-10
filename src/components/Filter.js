import React, { Component } from 'react';

export default class Filter extends Component {
  render() {
    const { count, size, sort, filterProducts, sortProducts } = this.props;
    return (
      <div className='filter'>
        <div className='filter-result'>{count} Products</div>
        <div className='filter-sort'>
          Order{' '}
          <select
            name=''
            id=''
            onChange={(e) => {
              sortProducts(e.target.value);
            }}
          >
            <option value=''>Latest</option>
            <option value='lowest'>Lowest</option>
            <option value='highest'>Highest</option>
          </select>
        </div>
        <div className='filter-size'>
          Filter{' '}
          <select
            name=''
            id=''
            onChange={(e) => {
              filterProducts(e.target.value);
            }}
          >
            <option value=''>ALL</option>
            <option value='XS'>XS</option>
            <option value='S'>S</option>
            <option value='M'>M</option>
            <option value='L'>L</option>
            <option value='XL'>XL</option>
            <option value='XXL'>XXL</option>
          </select>
        </div>
      </div>
    );
  }
}
