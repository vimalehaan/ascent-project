import { Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CoursePage from "./pages/CoursePage";
import Profile from "./pages/Profile";

const RoutesMain = () => {
    return (
        <div>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/course/:id" element={<CoursePage />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    );
};

export default RoutesMain;
