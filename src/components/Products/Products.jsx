import React from 'react'
import Product from './Product/Product'
import './Products.css'

const Products = ({products, onAddToCart}) => {
    return (
        <div className="main-container">
            {products.map((product) => (
                <Product  key = {product.id} product= {product} onAddToCart = {onAddToCart}/>
            ))}
        </div>
    )
}

export default Products
