import { useState } from "react";
import Navbar from "../components/Navbar";
import { addStudent } from "../services/studentService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCourses } from "../services/courseService";
import Swal from "sweetalert2";
function AddStudent() {

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const [student, setStudent] = useState({
        rollNo: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        course: "",
        semester: ""
    });
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
    const handleChange = (e) => {

        const { name, value } = e.target;

        setStudent({
            ...student,
            [name]: name === "semester"
                ? Number(value)
                : value
        });

        // Remove error while typing
        setErrors({
            ...errors,
            [name]: ""
        });

    };

    const handleSubmit = async () => {
        setLoading(true);
        setErrors({});

        try {

            await addStudent(student);
            toast.success("Student Added Successfully!");

            navigate("/students");

        } catch (error) {

            console.log(error);

            if (error.response) {
                console.log(error.response.data);
                setErrors(error.response.data);
            } else {
                toast.error("Server Error");
            }

        }finally {
    setLoading(false);
}

    };

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <div className="card shadow-lg border-0">

                    <div className="card-body p-4">

                        <h2 className="text-center mb-4">
                            Add Student
                        </h2>

                        <div className="row">

                            {/* Roll Number */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Roll Number
                                </label>

                                <input
                                    className={`form-control ${errors.rollNo ? "is-invalid" : ""}`}
                                    placeholder="Enter Roll Number"
                                    name="rollNo"
                                    value={student.rollNo}
                                    onChange={handleChange}
                                />

                                <div className="invalid-feedback">
                                    {errors.rollNo}
                                </div>

                            </div>

                            {/* First Name */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    First Name
                                </label>

                                <input
                                    className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                                    placeholder="Enter First Name"
                                    name="firstName"
                                    value={student.firstName}
                                    onChange={handleChange}
                                />

                                <div className="invalid-feedback">
                                    {errors.firstName}
                                </div>

                            </div>

                            {/* Last Name */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Last Name
                                </label>

                                <input
                                    className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                                    placeholder="Enter Last Name"
                                    name="lastName"
                                    value={student.lastName}
                                    onChange={handleChange}
                                />

                                <div className="invalid-feedback">
                                    {errors.lastName}
                                </div>

                            </div>

                            {/* Email */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                    placeholder="Enter Email"
                                    name="email"
                                    value={student.email}
                                    onChange={handleChange}
                                />

                                <div className="invalid-feedback">
                                    {errors.email}
                                </div>

                            </div>

                            {/* Phone */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Phone Number
                                </label>

                                <input
                                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                                    placeholder="Enter Phone Number"
                                    name="phone"
                                    value={student.phone}
                                    onChange={handleChange}
                                />

                                <div className="invalid-feedback">
                                    {errors.phone}
                                </div>

                            </div>

                            {/* Course */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Course
                                </label>

                                <select
    className="form-select"
    name="course"
    value={student.course}
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

                                <div className="invalid-feedback">
                                    {errors.course}
                                </div>

                            </div>

                            {/* Semester */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Semester
                                </label>

                                <select
                                    className={`form-select ${errors.semester ? "is-invalid" : ""}`}
                                    name="semester"
                                    value={student.semester}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Semester
                                    </option>

                                    {[1,2,3,4,5,6,7,8].map((sem)=>(
                                        <option key={sem} value={sem}>
                                            Semester {sem}
                                        </option>
                                    ))}

                                </select>

                                <div className="invalid-feedback">
                                    {errors.semester}
                                </div>

                            </div>

                        </div>

                        <div className="text-center mt-3">

                            <button
    className="btn btn-success px-5"
    onClick={handleSubmit}
    disabled={loading}
>

    {loading ? (
        <>
            <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
            ></span>

            Saving...
        </>
    ) : (
        "Save Student"
    )}

</button>

                        </div>

                    </div>

                </div>

            </div>

        </>
    );
}

export default AddStudent;