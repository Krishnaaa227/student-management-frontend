import { useEffect, useState } from "react";
import {
    getCourses,
    addCourse,
    updateCourse,
    deleteCourse
} from "../services/courseService";
import AdminLayout from "../layouts/AdminLayout";
import {
    FaSearch,
    FaPlus,
    FaEdit,
    FaTrash
} from "react-icons/fa";

import Swal from "sweetalert2";
import { toast } from "react-toastify";

function Courses() {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 8;

    const [editingCourse, setEditingCourse] = useState(null);

    const role = localStorage.getItem("role");

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {

        try {

            setLoading(true);

            const response = await getCourses();

            setCourses(response.data);

        } catch {

            toast.error("Failed to load courses");

        } finally {

            setLoading(false);

        }

    };

    const handleAddCourse = async () => {

        if (!courseName || !courseCode) {

            toast.warning("Please fill all fields");

            return;

        }

        try {

            await addCourse({

                courseName,
                courseCode

            });

            toast.success("Course Added Successfully");

            setCourseName("");
            setCourseCode("");

            loadCourses();

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to Add Course"

            );

        }

    };

    const handleDelete = async (id) => {

        const result = await Swal.fire({

            title: "Delete Course?",

            text: "You won't be able to recover it.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#d33",

            confirmButtonText: "Delete"

        });

        if (!result.isConfirmed) return;

        try {

            await deleteCourse(id);

            toast.success("Course Deleted");

            loadCourses();

        } catch {

            toast.error("Delete Failed");

        }

    };

    const handleUpdate = async () => {

        try {

            await updateCourse(

                editingCourse.id,

                editingCourse

            );

            toast.success("Course Updated");

            setEditingCourse(null);

            loadCourses();

        } catch {

            toast.error("Update Failed");

        }

    };

    const filteredCourses = courses.filter(course =>

        course.courseName

            .toLowerCase()

            .includes(search.toLowerCase())

        ||

        course.courseCode

            .toLowerCase()

            .includes(search.toLowerCase())

    );

    const indexOfLastCourse = currentPage * coursesPerPage;

    const indexOfFirstCourse =

        indexOfLastCourse - coursesPerPage;

    const currentCourses = filteredCourses.slice(

        indexOfFirstCourse,

        indexOfLastCourse

    );

    const totalPages = Math.ceil(

        filteredCourses.length / coursesPerPage

    );
    return (
<>
<AdminLayout>
    <div className="w-100">
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">

            <div>

                <h2 className="fw-bold">
                    Course Management
                </h2>

                <p className="text-muted">
                    Manage all available courses.
                </p>

            </div>

        </div>

        {/* Search */}

        <div className="input-group mb-4">

            <span className="input-group-text">

                <FaSearch />

            </span>

            <input
                className="form-control"
                placeholder="Search Course..."
                value={search}
                onChange={(e)=>{

                    setSearch(e.target.value);

                    setCurrentPage(1);

                }}
            />

        </div>

        {/* Add Course */}

        {role==="ADMIN" && (

        <div className="card shadow mb-4">

            <div className="card-body">

                <h4 className="mb-3">

                    Add New Course

                </h4>

                <div className="row g-3">

                    <div className="col-md-5">

                        <input

                            className="form-control"

                            placeholder="Course Name"

                            value={courseName}

                            onChange={(e)=>setCourseName(e.target.value)}

                        />

                    </div>

                    <div className="col-md-4">

                        <input

                            className="form-control"

                            placeholder="Course Code"

                            value={courseCode}

                            onChange={(e)=>setCourseCode(e.target.value)}

                        />

                    </div>

                    <div className="col-md-3">

                        <button

                            className="btn btn-success w-100"

                            onClick={handleAddCourse}

                        >

                            <FaPlus className="me-2"/>

                            Add Course

                        </button>

                    </div>

                </div>

            </div>

        </div>

        )}

        {/* Loading */}

        {loading ? (

            <div className="text-center py-5">

                <div className="spinner-border text-primary"></div>

                <p className="mt-3">

                    Loading Courses...

                </p>

            </div>

        ) : filteredCourses.length===0 ? (

            <div className="text-center py-5">

                <h4>No Courses Found</h4>

                <p className="text-muted">

                    No course records available.

                </p>

            </div>

        ) : (

        <>

        <div className="table-responsive">

            <table className="table table-hover shadow-sm align-middle">

                <thead className="table-primary">

                    <tr>

                        <th>ID</th>

                        <th>Course Name</th>

                        <th>Course Code</th>

                        <th className="text-center">

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {currentCourses.map(course=>(

                        <tr key={course.id}>

                            <td>{course.id}</td>

                            <td>{course.courseName}</td>

                            <td>{course.courseCode}</td>

                            <td className="text-center">

                                {role==="ADMIN" && (

                                <div className="d-flex justify-content-center gap-2">

                                    <button

                                        className="btn btn-warning btn-sm"

                                        data-bs-toggle="modal"

                                        data-bs-target="#editModal"

                                        onClick={()=>setEditingCourse(course)}

                                    >

                                        <FaEdit/>

                                    </button>

                                    <button

                                        className="btn btn-danger btn-sm"

                                        onClick={()=>handleDelete(course.id)}

                                    >

                                        <FaTrash/>

                                    </button>

                                </div>

                                )}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

        {/* Pagination */}

        <div className="d-flex justify-content-between align-items-center mt-4">

            <small>

                Showing

                {" "}

                {currentCourses.length}

                {" "}

                of

                {" "}

                {filteredCourses.length}

                {" "}

                courses

            </small>

            <ul className="pagination mb-0">

                <li className={`page-item ${currentPage===1?"disabled":""}`}>

                    <button

                        className="page-link"

                        onClick={()=>setCurrentPage(currentPage-1)}

                    >

                        Previous

                    </button>

                </li>

                {Array.from(

                    {length:totalPages},

                    (_,index)=>(

                        <li

                            key={index}

                            className={`page-item ${currentPage===index+1?"active":""}`}

                        >

                            <button

                                className="page-link"

                                onClick={()=>setCurrentPage(index+1)}

                            >

                                {index+1}

                            </button>

                        </li>

                    )

                )}

                <li className={`page-item ${currentPage===totalPages?"disabled":""}`}>

                    <button

                        className="page-link"

                        onClick={()=>setCurrentPage(currentPage+1)}

                    >

                        Next

                    </button>

                </li>

            </ul>

        </div>

        </>

        )}

    </div>

    {/* Edit Modal */}

    <div

        className="modal fade"

        id="editModal"

        tabIndex="-1"

    >

        <div className="modal-dialog">

            <div className="modal-content">

                <div className="modal-header">

                    <h5>Edit Course</h5>

                    <button

                        className="btn-close"

                        data-bs-dismiss="modal"

                    ></button>

                </div>

                <div className="modal-body">

                    {editingCourse && (

                    <>

                        <input

                            className="form-control mb-3"

                            value={editingCourse.courseName}

                            onChange={(e)=>

                                setEditingCourse({

                                    ...editingCourse,

                                    courseName:e.target.value

                                })

                            }

                        />

                        <input

                            className="form-control"

                            value={editingCourse.courseCode}

                            onChange={(e)=>

                                setEditingCourse({

                                    ...editingCourse,

                                    courseCode:e.target.value

                                })

                            }

                        />

                    </>

                    )}

                </div>

                <div className="modal-footer">

                    <button

                        className="btn btn-secondary"

                        data-bs-dismiss="modal"

                    >

                        Cancel

                    </button>

                    <button

                        className="btn btn-primary"

                        data-bs-dismiss="modal"

                        onClick={handleUpdate}

                    >

                        Save Changes

                    </button>

                </div>

            </div>

        </div>

    </div>
</AdminLayout>
</>
);

}

export default Courses;