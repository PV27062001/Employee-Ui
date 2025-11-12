import React, { useEffect, useState } from "react";
import SalarySection from "./SalarySection";
import WorkTimeSection from "./WorkTimeSection";
import ReferralsSection from "./ReferralsSection";
import InterviewSection from "./InterviewSection";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import {
    Home,
    Clock,
    Users,
    Briefcase,
    LogOut,
} from "lucide-react";

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [user, setUser] = useState(null);

    // Decode JWT to get username
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const username = decoded?.sub || "Unknown User";
                setUser({ userName: username });
            } catch (err) {
                console.error("Invalid token:", err);
            }
        }
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                return <SalarySection user={user} />;
            case "worktime":
                return <WorkTimeSection user={user} />;
            case "referrals":
                return <ReferralsSection user={user} />;
            case "interviews":
                return <InterviewSection user={user} />;
            default:
                return <SalarySection user={user} />;
        }
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
                Loading your dashboard...
            </div>
        );
    }

    const tabs = [
        { key: "dashboard", label: "Dashboard", icon: Home },
        { key: "worktime", label: "Work Time", icon: Clock },
        { key: "referrals", label: "Referrals", icon: Users },
        { key: "interviews", label: "Interviews", icon: Briefcase },
    ];

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-200">
                {/* Sidebar */}
                <aside className="w-64 bg-white/80 backdrop-blur-lg border-r shadow-md flex flex-col justify-between">
                    <div>
                        {/* Profile Section */}
                        <div className="p-6 border-b border-gray-200 text-center">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 mx-auto flex items-center justify-center rounded-full text-xl font-bold">
                                {user.userName.charAt(0).toUpperCase()}
                            </div>
                            <h2 className="mt-3 text-lg font-semibold text-gray-800">
                                {user.userName}
                            </h2>
                            <p className="text-sm text-gray-500">Employee Portal</p>
                        </div>

                        {/* Navigation Tabs */}
                        <nav className="flex flex-col p-4 space-y-2">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const active = activeTab === tab.key;
                                return (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                                            active
                                                ? "bg-blue-600 text-white shadow-md"
                                                : "text-gray-700 hover:bg-blue-50"
                                        }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Logout Section */}
                    <div className="border-t p-4">
                        <button
                            onClick={() => {
                                localStorage.removeItem("access_token");
                                window.location.href = "/login";
                            }}
                            className="flex items-center gap-3 text-gray-600 hover:text-red-600 transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <motion.main
                    key={activeTab}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 p-10 overflow-y-auto"
                >
                    {/* Section Header */}
                    <header className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            {tabs.find((t) => t.key === activeTab)?.label}
                        </h1>
                        {/*<div className="text-sm text-gray-500">*/}
                        {/*    Welcome back, <span className="font-medium text-blue-600">{user.userName}</span>*/}
                        {/*</div>*/}
                    </header>

                    {/* Section Content */}
                    <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border p-8">
                        {renderContent()}
                    </div>
                </motion.main>
            </div>
        </>
    );
};

export default UserDashboard;
