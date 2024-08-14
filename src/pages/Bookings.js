import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../components/AuthContext";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Bookings = () => {
  const [data, setData] = useState();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/profile/${user._id}`
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user]);

  const sendEmail = (booking) => {
    const templateParams = {
      user_name: user.name,
      hotel_name: booking.hotel_id.name,
      price: booking.price,
      amount: booking.amount,
      total_price: booking.totalPrice,
      payment_status: booking.payment_status,
      check_in_date: new Date(booking.checkInDate).toLocaleDateString(),
      check_out_date: new Date(booking.checkOutDate).toLocaleDateString(),
      to_email: user.email,
    };

    emailjs.send('service_k5b89v7', 'template_pr8nmyj', templateParams, 'y2eZYh-eeAlq_YbYx')
      .then((response) => {
        toast.success('Invoice sent successfully!');
      }, (error) => {
        toast.error('Failed to send invoice. Please try again later.');
      });
  };

  return (
    <div className="md:px-16 lg:px-32 px-8 py-8">
      <ToastContainer />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="w-1/7 py-2 px-4 bg-gray-200">Hotel Name</th>
              <th className="w-1/7 py-2 px-4 bg-gray-200">Price</th>
              <th className="w-1/7 py-2 px-4 bg-gray-200">Amount</th>
              <th className="w-1/7 py-2 px-4 bg-gray-200">Total Price</th>
              <th className="w-1/7 py-2 px-4 bg-gray-200">Payment Status</th>
              <th className="w-1/7 py-2 px-4 bg-gray-200">Invoice</th>
              <th className="w-1/7 py-2 px-4 bg-gray-200">Details</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.bookings.map((booking) => (
                <tr key={booking._id} className="w-full border-t">
                  <td className="w-1/7 py-2 px-4 break-words">{booking.hotel_id.name}</td>
                  <td className="w-1/7 py-2 px-4 break-words">{booking.price}</td>
                  <td className="w-1/7 py-2 px-4 break-words">{booking.amount}</td>
                  <td className="w-1/7 py-2 px-4 break-words">{booking.totalPrice}</td>
                  <td className="w-1/7 py-2 px-4 break-words">{booking.payment_status}</td>
                  <td className="w-1/7 py-2 px-4 break-words">
                    {booking.invoice ? (
                      <button
                        onClick={() => sendEmail(booking)}
                        className="underline cursor-pointer text-blue-600 hover:text-blue-800"
                      >
                        Send Invoice
                      </button>
                    ) : (
                      "No Invoice"
                    )}
                  </td>
                  <td className="w-1/7 py-2 px-4">{booking.details || "No Details"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
