
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../Utils/Auth";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "User" });
    const [msg, setMsg] = useState(null);
    const navigate = useNavigate();

    function handleChange(e) {
        setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { name, email, password, role } = form;
        if (!name || !email || !password) {
            setMsg({ type: "error", text: "Please fill all fields" });
            return;
        }
        const res = register({ name, email, password, role });
        if (!res.success) {
            setMsg({ type: "error", text: res.message });
            return;
        }
        setMsg({ type: "success", text: "Registered! Redirecting..." });

        setTimeout(() => {
            navigate(res.user.role === "Admin" ? "/admin-panel" : "/user-panel");
            window.location.reload();
        }, 800);
    }

    return (
        <div className="page container">
            <h2>Register</h2>
            {msg && <div className={msg.type === "error" ? "msg error" : "msg success"}>{msg.text}</div>}
            <form className="form" onSubmit={handleSubmit}>
                <label>Name<input name="name" value={form.name} onChange={handleChange} /></label>
                <label>Email<input name="email" value={form.email} onChange={handleChange} /></label>
                <label>Password<input name="password" type="password" value={form.password} onChange={handleChange} /></label>
                <label>Role
                    <select name="role" value={form.role} onChange={handleChange}>
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                </label>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
