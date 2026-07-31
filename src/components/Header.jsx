import {
    FaBell,
    FaUserCircle
} from "react-icons/fa";
import "../styles/Header.css";
function Header() {

    return (

        <div className="header">

            <div>

                <h3 className="mb-0">
                    Welcome Back 👋
                </h3>

                <small className="text-muted">
                    Student Management System
                </small>

            </div>

            <div className="header-right">

                <button className="icon-btn">

                    <FaBell />

                </button>

                <div className="profile">

                    <FaUserCircle size={30} />

                    <span>

                        Admin

                    </span>

                </div>

            </div>

        </div>

    );

}

export default Header;