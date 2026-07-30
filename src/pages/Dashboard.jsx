import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getDashboardStats , getCourseChart} from "../services/dashboardService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";
import {
    FaUserGraduate,
    FaBook,
    FaUsers,
    FaPlusCircle
} from "react-icons/fa";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
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

        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">
                    Dashboard
                </h2>

                <div className="row">

                    <div className="col-lg-4 col-md-6 mb-4">

    <div className="card dashboard-card bg-primary text-white shadow border-0">

        <div className="card-body text-center">

            <FaUserGraduate size={35} />

            <h6 className="mt-3">
                Total Students
            </h6>

            <h2>{stats.totalStudents}</h2>

        </div>

    </div>

</div>

                    <div className="col-lg-4 col-md-6 mb-4">

    <div className="card dashboard-card bg-success text-white shadow border-0">

        <div className="card-body text-center">

            <FaBook size={40} />
            <h5 className="mt-3">
                Total Courses
            </h5>

            <h2>{stats.totalCourses}</h2>

        </div>

    </div>

</div>

                    <div className="col-lg-4 col-md-6 mb-4">

    <div className="card dashboard-card bg-warning text-dark shadow border-0">

        <div className="card-body text-center">

            <FaUsers size={40} />
            <h5 className="mt-3">
                Total Users
            </h5>

            <h2>{stats.totalUsers}</h2>

        </div>

    </div>

</div>
                </div>

                {/* Quick Actions */}

<div className="card shadow mt-4">

    <div className="card-body">

        <h4 className="mb-3">
            Quick Actions
        </h4>

        <div className="row mt-3">

    <div className="col-md-4 mb-3">

        <Link
            to="/students"
            className="btn btn-primary w-100 py-3"
        >
            <FaUserGraduate className="me-2" />
            Manage Students
        </Link>

    </div>

    <div className="col-md-4 mb-3">

        <Link
            to="/courses"
            className="btn btn-success w-100 py-3"
        >
            <FaBook className="me-2" />
            Manage Courses
        </Link>

    </div>

    <div className="col-md-4 mb-3">

        <Link
            to="/add-student"
            className="btn btn-warning w-100 py-3"
        >
            <FaPlusCircle className="me-2" />
            Add Student
        </Link>

    </div>

</div>

    </div>

</div>

{/* Students by Course */}

<div className="card shadow mt-4">

    <div className="card-body">

        <h4 className="mb-4">
            Students by Course
        </h4>

        <ResponsiveContainer
            width="100%"
            height={300}
        >

            <BarChart data={courseChart}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="course" />

                <YAxis />

                <Tooltip
    cursor={{ fill: "#f5f5f5" }}
/>

                <Bar
    dataKey="totalStudents"
    fill="#2563eb"
    radius={[8,8,0,0]}
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
                    </div>
        </>

    );

}

export default Dashboard;