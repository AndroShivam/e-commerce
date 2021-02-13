import React from 'react'
import { Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from './Review'
import './PaymentForm.css'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const PaymentForm = ({ checkoutToken, shippingData, prevStep, nextStep, onCaptureCheckout}) => {

    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();

        if(!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const {error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElement});

        if(error){
            console.log(error)
        }else{
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: {
                    firstname: shippingData.firstName,
                    lastname: shippingData.lastName,
                    email: shippingData.email
                },
                shipping: {
                    name: 'Primary',
                    street: shippingData.address,
                    city : shippingData.city,
                    state: shippingData.shippingsubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry
                },
                fulfillment: {
                    shipping_method: shippingData.shippingOption
                },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id
                    }
                }
            }

            onCaptureCheckout(checkoutToken.id, orderData)

            nextStep();

        }
    }

    return (
        <div className="payment">
            <h1 className = "payment-form-title">Order Summary</h1>
            <Review checkoutToken = {checkoutToken}/>

            <hr className="payment-hr"/>

           <div className="stripe">
                <Elements stripe = {stripePromise}>
                    <ElementsConsumer>
                        {({ elements, stripe}) => (
                            <form className = "payment-form" onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                                <CardElement />
                                <br/> <br/>
                                <div className="payment-btn-container">
                                    <button className="payment-back-btn" onClick={prevStep}>Back</button>
                                    <button type="submit" className="payment-pay-btn" disabled={stripe}>
                                        Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                                    </button>
                                </div>
                            </form>
                        )}
                    </ElementsConsumer>
                </Elements>
            </div> 
        </div>
    )
}

export default PaymentForm
