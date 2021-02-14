import React from 'react'
import { Link } from 'react-router-dom'
import CartItem from './CartItem/CartItem'
import './Cart.css'


const Cart = ({ cart, handleUpdateCartQuantity, handleRemoveFromCart, handleEmptyCart }) => {

    if(!cart.line_items){
        return <div className="loading-txt-container">
            <h1 className="loading-txt">Loading....</h1>
        </div>
    }
 
    const EmptyCart = () => {
        return (
            <div className="empty-cart-container">
                <h1 className="empty-cart-txt">Your Cart is Empty</h1>
                <Link className = "empty-cart-link" to='/'><button className="empty-cart-btn">Add Something</button></Link>
            </div>
        )
    }

    const FilledCart = () => {
      return (
        <>
            <div className="cart-item-container">
                {cart.line_items.map((item) => (
                    <CartItem key = {item.id} item={item} onUpdateCartQuantity = {handleUpdateCartQuantity} onRemoveFromCart = {handleRemoveFromCart} />
                ))}
            </div>

            <div className="cart-info">
                <h2 className="cart-subtotal">Subtotal : {cart.subtotal.formatted_with_symbol}</h2>
                <div className="cart-info-btn">
                    <button className="empty-cart" onClick={handleEmptyCart}>Empty Cart</button>
                    <Link to='/checkout'><button className="checkout-cart">Checkout</button></Link>
                </div>
            </div>
        </>
      )
    }

    
    return (
        <div className = "cart">
            <div className="cart-container">
                {!cart.line_items.length ? <EmptyCart/> : <FilledCart/>}
            </div>
        </div>
    )
}

export default Cart
