import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getDashboardStats , getCourseChart} from "../services/dashboardService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function Dashboard() {

    const [stats, setStats] = useState({
        totalStudents: 0,
        totalCourses: 0,
        totalUsers: 0,
        totalAdmins: 0
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

                    <div className="col-md-3 mb-3">

                        <div className="card bg-primary text-white shadow">

                            <div className="card-body">

                                <h5>Total Students</h5>

                                <h2>{stats.totalStudents}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3 mb-3">

                        <div className="card bg-success text-white shadow">

                            <div className="card-body">

                                <h5>Total Courses</h5>

                                <h2>{stats.totalCourses}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3 mb-3">

                        <div className="card bg-warning text-dark shadow">

                            <div className="card-body">

                                <h5>Total Users</h5>

                                <h2>{stats.totalUsers}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3 mb-3">

                        <div className="card bg-danger text-white shadow">

                            <div className="card-body">

                                <h5>Total Admins</h5>

                                <h2>{stats.totalAdmins}</h2>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="card shadow mt-4">

                    <div className="card-body">

                        <h4 className="mb-3">
                            Quick Actions
                        </h4>
                        <div className="d-flex flex-wrap gap-3">

            <Link
                to="/students"
                className="btn btn-primary"
            >
                👨‍🎓 Manage Students
            </Link>

            <Link
                to="/courses"
                className="btn btn-success"
            >
                📚 Manage Courses
            </Link>

            <Link
                to="/add-student"
                className="btn btn-warning"
            >
                ➕ Add Student
            </Link>

        </div>
                        <div className="card shadow mt-4">
</div>
<div className="card-body">

        <h4 className="mb-4">
            Students by Course
        </h4>

        <ResponsiveContainer
            width="100%"
            height={350}
        >

            <BarChart data={courseChart}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="course" />

                <YAxis />

                <Tooltip />

                <Bar
                    dataKey="totalStudents"
                    radius={[6,6,0,0]}
                />

            </BarChart>

        </ResponsiveContainer>

    </div>


                    </div>

                </div>

            </div>

        </>

    );

}

export default Dashboard;