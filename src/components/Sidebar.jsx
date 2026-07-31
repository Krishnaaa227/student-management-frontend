import {
    FaHome,
    FaUserGraduate,
    FaBook,
    FaUsers,
    FaSignOutAlt
} from "react-icons/fa";
import "../styles/Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/login");

    };

    return (

        <div className="sidebar">

            <div className="logo">

                🎓

                <h4>SMS Admin</h4>

            </div>

            <NavLink to="/dashboard">
                <FaHome />
                Dashboard
            </NavLink>

            <NavLink to="/students">
                <FaUserGraduate />
                Students
            </NavLink>

            <NavLink to="/courses">
                <FaBook />
                Courses
            </NavLink>

            <NavLink to="/users">
                <FaUsers />
                Users
            </NavLink>

            <button
                className="logout-btn"
                onClick={logout}
            >

                <FaSignOutAlt />

                Logout

            </button>

        </div>

    );

}

export default Sidebar;