import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/layouts/Sidebar";

// Lazy load components
const Home = lazy(() => import("./components/pages/Home"));
const Login = lazy(() => import("./components/common/Login"));
const Signup = lazy(() => import("./components/common/Signup"));
const UserDashboard = lazy(() => import("./components/user/UserDashboard"));
const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard"));
const Transactions = lazy(() => import("./components/user/Transactions"));
const Profile = lazy(() => import("./components/user/Profile"));
const Settings = lazy(() => import("./components/user/Settings"));
const Users = lazy(() => import("./components/admin/Users"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const App = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<Sidebar />}>
          <Route index element={<Navigate to="/user/dashboard" replace />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/admin" element={<Sidebar />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
