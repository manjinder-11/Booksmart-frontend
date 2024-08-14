import React, { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("your-publishable-key");

const CheckoutButton = ({
  price,
  amount,
  details,
  name,
  user_id,
  hotel_id,
}) => {
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const data = { price, amount, name, user_id, hotel_id, details };

  const handleCheckout = async () => {
    if (!price || !amount || !name || !user_id || !hotel_id) return;
    const res = await axios.post(
      "https://booksmart-backend-wvj6.onrender.com/api/stripe/create-payment-intent",
      data
    );
    setClientSecret(res.data.clientSecret);
  };

  const handlePayment = async () => {
    if (!stripe || !elements || !clientSecret) return;

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    if (error) {
      console.error(error);
    } else if (paymentIntent.status === "succeeded") {
      await axios.post("https://booksmart-backend-wvj6.onrender.com/api/stripe/confirm-payment", {
        paymentIntentId: paymentIntent.id,
      });
      console.log("Payment successful and booking updated!");
    }
  };

  return (
    <div>
      <button
        className="px-6 py-3 text-white bg-gray-900 rounded-md"
        onClick={handleCheckout}
      >
        Checkout
      </button>
      {clientSecret && (
        <div>
          <CardElement />
          <button
            className="px-6 py-3 text-white bg-green-500 rounded-md"
            onClick={handlePayment}
          >
            Confirm Payment
          </button>
        </div>
      )}
    </div>
  );
};


export default CheckoutButton;
