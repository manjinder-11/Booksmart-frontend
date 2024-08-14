import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReviewForm = ({ user_id, hotel_id }) => {
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (comment === "") {
      toast.error("Please enter a comment");
      return;
    }
    try {
      await axios.post("https://booksmart-backend-wvj6.onrender.com/api/reviews", {
        user_id,
        hotel_id,
        rating: value,
        comment,
      });
      toast.success("Review submitted successfully!");
      setValue(0);
      setComment("");
    } catch (error) {
      toast.error("Failed to submit review. Please try again later.");
    }
  };

  return (
    <>
      <ToastContainer />
      <form className="flex flex-col items-start gap-2" onSubmit={handleSubmit}>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="lg:w-1/2 w-full p-2 border border-gray-300 rounded-md resize-y"
        ></textarea>
        <button className="px-4 py-2 text-white bg-blue-500 rounded-md">
          Submit
        </button>
      </form>
    </>
  );
};

export default ReviewForm;
