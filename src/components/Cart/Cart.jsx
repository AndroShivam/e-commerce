import React from 'react'
import './Cart.css'


const Cart = ({ cart }) => {

    if(!cart.line_items){
        return <div className="loading-txt"><h1>Loading...</h1></div>
    }

    const EmptyCart = () => {
        return <h1>Your Cart is Empty, try adding something</h1>
    }

    const FilledCart = () => {
      return (
        <>
            <div className="card">
                {cart.line_items.map((item) => (
                    <div>{ item.name }</div>
                ))}
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
