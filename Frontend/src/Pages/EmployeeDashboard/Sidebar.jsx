import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {
  MdRequestPage,
  MdMenu,
  MdClose
} from 'react-icons/md';
import {
  FiLogOut,
  FiUser,
  FiBell
} from 'react-icons/fi';
import { IoCalendarOutline } from 'react-icons/io5';
import { BsCashStack } from 'react-icons/bs';
import helpGif from '../../assets/gif/help.gif';

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [hasProfilePic, setHasProfilePic] = useState(true);

  useEffect(() => {
    const profileData = localStorage.getItem('profilePicUploaded');
    if (profileData !== 'true') {
      setHasProfilePic(false);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && showLogoutModal) {
        handleLogoutConfirm();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLogoutModal]);

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    navigate('/');
  };

  const navItems = [
    { label: 'Attendance Log', path: '/employee-dashboard/attendance', icon: <IoCalendarOutline size={20} /> },
    { label: 'Salary', path: '/employee-dashboard/salary', icon: <BsCashStack size={20} /> },
    { label: 'Requests', path: '/employee-dashboard/requests', icon: <MdRequestPage size={20} /> },
    { label: 'Notifications', path: '/employee-dashboard/notification', icon: <FiBell size={20} /> },
    {
      label: 'Profile',
      path: '/employee-dashboard/profile',
      icon: (
        <div className="relative">
          <FiUser size={20} />
          {!hasProfilePic && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          )}
        </div>
      )
    },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden bg-white shadow px-4 py-3 flex justify-end items-center sticky top-0 z-30">
        <button onClick={() => setIsOpen(!isOpen)} className="text-blue-900 focus:outline-none">
          {isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg md:shadow-[0_15px_50px_rgba(0,0,0,0.15)] text-blue-900 w-64 max-w-[90vw] p-4 flex flex-col justify-between z-20 fixed md:static top-0 left-0 h-screen transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Close icon on top-right inside sidebar (mobile only) */}
          <div className="flex justify-between items-center md:hidden mb-4">
            <div />
            <button onClick={() => setIsOpen(false)} className="text-blue-900">
              <MdClose size={24} />
            </button>
          </div>

          {/* Desktop heading with underline */}
          <h2 className="text-2xl font-bold hidden md:block border-b border-blue-200 pb-2 mb-4">
            Candidate Panel
          </h2>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition font-medium ${
                    isActive ? 'bg-blue-100 text-blue-800' : 'hover:bg-blue-50'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}

            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition font-medium"
            >
              <FiLogOut size={20} />
              Logout
            </button>
          </nav>
        </div>

        {/* Help Section fixed to bottom */}
        <div className="text-center animate-bounce mt-6">
          <Link
            to="/employee-dashboard/needhelp"
            className="flex justify-center items-center gap-2 hover:bg-blue-100 p-2 rounded transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            <img src={helpGif} alt="Help" className="w-12 h-12 cursor-pointer" />
            <span className="text-sm font-semibold text-blue-900 p-3">Need Help❓</span>
          </Link>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Logout</h3>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
