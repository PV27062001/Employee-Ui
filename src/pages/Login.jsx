import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosInstance";
import AuthLayout from "../components/AuthLayout";
import AuthForm from "../components/AuthForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleLogin = async ({ userName, password }) => {
        setLoading(true);
        try {
            const res = await api.post("/user/login", { userName, password });
            localStorage.setItem("access_token", res.data.access_token);
            localStorage.setItem("refresh_token", res.data.refresh_token);

            const role = userName === "admin" ? "ADMIN" : "USER";
            login({ userName, role });
            navigate(role === "ADMIN" ? "/admin" : "/dashboard");
        } catch {
            toast.error("Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AuthLayout
                title="Hello Again!"
                subtitle="Welcome Back"
                buttonText="Read More"
                onButtonClick={() => toast.info("Coming soon!")}
            >
                <AuthForm mode="login" onSubmit={handleLogin} loading={loading} />
                <p className="text-sm text-center text-gray-600 mt-6">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-blue-600 font-semibold cursor-pointer hover:underline"
                    >
            Sign Up
          </span>
                </p>
            </AuthLayout>
            <ToastContainer position="bottom-right" autoClose={2000} />
        </>
    );
};

export default Login;
