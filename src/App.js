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
import CourseList from "./components/pages/Course";
import CourseCreate from "./components/pages/Course/CourseCreate";
import CourseEdit from "./components/pages/Course/CourseEdit";
import Lesson from "./components/pages/Lesson";
import LessonCreate from "./components/pages/Lesson/LessonCreate";
import LessonEdit from "./components/pages/Lesson/LessonEdit";
import ExamList from "./components/pages/Exam";
import ExamCreate from "./components/pages/Exam/ExamCreate";
import ExamEdit from "./components/pages/Exam/ExamEdit";
import TestList from "./components/pages/Test/index";
import MultipleChoice from "./components/pages/Test/MultipleChoice";
import PracticalExam from "./components/pages/Test/PracticalExam";
import Timetable from "./components/pages/Timetable";
import ClassList from "./components/pages/Class";
import ClassCreate from "./components/pages/Class/CourseCreate";
import ClassEdit from "./components/pages/Class/CourseEdit";
import Question from "./components/pages/Question";
import EntranceTest from "./components/pages/Test/EntranceTest";
import Classroom from "./components/pages/Classroom";
import Device from "./components/pages/Device";

function App() {
    return (
        <div className="App">
            <Routes>
                {/* ===== Start Dashboard ===== */}
                <Route path="/" element={<Dashboard />} />
                {/* ===== End Dashboard ===== */}

                {/* ===== Start Course ===== */}
                <Route path="/course" element={<CourseList />} />
                <Route path="/course-create" element={<CourseCreate />} />
                <Route path="/course-edit" element={<CourseEdit />} />
                {/* ===== End Course ===== */}

                {/* ===== Start Lesson ===== */}
                <Route path="/lesson" element={<Lesson />} />
                <Route path="/lesson-create" element={<LessonCreate />} />
                <Route path="/lesson-edit" element={<LessonEdit />} />
                {/* ===== End Lesson ===== */}

                {/* ===== Start Exam ===== */}
                <Route path="/exam" element={<ExamList />} />
                <Route path="/exam-create" element={<ExamCreate />} />
                <Route path="/exam-edit" element={<ExamEdit />} />
                {/* ===== End Exam ===== */}

                {/* ===== Start Test ===== */}
                <Route path="/test" element={<TestList />} />
                <Route path="/test-create" element={<ExamCreate />} />
                <Route path="/test-edit" element={<ExamEdit />} />

                <Route path="/multiple-choice" element={<MultipleChoice />} />
                <Route path="/practical-exam" element={<PracticalExam />} />
                <Route path="/entrance-test" element={<EntranceTest />} />

                <Route path="/question" element={<Question />} />

                {/* ===== End Test ===== */}

                {/* ===== Start Student ===== */}
                <Route path="/timetable" element={<Timetable />} />
                {/* ===== End Student ===== */}

                {/* ===== Start Class ===== */}
                <Route path="/class" element={<ClassList />} />
                <Route path="/class-create" element={<ClassCreate />} />
                <Route path="/class-edit" element={<ClassEdit />} />
                {/* ===== End Class ===== */}

                {/* ===== Start Device ===== */}
                <Route path="/device" element={<Device />} />
                {/* ===== End Device ===== */}

                {/* ===== Start Classroom ===== */}
                <Route path="/classroom" element={<Classroom />} />
                {/* ===== End Classroom ===== */}

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
