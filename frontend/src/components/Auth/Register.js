import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    // Password confirmation check
    if (userData.password !== userData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    // Password length check
    if (userData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    setLoading(true);
    setError(null);

    try {
        const { confirmPassword, ...registrationData } = userData;
        const response = await authService.register(registrationData);
        console.log(response); // Log the response for debugging
        navigate('/login');
    } catch (err) {
        // Log the full error response for debugging
        console.error("Registration failed:", err.response || err.message);
        setError('Registration failed. Username may be taken.');
        setLoading(false);
    }
};


  return (
    <div className="register-form">
      <h1>Register</h1>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
            minLength="8"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>

      <p>
        Already have an account?{' '}
        <button onClick={() => navigate('/login')}>Login</button>
      </p>
    </div>
  );
};

export default Register;
