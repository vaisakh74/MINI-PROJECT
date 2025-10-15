
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../Utils/Auth";
import "./Nav.css";

export default function Nav() {
    const user = getCurrentUser();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
        window.location.reload();
    }

    return (
        <nav className="nav">
            <div className="container">
                <Link to="/" className="brand">Foody</Link>

                <div className="links">
                    {!user && (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                    {user && user.role === "Admin" && <Link to="/admin-panel">Admin Panel</Link>}
                    {user && <Link to="/user-panel">Products</Link>}
                    {user && <Link to="/cart">Cart</Link>}
                    {user && (
                        <>
                            <span className="user-badge">{user.name} ({user.role})</span>
                            <button className="btn-logout" onClick={handleLogout}>Logout</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
