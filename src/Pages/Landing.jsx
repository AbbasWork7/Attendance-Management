import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import companyLogo from '../assets/image/logo.png';
import { useAuth } from '../authContext';

// Mock partner logos (replace with actual imports)
const partnerLogos = [
  { name: 'TechCorp', logo: companyLogo },
  { name: 'InnovateInc', logo: companyLogo },
  { name: 'DigitalSolutions', logo: companyLogo },
  { name: 'FutureTech', logo: companyLogo },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('employee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ username: email, role });
    navigate(role === 'employer' ? '/employer-dashboard' : '/employee-dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-md fixed w-full z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo - Left Side */}
          <div className="flex items-center space-x-2">
            <img src={companyLogo} alt="Company Logo" className="h-10" />
            <span className="text-xl font-bold">AttendancePro</span>
          </div>

          {/* Desktop Navigation - Right Side */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="hover:text-blue-400 font-medium">Home</a>
            <a href="#about" className="hover:text-blue-400 font-medium">About Us</a>
            <a href="#contact" className="hover:text-blue-400 font-medium">Contact Us</a>
          </nav>

          {/* Mobile Menu Button - Right Side */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-800 shadow-lg py-4 px-4">
            <a href="#home" className="block py-2 hover:text-blue-400">Home</a>
            <a href="#about" className="block py-2 hover:text-blue-400">About Us</a>
            <a href="#contact" className="block py-2 hover:text-blue-400">Contact Us</a>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-20 space-y-10 md:space-y-0 md:space-x-10">
          {/* Left Welcome Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 text-center"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-400 mb-3">
              Welcome to Attendance Tracker
            </h1>
            <p className="text-lg text-gray-300">
              Track attendance and salary efficiently with our modern solution.
            </p>
          </motion.div>

          {/* Right Login Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/3 bg-gray-800 p-8 rounded-xl shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-blue-400 text-center">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Login As</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="employee">Employee</option>
                  <option value="employer">Employer</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>

            <p className="text-sm text-center text-gray-400 mt-4">
              Don't have an account?{' '}
              <span
                onClick={() => navigate('/signup')}
                className="text-blue-400 cursor-pointer hover:underline"
              >
                Signup
              </span>
            </p>
          </motion.div>
        </section>

        {/* Mission & Vision Section */}
        <section id="about" className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 text-blue-400">Our Mission & Vision</h2>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="bg-gray-700 p-8 rounded-xl border-l-4 border-blue-500">
                <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
                <p className="text-gray-300">
                  To empower organizations with intuitive, reliable attendance tracking 
                  solutions that streamline workforce management and enhance productivity.
                </p>
              </div>
              
              <div className="bg-gray-700 p-8 rounded-xl border-l-4 border-blue-500">
                <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
                <p className="text-gray-300">
                  To become the global leader in attendance management systems, setting new standards 
                  for accuracy, efficiency, and user experience in workforce tracking technology.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section id="partners" className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 text-blue-400">Our Working Partners</h2>
            
            <div className="flex flex-wrap justify-center items-center gap-12">
              {partnerLogos.map((partner, index) => (
                <div key={index} className="w-40 h-24 bg-gray-800 rounded-lg shadow-md flex items-center justify-center p-4">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 text-blue-400">Contact Us</h2>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Get in Touch</h3>
                <p className="mb-6 text-gray-300">
                  Have questions about our attendance tracking solutions? Reach out to our team and 
                  we'll get back to you as soon as possible.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <svg className="w-6 h-6 mt-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <div>
                      <h4 className="font-bold text-white">Address</h4>
                      <p className="text-gray-300">123 Business Park, Suite 456<br />Tech City, TC 98765</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <svg className="w-6 h-6 mt-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <div>
                      <h4 className="font-bold text-white">Phone</h4>
                      <p className="text-gray-300">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <svg className="w-6 h-6 mt-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <div>
                      <h4 className="font-bold text-white">Email</h4>
                      <p className="text-gray-300">info@attendancetracker.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium text-white">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium text-white">Your Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium text-white">Your Message</label>
                    <textarea 
                      id="message" 
                      rows="4" 
                      className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
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
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src={companyLogo} alt="Company Logo" className="h-10" />
                <span className="text-xl font-bold text-white">AttendancePro</span>
              </div>
              <p className="text-sm text-gray-400">
                The most advanced attendance tracking system designed for modern businesses.
              </p>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#home" className="hover:text-blue-400 transition">Home</a></li>
                <li><a href="#about" className="hover:text-blue-400 transition">About Us</a></li>
                <li><a href="#partners" className="hover:text-blue-400 transition">Partners</a></li>
                <li><a href="#contact" className="hover:text-blue-400 transition">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Cookie Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a href="#" className="hover:text-blue-400 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    
                  </svg>
                </a>
                <a href="#" className="hover:text-blue-400 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} AttendancePro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}