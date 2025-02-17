import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import "antd/dist/reset.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import MyBookings from "./pages/MyBookings/MyBookings";

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/dashboard" && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </div>
  );
}

export default App;
