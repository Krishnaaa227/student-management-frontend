import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold"
                    to="/dashboard"
                >
                    🎓 Student Management
                </Link>

                <button
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">

                            <Link
                                className={`nav-link ${
                                    location.pathname === "/dashboard"
                                        ? "active"
                                        : ""
                                }`}
                                to="/dashboard"
                            >
                                Dashboard
                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                className={`nav-link ${
                                    location.pathname === "/students"
                                        ? "active"
                                        : ""
                                }`}
                                to="/students"
                            >
                                Students
                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                className={`nav-link ${
                                    location.pathname === "/courses"
                                        ? "active"
                                        : ""
                                }`}
                                to="/courses"
                            >
                                Courses
                            </Link>

                        </li>

                        <li className="nav-item ms-2">

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={logout}
                            >
                                Logout
                            </button>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;