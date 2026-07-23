import { useState } from "react";
import Navbar from "../components/Navbar";
import { addStudent } from "../services/studentService";
import { useNavigate } from "react-router-dom";
function AddStudent() {

    const navigate = useNavigate();

    const [student, setStudent] = useState({
        rollNo: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        course: "",
        semester: ""
    });

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        console.log("TOKEN:", localStorage.getItem("token"));
        try {

            await addStudent(student);

            alert("Student Added Successfully!");

            navigate("/students");

        } catch (error) {

            console.log(error);

            if (error.response) {
                alert(error.response.data.message || "Failed to add student");
            } else {
                alert("Server Error");
            }

        }

    };

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <div className="card shadow">

                    <div className="card-body">

                        <h2 className="mb-4">Add Student</h2>

                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <input
                                    className="form-control"
                                    placeholder="Roll Number"
                                    name="rollNo"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <input
                                    className="form-control"
                                    placeholder="First Name"
                                    name="firstName"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <input
                                    className="form-control"
                                    placeholder="Last Name"
                                    name="lastName"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <input
                                    className="form-control"
                                    placeholder="Email"
                                    name="email"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <input
                                    className="form-control"
                                    placeholder="Phone"
                                    name="phone"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <input
                                    className="form-control"
                                    placeholder="Course"
                                    name="course"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <input
                                    className="form-control"
                                    placeholder="Semester"
                                    name="semester"
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <button
    className="btn btn-success"
    onClick={handleSubmit}
>
    Save Student
</button>

                    </div>

                </div>

            </div>

        </>
    );
}

export default AddStudent;