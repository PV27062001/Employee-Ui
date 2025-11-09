import React from "react";

// InterviewCard.jsx
 const InterviewCard = ({ department, status, onAccept, onReject }) => {
    const statusColors = {
        ACCEPTED: "bg-green-100 text-green-800 border-green-300",
        REJECTED: "bg-red-100 text-red-800 border-red-300",
        PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
    };

    return (
        <div className="bg-white rounded-xl border shadow p-6 flex flex-col items-center justify-between hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-3">{department}</h3>

            {status ? (
                <span
                    className={`px-4 py-1 rounded-full border font-medium ${statusColors[status]}`}
                >
          {status}
        </span>
            ) : (
                <div className="flex space-x-3">
                    <button
                        onClick={onAccept}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                        Accept
                    </button>
                    <button
                        onClick={onReject}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                        Reject
                    </button>
                </div>
            )}
        </div>
    );
};

 export default InterviewCard;