"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const COLORS = ["#8b5cf6", "#10b981", "#f59e0b", "#38bdf8"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f1117] border border-gray-800 rounded-xl px-4 py-2.5 text-sm shadow-xl">
        <p className="text-gray-400 mb-1">{label}</p>
        <p className="font-semibold text-emerald-400">{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function AnalyticsChart({ dashboard }) {
  const data = [
    { name: "Users", value: dashboard?.totalUsers || 0 },
    { name: "Properties", value: dashboard?.totalProperties || 0 },
    { name: "Pending", value: dashboard?.pendingProperties || 0 },
    { name: "Inquiries", value: dashboard?.totalInquiries || 0 },
  ];

  return (
    <div className="bg-[#16181f] border border-gray-800/60 rounded-2xl p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-100">Analytics Overview</h2>
        <p className="text-sm text-gray-500 mt-0.5">Platform metrics at a glance</p>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} barSize={48}>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 11 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}