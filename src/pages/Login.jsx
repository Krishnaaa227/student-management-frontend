import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const response = await login({
                username,
                password
            });

            localStorage.setItem("token", response.data.token);

            alert("Login Successful!");

            navigate("/dashboard");

        } catch (error) {

            if (error.response) {
                alert(error.response.data.message || "Invalid Username or Password");
            } else {
                alert("Server Error");
            }

        }

    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">

            <div className="card shadow p-4" style={{ width: "400px" }}>

                <h2 className="text-center mb-4">
                    Student Management
                </h2>

                <input
                    className="form-control mb-3"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="btn btn-primary w-100"
                    onClick={handleLogin}
                >
                    Login
                </button>

                <p className="text-center mt-3">
                    Don't have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>

            </div>

        </div>
    );
}

export default Login;