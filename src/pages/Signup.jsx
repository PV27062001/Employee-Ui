import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import AuthLayout from "../components/AuthLayout";
import AuthForm from "../components/AuthForm";

const Signup = () => {
    const [form, setForm] = useState({ userName: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/user/save-user", form);
            alert("User registered successfully!");
            navigate("/");
        } catch {
            alert("Username already exists!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Create Account" subtitle="Join the Employee Portal">
            <AuthForm
                fields={[
                    {
                        name: "userName",
                        type: "text",
                        placeholder: "Email Address",
                        value: form.userName,
                        onChange: handleChange,
                        icon: "user",
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
                buttonLabel="Sign Up"
                loading={loading}
                onSubmit={handleSubmit}
                footerText="Already have an account?"
                footerLink="Login"
                footerAction={() => navigate("/")}
            />
        </AuthLayout>
    );
};

export default Signup;
