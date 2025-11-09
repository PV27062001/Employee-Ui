import React, { useState } from "react";

const AuthForm = ({
                      mode, // "login" | "signup"
                      onSubmit,
                      loading,
                  }) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ userName, password });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <input
                    type="text"
                    placeholder="Email Address"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>

            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium py-3 rounded-full hover:shadow-lg transition-all"
            >
                {loading ? (mode === "login" ? "Logging in..." : "Signing up...") : mode === "login" ? "Login" : "Sign Up"}
            </button>

            {mode === "login" && (
                <p className="text-center text-gray-500 text-sm mt-4 cursor-pointer hover:text-blue-600">
                    Forgot Password
                </p>
            )}
        </form>
    );
};

export default AuthForm;
