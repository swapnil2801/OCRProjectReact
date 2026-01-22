import { useState } from "react";
import axios from "axios";
import AuthLayout from "./AuthLayout";
import "../styles/auth.css";
import { API_BASE_URL } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",   // FastAPI expects username field (even if email)
    password: ""
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("expired") === "1") {
      setMsg("Session expired. Please login again.");
    }
  }, []);
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const data = new URLSearchParams();
      data.append("username", form.username);
      data.append("password", form.password);

      const res = await axios.post(`${API_BASE_URL}/auth/login`, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      localStorage.setItem("token", res.data.access_token);
      navigate("/app/scan");
    } catch (err: any) {
      console.log(err);
      setMsg(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Welcome Back">
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          className="input"
          name="username"
          type="text"
          placeholder="Email or Username"
          onChange={handleChange}
          required
        />

        <input
          className="input"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <div className="divider" />

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

        {msg && <div className="small" style={{ color: "red" }}>{msg}</div>}

        <div className="row">
          <span className="small">
            Don’t have an account?{" "}
            <a href="/register" style={{ color: "var(--accent)" }}>
              Register
            </a>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
}
