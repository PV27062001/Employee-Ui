import React from "react";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="p-6 text-xl text-gray-700">
                Welcome Admin — manage interview applications here.
            </div>
        </div>
    );
};

export default AdminDashboard;
