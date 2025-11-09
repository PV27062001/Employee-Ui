import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import { AuthContext } from "./context/AuthContext.js";

function App() {
    const { user, role } = useContext(AuthContext);

    return (
        <Router>
            <Routes>

                {/* Public routes */}
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected route for USER */}
                <Route
                    path="/dashboard"
                    element={
                        user ? (
                            <Dashboard />
                        ) : (
                            <Navigate to="/" replace />
                        )
                    }
                />

                {/* Protected route for ADMIN */}
                <Route
                    path="/admin"
                    element={
                        user && role === "ADMIN" ? (
                            <AdminDashboard />
                        ) : (
                            <Navigate to="/" replace />
                        )
                    }
                />

                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
        </Router>
    );
}

export default App;
