import { useState } from 'react';
import { useNavigate, Link } from 'react-router'; // استخدم Link من react-router-dom للتنقل بين الصفحات

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const nav = useNavigate(); // استخدم useNavigate للتنقل بين الصفحات

  const handleSignIn = (e) => {
    e.preventDefault(); 

    if (!email || !password) {
      setErrorMessage('Please enter both email and password');
      return;
    }

    fetch('https://weatherhub-api.onrender.com/api/v1/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json()) 
      .then((data) => {
        if (data && data.token) {
          // تخزين التوكن في localStorage
          localStorage.setItem('token', data.token);
          alert('Login Successful');
          nav('/weather'); // بعد تسجيل الدخول بنجاح، توجيه المستخدم إلى صفحة الطقس
        } else {
          setErrorMessage('Login failed: Token not received');
        }
      })
      .catch((error) => {
        setErrorMessage('Login failed: Check your credentials');
        console.error('Login error:', error);
      });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
      <form onSubmit={handleSignIn} className="space-y-4">
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



