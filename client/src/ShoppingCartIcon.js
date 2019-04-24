import React from 'react';

const ShoppingCartIcon = (props) => {
    return (
      <div id='shopping-cart'>
        <div className='shopping-container' onClick={props.handleClick}>
          <div className='fas fa-shopping-cart fa-3x'></div>
        </div>
      </div>
    )
}

export default ShoppingCartIcon;