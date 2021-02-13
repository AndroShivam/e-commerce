import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {commerce} from './lib/commerce'
import {Products, Navbar, Cart, Checkout} from './components'
import './App.css'

const App = () => {

    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
    const [order, setOrder] = useState({})
    const [errMessage, setErrMessage] = useState("");

    const fetchProducts = async () => {
        const {data} = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async () => {
        const cart = await commerce.cart.retrieve()
        setCart(cart)
    }

    const handleAddToCart = async (productID, quantity) => {
        const { cart } = await commerce.cart.add(productID, quantity);
        setCart(cart)
    }

    const handleUpdateCartQuantity = async (productID, quantity) => {
        const { cart } = await commerce.cart.update(productID, {quantity})
        setCart(cart)
    }

    const handleRemoveFromCart = async (productID) => {
        const {cart} = await commerce.cart.remove(productID)
        setCart(cart)
    }

    const handleEmptyCart = async () => {
        const {cart} = await commerce.cart.empty()
        setCart(cart)
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
        setCart(newCart)
    }

    const handleCaptureCheckout = async (checkoutTokenID, newOrder) => {
        try{
            const incomingOrder = await commerce.checkout.capture(checkoutTokenID, newOrder)
            setOrder(incomingOrder);
            refreshCart();
        }catch(error){
            setErrMessage(error.data.error.message)
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, [])


    return (
        <Router>
            <div>
                <Navbar totalItems = {cart.total_items}/>
                <Switch>
                    <Route exact path='/'> 
                        <Products products={products} onAddToCart = {handleAddToCart}/>
                    </Route>
                    <Route exact path='/cart'>
                        <Cart 
                        cart = {cart}
                        handleUpdateCartQuantity = {handleUpdateCartQuantity}
                        handleRemoveFromCart = {handleRemoveFromCart}
                        handleEmptyCart = {handleEmptyCart} />
                    </Route>
                    <Route exact path='/checkout'>
                        <Checkout 
                        cart={cart}
                        order={order}
                        onCaptureCheckout={handleCaptureCheckout}
                        error={errMessage}
                        />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
