import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../services/authService";

function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {

        try {

            const response = await register({
                username,
                password
            });

            alert(response.data);

            setUsername("");
            setPassword("");

        } catch (error) {

            if (error.response) {
                alert(error.response.data.message || "Registration Failed");
            } else {
                alert("Server Error");
            }

        }

    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">

            <div className="card shadow p-4" style={{ width: "400px" }}>

                <h2 className="text-center mb-4">
                    Register
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
                    className="btn btn-success w-100"
                    onClick={handleRegister}
                >
                    Register
                </button>

                <p className="text-center mt-3">
                    Already have an account?{" "}
                    <Link to="/">Login</Link>
                </p>

            </div>

        </div>
    );
}

export default Register;