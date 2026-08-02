import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { toast } from "react-toastify";

import {
    FaUserGraduate,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

import "../styles/Login.css";

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {

        if (!username || !email || !password) {
            toast.warning("Please fill all fields");
            return;
        }

        setLoading(true);

        try {

            await register({
                username,
                email,
                password
            });

            toast.success("Registration Successful!");

            setUsername("");
            setEmail("");
            setPassword("");

            navigate("/");

        } catch (error) {

            if (error.response) {

                toast.error(
                    error.response.data.message ||
                    "Registration Failed"
                );

            } else {

                toast.error("Server Error");

            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-page">

            <div className="login-card">

                <div className="login-logo">
                    <FaUserGraduate />
                </div>

                <h2 className="login-title">
                    Create Account
                </h2>

                <input
                    className="form-control mb-3"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className="password-box mb-3">

                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <span
                        className="password-icon"
                        onClick={() => setShowPassword(!showPassword)}
                    >

                        {showPassword ?

                            <FaEyeSlash />

                            :

                            <FaEye />

                        }

                    </span>

                </div>

                <button
                    className="btn btn-light w-100"
                    onClick={handleRegister}
                    disabled={loading}
                >

                    {loading ? (

                        <>
                            <span
                                className="spinner-border spinner-border-sm me-2"
                            ></span>

                            Registering...

                        </>

                    ) : (

                        "Register"

                    )}

                </button>

                <p className="text-center mt-4">

                    Already have an account?

                    <Link
                        to="/"
                        className="ms-2"
                    >
                        Login
                    </Link>

                </p>

                <div className="footer-text">

                    <strong>
                        Student Management System
                    </strong>

                    <br />

                    Version 1.0

                    <br />

                    © 2026 Krishna Sheladiya

                </div>

            </div>

        </div>

    );

}

export default Register;