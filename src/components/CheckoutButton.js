import React, { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe("your-publishable-key");

const CheckoutButton = ({
  price,
  amount,
  details,
  name,
  user_id,
  hotel_id,
  checkInDate,
  checkInTime,
  checkOutDate,
  checkOutTime,
}) => {
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const data = {
    price,
    amount,
    name,
    user_id,
    hotel_id,
    details,
    checkInDate,
    checkInTime,
    checkOutDate,
    checkOutTime,
  };

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

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.error(error);
      toast.error("Payment failed. Please try again.");
    } else if (paymentIntent.status === "succeeded") {
      await axios.post("https://booksmart-backend-wvj6.onrender.com/api/stripe/confirm-payment", {
        paymentIntentId: paymentIntent.id,
      });
      toast.success("Payment successful! Redirecting to home page...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div>
      <ToastContainer />
      <button
        className="px-6 py-3 text-white bg-gray-900 rounded-md"
        onClick={handleCheckout}
      >
        Checkout
      </button>
      {clientSecret && (
        <div>
          <h2 className="text-lg font-medium mb-6">Payment Information</h2>
          <div className="py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': { color: '#aab7c4' },
                  },
                },
              }}
            />
          </div>
          <div className="mt-8 flex justify-end">
            <button
              onClick={handlePayment}
              className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg focus:outline-none"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutButton;
