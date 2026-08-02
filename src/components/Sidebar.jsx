import {
    FaHome,
    FaUserGraduate,
    FaBook,
    FaSignOutAlt,
    FaTimes
} from "react-icons/fa";
import "../styles/Sidebar.css";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {

    const navigate = useNavigate();

    const logout = async () => {

    const result = await Swal.fire({

        title: "Logout?",
        text: "Are you sure you want to logout?",
        icon: "question",

        showCancelButton: true,

        confirmButtonText: "Logout",
        cancelButtonText: "Cancel",

        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d"

    });

    if (!result.isConfirmed) return;

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    toast.success("Logged out successfully!");

    navigate("/", { replace: true });

};

    return (
        <>

            {/* Overlay */}

            <div
                className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            <div
                className={`sidebar ${sidebarOpen ? "show" : ""}`}
            >

                <button
                    className="close-sidebar"
                    onClick={() => setSidebarOpen(false)}
                >
                    <FaTimes />
                </button>

                <div className="logo">

                    🎓

                    <h4>SMS Admin</h4>

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