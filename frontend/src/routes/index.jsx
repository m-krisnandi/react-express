import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../views/home";
import Register from "../views/auth/register";
import Login from "../views/auth/login";
import Dashboard from "../views/admin/dashboard";
import UserIndex from "../views/admin/users";
import UsersCreate from "../views/admin/users/create";
import UsersEdit from "../views/admin/users/edit";

export default function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      {/* route "/" */}
      <Route path="/" element={<Home />} />
      <Route
        path="/register"
        element={
          isAuthenticated ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <Register />
          )
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/admin/users"
        element={
          isAuthenticated ? <UserIndex /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/admin/users/create"
        element={
          isAuthenticated ? <UsersCreate /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/admin/users/edit/:id"
        element={
          isAuthenticated ? <UsersEdit /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
}
