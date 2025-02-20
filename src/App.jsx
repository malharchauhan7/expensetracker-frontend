import Sidebar from "./components/layouts/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
// Login and SignUp
import Login from "./components/common/Login";
import Signup from "./components/common/Signup";
// Admin Routes
import AdminDashboard from "./components/admin/AdminDashboard";
// User Routes
import UserDashboard from "./components/user/UserDashboard";
import Transactions from "./components/user/Transactions";
import Profile from "./components/user/Profile";
import Settings from "./components/user/Settings";
const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/user/dashboard" replace />}
      ></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/user" element={<Sidebar />}>
        <Route path="dashboard" element={<UserDashboard />}></Route>
        <Route path="transactions" element={<Transactions />}></Route>
        <Route path="profile" element={<Profile />}></Route>
        <Route path="settings" element={<Settings />}></Route>
      </Route>
      <Route path="/admin" element={<Sidebar />}>
        <Route path="dashboard" element={<AdminDashboard />}></Route>
        <Route path="users" element={<AdminDashboard />}></Route>
        <Route path="settings" element={<AdminDashboard />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
