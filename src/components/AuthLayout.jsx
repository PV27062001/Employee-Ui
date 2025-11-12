import React from "react";

const AuthLayout = ({ children, title, subtitle, buttonText, onButtonClick }) => {
    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-b from-blue-300 via-blue-400 to-blue-700 p-4 sm:p-6">
            {/* Outer Box */}
            <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-blue-100">

                {/* LEFT SIDE */}
                <div className="w-full md:w-1/2 bg-gradient-to-b from-blue-500 to-blue-800 flex flex-col justify-center items-center text-white p-10 relative">
                    <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-center">
                        Employee Portal
                    </h1>
                    <p className="text-center text-blue-100 max-w-xs sm:max-w-sm text-sm sm:text-base leading-relaxed">
                        The most popular peer-to-peer hiring platform at SEA
                    </p>
                    <button
                        onClick={onButtonClick}
                        className="mt-8 bg-white text-blue-700 text-sm sm:text-base font-semibold px-8 py-3 rounded-full shadow hover:bg-gray-100 transition-all"
                    >
                        {buttonText}
                    </button>

                    {/* Decorative circles */}
                    <div className="absolute bottom-[-100px] left-[-100px] w-72 h-72 sm:w-96 sm:h-96 border-2 border-blue-300 rounded-full opacity-20"></div>
                    <div className="absolute bottom-[-180px] left-[-180px] w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] border-2 border-blue-200 rounded-full opacity-10"></div>
                </div>

                {/* RIGHT SIDE */}
                <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-8 sm:p-10 md:p-14">
                    <div className="w-full max-w-sm md:max-w-md">
                        {/* Title & Subtitle */}
                        <div className="text-center md:text-left mb-8">
                            <h2 className="text-gray-800 text-2xl sm:text-3xl font-semibold mb-1">
                                {title}
                            </h2>
                            <p className="text-gray-500 text-sm sm:text-base">{subtitle}</p>
                        </div>

                        {/* Form Content */}
                        <div className="w-full">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
