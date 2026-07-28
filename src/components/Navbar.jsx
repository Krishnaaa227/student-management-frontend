import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/", { replace: true });

}

    return (

        <nav className="navbar navbar-dark bg-dark">

            <div className="container">

                <Link
                    className="navbar-brand"
                    to="/dashboard">

                    Student Management

                </Link>
                <Link
                to="/courses"
                className="btn btn-outline-light me-2">
                    Courses
                    </Link>
                <button
                    className="btn btn-danger"
                    onClick={logout}>

                    Logout

                </button>

            </div>

        </nav>

    );

}

export default Navbar;