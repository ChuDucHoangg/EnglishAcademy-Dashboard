import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Login from "./components/pages/Auth/Login";
import ForgotPassword from "./components/pages/Auth/ForgotPassword";
import ProfileWrap from "./components/pages/Profile/Profile";

function App() {
    return (
        <div className="App">
            <Routes>
                {/* ===== Start Dashboard ===== */}
                <Route path="/" element={<Dashboard />} />
                {/* ===== End Dashboard ===== */}

                {/* ===== Start Auth ===== */}
                <Route path="/profile" element={<ProfileWrap />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                {/* ===== End Auth ===== */}
            </Routes>
        </div>
    );
}

export default App;
