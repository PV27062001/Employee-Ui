import React from "react";

const AuthLayout = ({ title, subtitle, children }) => {
    return (
        <div className="flex min-h-screen bg-white">
            {/* Left Blue Panel */}
            <div className="hidden md:flex w-1/2 bg-gradient-to-b from-blue-500 to-blue-800 items-center justify-center text-white">
                <div className="text-center px-10">
                    <h1 className="text-4xl font-bold mb-4">Employee Portal</h1>
                    <p className="text-lg text-blue-100 mb-6">
                        Empowering seamless HR management experience.
                    </p>
                    <button className="bg-white text-blue-700 px-5 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
                        Learn More
                    </button>
                </div>
            </div>

            {/* Right Form Panel */}
            <div className="flex w-full md:w-1/2 items-center justify-center">
                <div className="max-w-md w-full p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        {title}
                    </h2>
                    <p className="text-gray-500 mb-6">{subtitle}</p>

                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
