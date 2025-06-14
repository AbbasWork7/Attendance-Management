export default function AddEmployee() {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-bold mb-4">➕ Add New Employee</h2>
      <form className="space-y-4 max-w-md">
        <input type="text" placeholder="Employee Name" className="w-full p-2 rounded bg-gray-800 border border-blue-700" />
        <input type="email" placeholder="Email" className="w-full p-2 rounded bg-gray-800 border border-blue-700" />
        <button className="bg-blue-800 px-4 py-2 rounded hover:bg-blue-700">Add</button>
      </form>
    </div>
  );
}
