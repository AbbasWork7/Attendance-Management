import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import companyLogo from '../assets/image/logo.png';
import landingpic from '../assets/image/landing.jpg';
import { useAuth } from '../authContext';
import PrivacyPolicy from './PrivacyPolicy';
import CookiePolicy from './Cookiepolicy';
import TermsOfService from './TermsOfService';
import PricingPolicy from './PricingPolicy';
import { FaSquareInstagram } from "react-icons/fa6";
import { BsThreadsFill } from "react-icons/bs";

const BASE_URL = 'http://16.171.153.209:8000/';

const partnerLogos = [
  { name: 'TechCorp', logo: companyLogo },
  { name: 'InnovateInc', logo: companyLogo },
  { name: 'DigitalSolutions', logo: companyLogo },
  { name: 'FutureTech', logo: companyLogo },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [role, setRole] = useState('employee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showCookiePolicy, setShowCookiePolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPricingPolicy, setShowPricingPolicy] = useState(false);

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

const handleLogin = async (e) => {
  e.preventDefault();
  setError('');

  if (!email || !password) {
    setError('Please fill in all fields');
    return;
  }

  try {
    setIsLoading(true);

    const response = await fetch(`${BASE_URL}api/users/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || data.message || 'Invalid credentials');
    }

    // ✅ Receive profile_completed from backend (you must return it from API)
    const userData = {
      username: data.user?.username || email,
      email,
      role: data.user?.role_id === 2 ? 'employer' : 'employee',
      user_id: data.user?.user_id,
      profile_completed: data.user?.profile_completed ?? false, // default to false
    };

    setUser(userData);

    // ✅ Store data in localStorage
    localStorage.setItem('access_token', data.tokens.access);
    localStorage.setItem('refresh_token', data.tokens.refresh);
    localStorage.setItem('userData', JSON.stringify(userData));

    // ✅ Navigate accordingly
    if (userData.role === 'employer') {
      if (!userData.profile_completed) {
        navigate('/register');
      } else {
        navigate('/employer-dashboard');
      }
    } else {
      navigate('/employee-dashboard');
    }
  } catch (err) {
    console.error('Login error:', err);
    setError(err.message || 'Login failed. Please try again.');
  } finally {
    setIsLoading(false);
  }
};


  const sendOtp = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // simulate delay
      setOtpSent(true);
      setError('OTP sent to your email!');
    } catch (err) {
      setError('Failed to send OTP. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!otp || !newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // simulate delay
      setError('Password reset successfully!');
      setShowForgotPassword(false);
      setOtpSent(false);
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Failed to reset password. Try again.');
    } finally {
      setIsLoading(false);
    }
  };


  // Rest of your component remains the same...
  return (
    <div className="min-h-screen bg-white text-blue-900">
      {/* Header */}
      <header className="bg-white shadow-md fixed w-full z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={companyLogo} alt="Company Logo" className="h-10" />
            <span className="text-xl font-bold text-blue-900">VTraco</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="hover:text-blue-600 font-medium">Home</a>
            <a href="#about" className="hover:text-blue-600 font-medium">About Us</a>
            <a href="#contact" className="hover:text-blue-600 font-medium">Contact Us</a>
          </nav>

          <button 
            className="md:hidden text-blue-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg py-4 px-4">
            <a href="#home" className="block py-2 hover:text-blue-600">Home</a>
            <a href="#about" className="block py-2 hover:text-blue-600">About Us</a>
            <a href="#contact" className="block py-2 hover:text-blue-600">Contact Us</a>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-20 space-y-10 md:space-y-0 md:space-x-10 relative overflow-hidden"
        >
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: `url(${landingpic})` }}
          />
          <div className="absolute inset-0 bg-blue-50/30 backdrop-blur-sm z-10" />

          {/* Left Welcome Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 text-center relative z-20 px-4"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-800 mb-6">
              Welcome to Attendance Tracker
            </h1>
            <p className="text-lg md:text-xl text-blue-700 mb-8">
              Track attendance and salary efficiently with our modern solution.
            </p>
            <button 
              onClick={() => navigate('/signup')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition text-lg font-medium shadow-lg"
            >
              Get Started
            </button>
          </motion.div>

          {/* Right Login/Password Reset Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/3 bg-blue-50/70 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-blue-100 relative z-20"
          >
            <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center">
              {showForgotPassword ? 'Reset Password' : 'Login'}
            </h2>
            
            {error && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${
                error.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100/80 text-red-700'
              }`}>
                {error}
              </div>
            )}

            {!showForgotPassword ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm text-blue-800 mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 bg-white/80 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-blue-900"
                  />
                </div>

                <div>
                  <label className="block text-sm text-blue-800 mb-1 font-medium">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 bg-white/80 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-blue-900"
                  />
                </div>

                <div className="flex justify-between items-center">
               
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(true);
                      setOtpSent(false);
                      setError('');
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-5"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-medium shadow-md ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>

                <p className="text-sm text-center text-blue-700 mt-4">
                  Don't have an account?{' '}
                  <span
                    onClick={() => navigate('/signup')}
                    className="text-blue-800 cursor-pointer hover:underline font-medium"
                  >
                    Signup
                  </span>
                </p>
              </form>
            ) : (
              <form onSubmit={handlePasswordReset} className="space-y-4">
                {!otpSent ? (
                  <>
                    <div>
                      <label className="block text-sm text-blue-800 mb-1 font-medium">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 bg-white/80 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-blue-900"
                      />
                    </div>
                    
                    <button
                      type="button"
                      onClick={sendOtp}
                      disabled={isLoading}
                      className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-medium shadow-md ${
                        isLoading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm text-blue-800 mb-1 font-medium">OTP</label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        placeholder="Enter 6-digit OTP"
                        className="w-full px-4 py-2 bg-white/80 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-blue-900"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-blue-800 mb-1 font-medium">New Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        placeholder="Enter new password"
                        className="w-full px-4 py-2 bg-white/80 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-blue-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-blue-800 mb-1 font-medium">Confirm Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm new password"
                        className="w-full px-4 py-2 bg-white/80 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-blue-900"
                      />
                    </div>
                    
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-medium shadow-md ${
                          isLoading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => {
                          setShowForgotPassword(false);
                          setOtpSent(false);
                          setError('');
                        }}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition font-medium shadow-md"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </form>
            )}
          </motion.div>
        </section>

        {/* Mission & Vision Section */}
        <section id="about" className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 text-blue-800">Our Mission & Vision</h2>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-white p-8 rounded-xl border-l-4 border-blue-500 shadow-md"
              >
                <h3 className="text-2xl font-bold mb-4 text-blue-900">Our Mission</h3>
                <p className="text-blue-700">
                To empower organizations, institutions, and businesses with a reliable, flexible, and transparent attendance and monitoring system that enhances accountability, saves time, and enables smart decision-making — all through a wallet-based, prepaid digital platform that ensures efficiency and affordability.</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-white p-8 rounded-xl border-l-4 border-blue-500 shadow-md"
              >
                <h3 className="text-2xl font-bold mb-4 text-blue-900">Our Vision</h3>
                <p className="text-blue-700">
                 To become the most accessible attendance management solution globally, empowering 10 million organizations in developing sectors by 2030. We envision a world where every school, small business, and community organization can track attendance efficiently.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section id="partners" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 text-blue-800">Our Clients</h2>
            
            <div className="flex flex-wrap justify-center items-center gap-12">
              {partnerLogos.map((partner, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ scale: 1.1 }}
                  className="w-40 h-24 bg-blue-50 rounded-lg shadow-md flex items-center justify-center p-4 border border-blue-100"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-h-full max-w-full object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 text-blue-800">Contact Us</h2>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-blue-900">Get in Touch</h3>
                <p className="mb-6 text-blue-700">
                  Let's build smarter teams together.
Contact us now and start your journey with Vtraco!
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <svg className="w-6 h-6 mt-1 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <div>
                      <h4 className="font-bold text-blue-900">Address</h4>
                      <p className="text-blue-700">No.3, 3rd street, Rajeswari nagar, S.Kolathur<br />Chennai - 600091</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <svg className="w-6 h-6 mt-1 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <div>
                      <h4 className="font-bold text-blue-900">Phone</h4>
                      <p className="text-blue-700">+91 755 034 4823</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <svg className="w-6 h-6 mt-1 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <div>
                      <h4 className="font-bold text-blue-900">Email</h4>
                      <p className="text-blue-700">vtraco.official@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium text-blue-900">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 rounded bg-white border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-900"
                      placeholder="VTraco"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium text-blue-900">Your Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 rounded bg-white border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-900"
                      placeholder="admin@vtraco.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium text-blue-900">Your Message</label>
                    <textarea 
                      id="message" 
                      rows="4" 
                      className="w-full px-4 py-2 rounded bg-white border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-900"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition w-full"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white text-blue-700 py-12 border-t border-blue-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src={companyLogo} alt="Company Logo" className="h-10" />
                <span className="text-xl font-bold text-blue-900">VTraco</span>
              </div>
              <p className="text-sm text-blue-600">
                The most advanced attendance tracking system designed for modern businesses.
              </p>
            </div>
            
            <div>
              <h3 className="text-blue-900 text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#home" className="hover:text-blue-600 transition">Home</a></li>
                <li><a href="#about" className="hover:text-blue-600 transition">About Us</a></li>
                <li><a href="#partners" className="hover:text-blue-600 transition">Partners</a></li>
                <li><a href="#contact" className="hover:text-blue-600 transition">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-blue-900 text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button 
                    onClick={() => setShowPrivacyPolicy(true)} 
                    className="hover:text-blue-600 transition text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                {showPrivacyPolicy && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white py-2">
                          <h2 className="text-2xl font-bold text-blue-900">Privacy Policy</h2>
                          <button 
                            onClick={() => setShowPrivacyPolicy(false)}
                            className="text-gray-500 hover:text-gray-700 p-1"
                          >
                            ✕
                          </button>
                        </div>
                        <PrivacyPolicy />
                        <div className="sticky bottom-0 bg-white py-4 border-t border-gray-200 mt-4">
                          <button
                            onClick={() => setShowPrivacyPolicy(false)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md w-full sm:w-auto"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <li>
                  <button 
                    onClick={() => setShowTerms(true)} 
                    className="hover:text-blue-600 transition text-left"
                  >
                    Terms of Service
                  </button>
                </li>
                {showTerms && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white py-2">
                          <h2 className="text-2xl font-bold text-blue-900">Terms of Service</h2>
                          <button 
                            onClick={() => setShowTerms(false)}
                            className="text-gray-500 hover:text-gray-700 p-1"
                          >
                            ✕
                          </button>
                        </div>
                        <TermsOfService />
                        <div className="sticky bottom-0 bg-white py-4 border-t border-gray-200 mt-4">
                          <button
                            onClick={() => setShowTerms(false)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md w-full sm:w-auto"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <li>
                  <button 
                    onClick={() => setShowPricingPolicy(true)} 
                    className="hover:text-blue-600 transition text-left"
                  >
                    Pricing Policy
                  </button>
                </li>
                {showPricingPolicy && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white py-2">
                          <h2 className="text-2xl font-bold text-blue-900">Pricing Policy</h2>
                          <button 
                            onClick={() => setShowPricingPolicy(false)}
                            className="text-gray-500 hover:text-gray-700 p-1"
                          >
                            ✕
                          </button>
                        </div>
                        <PricingPolicy />
                        <div className="sticky bottom-0 bg-white py-4 border-t border-gray-200 mt-4">
                          <button
                            onClick={() => setShowPricingPolicy(false)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md w-full sm:w-auto"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <li>
                  <button 
                    onClick={() => setShowCookiePolicy(true)} 
                    className="hover:text-blue-600 transition text-left"
                  >
                    Cookie Policy
                  </button>
                </li>
                {showCookiePolicy && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white py-2">
                          <h2 className="text-2xl font-bold text-blue-900">Cookie Policy</h2>
                          <button 
                            onClick={() => setShowCookiePolicy(false)}
                            className="text-gray-500 hover:text-gray-700 p-1"
                          >
                            ✕
                          </button>
                        </div>
                        <CookiePolicy />
                        <div className="sticky bottom-0 bg-white py-4 border-t border-gray-200 mt-4">
                          <button
                            onClick={() => setShowCookiePolicy(false)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md w-full sm:w-auto"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )} 
              </ul>
            </div>
            
            <div>
              <h3 className="text-blue-900 text-lg font-bold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="https://www.threads.com/@vtraco_official" className="hover:text-blue-600 transition">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <BsThreadsFill />
                  </svg>
                </a>
                <a href="https://www.instagram.com/vtraco_official?igsh=YWF3Z2ozOGYxZDRs&utm_source=ig_contact_invite" className="hover:text-blue-600 transition">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <FaSquareInstagram />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-blue-100 mt-8 pt-8 text-center text-sm text-blue-600">
            <p>&copy; {new Date().getFullYear()} Karyoun Innovations. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}