import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminPanel from "./Pages/Adminpanel";
import UserPanel from "./Pages/Userpanel";
import CartPage from "./Pages/Cartpage";
import Home from "./Pages/Home";
import Nav from "./Components/Nav";
import { getCurrentUser } from "./Utils/Auth";

/**
 
 */
function ProtectedRoute({ children, allowedRoles }) {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {

    return <Navigate to={user.role === "Admin" ? "/admin-panel" : "/user-panel"} replace />;
  }
  return children;
}

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin-panel"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-panel"
          element={
            <ProtectedRoute allowedRoles={["User", "Admin"]}>
              <UserPanel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute allowedRoles={["User", "Admin"]}>
              <CartPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
