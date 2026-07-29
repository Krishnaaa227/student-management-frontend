import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import {
    getCourses,
    addCourse,
    deleteCourse,
    updateCourse
} from "../services/courseService";

import Swal from "sweetalert2";
function Courses() {

    const [courses, setCourses] = useState([]);
    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {

        try {

            const response = await getCourses();

            setCourses(response.data);

        } catch (error) {

            console.log(error);

            toast.error("Failed to load courses");

        }

    };
const handleAddCourse = async () => {

    try {

        await addCourse({
            courseName,
            courseCode
        });

        toast.success("Course Added Successfully");

        setCourseName("");
        loadCourses();

    } catch (error) {

        toast.error(
            error.response?.data?.message || "Failed to Add Course"
        );

    }

};
const handleDelete = async (id) => {

    const result = await Swal.fire({

        title: "Delete Course?",

        text: "You won't be able to recover it.",

        icon: "warning",

        showCancelButton: true,

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
    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">
                    Course Management
                </h2>
                <input

className="form-control mb-3"

placeholder="Search Course"

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>
                <div className="card shadow mb-4">

    <div className="card-body">

        <h4>Add Course</h4>

        <div className="row">

            <div className="col-md-5">

                <input

                    className="form-control"

                    placeholder="Course Name"

                    value={courseName}

                    onChange={(e)=>setCourseName(e.target.value)}

                />

            </div>

            <div className="col-md-3">

                <input

                    className="form-control"

                    placeholder="Course Code"

                    value={courseCode}

                    onChange={(e)=>setCourseCode(e.target.value)}

                />

            </div>

            <div className="col-md-2">
                <div className="col-md-2 d-grid">
                    <button className="btn btn-success"onClick={handleAddCourse}>
                        Add Course
                        </button>
                        </div>

            </div>

        </div>

    </div>

</div>

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">
                        <tr>
    <th>ID</th>
    <th>Course Name</th>
    <th>Course Code</th>
    <th>Actions</th>
</tr>

                    </thead>

                    <tbody>

                        {courses

.filter(course=>

course.courseName

.toLowerCase()

.includes(search.toLowerCase())

||

course.courseCode

.toLowerCase()

.includes(search.toLowerCase())

)

.map(course=>(

                            <tr key={course.id}>

    <td>{course.id}</td>

    <td>{course.courseName}</td>

    <td>{course.courseCode}</td>

    <td>

        <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(course.id)}
        >
            Delete
        </button>

    </td>

</tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default Courses;