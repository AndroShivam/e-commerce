import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import './Navbar.css'

const Navbar = ({ totalItems}) => {

    const location = useLocation()
    return (
        <div className="navbar">
            <div className="navbar-container">
                <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
                    <h1 className="nav-logo">E-Commerce Store</h1>
                </Link>
                {location.pathname == '/' && (
                    <Link to='/cart' style={{ color: 'black'}}>
                        <AiOutlineShoppingCart className = "cart-icon" size={30} />
                            {totalItems !== 0 && <span className = "badge" >{totalItems}</span>}
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Navbar
