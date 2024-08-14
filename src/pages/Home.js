import "./Home.css";

import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";

import { ReactComponent as GuestIcon } from "../images/profile.svg";
import RoomCard from "../components/RoomCard";
import axios from "axios";
import destinationImage1 from "../images/destination1.jpg";
import destinationImage2 from "../images/destination2.jpg";
import destinationImage3 from "../images/destination3.jpg";
import headerImage from "../images/header.jpeg";
import { useAuth } from "../components/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [reviews, setReviews] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/hotels/get`);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reviews`);
        setReviews(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(reviews);
  const { admin } = useAuth();
  if (admin) {
    navigate("/admin");
    return null;
  }
  return (
    <div className="homepage">
      <div className="landing">
        <img src={headerImage} alt="Header" className="header-image" />
        <div className="header-text">
          <h1>Discover the Best Hotels for Your Next Getaway</h1>
          <p>
            Explore our curated selection of top-rated hotels and resorts to
            find the perfect accommodation for your upcoming trip.
          </p>
          <div className="header-buttons">
            <Link to={"/rooms"} className="btn btn-secondary">
              Explore Rooms
            </Link>
          </div>
        </div>
      </div>

      <section className="featured-hotels">
        <h2>Featured Hotels</h2>
        {data && (
          <div className="md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center grid grid-cols-1 gap-4">
            {data.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        )}
      </section>

      <section className="popular-destinations">
        <h2>Popular Destinations</h2>
        <div className="destination-list">
          <div className="destination">
            <img
              src={destinationImage1}
              alt="Paris, France"
              className="destination-image"
            />
            <h3>Paris, France</h3>
            <p>
              The City of Light, a timeless destination known for its art,
              fashion, and culture.
            </p>
          </div>
          <div className="destination">
            <img
              src={destinationImage2}
              alt="Bali, Indonesia"
              className="destination-image"
            />
            <h3>Bali, Indonesia</h3>
            <p>
              A tropical paradise with stunning beaches, vibrant culture, and
              serene landscapes.
            </p>
          </div>
          <div className="destination">
            <img
              src={destinationImage3}
              alt="New York City, USA"
              className="destination-image"
            />
            <h3>New York City, USA</h3>
            <p>
              The city that never sleeps, offering endless attractions, dining,
              and entertainment.
            </p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Guests Say</h2>
        <div className="lg:grid-cols-2 grid grid-cols-1">
          {reviews &&
            reviews.map((review) => (
              <div className=" flex" key={review._id}>
                <GuestIcon />
                <div className="testimonial-text">
                  <h4 className="flex items-center gap-2">
                    {review.user_id.name}
                    <Rating
                      name="simple-controlled"
                      value={review.rating}
                      readOnly
                    />
                    ({review.rating})
                  </h4>
                  <p>{review.comment}</p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
