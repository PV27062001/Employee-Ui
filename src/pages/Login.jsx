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
                title="Welcome Back 👋"
                subtitle="Login to continue to your dashboard"
                buttonText="Create New Account"
                onButtonClick={() => navigate("/signup")}
            >
                <AuthForm mode="login" onSubmit={handleLogin} loading={loading} />
            </AuthLayout>

            <ToastContainer position="bottom-right" autoClose={2000} />
        </>
    );
};

export default Login;
