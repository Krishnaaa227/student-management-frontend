import "../styles/Header.css";
import { FaBell, FaUserCircle } from "react-icons/fa";

function Header() {
    const role = localStorage.getItem("role");

    return (
        <header className="app-header">

            <div>

                <h3 className="mb-0">
                    Student Management System
                </h3>

                <small className="text-muted">
                    Welcome back 👋
                </small>

            </div>

            <div className="d-flex align-items-center gap-4">

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