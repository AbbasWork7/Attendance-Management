import { IoAddOutline } from "react-icons/io5";

export default function AddEmployee() {
  return (
    <div className="animate-fadeIn bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-blue-900 flex items-center gap-2">
        <IoAddOutline className="text-4xl text-blue-800" />
        Add New Employee
      </h2>
      <form className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Employee Name"
          className="w-full p-2 rounded border border-blue-300 text-blue-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded border border-blue-300 text-blue-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition-all">
          Add
        </button>
      </form>
    </div>
  );
}

  
