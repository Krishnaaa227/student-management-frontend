import {
    FaHome,
    FaUserGraduate,
    FaBook,
    FaSignOutAlt,
    FaTimes
} from "react-icons/fa";

import "../styles/Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/login");

    };

    return (

        <>

            {/* Overlay */}

            <div
                className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            <div className={`sidebar ${sidebarOpen ? "show" : ""}`}>

                <div className="logo">

                    <div className="d-flex justify-content-between align-items-center">

                        <div>

                            🎓

                            <h4>SMS Admin</h4>

                        </div>

                        <button
                            className="close-sidebar"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <FaTimes />
                        </button>

                    </div>

                </div>

                <NavLink
                    to="/dashboard"
                    onClick={() => setSidebarOpen(false)}
                >
                    <FaHome />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/students"
                    onClick={() => setSidebarOpen(false)}
                >
                    <FaUserGraduate />
                    Students
                </NavLink>

                <NavLink
                    to="/courses"
                    onClick={() => setSidebarOpen(false)}
                >
                    <FaBook />
                    Courses
                </NavLink>
                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </div>

        </>

    );

}

export default Sidebar;