import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axiosInstance";

const InterviewManagement = () => {
    const [interviews, setInterviews] = useState([]);
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

        // If new status != old, mark as changed
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
        <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                📋 Interview Management
            </h1>

            {interviews.map((intv) => (
                <div
                    key={intv.id}
                    className="bg-white rounded-xl shadow-md p-6 mb-8 border"
                >
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        Candidate: {intv.userName}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {intv.departmentStatuses.map((dept) => (
                            <div
                                key={dept.id}
                                className="p-4 border rounded-xl shadow-sm flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="font-medium text-gray-800">
                                        {dept.department.departmentName}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Current:{" "}
                                        <span className="font-semibold text-blue-600">
                      {dept.status}
                    </span>
                                    </p>
                                </div>

                                <select
                                    value={
                                        statusUpdate[intv.userName]?.[
                                            dept.department.departmentName
                                            ] || dept.status
                                    }
                                    onChange={(e) =>
                                        handleStatusChange(
                                            intv.userName,
                                            dept.department.departmentName,
                                            e.target.value,
                                            dept.status
                                        )
                                    }
                                    className="mt-3 border rounded-lg px-3 py-1.5 text-sm"
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="ACCEPTED">Accepted</option>
                                    <option value="REJECTED">Rejected</option>
                                </select>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => handleSave(intv.userName)}
                        disabled={!changedUsers.has(intv.userName)}
                        className={`mt-5 px-6 py-2 rounded-full text-white font-medium transition ${
                            changedUsers.has(intv.userName)
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-gray-300 cursor-not-allowed"
                        }`}
                    >
                        Save Changes
                    </button>
                </div>
            ))}
        </div>
    );
};

export default InterviewManagement;
