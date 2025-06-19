// src/components/employer/Sidebar.jsx

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { IoLogOutOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FcViewDetails } from "react-icons/fc";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoNotificationsSharp } from "react-icons/io5";
import { RiTeamLine } from "react-icons/ri";
import { GiArchiveRegister } from "react-icons/gi";
import { MdSpaceDashboard } from "react-icons/md";
import helpGif from "../../assets/gif/help.gif";
import { useSubscription } from "../EmployerDashboard/SubscriptionContext"; // ✅ correct path if needed

export default function Sidebar() {
  const { isSubscribed } = useSubscription(); // ✅ use subscription logic

  const menu = [
    { label: 'Dashboard', path: '/employer-dashboard', icon: <MdSpaceDashboard /> },
    { label: 'My Team', path: '/employer-dashboard/my-team', icon: <RiTeamLine /> },
    { label: 'Attendance Record', path: '/employer-dashboard/Attendance-Register', icon: <GiArchiveRegister /> },
    { label: 'Notifications', path: '/employer-dashboard/notification', icon: <IoNotificationsSharp /> },
    {
      label: 'Add candidate',
      path: '/employer-dashboard/add-employee',
      icon: <IoMdAddCircleOutline />,
       // ✅ lock if not subscribed
    },
    { label: 'Candidate Details', path: '/employer-dashboard/employee-details', icon: <FcViewDetails /> },
    { label: 'My Profile', path: '/employer-dashboard/my-profile', icon: <CgProfile /> },
    { label: 'Logout', path: '/employer-dashboard/logout', icon: <IoLogOutOutline /> },
  ];

  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* ☰ / ✖ Button for mobile */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 bg-transparent text-blue-900 text-3xl px-2 py-1 rounded-full hover:bg-blue-100 transition-all duration-300"
          onClick={() => setIsOpen(prev => !prev)}
        >
          {isOpen ? '✖' : '☰'}
        </button>
      )}

      {/* Sidebar Panel */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : isMobile ? -300 : 0 }}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
        className="fixed md:static top-0 left-0 w-64 h-screen bg-white text-blue-950 shadow-[0_15px_50px_rgba(0,0,0,0.65)] pt-16 md:pt-4 z-40 flex flex-col justify-between overflow-y-auto"
      >
        {/* Top Section */}
        <div>
          <div className="text-2xl font-bold mb-6 p-2">Organization Panel</div>
          <nav className="space-y-2">
            {menu.map((item, index) => (
              item.locked ? (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-100 text-gray-400 px-2 py-1.5 rounded cursor-not-allowed"
                  title="🔒 Unlock by subscribing"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm line-through">{item.label}</span>
                </div>
              ) : (
                <Link
                  key={index}
                  to={item.path}
                  className="flex items-center gap-2 hover:bg-blue-100 px-2 py-1.5 rounded transition-all duration-300"
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </Link>
              )
            ))}
          </nav>
        </div>

        {/* Bottom Help Section */}
        <div className="mt-6 text-center animate-bounce px-0 mb-4">
          <Link
            to="/employer-dashboard/need-help"
            className="flex justify-center items-center gap-2 bg-transparent hover:bg-blue-100 p-2 rounded transition-all duration-300 w-full"
            onClick={() => isMobile && setIsOpen(false)}
          >
            <img src={helpGif} alt="Help" className="w-12 h-12 cursor-pointer" />
            <span className="text-sm font-semibold text-blue-900">Need Help❓</span>
          </Link>
        </div>
      </motion.aside>
    </>
  );
}
