import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { logout } = useContext(AuthContext);

    return (
        <nav className="bg-gray-800 p-4 text-white flex justify-between">
            <h1 className="font-bold">Employee Portal</h1>
            <button
                onClick={logout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
