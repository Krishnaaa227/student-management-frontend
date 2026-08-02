import "../styles/Header.css";
import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";

function Header({ setSidebarOpen }) {

    const role = localStorage.getItem("role");

    return (

        <header className="app-header">

            <div className="d-flex align-items-center gap-3">

                <button
                    className="menu-btn"
                    onClick={() => setSidebarOpen(true)}
                >
                    <FaBars />
                </button>

                <div>

                    <h3 className="mb-0">
                        Student Management System
                    </h3>

                    <small className="text-muted">
                        Welcome back 👋
                    </small>

                </div>

            </div>

            <div className="d-flex align-items-center gap-3 header-right">

                <FaBell
                    size={20}
                    className="text-secondary"
                />

                <div className="d-flex align-items-center gap-2">

                    <FaUserCircle size={35} />

                    <div>

                        <strong>{role}</strong>

                        <br />

                        <small className="text-muted">
                            Logged In
                        </small>

                    </div>

                </div>

            </div>

        </header>

    );

}

export default Header;