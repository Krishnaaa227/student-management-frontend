import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddStudent from "./pages/AddStudent";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import EditStudent from "./pages/EditStudent";
import ProtectedRoute from "./components/ProtectedRoute";
import Courses from "./pages/Courses";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />

                {/* ADD THIS */}
                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/students"
                    element={
                        <ProtectedRoute>
                            <Students />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add-student"
                    element={
                        <ProtectedRoute>
                            <AddStudent />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-student/:id"
                    element={
                        <ProtectedRoute>
                            <EditStudent />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/courses"
                    element={
                        <ProtectedRoute>
                            <Courses />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;