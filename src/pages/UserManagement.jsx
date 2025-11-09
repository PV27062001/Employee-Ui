import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axiosInstance";

const UserManagement = () => {
    const [employees, setEmployees] = useState([]);

    const fetchEmployees = async () => {
        try {
            const res = await api.get("/employee/getAll");
            setEmployees(res.data);
        } catch (err) {
            toast.error("Failed to fetch employees");
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                🧑‍💼 User Management
            </h1>

            <div className="overflow-x-auto bg-white rounded-xl shadow-md border">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-blue-600 text-white text-left">
                    <tr>
                        <th className="p-3">Employee ID</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Department</th>
                        <th className="p-3">Manager</th>
                        <th className="p-3">Salary</th>
                        <th className="p-3">Bonus</th>
                        <th className="p-3">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map((emp) => (
                        <tr
                            key={emp.employeeId}
                            className="border-b hover:bg-gray-50 transition"
                        >
                            <td className="p-3">{emp.employeeId}</td>
                            <td className="p-3 font-medium">{emp.name}</td>
                            <td className="p-3">{emp.departmentName}</td>
                            <td className="p-3">{emp.managerName || "-"}</td>
                            <td className="p-3">₹{emp.salary}</td>
                            <td className="p-3 text-green-600">₹{emp.bonus}</td>
                            <td className="p-3">
                                {emp.active ? (
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      Active
                    </span>
                                ) : (
                                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                      Inactive
                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
