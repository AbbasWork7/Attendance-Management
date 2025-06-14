import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      email,
      password,
      confirmPassword,
      username,
      phone,
    } = formData;

    if (!email || !password || !confirmPassword || !username || !phone) {
      setError('Please fill out all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    console.log('Signup data:', formData);
    setError('');
    navigate('/Landing');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-800 px-4">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6"
      >
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Create an Account</h2>
          <p className="text-sm text-gray-500">Let's set up your profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email Address</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Re-enter password"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Phone Number</label>
            <div className="flex gap-2">
              <select
                name="countryCode"
                onChange={handleChange}
                className="w-1/3 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
              <input
                type="text"
                name="phone"
                onChange={handleChange}
                className="w-2/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Phone number"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
          >
            Confirm
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/Landing')}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}