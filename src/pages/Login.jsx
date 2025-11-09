import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";
import AuthForm from "../components/AuthForm";

const Login = () => {
    const [form, setForm] = useState({ userName: "", password: "" });
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post("/user/login", form);
            const { access_token, refresh_token } = res.data;
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);

            const decoded = jwtDecode(access_token);
            const userRole = decoded.roles?.[0] || "USER";
            const userName = decoded.sub;

            login({ userName, role: userRole });
            navigate(userRole === "ADMIN" ? "/admin" : "/dashboard");
        } catch {
            alert("Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Hello Again!" subtitle="Welcome Back">
            <AuthForm
                fields={[
                    {
                        name: "userName",
                        type: "text",
                        placeholder: "Email Address",
                        value: form.userName,
                        onChange: handleChange,
                        icon: "mail",
                    },
                    {
                        name: "password",
                        type: "password",
                        placeholder: "Password",
                        value: form.password,
                        onChange: handleChange,
                        icon: "lock",
                    },
                ]}
                buttonLabel="Login"
                loading={loading}
                onSubmit={handleSubmit}
                footerText="Don’t have an account?"
                footerLink="Sign Up"
                footerAction={() => navigate("/signup")}
            />
        </AuthLayout>
    );
};

export default Login;
