import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import './UserProfile.css';

const UserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    country: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  useEffect(() => {
    const fetchProfile = async () => {
      if (user && user.email) {
        try {
          const response = await fetch(`https://booksmart-backend-wvj6.onrender.com/api/profile?email=${user.email}`);
          const data = await response.json();
          setProfile(data);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('https://booksmart-backend-wvj6.onrender.com/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setMessageType('success');
        setMessage('Profile updated successfully');
      } else {
        setMessageType('error');
        setMessage('Failed to update profile');
      }
    } catch (error) {
      setMessageType('error');
      setMessage('Error saving profile');
    }

    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="user-profile">
      <div className="side-navbar">
        <ul>
          <li><a href="/profile">Profile</a></li>
          {/* <li><a href="/settings">Settings</a></li> */}
        </ul>
      </div>
      <div className="profile-content">
        <h2>Personal Account</h2>
        {message && <div className={`message ${messageType}`}>{message}</div>}
        <div className="profile-form">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstName" value={profile.firstName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" value={profile.lastName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={profile.email} onChange={handleChange} disabled />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" value={profile.address} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input type="text" name="country" value={profile.country} onChange={handleChange} />
          </div>
          <button className="save-btn" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
