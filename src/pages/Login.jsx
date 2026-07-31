import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import { toast } from "react-toastify";

import {
    FaUserGraduate,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

import "../styles/Login.css";
function Login() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

    setLoading(true);

    try {

        const response = await login({
            username,
            password
        });

        localStorage.setItem("token", response.data.token);

        localStorage.setItem("role", response.data.role);

        toast.success("Login Successful!");

        navigate("/dashboard");

    } catch (error) {

        if (error.response) {
            toast.error(error.response.data.message || "Invalid Username or Password");
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
            Student Management System
        </h2>

        <input
            className="form-control mb-3"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
        />

        <div className="password-box mb-3">

            <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />

            <span
                className="password-icon"
                onClick={()=>setShowPassword(!showPassword)}
            >

                {showPassword ? <FaEyeSlash/> : <FaEye/>}

            </span>

        </div>

        <button
            className="btn btn-light w-100"
            onClick={handleLogin}
            disabled={loading}
        >

            {loading ?

            <>
                <span
                    className="spinner-border spinner-border-sm me-2"
                ></span>

                Logging in...
            </>

            :

            "Login"}

        </button>

        <p className="text-center mt-4">

            Don't have an account?

            <Link
                to="/register"
                className="ms-2"
            >
                Register
            </Link>

        </p>

        <div className="footer-text">

    <strong>Student Management System</strong>

    <br/>

    Version 1.0

    <br/>

    © 2026 Krishna Sheladiya

</div>

    </div>

</div>
    );
}

export default Login;