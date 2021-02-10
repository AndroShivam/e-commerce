import React, {useState} from 'react'
import Modal from 'react-modal'
import {IoCloseSharp} from 'react-icons/io5'
import './Product.css'

Modal.setAppElement('#root')

const Product = ({ product, onAddToCart  }) => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <div className = "container">
                <div className = "card" onClick={() => setIsModalOpen(true)}>
                    <img className = "product-img" src= {product.media.source} alt="image"/>
                    <div className="text-container">
                        <h4 className="product-name">{product.name}</h4>
                        <small className="product-price">{product.price.formatted_with_symbol}</small>
                    </div>
                </div>
            </div>

            <Modal 
            isOpen = {isModalOpen} 
            onRequestClose = {() => setIsModalOpen(false)} >
                <IoCloseSharp className = "close-btn" size={30} onClick = {() => setIsModalOpen(false)}/>

                <div className="product-container">
                    <div className="img-container">
                        <img className="product-detail-image" src={product.media.source} alt="product image"/>
                    </div>

                    <div className="info">
                        <div className="info-container">
                            <h1>{ product.name }</h1>
                            
                            <div className="btn-container">
                                <button className="add-to-cart-btn" onClick={() => onAddToCart(product.id, 1)}>
                                    Add to Cart
                                </button>

                                <button className="buy-now-btn">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Product
