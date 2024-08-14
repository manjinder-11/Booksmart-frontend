import "./Admin.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import {
  faBook,
  faCog,
  faHotel,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FreeWifiIcon from "../icons/wifi.png";
import GymIcon from "../icons/gym.png";
import ParkingIcon from "../icons/parking.png";
import PoolIcon from "../icons/pool.png";

function Admin() {
  const [hotels, setHotels] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [activeLink, setActiveLink] = useState("Hotels");
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);

  const backend = "http://localhost:5000/";
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    phoneNumber: "",
    emailAddress: "",
    minPricePerNight: "",
    maxPricePerNight: "",
    roomTypes: [],
    amenities: [],
    numberOfRoomsAvailable: "",
    bookingCalendar: "",
    images: [],
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchHotels();
    fetchUsers();
    fetchBookings();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/hotels/get");
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${backend}api/users/get`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${backend}api/bookings/get`);
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
    setEditMode(false);
    setFormData({
      name: "",
      description: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      phoneNumber: "",
      emailAddress: "",
      minPricePerNight: "",
      maxPricePerNight: "",
      roomTypes: [],
      amenities: [],
      numberOfRoomsAvailable: "",
      bookingCalendar: "",
      images: [],
    });
  };

  const handleNavClick = (link) => setActiveLink(link);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    const updatedList = formData[name].includes(value)
      ? formData[name].filter((item) => item !== value)
      : [...formData[name], value];
    setFormData({ ...formData, [name]: updatedList });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editMode
      ? `${backend}api/hotels/update/${editId}`
      : `${backend}api/hotels/add`;
    const method = editMode ? "PUT" : "POST";

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item) => formDataToSend.append(key, item));
      } else if (key === "images") {
        Array.from(formData.images).forEach((image) =>
          formDataToSend.append("images", image)
        );
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      await fetch(url, {
        method,
        body: formDataToSend,
      });
      fetchHotels();
      handleShowForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (hotel) => {
    setFormData({
      name: hotel.name,
      description: hotel.description,
      address: hotel.location.address,
      city: hotel.location.city,
      state: hotel.location.state,
      country: hotel.location.country,
      zipCode: hotel.location.zipCode,
      phoneNumber: hotel.contactInfo.phoneNumber,
      emailAddress: hotel.contactInfo.emailAddress,
      minPricePerNight: hotel.pricing.minPricePerNight,
      maxPricePerNight: hotel.pricing.maxPricePerNight,
      roomTypes: hotel.roomTypes,
      amenities: hotel.amenities,
      numberOfRoomsAvailable: hotel.availability.numberOfRoomsAvailable,
      bookingCalendar: hotel.availability.bookingCalendar,
      images: [], // Note: Images won't be pre-filled for now
    });
    setEditMode(true);
    setEditId(hotel._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${backend}api/hotels/delete/${id}`, {
        method: "DELETE",
      });
      fetchHotels();
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  const HotelAmenities = ({ formData }) => {
    return (
      <>
        <p>Amenities:</p>
        <div className="amenities-card amenities">
          {formData.amenities.includes("Free Wi-Fi") && (
            <div className="amenity">
              <img
                src={FreeWifiIcon}
                width="24px"
                height="24px"
                alt="Free Wi-Fi"
              />
            </div>
          )}
          {formData.amenities.includes("Pool") && (
            <div className="amenity">
              <img src={PoolIcon} width="24px" height="24px" alt="Pool" />
            </div>
          )}
          {formData.amenities.includes("Gym") && (
            <div className="amenity">
              <img src={GymIcon} width="24px" height="24px" alt="Gym" />
            </div>
          )}
          {formData.amenities.includes("Parking") && (
            <div className="amenity">
              <img src={ParkingIcon} width="24px" height="24px" alt="Parking" />
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div id="wrapper">
      {/* Top Navbar */}
      <Navbar bg="light" expand="lg" className="border-bottom">
        <Navbar.Brand href="#"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              className={`${
                activeLink === "Hotels" ? "active" : ""
              }`}
              onClick={() => handleNavClick("Hotels")}
            >
              <FontAwesomeIcon icon={faHotel} className="mr-2" /> Hotels
            </Nav.Link>
            <Nav.Link
              className={`${
                activeLink === "Bookings" ? "active" : ""
              }`}
              onClick={() => handleNavClick("Bookings")}
            >
              <FontAwesomeIcon icon={faBook} className="mr-2" /> Bookings
            </Nav.Link>
            <Nav.Link
              className={`${
                activeLink === "Users" ? "active" : ""
              }`}
              onClick={() => handleNavClick("Users")}
            >
              <FontAwesomeIcon icon={faUsers} className="mr-2" /> Users
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Page Content */}
      <Container fluid>
        {activeLink === "Hotels" && (
          <>
            <div className="container-admin">
              <h1>Hotels</h1>
              <button className="admin-add" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Hide Form" : "Add Hotel"}
              </button>
            </div>
            {showForm && (
              <div id="add-hotel-form">
                <h2>{editMode ? "Edit Hotel" : "Add Hotel"}</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Hotel Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter hotel name"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter description"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter address"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Enter state"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="Enter country"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="Enter zip code"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleInputChange}
                      placeholder="Enter email address"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Minimum Price Per Night</Form.Label>
                    <Form.Control
                      type="number"
                      name="minPricePerNight"
                      value={formData.minPricePerNight}
                      onChange={handleInputChange}
                      placeholder="Enter minimum price per night"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Maximum Price Per Night</Form.Label>
                    <Form.Control
                      type="number"
                      name="maxPricePerNight"
                      value={formData.maxPricePerNight}
                      onChange={handleInputChange}
                      placeholder="Enter maximum price per night"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Room Types</Form.Label>
                    <div>
                      <Form.Check
                        type="checkbox"
                        label="Standard"
                        value="Standard"
                        checked={formData.roomTypes.includes("Standard")}
                        onChange={handleCheckboxChange}
                        name="roomTypes"
                      />
                      <Form.Check
                        type="checkbox"
                        label="Deluxe"
                        value="Deluxe"
                        checked={formData.roomTypes.includes("Deluxe")}
                        onChange={handleCheckboxChange}
                        name="roomTypes"
                      />
                      <Form.Check
                        type="checkbox"
                        label="Suite"
                        value="Suite"
                        checked={formData.roomTypes.includes("Suite")}
                        onChange={handleCheckboxChange}
                        name="roomTypes"
                      />
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Amenities</Form.Label>
                    <div>
                      <Form.Check
                        type="checkbox"
                        label="Free Wi-Fi"
                        value="Free Wi-Fi"
                        checked={formData.amenities.includes("Free Wi-Fi")}
                        onChange={handleCheckboxChange}
                        name="amenities"
                      />
                      <Form.Check
                        type="checkbox"
                        label="Pool"
                        value="Pool"
                        checked={formData.amenities.includes("Pool")}
                        onChange={handleCheckboxChange}
                        name="amenities"
                      />
                      <Form.Check
                        type="checkbox"
                        label="Gym"
                        value="Gym"
                        checked={formData.amenities.includes("Gym")}
                        onChange={handleCheckboxChange}
                        name="amenities"
                      />
                      <Form.Check
                        type="checkbox"
                        label="Parking"
                        value="Parking"
                        checked={formData.amenities.includes("Parking")}
                        onChange={handleCheckboxChange}
                        name="amenities"
                      />
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Number of Rooms Available</Form.Label>
                    <Form.Control
                      type="number"
                      name="numberOfRoomsAvailable"
                      value={formData.numberOfRoomsAvailable}
                      onChange={handleInputChange}
                      placeholder="Enter number of rooms available"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Booking Calendar</Form.Label>
                    <Form.Control
                      type="text"
                      name="bookingCalendar"
                      value={formData.bookingCalendar}
                      onChange={handleInputChange}
                      placeholder="Enter booking calendar URL"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Upload Hotel Images</Form.Label>
                    <Form.Control
                      type="file"
                      multiple
                      onChange={handleFileChange}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    {editMode ? "Update" : "Submit"}
                  </Button>
                </Form>
              </div>
            )}
            <div id="hotel-list">
              {hotels.map((hotel) => (
                <div className="card hotel mb-3" key={hotel._id}>
                  <div className="card-body">
                    <div className="hotel-info">
                      <h5 className="card-title">{hotel.name}</h5>
                      <p className="card-text">{hotel.description}</p>
                      <div className="location-room">
                        <div className="location-price">
                          <p className="card-text">
                            <p>Location: </p>{" "}
                            <small>
                              {hotel.location.address}, {hotel.location.city}
                            </small>
                            <p>
                              {" "} {hotel.location.state}, {hotel.location.country}
                            </p>
                          </p>
                          <p className="card-text">
                            <p>Pricing: </p>
                            <small>
                              ${hotel.pricing.minPricePerNight} - $
                              {hotel.pricing.maxPricePerNight} per night
                            </small>
                          </p>
                        </div>
                        <div className="room-available">
                          <p className="card-text room-types">
                            <p>Room Types: </p>
                            <small>{hotel.roomTypes.join(", ")}</small>
                          </p>
                          <p className="card-text">
                            <p> Availability: </p>
                            <small>
                              {hotel.availability.numberOfRoomsAvailable} rooms
                              available
                            </small>
                          </p>
                        </div>
                      </div>
                      <HotelAmenities formData={hotel} />
                      <button
                        className="btn btn-dark mr-2"
                        onClick={() => handleEdit(hotel)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(hotel._id)}
                      >
                        Delete
                      </button>
                    </div>
                    <div className="card-hotel-image" >
                      {hotel.images.map((image, index) => (
                        <img
                          key={index}
                          src={image.imageBase64}
                          alt={image.filename}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {activeLink === "Users" && (
          <div id="user-list">
            <h1>Users</h1>
            <ul className="list-group">
              {users.map((user) => (
                <li className="list-group-item" key={user._id}>
                  <p>Name: {user.name}</p>
                  <p>Email: {user.email}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeLink === "Bookings" && (
          <div id="booking-list">
            <h1>Bookings</h1>
            <ul className="list-group">
              {bookings.map((booking) => (
                <li className="list-group-item" key={booking._id}>
                  <p>User: {booking.user_id.name} (Email: {booking.user_id.email})</p>
                  <p>Hotel: {booking.hotel_id.name}</p>
                  <p>Check-In Date: {new Date(booking.checkInDate).toLocaleDateString()}</p>
                  <p>Check-Out Date: {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                  <p>Amount: ${booking.amount}</p>
                  <p>Total Price: ${booking.totalPrice}</p>
                  <p>Details: {booking.details}</p>
                  <p>Payment Status: {booking.payment_status}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Admin;
