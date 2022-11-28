import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Spinner from "../../Components/Spinner/Spinner";

const CheckoutForm = ({cartItem}) => {
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const {price, user, email, id, _id} = cartItem;

  useEffect(() => {
    
    fetch("https://sell-zone-server.vercel.app/create-payment-intent", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ price })
      })
        .then((res) => res.json())
        .then((data) => {
            setClientSecret(data.clientSecret);
        });
  },[price])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
        console.log('[error]', error);
        setCardError(error.message);
    }

    setSuccess('');
    setIsLoading(true);
    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientSecret,
        {
            payment_method: {
                card: card,
                billing_details: {
                    name: user,
                    email: email
                },
            },
        },
    );

    if(confirmError){
        setCardError(confirmError.message);
        return;
    }
    if(paymentIntent.status === 'succeeded'){
        setSuccess('Congrats! Your payment success');
        
        const payment = {
            price,
            transactionId: user,
            userEmail: email,
            productId: id,
            cartId: _id
        };
        fetch("https://sell-zone-server.vercel.app/cart/payments",{
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify(payment)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setIsLoading(false);
            console.log('[paymentIntent]', paymentIntent);
        })
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="border-2 border-primary rounded-md p-2">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <p className="mt-1 mb-1 text-red-500">
        {cardError}
      </p>
      <p className="mt-1 mb-1 text-green-500">
        {success}
      </p>
      <button
        type="submit"
        className="btn btn-sm rounded-md btn-primary mt-2"
        disabled={!stripe || !clientSecret}
      >
        {
            isLoading ? <Spinner/> : 'Pay'
        }
      </button>
    </form>
  );
};

export default CheckoutForm;
