import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "Male",
    email: "",
    countryCode: "+91",
    phone: "",
    profilePic: null,
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      setFormData((prev) => ({ ...prev, profilePic: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Register data:", formData);

  // Simulate sending to backend and marking profile complete
  const userData = JSON.parse(localStorage.getItem('userData'));
  userData.profile_completed = true;
  localStorage.setItem('userData', JSON.stringify(userData));

  navigate('/employer-dashboard');
};
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white text-black w-full max-w-md p-6 rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-2">Register Form</h2>
        <p className="text-center text-sm text-gray-600 mb-6">Let's Set Up Your Profile</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Profile Picture */}
          <div className="text-center">
            <label className="block mb-1 font-medium">Profile Picture</label>
            <div
              className="w-24 h-24 rounded-full border-2 border-dashed border-gray-400 mx-auto text-3xl flex items-center justify-center cursor-pointer overflow-hidden"
              onClick={handleImageClick}
            >
              {formData.profilePic ? (
                <img
                  src={URL.createObjectURL(formData.profilePic)}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-gray-400">+</span>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              name="profilePic"
              onChange={handleChange}
              className="hidden"
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="text-sm">Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              type="text"
              placeholder="Enter your full name"
              className="w-full bg-gray-100 rounded px-3 py-2 mt-1 text-black placeholder-gray-400 outline-none"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="text-sm">Date of Birth</label>
            <input
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              type="date"
              className="w-full bg-gray-100 rounded px-3 py-2 mt-1 text-black outline-none"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded px-3 py-2 mt-1 text-black outline-none"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm">Email Address</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="w-full bg-gray-100 rounded px-3 py-2 mt-1 text-black placeholder-gray-400 outline-none"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-sm">Phone Number</label>
            <div className="flex gap-2">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="w-1/3 bg-gray-100 rounded px-2 py-2 text-black outline-none"
              >
                <option>+91</option>
                <option>+1</option>
                <option>+44</option>
              </select>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="Phone no."
                className="w-2/3 bg-gray-100 rounded px-3 py-2 text-black placeholder-gray-400 outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold mt-2"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
