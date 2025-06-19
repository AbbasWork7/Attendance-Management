import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/image/logo.png';
import illustration from '../assets/image/signup-illustration.png';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    countryCode: '+91',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    const { email, password, confirmPassword, username, phone } = formData;

    if (!email || !password || !confirmPassword || !username || !phone) {
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

    if (!/^\d{10}$/.test(phone)) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Signup data:', formData);
      navigate('/Landing');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Illustration Background */}
      <div className="hidden md:block w-full md:w-1/2 bg-blue-50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${illustration})` }}
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-white">
        <motion.div
          initial={{ opacity: 0, x: '-100%' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md bg-white rounded-xl p-6 md:p-8"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <img src={logo} alt="Logo" className="mx-auto h-16 w-16 mb-3" />
            <h2 className="text-2xl font-bold text-blue-900">Create an Account</h2>
            <p className="text-sm text-blue-700">Let's set up your profile</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Form */}
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
              placeholder="Enter password (min 8 characters)" 
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

            <div>
              <label className="text-sm text-blue-800 block mb-1">Phone Number</label>
              <div className="flex gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="w-1/3 px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-blue-900"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </select>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit phone number"
                  maxLength="10"
                  className="w-2/3 px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-blue-900"
                />
              </div>
            </div>

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