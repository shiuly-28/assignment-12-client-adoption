// src/Dashboard/Overview.jsx
import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const Overview = () => {

    const stats = [
        { title: "Total Orders", value: 124, color: "bg-blue-100", textColor: "text-blue-700" },
        { title: "Total Users", value: "1.2K", color: "bg-green-100", textColor: "text-green-700" },
        { title: "Total Revenue", value: "$15,000", color: "bg-yellow-100", textColor: "text-yellow-700" },
    ];

    // Sample chart data
    const chartData = [
        { date: "2025-08-01", orders: 10, revenue: 200 },
        { date: "2025-08-02", orders: 15, revenue: 300 },
        { date: "2025-08-03", orders: 8, revenue: 150 },
        { date: "2025-08-04", orders: 20, revenue: 400 },
        { date: "2025-08-05", orders: 18, revenue: 350 },
        { date: "2025-08-06", orders: 22, revenue: 450 },
    ];

    return (
        <div className="p-6 container mx-auto">
            <h2 className="text-2xl font-bold mb-6">📊 Dashboard Overview</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className={`${stat.color} p-5 rounded-lg shadow text-center`}>
                        <p className={`font-semibold ${stat.textColor}`}>{stat.title}</p>
                        <p className={`text-2xl font-bold mt-2 ${stat.textColor}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Orders Over Time */}
                <div className="bg-white p-5 rounded-lg shadow">
                    <h3 className="font-semibold mb-3">📈 Orders Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="orders" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Revenue Over Time */}
                <div className="bg-white p-5 rounded-lg shadow">
                    <h3 className="font-semibold mb-3">💰 Revenue Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Overview;
