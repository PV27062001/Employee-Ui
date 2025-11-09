import React from "react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="p-6 text-xl text-gray-700">
                Welcome, user! View and apply for interviews here.
            </div>
        </div>
    );
};

export default Dashboard;
