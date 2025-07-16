import React, {  } from 'react';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useLocation } from 'react-router';
import CheckoutForm from '../../../Component/PaymentForm/CheckoutForm ';
const stripePromise = loadStripe('pk_test_51ReGE0CYRcVB0FFZFPuWKJpjvBpEW3S8qex9qNKs50qk9eoVa2y9n6LEI3bKbgn7TnJo6ZQ03dsqpEIcGlXhjV0w00Vb62rS6G')
const PaymentPage = () => {
     const { booking } = useLocation().state;
   
   
    return (
        <div>
           <Elements stripe={stripePromise}>
              <CheckoutForm booking={booking}/>
            </Elements>  
        </div>
    );
};

export default PaymentPage;