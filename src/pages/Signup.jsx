import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosInstance";
import AuthLayout from "../components/AuthLayout";
import AuthForm from "../components/AuthForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleSignup = async ({ userName, password }) => {
        setLoading(true);
        try {
            await api.post("/user/save-user", { userName, password });
            toast.success("Account created successfully!");
            const res = await api.post("/user/login", { userName, password });

            localStorage.setItem("access_token", res.data.access_token);
            localStorage.setItem("refresh_token", res.data.refresh_token);
            login({ userName, role: "USER" });
            navigate("/dashboard");
        } catch {
            toast.error("Signup failed. Try a different username.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AuthLayout
                title="Create Account"
                subtitle="Sign up to get started"
                buttonText="Back to Login"
                onButtonClick={() => navigate("/")}
            >
                <AuthForm mode="signup" onSubmit={handleSignup} loading={loading} />
                <p className="text-sm text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/")}
                        className="text-blue-600 font-semibold cursor-pointer hover:underline"
                    >
            Login
          </span>
                </p>
            </AuthLayout>
            <ToastContainer position="bottom-right" autoClose={2000} />
        </>
    );
};

export default Signup;
