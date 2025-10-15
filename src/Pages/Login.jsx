
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Utils/Auth";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [msg, setMsg] = useState(null);
    const navigate = useNavigate();

    function handleChange(e) {
        setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const res = login(form);
        if (!res.success) {
            setMsg({ type: "error", text: res.message });
            return;
        }
        setMsg({ type: "success", text: "Login successful. Redirecting..." });
        setTimeout(() => {
            navigate(res.user.role === "Admin" ? "/admin-panel" : "/user-panel");
            window.location.reload();
        }, 700);
    }

    return (
        <div className="page container">
            <h2>Login</h2>
            {msg && <div className={msg.type === "error" ? "msg error" : "msg success"}>{msg.text}</div>}
            <form className="form" onSubmit={handleSubmit}>
                <label>Email<input name="email" value={form.email} onChange={handleChange} /></label>
                <label>Password<input name="password" type="password" value={form.password} onChange={handleChange} /></label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
