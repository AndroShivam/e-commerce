import React from 'react'
import './Review.css'

const Review = ({checkoutToken}) => {
    return (
            <>
                <div className="review">
                    <div className="review-container">
                        {checkoutToken.live.line_items.map((product) => (
                            <div key = {product.name} className="review-items">
                                <div className="review-items-container">
                                    <p>{product.name}</p>
                                    <small>Quantity : {product.quantity}</small>
                                    c
                                </div>

                                <div className="review-item-price">{product.line_total.formatted_with_symbol}</div>
                            </div>
                        ))}

                        <h3 className="review-item-subtotal">
                            Subtotal: <br/>{checkoutToken.live.subtotal.formatted_with_symbol}
                        </h3>
                    </div>
                </div>
            </>
    )
}

export default Review