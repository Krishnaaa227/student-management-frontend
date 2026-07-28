import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
    getAllStudents,
    deleteStudent
} from "../services/studentService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { exportStudentsToExcel } from "../utils/exportExcel";
function Students() {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const role = localStorage.getItem("role");
    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {

        try {

            setLoading(true);

            const response = await getAllStudents();

            setStudents(response.data);

        } catch (error) {

            console.log(error);
           toast.error("Failed to fetch students");

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        const result = await Swal.fire({
    title: "Delete Student?",
    text: "You won't be able to recover this student.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel"
});

if (!result.isConfirmed) return;

        try {

            await deleteStudent(id);

            toast.success("Student Deleted Successfully!");
            loadStudents();

        } catch (error) {

            console.log(error);

            toast.error("Delete Failed");

        }

    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">

    <h2>Students</h2>

    {role === "ADMIN" && (

        <div>

            <button
                className="btn btn-success me-2"
                onClick={() =>
    exportStudentsToExcel(
        students.filter(student =>
            student.rollNo.toString().includes(search) ||
            `${student.firstName} ${student.lastName}`
                .toLowerCase()
                .includes(search.toLowerCase())
        )
    )
}
            >
                📊 Export Excel
            </button>

            <Link
                to="/add-student"
                className="btn btn-primary"
            >
                + Add Student
            </Link>

        </div>

    )}

</div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Roll No or Name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                {loading ? (

                    <div className="text-center mt-5">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        ></div>

                        <p className="mt-3">
                            Loading Students...
                        </p>

                    </div>

                ) : students.length === 0 ? (

                    <div className="alert alert-info text-center">

                        No Students Found

                    </div>

                ) : (

                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">

                            <tr>

                                <th>Roll No</th>
                                <th>Name</th>
                                <th>Course</th>
                                <th>Semester</th>
                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {students

                                .filter(student =>

                                    student.rollNo
                                        .toString()
                                        .includes(search)

                                    ||

                                    `${student.firstName} ${student.lastName}`
                                        .toLowerCase()
                                        .includes(search.toLowerCase())

                                )

                                .map(student => (

                                    <tr key={student.id}>

                                        <td>{student.rollNo}</td>

                                        <td>
                                            {student.firstName} {student.lastName}
                                        </td>

                                        <td>{student.course}</td>

                                        <td>{student.semester}</td>

                                        <td>

    {role === "ADMIN" && (
        <>
            <Link
                to={`/edit-student/${student.id}`}
                className="btn btn-warning btn-sm me-2"
            >
                Edit
            </Link>

            <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(student.id)}
            >
                Delete
            </button>
        </>
    )}

</td>

                                    </tr>

                                ))}

                        </tbody>

                    </table>

                )}

            </div>

        </>
    );
}

export default Students;