import React, { useEffect, useState } from "react";
import SalarySection from "./SalarySection";
import WorkTimeSection from "./WorkTimeSection";
import ReferralsSection from "./ReferralsSection";
import InterviewSection from "./InterviewSection";
import {jwtDecode} from "jwt-decode";
import Navbar from "../components/Navbar";

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [user, setUser] = useState(null);

    // 🔹 Decode JWT to get username
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
            <div className="flex items-center justify-center h-screen text-gray-600">
                Loading your dashboard...
            </div>
        );
    }

    return (
        <>
        <Navbar/>
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Top Navbar */}

            <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-semibold text-gray-800">
                    Welcome, <span className="text-blue-600">{user.userName}</span> 👋
                </h1>
            </header>

            {/* Sidebar + Content Layout */}
            <div className="flex flex-grow">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r shadow-md">
                    <nav className="flex flex-col py-6 space-y-2">
                        {[
                            { key: "dashboard", label: "💼 Dashboard" },
                            { key: "worktime", label: "⏰ Work Time" },
                            { key: "referrals", label: "🤝 Referrals" },
                            { key: "interviews", label: "🎯 Interviews" },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`text-left px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                                    activeTab === tab.key
                                        ? "bg-blue-100 text-blue-700"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">{renderContent()}</main>
            </div>
        </div></>
    );
};

export default UserDashboard;
