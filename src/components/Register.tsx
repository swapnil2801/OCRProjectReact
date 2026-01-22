import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import AuthLayout from "./AuthLayout";
import "../styles/auth.css";

export default function Register() {
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post(`${API_BASE_URL}/auth/register`, form);
      setMessage("Registration successful! Please login.");
    } catch (err: any) {
      setMessage(err.response?.data?.detail || "Something went wrong");
    }
  };

  return (
    <AuthLayout title="Join OCR AI">
      <form className="auth-form" onSubmit={handleRegister}>
        <input
          className="input"
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />

        <input
          className="input"
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          required
        />

        <input
          className="input"
          type="password"
          name="password"
          placeholder="Create Password"
          onChange={handleChange}
          required
        />

        <button className="btn" type="submit">
          Register
        </button>

        {message && (
          <p
            className="small"
            style={{
              color: message.includes("successful") ? "lightgreen" : "red",
              marginTop: "8px"
            }}
          >
            {message}
          </p>
        )}

        <div className="row">
          <span className="small">
            Already registered?{" "}
            <a href="/" style={{ color: "var(--accent)" }}>
              Login
            </a>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
}
