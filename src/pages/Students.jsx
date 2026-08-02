import { useEffect, useState } from "react";
import {
    getAllStudents,
    deleteStudent
} from "../services/studentService";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { exportStudentsToExcel } from "../utils/exportExcel";
import {
    FaSearch,
    FaEdit,
    FaTrash,
    FaPlus,
    FaFileExcel,
    FaEye
} from "react-icons/fa";

function Students() {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 10;

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
            confirmButtonText: "Delete"

        });

        if (!result.isConfirmed) return;

        try {

            await deleteStudent(id);

            toast.success("Student Deleted Successfully!");

            loadStudents();

        } catch (error) {

            toast.error("Delete Failed");

        }

    };

    const filteredStudents = students.filter(student =>

        student.rollNo
            .toString()
            .includes(search)

        ||

        `${student.firstName} ${student.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    const indexOfLastStudent = currentPage * studentsPerPage;

    const indexOfFirstStudent =
        indexOfLastStudent - studentsPerPage;

    const currentStudents =
        filteredStudents.slice(
            indexOfFirstStudent,
            indexOfLastStudent
        );

    const totalPages =
        Math.ceil(
            filteredStudents.length /
            studentsPerPage
        );

    return (

        <>
        <AdminLayout>
            <div
    className="container-fluid"
    style={{
        marginLeft: "270px",
        padding: "30px"
    }}
>
<Header/>
                <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">

                    <div>

                        <h2 className="fw-bold">

                            Student Management

                        </h2>

                        <p className="text-muted">

                            Manage all registered students.

                        </p>

                    </div>

                    {role === "ADMIN" && (

                        <div className="d-flex gap-2 mt-3 mt-md-0">

                            <button

                                className="btn btn-success"

                                onClick={() =>
                                    exportStudentsToExcel(filteredStudents)
                                }

                            >

                                <FaFileExcel className="me-2" />

                                Export

                            </button>

                            <Link

                                to="/add-student"

                                className="btn btn-primary"

                            >

                                <FaPlus className="me-2" />

                                Add Student

                            </Link>

                        </div>

                    )}

                </div>

                <div className="input-group mb-4">

                    <span className="input-group-text">

                        <FaSearch />

                    </span>

                    <input

                        type="text"

                        className="form-control"

                        placeholder="Search by Roll Number or Name..."

                        value={search}

                        onChange={(e) => {

                            setSearch(e.target.value);

                            setCurrentPage(1);

                        }}

                    />

                </div>

                {loading ? (

                    <div className="text-center mt-5">

                        <div
                            className="spinner-border text-primary"
                        ></div>

                        <p className="mt-3">

                            Loading Students...

                        </p>

                    </div>

                ) : filteredStudents.length === 0 ? (

                    <div className="text-center py-5">

                        <h4>No Students Found</h4>

                        <p className="text-muted">

                            There are no student records available.

                        </p>

                    </div>

                ) : (

                    <>

                        <div className="table-responsive">

                            <table className="table table-hover align-middle shadow-sm">

                                <thead className="table-primary">

                                    <tr>

                                        <th>Roll No</th>

                                        <th>Name</th>

                                        <th>Course</th>

                                        <th>Semester</th>

                                        <th className="text-center">

                                            Actions

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>
                            {currentStudents.map((student) => (

    <tr key={student.id}>

        <td>{student.rollNo}</td>

        <td>

            <strong>
                {student.firstName} {student.lastName}
            </strong>

        </td>

        <td>

            <span className="badge bg-info text-dark">

                {student.course}

            </span>

        </td>

        <td>

            <span className="badge bg-secondary">

                Sem {student.semester}

            </span>

        </td>

        <td className="text-center">

            {role === "ADMIN" && (

                <div className="d-flex justify-content-center gap-2">

    <button
        className="btn btn-info btn-sm"
        title="View"
        data-bs-toggle="modal"
        data-bs-target="#studentModal"
        onClick={() => setSelectedStudent(student)}
    >
        <FaEye />
    </button>

    <Link
        to={`/edit-student/${student.id}`}
        className="btn btn-warning btn-sm"
        title="Edit"
    >
        <FaEdit />
    </Link>

    <button
        className="btn btn-danger btn-sm"
        title="Delete"
        onClick={() => handleDelete(student.id)}
    >
        <FaTrash />
    </button>

</div>

            )}

        </td>

    </tr>

))}

</tbody>

</table>

</div>

<div className="d-flex justify-content-between align-items-center mt-4 flex-wrap">

    <small className="text-muted">

        Showing

        <strong> {currentStudents.length} </strong>

        of

        <strong> {filteredStudents.length} </strong>

        students

    </small>

    <nav>

        <ul className="pagination mb-0">

            <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
            >

                <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                >

                    Previous

                </button>

            </li>

            {Array.from(
                { length: totalPages },
                (_, index) => (

                    <li
                        key={index}
                        className={`page-item ${
                            currentPage === index + 1 ? "active" : ""
                        }`}
                    >

                        <button
                            className="page-link"
                            onClick={() =>
                                setCurrentPage(index + 1)
                            }
                        >

                            {index + 1}

                        </button>

                    </li>

                )
            )}

            <li
                className={`page-item ${
                    currentPage === totalPages ||
                    totalPages === 0
                        ? "disabled"
                        : ""
                }`}
            >

                <button
                    className="page-link"
                    onClick={() =>
                        setCurrentPage(currentPage + 1)
                    }
                >

                    Next

                </button>

            </li>

        </ul>

    </nav>

</div>

</>

)}

</div>
<div
    className="modal fade"
    id="studentModal"
    tabIndex="-1"
>
    <div className="modal-dialog">

        <div className="modal-content">

            <div className="modal-header bg-primary text-white">

                <h5 className="modal-title">
                    Student Details
                </h5>

                <button
                    className="btn-close btn-close-white"
                    data-bs-dismiss="modal"
                ></button>

            </div>

            <div className="modal-body">

                {selectedStudent && (

                    <>
                        <p><strong>Roll No:</strong> {selectedStudent.rollNo}</p>

                        <p><strong>Name:</strong> {selectedStudent.firstName} {selectedStudent.lastName}</p>

                        <p><strong>Email:</strong> {selectedStudent.email}</p>

                        <p><strong>Phone:</strong> {selectedStudent.phone}</p>

                        <p><strong>Course:</strong> {selectedStudent.course}</p>

                        <p><strong>Semester:</strong> {selectedStudent.semester}</p>
                    </>

                )}

            </div>

            <div className="modal-footer">

                <button
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                >
                    Close
                </button>

            </div>

        </div>

    </div>

</div>
</AdminLayout>
</>
);

}

export default Students;