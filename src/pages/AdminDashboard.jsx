import React, { useState } from "react";
import { Users, ClipboardList, Menu, X } from "lucide-react";
import UserManagement from "./UserManagement";
import InterviewManagement from "./InterviewManagement";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("users");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const menuItems = [
        { id: "users", label: "User Management", icon: <Users size={20} /> },
        { id: "interviews", label: "Interview Status", icon: <ClipboardList size={20} /> },
    ];

    return (<>
        <Navbar/>
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`${
                    sidebarOpen ? "w-64" : "w-20"
                } bg-white border-r shadow-sm transition-all duration-300 flex flex-col`}
            >
                <div className="flex items-center justify-between px-4 py-4 border-b">
                    <h2
                        className={`text-lg font-bold text-blue-600 transition-all ${
                            sidebarOpen ? "opacity-100" : "opacity-0 w-0"
                        }`}
                    >
                        Admin Panel
                    </h2>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-gray-500 hover:text-gray-800"
                    >
                        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                <nav className="flex-1 p-3 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                                activeTab === item.id
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-700 hover:bg-blue-50"
                            }`}
                        >
                            {item.icon}
                            {sidebarOpen && (
                                <span className="ml-3 text-sm font-medium">{item.label}</span>
                            )}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                {activeTab === "users" && <UserManagement />}
                {activeTab === "interviews" && <InterviewManagement />}
            </div>
        </div></>
    );
};

export default AdminDashboard;
