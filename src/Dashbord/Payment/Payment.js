import React from 'react';
import { useLoaderData } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51M6HkmECtowb85oakNDcxBhm3oZQOH0WrjDNuFMQogOAj3wzFhLQKK3MFLuNE6PPeXGbakaqnlNR6DoyKo0ptaAc0072Hk3h6q');

const Payment = () => {
    const cartItem = useLoaderData();

    return (
        <div className='lg:mt-0 md:mt-8 mt-12'>
            <h1 className='text-2xl font-bold mb-2'>Payment</h1>
            <hr className='mb-4'/>
            <div>
                <h1 className='text-2xl'>Make Payment for <span className='font-semibold text-primary'>{cartItem.model}</span></h1>
                <p className='text-xl'>Please pay ${cartItem.price} for this itsm.</p>
            </div>
            <div className='w-72 mt-5'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm cartItem={cartItem}/>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;