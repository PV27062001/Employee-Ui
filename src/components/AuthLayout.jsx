import React from "react";

const AuthLayout = ({ title, subtitle, buttonText, onButtonClick, children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col justify-center items-center p-4">
            {/* Card Container */}
            <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 p-8 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-2">
                    {title}
                </h1>
                <p className="text-sm sm:text-base text-gray-500 text-center mb-6">
                    {subtitle}
                </p>

                {/* Form Content */}
                <div>{children}</div>

                {/* Footer Button (e.g. Back to Login / Read More) */}
                {buttonText && (
                    <button
                        onClick={onButtonClick}
                        className="w-full mt-6 py-2 text-sm font-medium text-blue-700 hover:text-blue-800 hover:bg-blue-50 border border-blue-200 rounded-lg transition-all"
                    >
                        {buttonText}
                    </button>
                )}
            </div>

            {/* Footer Info (Visible only on small screens) */}
            <p className="text-xs text-gray-500 mt-6 text-center px-4">
                © 2025 Employee Portal. All rights reserved.
            </p>
        </div>
    );
};

export default AuthLayout;
