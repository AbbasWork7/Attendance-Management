import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const BASE_URL =`http://127.0.0.1:8000/`;

export default function Profile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    salary: '',
    profilePic: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [profilePicPreview, setProfilePicPreview] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.get(`${BASE_URL}api/employee/profile/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data.data;
    setUser({
      name: data.employee_name || '',
      email: data.email || '',
      phone: data.contact || '',
      company: data.company_name || '',
      salary: data.salary || '',
      role: data.designation || '',
      profilePic: null,
    });

    if (data.profile_picture) {
        setProfilePicPreview(data.profile_picture);  // Full image URL from backend
      } else {
        setProfilePicPreview('https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?w=740'); // default
      }


  } catch (err) {
    console.error('Profile fetch error:', err);
    toast.error('❌ Failed to fetch profile');
  }
};


    fetchProfile();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 1024 * 1024) {
      setUser({ ...user, profilePic: file });
      setProfilePicPreview(URL.createObjectURL(file));
    } else {
      toast.error('⚠ Profile picture must be under 1MB and in image format.');
    }
  };

  const handleRemoveProfilePic = () => {
    setUser({ ...user, profilePic: null });
    setProfilePicPreview(null);
    toast.success('Profile picture removed');
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const formData = new FormData();
      formData.append('contact', user.phone);
      formData.append('location', user.location);
      if (user.profilePic) {
        formData.append('profile_picture', user.profilePic);
      }

      const response = await axios.put(`${BASE_URL}employee/update-profile/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success('✅ Profile updated successfully!');
        setIsEditing(false);
      } else {
        toast.error('❌ Failed to update profile.');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error('❌ Error while updating profile.');
    }
  };

  const missingProfilePic = !user.profilePic;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 text-blue-900 transition-all relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-semibold">👤 Profile</h2>
          <p className="text-sm text-gray-600">Update your personal information. ✨</p>
        </div>
        <div className="relative w-24 h-24">
          <img
            src={profilePicPreview || '/default-avatar.png'}
            alt="Profile"
            className="w-24 h-24 object-cover rounded-full border border-gray-300"
          />
          {missingProfilePic && (
            <span className="absolute top-0 right-0 w-3 h-3 rounded-full"></span>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicUpload}
            className="text-sm"
          />
          {user.profilePic && (
            <button
              onClick={handleRemoveProfilePic}
              className="mt-2 text-red-600 text-sm hover:underline"
            >
              Remove Profile Picture
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={user.name}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Designation</label>
          <input
            type="text"
            value={user.role}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>
         <div>
          <label className="block text-sm font-medium mb-1">Company</label>
          <input
            type="text"
            value={user.company}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>
         <div>
          <label className="block text-sm font-medium mb-1">Salary</label>
          <input
            type="text"
            value={user.salary}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full border p-2 rounded ${isEditing ? '' : 'bg-gray-100'}`}
          />
        </div>
    
      </div>

      <div className="mt-6 text-right">
        {isEditing ? (
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            ✅ Submit
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            ✏️ Edit
          </button>
        )}
      </div>
    </div>
  );
}
