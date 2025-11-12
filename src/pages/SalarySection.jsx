import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { toast } from "react-toastify";

const SalarySection = ({ user }) => {
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const res = await api.get(`/employee/getemployee`, {
                    params: { name: user.userName },
                });
                setEmployee(res.data);
            } catch (err) {
                toast.error("Failed to load employee details");
            }
        };

        fetchEmployee();
    }, [user.userName]);

    if (!employee)
        return <p className="text-gray-500">Loading employee details...</p>;

    const nextSalaryDate = new Date();
    nextSalaryDate.setMonth(nextSalaryDate.getMonth() + 1);

    return (
        <div className="p-6 bg-white rounded-xl shadow-md border">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                💰 Salary Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border rounded-lg text-center bg-blue-50">
                    <h3 className="text-gray-700 font-medium">Monthly Salary</h3>
                    <p className="text-2xl font-semibold text-blue-700">
                        ₹{employee.salary.toLocaleString("en-IN")}
                    </p>
                </div>

                <div className="p-4 border rounded-lg text-center bg-green-50">
                    <h3 className="text-gray-700 font-medium">Next Payment Date</h3>
                    <p className="text-lg text-green-700">
                        {nextSalaryDate.toLocaleDateString("en-IN")}
                    </p>
                </div>

                <div className="p-4 border rounded-lg text-center bg-yellow-50">
                    <h3 className="text-gray-700 font-medium">Bonus</h3>
                    <p className="text-lg text-yellow-600">
                        ₹{employee.bonus.toLocaleString("en-IN")}
                    </p>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg bg-gray-50">
                    <h3 className="text-gray-800 font-medium mb-1">Department</h3>
                    <p className="text-blue-600 font-semibold">
                        {employee.departmentName}
                    </p>
                </div>

                <div className="p-4 border rounded-lg bg-gray-50">
                    <h3 className="text-gray-800 font-medium mb-1">Manager</h3>
                    <p className="text-blue-600 font-semibold">
                        {employee.managerName || "Not Assigned"}
                    </p>
                </div>
            </div>

            <div className="mt-6 text-sm text-gray-500">
                Joined on:{" "}
                <span className="font-medium text-gray-700">
          {new Date(employee.createdAt).toLocaleDateString("en-IN")}
        </span>
            </div>
        </div>
    );
};

export default SalarySection;
