import config from "../config/index";

import Dashboard from "../components/pages/Dashboard/Dashboard";
import CourseList from "../components/pages/Course/index";
import CourseDetail from "../components/pages/Course/CourseDetail";
import CourseCreate from "../components/pages/Course/CourseCreate";
import CourseEdit from "../components/pages/Course/CourseEdit";
import Lesson from "../components/pages/Lesson/index";
import LessonCreate from "../components/pages/Lesson/LessonCreate";
import LessonEdit from "../components/pages/Lesson/LessonEdit";
import ExamList from "../components/pages/Exam/index";
import ExamCreate from "../components/pages/Exam/ExamCreate";
import ExamEdit from "../components/pages/Exam/ExamEdit";
import TestList from "../components/pages/Test/index";
import MultipleChoice from "../components/pages/Test/MultipleChoice/index";
import PracticalExam from "../components/pages/Test/PracticalExam/index";
import EntranceTest from "../components/pages/Test/EntranceTest/index";
import Question from "../components/pages/Question/index";
import Timetable from "../components/pages/Timetable/index";
import ClassList from "../components/pages/Class/index";
import ClassCreate from "../components/pages/Class/CourseCreate";
import ClassEdit from "../components/pages/Class/CourseEdit";
import Device from "../components/pages/Device/index";
import Classroom from "../components/pages/Classroom/index";
import StudentList from "../components/pages/Student/index";
import StudentCreate from "../components/pages/Student/StudentCreate";
import StudentEdit from "../components/pages/Student/StudentEdit";
import StaffList from "../components/pages/Staff/index";
import StaffCreate from "../components/pages/Staff/StaffCreate";
import StaffEdit from "../components/pages/Staff/StaffEdit";
import ProfileWrap from "../components/pages/Profile/Profile";
import Login from "../components/pages/Auth/Login";
import ForgotPassword from "../components/pages/Auth/ForgotPassword";
import ResetPassword from "../components/pages/Auth/ResetPassword";
import NotFound from "../components/pages/Other/NotFound";
import CategoryList from "../components/pages/Category/CategoryList";
import CategoryEdit from "../components/pages/Category/CategoryEdit";
import CategoryCreate from "../components/pages/Category/CategoryCreate";
import BookingWaitingList from "../components/pages/Tutor/BookingWaiting/BookingWaitingList";
import ByPackage from "../components/pages/Tutor/BookingWaitingDetail/ByPackage";
import ByWeeks from "../components/pages/Tutor/BookingWaitingDetail/ByWeeks";
import BookingList from "../components/pages/Tutor/Booking/BookingList";
import CourseOfflineList from "../components/pages/CourseOffline/CourseOfflineList";
import CourseOfflineDetail from "../components/pages/CourseOffline/CourseOfflineDetail";
import CourseOfflineEdit from "../components/pages/CourseOffline/CourseOfflineEdit";
import CourseOfflineCreate from "../components/pages/CourseOffline/CourseOfflineCreate";
import ItemDetail from "../components/pages/Course/CourseItem/ItemDetail";
import ItemCreate from "../components/pages/Course/CourseItem/ItemCreate";
import ItemEdit from "../components/pages/Course/CourseItem/ItemEdit";

const privateRoutes = [
    { path: config.routes.dashboard, component: Dashboard },

    // Course Online routes
    { path: config.routes.course_online, component: CourseList },
    { path: config.routes.course_online_detail, component: CourseDetail },
    { path: config.routes.course_online_create, component: CourseCreate },
    { path: config.routes.course_online_edit, component: CourseEdit },

    { path: config.routes.course_online_item, component: ItemDetail },
    { path: config.routes.course_online_item_create, component: ItemCreate },
    { path: config.routes.course_online_item_edit, component: ItemEdit },

    // Course Offline routes
    { path: config.routes.course_offline, component: CourseOfflineList },
    { path: config.routes.course_offline_detail, component: CourseOfflineDetail },
    { path: config.routes.course_offline_create, component: CourseOfflineCreate },
    { path: config.routes.course_offline_edit, component: CourseOfflineEdit },

    // Category routes
    { path: config.routes.category_list, component: CategoryList },
    { path: config.routes.category_create, component: CategoryCreate },
    { path: config.routes.category_edit, component: CategoryEdit },

    { path: config.routes.lesson_online, component: Lesson },
    { path: config.routes.lesson_online_create, component: LessonCreate },
    { path: config.routes.lesson_online_edit, component: LessonEdit },

    { path: config.routes.exam_online, component: ExamList },
    { path: config.routes.exam_online_create, component: ExamCreate },
    { path: config.routes.exam_online_edit, component: ExamEdit },

    { path: config.routes.test_online, component: TestList },
    { path: config.routes.test_online_create, component: ExamCreate },
    { path: config.routes.test_online_edit, component: ExamEdit },
    { path: config.routes.multiple_choice, component: MultipleChoice },
    { path: config.routes.practical_exam, component: PracticalExam },
    { path: config.routes.entrance_test, component: EntranceTest },
    { path: config.routes.question_online, component: Question },

    { path: config.routes.timetable, component: Timetable },

    { path: config.routes.class_list, component: ClassList },
    { path: config.routes.class_create, component: ClassCreate },
    { path: config.routes.class_edit, component: ClassEdit },
    { path: config.routes.classroom, component: Classroom },

    { path: config.routes.device, component: Device },

    { path: config.routes.student_list, component: StudentList },
    { path: config.routes.student_create, component: StudentCreate },
    { path: config.routes.student_edit, component: StudentEdit },

    { path: config.routes.staff_list, component: StaffList },
    { path: config.routes.staff_create, component: StaffCreate },
    { path: config.routes.staff_edit, component: StaffEdit },
    { path: config.routes.profile, component: ProfileWrap },

    { path: config.routes.booking_waiting_list, component: BookingWaitingList },
    { path: config.routes.booking_waiting_package, component: ByPackage },
    { path: config.routes.booking_waiting_weeks, component: ByWeeks },

    { path: config.routes.booking_list, component: BookingList },

    { path: config.routes.not_found, component: NotFound },
];

const authenticationRoutes = [
    { path: config.routes.login, component: Login },
    { path: config.routes.forgot_password, component: ForgotPassword },
    { path: config.routes.reset_password, component: ResetPassword },
];

export { privateRoutes };
export { authenticationRoutes };
