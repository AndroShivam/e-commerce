import React, {useState, useEffect} from 'react'
import PaymentForm from '../PaymentForm'
import AddressForm from '../AddressForm'
import {commerce} from '../../../lib/commerce'
import './Checkout.css'

const steps = ['Shipping address', 'Payment details']

const Checkout = ({ cart, order, onCaptureCheckout, errMessage }) => {

    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState([]);

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                setCheckoutToken(token)
            } catch (error) {
                console.log(error)
            }
        }
        generateToken();
    }, [cart])

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const prevStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    const Confirmation = () => {
        return(<div>Confirmation</div>)
    }

    const Form = () => activeStep === 0 
    ? <AddressForm checkoutToken={checkoutToken} next={next}/>
    : <PaymentForm checkoutToken={checkoutToken} shippingData = {shippingData} prevStep ={prevStep} nextStep={nextStep} onCaptureCheckout={onCaptureCheckout}/>

    return (
        <div className = "checkout-card">
            <div className = "checkout-card-container">
                {activeStep === steps.length ? <Confirmation /> : checkoutToken &&  <Form/>}   
            </div>
        </div>
    )
}

export default Checkout