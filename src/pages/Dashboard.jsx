import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getAllStudents } from "../services/studentService";
import { Link } from "react-router-dom";

function Dashboard() {
    const [students, setStudents] = useState([]);

useEffect(() => {
    loadDashboard();
}, []);

const loadDashboard = async () => {
    try {
        const response = await getAllStudents();
        setStudents(response.data);
    } catch (error) {
        console.log(error);
    }
};

    return (
        <>
            <Navbar />

            <div className="container mt-5">
                <h2 className="mb-4">
    <i className="bi bi-speedometer2 me-2"></i>
    Dashboard
</h2>
                <p className="text-muted">
    Welcome back! Here's an overview of your Student Management System.
</p>
                <div className="row">

                    <div className="col-md-4 mb-4">
    <Link
    to="/students"
    className="text-decoration-none text-dark"
    style={{ cursor: "pointer" }}
>
    <div className="card shadow border-0 h-100">

        <div className="card-body d-flex justify-content-between align-items-center">

            <div>
                <h6 className="text-muted">Total Students</h6>
                <h2 className="fw-bold">{students.length}</h2>
            </div>

            <i
                className="bi bi-people-fill text-primary"
                style={{ fontSize: "50px" }}
            ></i>

        </div>

    </div>
</Link>
</div>

                    <div className="col-md-4 mb-4">
    <div className="card shadow border-0 h-100">
        <div className="card-body d-flex justify-content-between align-items-center">

            <div>
                <h6 className="text-muted">Total Courses</h6>

                <h2 className="fw-bold">
                    {[...new Set(students.map(student => student.course))].length}
                </h2>

            </div>

            <i className="bi bi-book-fill text-success" style={{ fontSize: "50px" }}></i>

        </div>
    </div>
</div>

                    <div className="col-md-4 mb-4">
    <div className="card shadow border-0 h-100">
        <div className="card-body d-flex justify-content-between align-items-center">

            <div>
                <h6 className="text-muted">Total Semesters</h6>

                <h2 className="fw-bold">
                    {[...new Set(students.map(student => student.semester))].length}
                </h2>

            </div>

            <i className="bi bi-mortarboard-fill text-warning" style={{ fontSize: "50px" }}></i>

        </div>
    </div>
</div>
<div className="card shadow border-0 mt-4">

    <div className="card-header bg-primary text-white d-flex justify-content-between">

        <h5>Recent Students</h5>

        <Link
            to="/students"
            className="btn btn-light btn-sm"
        >
            View All
        </Link>

    </div>

    <div className="card-body">

        <table className="table table-hover">

            <thead>

                <tr>
                    <th>Roll No</th>
                    <th>Name</th>
                    <th>Course</th>
                </tr>

            </thead>

            <tbody>

                {students.slice(0,5).map(student => (

                    <tr key={student.id}>

                        <td>{student.rollNo}</td>

                        <td>
                            {student.firstName} {student.lastName}
                        </td>

                        <td>{student.course}</td>

                    </tr>

                ))}

            </tbody>

        </table>

    </div>

</div>

                </div>

            </div>
        </>
    );
}

export default Dashboard;