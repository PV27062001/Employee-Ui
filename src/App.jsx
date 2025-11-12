import Signup from "./pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./utils/PrivateRoute";
import UserDashboard from "./pages/UserDashboard";   // ✅ new modular dashboard
import AdminDashboard from "./pages/AdminDashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected USER Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute allowedRoles={["USER"]}>
                            <UserDashboard />
                        </PrivateRoute>
                    }
                />

                {/* Protected ADMIN Dashboard */}
                <Route
                    path="/admin"
                    element={
                        <PrivateRoute allowedRoles={["ADMIN"]}>
                            <AdminDashboard />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
