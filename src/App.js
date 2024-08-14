import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./App.css";

import AboutUs from "./pages/AboutUs";
import Admin from "./pages/Admin";
import { AuthProvider } from "./components/AuthContext";
import Bookings from "./pages/Bookings";
import ContactForm from "./pages/ContactUs";
import Error from "./pages/Error";
import FilteredRooms from "./pages/FilteredRooms";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import React from "react";
import Rooms from "./pages/Rooms";
import Signup from "./pages/Signup";
import Single from "./pages/Single";
import UserProfile from "./pages/UserProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

const stripePromise = loadStripe("pk_test_51PitRyBBVxNNIqYk3tpwSS4ksz9EkB5WXheCm8tIhKct130BxjEzrxzI8K9i2D6BHYdWunfZNvQKYcCN7CIUos2y000vSA7nTg");

function App() {
  return (
    <Router>
      <AuthProvider>
        <Elements stripe={stripePromise}>
          <div className="App font-montserrat">
            <Navbar />
            <div className="content font-montserrat">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<ProtectedRoute element={UserProfile} />} />
                <Route path="/contactUs" element={<ProtectedRoute element={ContactForm} />} />
                <Route path="/aboutUs" element={<ProtectedRoute element={AboutUs} />} />
                <Route path="/admin" element={<ProtectedRoute element={Admin} adminOnly />} />
                <Route path="/rooms" element={<ProtectedRoute element={Rooms} />} />
                <Route path="/filtered" element={<ProtectedRoute element={FilteredRooms} />} />
                <Route path="/rooms/:id" element={<ProtectedRoute element={Single} />} />
                <Route path="/bookings" element={<ProtectedRoute element={Bookings} />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </div>
            <Footer />
            <ToastContainer />
          </div>
        </Elements>
      </AuthProvider>
    </Router>
  );
}

export default App;
