import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Login({ onLogin }) {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username) {
            toast.warning("Please enter username", { position: "top-right" });
            return;
        }
        if (!formData.password) {
            toast.warning("Please enter password", { position: "top-right" });
            return;
        }

        try {
            const response = await 
            axios.post(
                // "http://localhost:8080/api/v1/tossbook/login",
                "http://localhost:8080/api/v1/tossbook/login",
                formData,
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.data.success) {
                toast.success(response.data.message || "Login Successful!", {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "colored",
                });

                setTimeout(() => {
                    console.log("Redirecting to dashboard...");

                    localStorage.setItem("isLoggedIn", "true"); // ✅ as string
                    localStorage.setItem("User_ID", response.data.data.user_id);
                    localStorage.setItem("User_Name", response.data.data.user_name);
                    localStorage.setItem("Full_Name", response.data.data.fullname);

                    onLogin(); // ✅ call after saving
                    navigate("/dashboard");
                }, 500);
            } else {
                toast.error(response.data.message || "Invalid login details", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "colored",
                });
            }
        } catch (error) {
            toast.error("Server Error! Please try again.", {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
            });
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={{ color: "#333" }}>Sarkar Toss Book</h1>
            <h2>Login Form</h2>

            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    value={formData.username}
                    onChange={handleChange}
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>
                    Login
                </button>
            </form>

            <ToastContainer />
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "400px",
        margin: "200px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    input: {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    button: {
        padding: "10px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default Login;
