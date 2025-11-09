import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [departments, setDepartments] = useState([]);
    const [statusData, setStatusData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch departments
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await api.get("/department/all");
                setDepartments(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDepartments();
    }, []);

    // Fetch user interview status
    const fetchStatus = async () => {
        try {
            const res = await api.get(`/interview/my-status`, {
                params: { userName: user.userName },
            });
            setStatusData(res.data);
        } catch (err) {
            console.error("No application found yet");
        }
    };

    useEffect(() => {
        fetchStatus();
    }, []);

    // Apply for interview
    const handleApply = async (deptName) => {
        setLoading(true);
        try {
            await api.post("/interview/apply", {
                userName: user.userName,
                departmentName: [deptName],
            });
            toast.success(`Applied successfully for ${deptName}!`);
            fetchStatus();
        } catch (err) {
            toast.error("Failed to apply for interview");
        } finally {
            setLoading(false);
        }
    };

    // check if already applied
    const appliedDepts = statusData
        ? Object.keys(statusData.statusByDepartment || {})
        : [];

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 px-8 py-10">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                    Welcome back, {user.userName} 👋
                </h1>

                {/* Available Departments */}
                <section className="mb-10">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        Available Departments
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {departments.map((dept) => {
                            const isApplied = appliedDepts.includes(dept.departmentName);
                            return (
                                <div
                                    key={dept.id}
                                    className="bg-white shadow rounded-2xl p-6 flex flex-col justify-between border border-gray-100"
                                >
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">
                                            {dept.departmentName}
                                        </h3>
                                        <p className="text-gray-500 text-sm mt-1">
                                            {dept.description}
                                        </p>
                                        <p className="text-blue-600 text-sm mt-1 font-semibold">
                                            Base Salary: ₹{dept.baseSalary}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleApply(dept.departmentName)}
                                        disabled={isApplied || loading}
                                        className={`mt-4 py-2 rounded-full text-white font-medium transition-all ${
                                            isApplied
                                                ? "bg-gray-300 cursor-not-allowed"
                                                : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                    >
                                        {isApplied ? "Applied" : "Apply Now"}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* My Applications */}
                {statusData && (
                    <section>
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            My Applications
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {Object.entries(statusData.statusByDepartment || {}).map(
                                ([dept, status]) => (
                                    <div
                                        key={dept}
                                        className="bg-white shadow rounded-2xl p-6 border border-gray-100 flex flex-col items-center justify-center"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                            {dept}
                                        </h3>
                                        <span
                                            className={`px-4 py-1 rounded-full text-sm font-medium ${
                                                status === "PENDING"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : status === "ACCEPTED"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                            }`}
                                        >
                      {status}
                    </span>
                                    </div>
                                )
                            )}
                        </div>
                    </section>
                )}
            </div>
        </>
    );
};

export default Dashboard;
