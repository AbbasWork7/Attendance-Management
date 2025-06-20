import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/image/logo.png';
import illustration from '../assets/image/signup-illustration.png';

const BASE_URL = 'https://vtraco.onrender.com';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(`${BASE_URL}/api/users/signup/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role_id: 2, // ✅ Default: Employee role
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Signup success:', data);
        navigate('/Landing');
      } else {
        setError(data.detail || data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('🌐 Network error. Backend might be down or DevTunnel not active.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Illustration */}
      <div className="hidden md:block w-full md:w-1/2 bg-blue-50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${illustration})` }}
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-white">
        <motion.div
          initial={{ opacity: 0, x: '-100%' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md bg-white rounded-xl p-6 md:p-8"
        >
          <div className="text-center mb-6">
            <img src={logo} alt="Logo" className="mx-auto h-16 w-16 mb-3" />
            <h2 className="text-2xl font-bold text-blue-900">Create an Account</h2>
            <p className="text-sm text-blue-700">Let’s set up your profile</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Username"
              name="username"
              type="text"
              value={formData.username}
              placeholder="Enter your username"
              onChange={handleChange}
            />
            <InputField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={handleChange}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              placeholder="Enter password"
              onChange={handleChange}
            />
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              placeholder="Re-enter password"
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition-all"
            >
              Confirm
            </button>
          </form>

          <p className="mt-5 text-sm text-center text-blue-700">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/Landing')}
              className="text-blue-800 hover:underline cursor-pointer font-medium"
            >
              Login
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function InputField({ label, name, type, value, placeholder, onChange }) {
  return (
    <div>
      <label className="text-sm text-blue-800 block mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-blue-900"
      />
    </div>
  );
}
