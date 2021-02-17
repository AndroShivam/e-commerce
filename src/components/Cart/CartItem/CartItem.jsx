import React from 'react'
import './CartItem.css'

const CartItem = ({ item, onUpdateCartQuantity, onRemoveFromCart }) => {

    return (
        <>
            <div className="item">
                <div className="item-container">
                    <img className="cart-item-img" src={item.media.source} alt="product image"/>
                    <div className="item-info">
                        <p>{ item.name }</p>
                        <div className="item-info-container">
                            <div className="item-quantity">
                                <button className="btn-minus" onClick = {() => onUpdateCartQuantity(item.id, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button className="btn-plus" onClick = {() => onUpdateCartQuantity(item.id, item.quantity + 1)}>+</button>
                            </div>
                            <p className="item-info-price">{  item.line_total.formatted_with_symbol }</p>
                        </div>
                    </div>
                    <button className="item-remove-btn" onClick={() => onRemoveFromCart(item.id)}>Remove</button>
                </div>
                <hr/>
            </div>
        </>
    )
}

export default CartItem
