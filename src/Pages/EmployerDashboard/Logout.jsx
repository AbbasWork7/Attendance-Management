import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optionally clear user session here
    navigate('/Landing');
  };

  return (
    <div className="animate-fadeIn text-center">
      <h2 className="text-3xl font-bold mb-4">🚪 Logout</h2>
      <p>Are you sure you want to log out?</p>
      <button
        onClick={handleLogout}
        className="bg-red-600 mt-4 px-4 py-2 rounded hover:bg-red-500"
      >
        Confirm Logout
      </button>
    </div>
  );
}
