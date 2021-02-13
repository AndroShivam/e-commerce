import React, {useState, useEffect} from 'react'
import {useForm, FormProvider} from 'react-hook-form'
import {Link} from 'react-router-dom'
import { commerce } from '../../lib/commerce'
import './AddressForm.css'

const AddressForm = ({ checkoutToken, next }) => {

    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisons, setShippingSubdivisons] = useState([]);
    const [shippingSubdivison, setShippingSubdivison] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const methods = useForm();
    
    const countries =  Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name}))
    const subdivisions =  Object.entries(shippingSubdivisons).map(([code, name]) => ({ id: code, label: name}))
    const options = shippingOptions.map((option) => ({id: option.id, label : `${option.description} - (${option.price.formatted_with_symbol})`}))
    
    const fetchShippingCountries = async (checkoutTokenID) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenID);
        setShippingCountries(countries) 
        setShippingCountry(Object.keys(countries)[0])
    }

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)
        setShippingSubdivisons(subdivisions)
        setShippingSubdivison(Object.keys(subdivisions)[0])
    }

    const fetchShippingOptions = async (checkoutTokenID, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenID, { country, region})
        setShippingOptions(options)
        setShippingOption(options[0].id)
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, []);

    useEffect(() => {
        if(shippingCountry) fetchSubdivisions(shippingCountry   )
    }, [shippingCountry])

    useEffect(() => {
        if(shippingSubdivison) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivison)
    }, [shippingSubdivison])

    return (
        <>
            <h1 className="address-form-title">Shipping Address</h1>
            <FormProvider {...methods}>
                <form autoComplete="off" onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, shippingSubdivison, setShippingOption}))}>
                    <label htmlFor="fname">First Name </label>
                    <input type="text" id="fname"/>
                    <br/>
                    <label htmlFor="lname">Last Name </label>
                    <input type="text" id="lname"/>
                    <br/>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address"/>
                    <br/>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email"/>
                    <br/>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city"/>
                    <br/>
                    <label htmlFor="zip">Zip / Postal Code</label>
                    <input type="number" id="zip"/>
                    <br/>

                    <label htmlFor="shippingcountry">Shipping Country</label>
                    <select name="shippingcountry" id="sc" value={shippingCountry} onChange={(e) => setShippingCountry(e.target.value)}>
                        {countries.map((country) => (
                            <option key={country.id} value={country.id}>{country.label}</option>
                        ))}
                    </select>
                    <br/>

                    <label htmlFor="shippingsubdivison">Shipping Subdivision</label>
                    <select name="shippingsubdivison" id="ss" value={shippingSubdivison} onChange={(e) => setShippingSubdivison(e.target.value)}>
                        {subdivisions.map((subdivision) => (
                            <option key={subdivision.id} value={subdivision.id}>{ subdivision.label }</option>
                        ))}
                    </select>
                    <br/>

                    <label htmlFor="shippingoption">Shipping Option</label>
                    <select name="shippingoption" id="so" value={shippingOption} onChange={(e) => setShippingOption(e.target.value)}>
                        {options.map((option) => (
                            <option key={option.id} value={option.id}>{ option.label }</option>
                        ))}
                    </select>

                    <br/>

                    <div className="address-form-btn-container">
                        <Link to = '/cart' ><button className="prev-btn">Prev</button></Link>
                        <button type='submit' className="next-btn">Next</button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
