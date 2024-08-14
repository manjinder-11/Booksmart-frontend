import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ContactUs.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail();
  };

  const sendEmail = () => {
    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message
    };

    emailjs.send('service_k5b89v7', 'template_2s7s8ij', templateParams, 'y2eZYh-eeAlq_YbYx')
      .then((response) => {
        toast.success('Email sent successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      }, (error) => {
        toast.error('Failed to send email. Please try again later.');
      });
  };

  return (
    <div className="contact-form-container">
      <ToastContainer />
      <div className="contact-form">
        <h2>Get in Touch</h2>
        <p>Fill out the form below and our team will get back to you as soon as possible.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="contact-form-image">
        <img src="./contact.jpeg" alt="Contact" />
      </div>
    </div>
  );
};

export default ContactForm;
