import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router'; 

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://weatherhub-api.onrender.com/api/v1/auth/signin', {
      email,
      password,
    })
    .then(response => {
      if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem('token', token);  // Store token in localStorage
        alert('Login successful');
        navigate('/weather');  // Redirect to Weather Page
      } else {
        setErrorMessage('Login failed: Token not received');
      }
    })
    .catch(error => {
      setErrorMessage('Login failed: Check your credentials');
      console.error('Login error:', error);
    });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          Login
        </button>
      </form>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      <p className="mt-4 text-center">
        Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
      </p>
    </div>
  );
}

export default LoginPage;
