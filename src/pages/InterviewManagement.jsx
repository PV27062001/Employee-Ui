import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axiosInstance";

const InterviewManagement = () => {
    const [interviews, setInterviews] = useState({});
    const [statusUpdate, setStatusUpdate] = useState({});
    const [changedUsers, setChangedUsers] = useState(new Set());

    const fetchInterviews = async () => {
        try {
            const res = await api.get("/interview/getall/interview");
            setInterviews(res.data);
        } catch (err) {
            toast.error("Failed to fetch interviews");
        }
    };

    useEffect(() => {
        fetchInterviews();
    }, []);

    const handleStatusChange = (userName, dept, newStatus, oldStatus) => {
        setStatusUpdate((prev) => ({
            ...prev,
            [userName]: {
                ...prev[userName],
                [dept]: newStatus,
            },
        }));

        setChangedUsers((prev) => {
            const copy = new Set(prev);
            if (newStatus !== oldStatus) copy.add(userName);
            else copy.delete(userName);
            return copy;
        });
    };

    const handleSave = async (userName) => {
        try {
            const req = {
                userName,
                statusByDepartment: statusUpdate[userName],
            };
            await api.patch("/interview/apply-result", req);
            toast.success(`Status updated for ${userName}`);
            setChangedUsers((prev) => {
                const copy = new Set(prev);
                copy.delete(userName);
                return copy;
            });
            fetchInterviews();
        } catch (err) {
            toast.error("Failed to update status");
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-semibold text-gray-800 mb-8">
                👩‍💼 Interview Management
            </h1>

            {Object.keys(interviews).length === 0 ? (
                <p className="text-gray-500">No interviews available.</p>
            ) : (
                Object.entries(interviews).map(([userName, data]) => (
                    <div
                        key={userName}
                        className="bg-white shadow-md border border-gray-200 rounded-xl mb-6 p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700">
                                    Candidate:{" "}
                                    <span className="text-blue-700 font-medium">{userName}</span>
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Applied on:{" "}
                                    {new Date(data.appliedDate).toLocaleDateString("en-IN")}
                                </p>
                            </div>

                            <button
                                onClick={() => handleSave(userName)}
                                disabled={!changedUsers.has(userName)}
                                className={`px-6 py-2 rounded-full text-white font-medium transition ${
                                    changedUsers.has(userName)
                                        ? "bg-blue-600 hover:bg-blue-700"
                                        : "bg-gray-300 cursor-not-allowed"
                                }`}
                            >
                                Save Changes
                            </button>
                        </div>

                        {/* Department statuses horizontally */}
                        <div className="flex flex-wrap gap-5">
                            {Object.entries(data.statusByDepartment).map(
                                ([dept, status]) => (
                                    <div
                                        key={dept}
                                        className="border rounded-xl p-4 flex flex-col justify-between w-48 shadow-sm"
                                    >
                                        <div>
                                            <h3 className="font-medium text-gray-800 mb-2">{dept}</h3>
                                            <p className="text-sm text-gray-500 mb-3">
                                                Current:{" "}
                                                <span className="font-semibold text-blue-600">
                          {status}
                        </span>
                                            </p>
                                        </div>

                                        <select
                                            value={
                                                statusUpdate[userName]?.[dept] || status
                                            }
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    userName,
                                                    dept,
                                                    e.target.value,
                                                    status
                                                )
                                            }
                                            className="border rounded-lg px-3 py-1.5 text-sm"
                                        >
                                            <option value="PENDING">Pending</option>
                                            <option value="ACCEPTED">Accepted</option>
                                            <option value="REJECTED">Rejected</option>
                                        </select>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default InterviewManagement;