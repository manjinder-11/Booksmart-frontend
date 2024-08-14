import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginSignup.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, loginAsAdmin } = useAuth();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const userData = await response.json();
      login(userData);

      if (userData.isAdmin) {
        loginAsAdmin(userData);
        toast.success("Login successful as Admin");
        return navigate("/admin");
      }
      toast.success("Login successful");
      navigate('/');
    } else {
      const errorMessage = await response.json();
      setError(errorMessage.message);
      toast.error(errorMessage.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image">
        <img src="./login.jpg" alt="Login" />
      </div>
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
