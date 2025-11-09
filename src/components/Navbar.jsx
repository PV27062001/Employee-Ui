import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="flex justify-between items-center bg-white shadow-md px-6 py-4 sticky top-0 z-50">
            {/* Brand */}
            <div
                onClick={() =>
                    user?.role === "ADMIN" ? navigate("/admin") : navigate("/dashboard")
                }
                className="text-xl font-semibold text-blue-700 cursor-pointer"
            >
                Employee Portal
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
          <span className="text-gray-800 font-medium">
            {user?.userName || "User"}
          </span>
                    {user?.role && (
                        <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                user.role === "ADMIN"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-green-100 text-green-700"
                            }`}
                        >
              {user.role}
            </span>
                    )}
                </div>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-red-600 transition-all"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
