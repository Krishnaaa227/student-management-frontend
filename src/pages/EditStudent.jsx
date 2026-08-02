import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentById, updateStudent } from "../services/studentService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import AdminLayout from "../layouts/AdminLayout";
import { getCourses } from "../services/courseService";
function EditStudent() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({});
    const [courses, setCourses] = useState([]);
    const handleChange = (e) => {

    const { name, value } = e.target;

    setStudent({
        ...student,
        [name]: name === "semester"
            ? Number(value)
            : value
    });

};
useEffect(() => {
    loadCourses();
    loadStudent();
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
const handleUpdate = async () => {

    try {

        await updateStudent(id, student);
        toast.success("Student Updated Successfully!");
        navigate("/students");

    } catch (error) {

        console.log(error);

        toast.error("Update Failed");

    }

};
const loadStudent = async () => {
    try {
        const response = await getStudentById(id);

        console.log(response.data);

        setStudent(response.data);

    } catch (error) {
        console.log(error);
        toast.error("Failed to load student");
    }
};
    return (

        <>
            <Adminlayout>

            <div className="w-100">

                <div className="card shadow">

                    <div className="card-body">

                        <h2 className="mb-4">Edit Student</h2>

<div className="row">

    <div className="col-md-6 mb-3">
        <input
            className="form-control"
            name="rollNo"
            value={student.rollNo || ""}
            onChange={handleChange}
        />
    </div>

    <div className="col-md-6 mb-3">
        <input
            className="form-control"
            name="firstName"
            value={student.firstName || ""}
            onChange={handleChange}
        />
    </div>

    <div className="col-md-6 mb-3">
        <input
            className="form-control"
            name="lastName"
            value={student.lastName || ""}
            onChange={handleChange}
        />
    </div>

    <div className="col-md-6 mb-3">
        <input
            className="form-control"
            name="email"
            value={student.email || ""}
            onChange={handleChange}
        />
    </div>

    <div className="col-md-6 mb-3">
        <input
            className="form-control"
            name="phone"
            value={student.phone || ""}
            onChange={handleChange}
        />
    </div>

   <div className="col-md-6 mb-3">

    <label className="form-label">Course</label>

    <select
        className="form-select"
        name="course"
        value={student.course || ""}
        onChange={handleChange}
    >

        <option value="">Select Course</option>

        {courses.map(course => (

            <option
                key={course.id}
                value={course.courseName}
            >
                {course.courseName}
            </option>

        ))}

    </select>

</div>

   <div className="col-md-6 mb-3">

    <label className="form-label">Semester</label>

    <select
        className="form-select"
        name="semester"
        value={student.semester || ""}
        onChange={handleChange}
    >

        <option value="">Select Semester</option>

        {[1,2,3,4,5,6,7,8].map((sem) => (

            <option
                key={sem}
                value={sem}
            >
                Semester {sem}
            </option>

        ))}

    </select>
</div>
</div>

<div className="text-center mt-3">

    <button
        className="btn btn-primary px-5"
        onClick={handleUpdate}
    >
        Update Student
    </button>

</div>

                    </div>

                </div>

            </div>
            </Adminlayout>
        </>

    );

}

export default EditStudent;