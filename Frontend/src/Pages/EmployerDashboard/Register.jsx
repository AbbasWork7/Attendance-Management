import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext";

export default function Register() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { setUser } = useAuth(); // ✅ used to update context

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    designation: "",
    dob: "",
    gender: "Male",
    email: "",
    countryCode: "+91",
    phone: "",
    profilePic: null,
  });

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

    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("You are not logged in.");
      return;
    }

    const payload = {
      logo: null,
      company_name: formData.companyName,
      contact: formData.phone,
      designation: formData.designation,
      gender: formData.gender,
      country_code: formData.countryCode,
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/users/add-employer/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        const updatedUser = JSON.parse(localStorage.getItem("userData"));
        updatedUser.profile_completed = true;
        localStorage.setItem("userData", JSON.stringify(updatedUser));

        setUser(updatedUser); // ✅ update context

        navigate("/employer-dashboard");
      } else {
        alert("Update failed: " + (data.message || "Check your inputs"));
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white text-black w-full max-w-md p-6 rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-2">Register Form</h2>
        <p className="text-center text-sm text-gray-600 mb-6">Let's Set Up Your Profile</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="text-center">
            <label className="block mb-1 font-medium">Logo Picture</label>
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

          <div>
            <label className="text-sm">Company Name</label>
            <input
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              type="text"
              placeholder="Enter your company name"
              className="w-full bg-gray-100 rounded px-3 py-2 mt-1 text-black placeholder-gray-400 outline-none"
            />
          </div>

          <div>
            <label className="text-sm">Designation</label>
            <input
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              type="text"
              placeholder="Enter your designation"
              className="w-full bg-gray-100 rounded px-3 py-2 mt-1 text-black placeholder-gray-400 outline-none"
            />
          </div>

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
