import React from 'react';

const ShoppingCart = (props) => {
    const inCart = {};
    return (
      <>
        <ul id='shopping-dropdown'>
          <li className='cartTotal'>Total: ${Math.round(props.total * 100) / 100}</li>
          {props.shoppingCart.map((item, i) => {
            if(!inCart[item.name]) {
              inCart[item.name] = true;
              return (
                <li className='shoppingItem' id={`shoppingItem${i}`}>
                  <div className='shoppingItemName'>{item.name}</div>
                  <div className='shoppingItemPrice'>${Math.round(item.price * 100) / 100}</div>
                  <div className='shoppingItemQty'>x{item.qtyInCart}</div>
                  <div className='removeItem' onClick={() => props.handleRemove(i)}><i class="fas fa-minus-circle"></i></div>
                </li>
              )
            }
          })}
          <button className='checkout'>Checkout</button>
        </ul>
      </>
    )
}

export default ShoppingCart;