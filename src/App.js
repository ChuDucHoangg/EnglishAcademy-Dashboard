import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Login from "./components/pages/Auth/Login";
import ForgotPassword from "./components/pages/Auth/ForgotPassword";
import ProfileWrap from "./components/pages/Profile/Profile";
import ResetPassword from "./components/pages/Auth/ResetPassword";
import NotFound from "./components/pages/Other/NotFound";
import StudentList from "./components/pages/Student";
import StudentCreate from "./components/pages/Student/StudentCreate";
import StudentEdit from "./components/pages/Student/StudentEdit";
import StaffList from "./components/pages/Staff";
import StaffCreate from "./components/pages/Staff/StaffCreate";
import StaffEdit from "./components/pages/Staff/StaffEdit";

function App() {
    return (
        <div className="App">
            <Routes>
                {/* ===== Start Dashboard ===== */}
                <Route path="/" element={<Dashboard />} />
                {/* ===== End Dashboard ===== */}

                {/* ===== Start Student ===== */}
                <Route path="/student" element={<StudentList />} />
                <Route path="/student-create" element={<StudentCreate />} />
                <Route path="/student-edit" element={<StudentEdit />} />
                {/* ===== End Student ===== */}

                {/* ===== Start Staff ===== */}
                <Route path="/staff" element={<StaffList />} />
                <Route path="/staff-create" element={<StaffCreate />} />
                <Route path="/staff-edit" element={<StaffEdit />} />
                {/* ===== End Staff ===== */}

                {/* ===== Start Auth ===== */}
                <Route path="/profile" element={<ProfileWrap />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
                {/* ===== End Auth ===== */}

                {/* ===== Start Other page ===== */}
                <Route path="*" element={<NotFound />} />
                {/* ===== End Other page ===== */}
            </Routes>
        </div>
    );
}

export default App;
