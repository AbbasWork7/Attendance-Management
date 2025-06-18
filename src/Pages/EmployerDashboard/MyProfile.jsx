import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MyProfile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    position: '',
    company: '',
    phone: '',
    profileImage: '',
    department: '',
    joinDate: '',
    employeesManaged: 0,
    lastLogin: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProfileData({
        name: 'Sarah Johnson',
        email: 's.johnson@company.com',
        position: 'HR Manager',
        company: 'TechCorp Inc.',
        phone: '+1 (555) 123-4567',
        profileImage: '',
        department: 'Human Resources',
        joinDate: '2021-06-15',
        employeesManaged: 47,
        lastLogin: new Date().toISOString()
      });
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-10 h-10 border-4 border-blue-950 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white text-blue-950 rounded-xl shadow-lg border border-blue-100"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-950 p-6 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} className="relative">
              {profileData.profileImage ? (
                <img
                  src={profileData.profileImage}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-white/30"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-white text-blue-950 flex items-center justify-center text-xl font-bold border-4 border-white/30">
                  {getInitials(profileData.name)}
                </div>
              )}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"
              />
            </motion.div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">{profileData.name}</h2>
              <p className="text-blue-200">{profileData.position}</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-md transition-all"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {isEditing ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {['name', 'email', 'phone', 'position'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={profileData[field]}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-800"
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Department</label>
              <select
                name="department"
                value={profileData.department}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-800"
              >
                {['Human Resources', 'Management', 'Operations', 'Finance', 'IT'].map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end space-x-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-blue-200 text-blue-800 rounded-md hover:bg-blue-50"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900"
              >
                Save Changes
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-3">
              <Info label="Company" value={profileData.company} />
              <Info label="Department" value={profileData.department} />
              <Info label="Position" value={profileData.position} />
              <Info label="Employees Managed" value={profileData.employeesManaged} />
            </div>
            <div className="space-y-3">
              <Info label="Email" value={profileData.email} />
              <Info label="Phone" value={profileData.phone} />
              <Info
                label="Join Date"
                value={new Date(profileData.joinDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              />
              <Info
                label="Last Login"
                value={new Date(profileData.lastLogin).toLocaleString('en-US', {
                  dateStyle: 'short',
                  timeStyle: 'short'
                })}
              />
            </div>

            <div className="md:col-span-2 mt-4">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-4 bg-blue-50 rounded-lg border border-blue-100"
              >
                <h3 className="font-medium text-blue-800 mb-2">Security Status</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm text-blue-900">Your account is secure</span>
                </div>
                <button className="mt-3 text-sm text-blue-800 hover:underline">
                  Change Password
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-blue-500">{label}</p>
    <p className="font-medium text-blue-900">{value}</p>
  </div>
);

export default MyProfile;
