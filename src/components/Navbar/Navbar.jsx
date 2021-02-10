import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import './Navbar.css'

const Navbar = ({ totalItems}) => {
    return (
        <div className="navbar">
            <div className="navbar-container">
                <h1 className="nav-logo">E-Commerce Store</h1>
                <AiOutlineShoppingCart className = "cart-icon" size={30} />
                    <span className = "badge" >{totalItems ? totalItems : null}</span>
            </div>
        </div>
    )
}

export default Navbar
