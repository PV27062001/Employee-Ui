import React from "react";

const AuthLayout = ({ children, title, subtitle, buttonText, onButtonClick }) => {
    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-b from-blue-300 via-blue-400 to-blue-700">
            {/* Outer centered container */}
            <div className="flex w-[80%] max-w-6xl h-[80vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-blue-100">
                {/* LEFT SIDE */}
                <div className="w-1/2 bg-gradient-to-b from-blue-500 to-blue-800 flex flex-col justify-center items-center text-white relative">
                    <h1 className="text-4xl font-extrabold mb-4">Employee Portal</h1>
                    <p className="text-center text-blue-100 max-w-[280px] text-sm leading-relaxed">
                        The most popular peer-to-peer hiring platform at SEA
                    </p>
                    <button
                        onClick={onButtonClick}
                        className="mt-8 bg-white text-blue-700 text-sm font-semibold px-8 py-3 rounded-full shadow hover:bg-gray-100 transition-all"
                    >
                        {buttonText}
                    </button>

                    {/* Decorative circles */}
                    <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 border-[2px] border-blue-300 rounded-full opacity-20"></div>
                    <div className="absolute bottom-[-180px] left-[-180px] w-[500px] h-[500px] border-[2px] border-blue-200 rounded-full opacity-10"></div>
                </div>

                {/* RIGHT SIDE */}
                <div className="w-1/2 flex justify-center items-center bg-white px-12">
                    <div className="w-full max-w-sm">
                        <div className="mb-10">
                            <h2 className="text-gray-800 text-3xl font-semibold mb-1">
                                {title}
                            </h2>
                            <p className="text-gray-500">{subtitle}</p>
                        </div>

                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
