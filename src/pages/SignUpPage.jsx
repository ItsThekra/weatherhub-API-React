import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';  

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

 const handleSubmit = (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    setErrorMessage('Passwords do not match');
    return;
  }

  axios.post('https://weatherhub-api.onrender.com/api/v1/auth/signup', {
    email,
    password,
  })
.then(response => {
  console.log('Response from API:', response.data); // تحقق من البيانات الكاملة

  if (response.data.data.token) {
    const token = response.data.data.token;
    console.log('Token:', token); // تحقق من قيمة التوكن
    localStorage.setItem('token', token);  // تخزين التوكن
    setSuccessMessage('Account created successfully');
    setTimeout(() => {
      navigate('/weather'); 
    }, 2000);
  } else {
    setErrorMessage('Failed to receive token from the backend');
  }
})
  .catch(error => {
    if (error.response) {
      console.error('Error Response:', error.response.data);
      setErrorMessage(`Failed to create account: ${error.response.data.message || 'Check your data'}`);
    } else {
      console.error('Error:', error.message);
      setErrorMessage('Failed to create account: Network or server issue');
    }
  });
};

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Create a New Account</h1>
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
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          Sign Up
        </button>
      </form>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
    </div>
  );
}

export default SignUpPage;
