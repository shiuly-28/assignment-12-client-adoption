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
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const data = [
    { name: "Jan", users: 400, orders: 240, revenue: 2400 },
    { name: "Feb", users: 300, orders: 139, revenue: 2210 },
    { name: "Mar", users: 200, orders: 980, revenue: 2290 },
    { name: "Apr", users: 278, orders: 390, revenue: 2000 },
    { name: "May", users: 189, orders: 480, revenue: 2181 },
    { name: "Jun", users: 239, orders: 380, revenue: 2500 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const Overview = () => {
    return (
        <section className="py-10 px-6">
            <div className="max-w-full mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold text-center mb-10"
                >
                    Dashboard Reveiw
                </motion.h2>

                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {[
                        { title: "Total Users", value: "12,345", color: "text-indigo-600" },
                        { title: "Total Orders", value: "4,567", color: "text-green-600" },
                        { title: "Total Revenue", value: "$78,900", color: "text-yellow-600" },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Card className="rounded-2xl shadow-md">
                                <CardHeader>
                                    <CardTitle>{stat.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Line Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <Card className="rounded-2xl shadow-md">
                            <CardHeader>
                                <CardTitle>Users & Orders Growth</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="users" stroke="#8884d8" />
                                        <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Bar Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <Card className="rounded-2xl shadow-md">
                            <CardHeader>
                                <CardTitle>Revenue by Month</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="revenue" fill="#ffc658" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Pie Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    whileHover={{ scale: 1.03 }}
                    className="mt-8"
                >
                    <Card className="rounded-2xl shadow-md">
                        <CardHeader>
                            <CardTitle>Order Distribution</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        dataKey="orders"
                                        nameKey="name"
                                        outerRadius={120}
                                        fill="#8884d8"
                                        label
                                    >
                                        {data.map((_, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
};

export default Overview;
