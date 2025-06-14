import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';


export default function Sidebar() {
 const menu = [
  { label: '🏠 Dashboard', path: '/employer-dashboard' }, // ✅ absolute
  { label: '👥 My Team', path: '/employer-dashboard/my-team' },
  { label: '🔔 Notifications', path: '/employer-dashboard/notification' },
  { label: '➕ Add Employee', path: '/employer-dashboard/add-employee' },
  { label: '📋 Employee Details', path: '/employer-dashboard/employee-details' },
  { label: '👤 My Profile', path: '/employer-dashboard/my-profile' },
  { label: '🚪 Logout', path: '/employer-dashboard/logout' },
  { label: '❓ Need Help?', path: '/employer-dashboard/need-help' },
];

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(true);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 bg-blue-950 p-2 rounded text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      )}

      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : isMobile ? -300 : 0 }}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
        className={`fixed md:static top-0 left-0 w-64 h-full bg-blue-950 text-white shadow-xl p-4 z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'md:translate-x-0 -translate-x-full'
        }`}
      >
        <div className="text-2xl font-bold mb-8 text-center">🚀 Employer Panel</div>
        <nav className="space-y-4">
          {menu.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="block hover:bg-blue-800 p-2 rounded transition-all duration-300"
              onClick={() => isMobile && setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </motion.aside>
    </>
  );
}
