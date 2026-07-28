import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
function Login() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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
    disabled={loading}
>

    {loading ? (
        <>
            <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
            ></span>

            Logging in...
        </>
    ) : (
        "Login"
    )}

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