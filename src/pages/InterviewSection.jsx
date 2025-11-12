import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { toast } from "react-toastify";
import InterviewCard from "../components/InterviewCard";

const InterviewSection = ({ user }) => {
    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [selectedDept, setSelectedDept] = useState("");

    // ✅ Fetch all departments dynamically
    const fetchDepartments = async () => {
        try {
            const res = await api.get("/department/all");
            setDepartments(res.data);
        } catch (err) {
            toast.error("Failed to fetch department list");
        }
    };

    // ✅ Fetch user's interview status
    const fetchInterviewStatus = async () => {
        try {
            const res = await api.get("/interview/my-status", {
                params: { userName: user.userName },
            });
            setInterview(res.data);
        } catch (err) {
            // no interview found yet
            setInterview(null);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Apply for interview with selected department
    const applyForInterview = async () => {
        if (!selectedDept) {
            toast.warn("Please select a department!");
            return;
        }

        const payload = {
            userName: user.userName, // ✅ now appears first
            departmentName: [selectedDept],
        };

        try {
            await api.post("/interview/apply", payload);
            toast.success(`Applied for ${selectedDept} interview!`);
            setShowModal(false);
            fetchInterviewStatus(); // Refresh
        } catch (err) {
            toast.error("Failed to apply for interview");
        }
    };


    useEffect(() => {
        fetchDepartments();
        fetchInterviewStatus();
    }, [user.userName]);

    if (loading)
        return <p className="text-gray-500">Loading your interview details...</p>;

    // ✅ Case 1: No interview yet — show "Apply" button
    if (!interview) {
        return (
            <div className="p-6 bg-white rounded-xl shadow-md border flex flex-col items-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    🎯 Apply for Your First Interview
                </h2>

                <InterviewCard
                    department="Select Department"
                    status={null}
                    onApply={() => setShowModal(true)}
                />

                {/* ✅ Modal for department selection */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                        <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                                Select Department
                            </h3>

                            <select
                                className="border border-gray-300 rounded p-2 w-full mb-4"
                                value={selectedDept}
                                onChange={(e) => setSelectedDept(e.target.value)}
                            >
                                <option value="">-- Choose Department --</option>
                                {departments.map((dept) => (
                                    <option key={dept.id} value={dept.departmentName}>
                                        {dept.departmentName} — {dept.description}
                                    </option>
                                ))}
                            </select>

                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={applyForInterview}
                                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // ✅ Case 2: Already applied — show status cards
    return (
        <div className="p-6 bg-white rounded-xl shadow-md border">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                🎯 My Interview Status
            </h2>

            <div className="mb-4">
                <p className="text-gray-700 font-medium">
                    Candidate: <span className="text-blue-600">{interview.userName}</span>
                </p>
                <p className="text-sm text-gray-500">
                    Applied on:{" "}
                    {new Date(interview.appliedDate).toLocaleDateString("en-IN")}
                </p>
            </div>

            <div className="flex flex-wrap gap-5">
                {Object.entries(interview.statusByDepartment).map(([dept, status]) => (
                    <InterviewCard key={dept} department={dept} status={status} />
                ))}
            </div>
        </div>
    );
};

export default InterviewSection;
