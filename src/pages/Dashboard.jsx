import { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { getDashboardStats, getCourseChart } from "../services/dashboardService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AdminLayout from "../layouts/AdminLayout";
import {
    FaUserGraduate,
    FaBook,
    FaUsers,
    FaPlusCircle
} from "react-icons/fa";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LabelList
} from "recharts";

function Dashboard() {

    const [stats, setStats] = useState({
        totalStudents: 0,
        totalCourses: 0,
        totalUsers: 0
    });

    const [courseChart, setCourseChart] = useState([]);

    useEffect(() => {
        loadDashboard();
        loadCourseChart();
    }, []);

    const loadDashboard = async () => {
        try {
            const response = await getDashboardStats();
            setStats(response.data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load dashboard");
        }
    };

    const loadCourseChart = async () => {
        try {
            const response = await getCourseChart();
            setCourseChart(response.data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load chart");
        }
    };

    return (
        <AdminLayout>
        <div className="w-100">

            <div className="mb-4">
                <h2 className="fw-bold">
                    Dashboard Overview
                </h2>

                <p className="text-muted">
                    Manage students, courses and users efficiently from one place.
                </p>
            </div>

            <div className="row">

                {/* Students */}

                <div className="col-lg-4 col-md-6 mb-4">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                    >

                        <div className="card dashboard-card bg-primary text-white shadow border-0">

                            <div className="card-body text-center">

                                <FaUserGraduate size={40} />

                                <h5 className="mt-3">
                                    Total Students
                                </h5>

                                <h2 className="fw-bold">
                                    {stats.totalStudents}
                                </h2>

                                <p className="small opacity-75 mb-0">
                                    Registered Students
                                </p>

                            </div>

                        </div>

                    </motion.div>

                </div>

                {/* Courses */}

                <div className="col-lg-4 col-md-6 mb-4">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                    >

                        <div className="card dashboard-card bg-success text-white shadow border-0">

                            <div className="card-body text-center">

                                <FaBook size={40} />

                                <h5 className="mt-3">
                                    Total Courses
                                </h5>

                                <h2 className="fw-bold">
                                    {stats.totalCourses}
                                </h2>

                                <p className="small opacity-75 mb-0">
                                    Available Courses
                                </p>

                            </div>

                        </div>

                    </motion.div>

                </div>

                {/* Users */}

                <div className="col-lg-4 col-md-6 mb-4">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        whileHover={{ scale: 1.05 }}
                    >

                        <div className="card dashboard-card bg-warning text-dark shadow border-0">

                            <div className="card-body text-center">

                                <FaUsers size={40} />

                                <h5 className="mt-3">
                                    Total Users
                                </h5>

                                <h2 className="fw-bold">
                                    {stats.totalUsers}
                                </h2>

                                <p className="small opacity-75 mb-0">
                                    Active Accounts
                                </p>

                            </div>

                        </div>

                    </motion.div>

                </div>

            </div>

            {/* Quick Actions */}

            <div className="card shadow mt-4">

                <div className="card-body">

                    <h4 className="mb-4">
                        Quick Actions
                    </h4>

                    <div className="row">

                        <div className="col-md-4 mb-3">

                            <Link
                                to="/students"
                                className="btn btn-primary w-100 py-3 rounded-4"
                            >
                                <FaUserGraduate className="me-2" />
                                Manage Students
                            </Link>

                        </div>

                        <div className="col-md-4 mb-3">

                            <Link
                                to="/courses"
                                className="btn btn-success w-100 py-3 rounded-4"
                            >
                                <FaBook className="me-2" />
                                Manage Courses
                            </Link>

                        </div>

                        <div className="col-md-4 mb-3">

                            <Link
                                to="/add-student"
                                className="btn btn-warning w-100 py-3 rounded-4"
                            >
                                <FaPlusCircle className="me-2" />
                                Add Student
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

            {/* Chart */}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >

                <div className="card shadow mt-4">

                    <div className="card-body">

                        <h4 className="mb-4">
                            Student Distribution by Course
                        </h4>

                        <ResponsiveContainer width="100%" height={320}>

                            <BarChart data={courseChart}>

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="course" />

                                <YAxis />

                                <Tooltip />

                                <Bar
                                    dataKey="totalStudents"
                                    fill="#2563eb"
                                    radius={[8, 8, 0, 0]}
                                >
                                    <LabelList
                                        dataKey="totalStudents"
                                        position="top"
                                    />
                                </Bar>

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </motion.div>

        </div>
        </AdminLayout>
    );
}

export default Dashboard;