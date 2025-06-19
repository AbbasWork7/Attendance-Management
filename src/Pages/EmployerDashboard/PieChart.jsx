import React, { useState } from "react";
import { PieChart as RePieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#22c55e", "#ef4444"];
const sampleData = {
  daily: [{ name: "Present", value: 70 }, { name: "Absent", value: 30 }],
  weekly: [{ name: "Present", value: 80 }, { name: "Absent", value: 20 }],
  monthly: [{ name: "Present", value: 90 }, { name: "Absent", value: 10 }],
};

export default function PieChart() {
  const [filter, setFilter] = useState("daily");

  return (
    <div className="bg-white border shadow p-4 rounded-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Attendance Overview</h3>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="daily">Day</option>
          <option value="weekly">Week</option>
          <option value="monthly">Month</option>
        </select>
      </div>

      <RePieChart width={250} height={250}>
        <Pie
          data={sampleData[filter]}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {sampleData[filter].map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RePieChart>
    </div>
  );
}
