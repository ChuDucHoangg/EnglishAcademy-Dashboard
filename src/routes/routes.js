import config from "../config/index";

import Dashboard from "../components/pages/Dashboard/Dashboard";
import CourseList from "../components/pages/Course/index";
import CourseDetail from "../components/pages/Course/CourseDetail";
import CourseCreate from "../components/pages/Course/CourseCreate";
import CourseEdit from "../components/pages/Course/CourseEdit";
import Timetable from "../components/pages/Timetable/index";
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
import BookingWaitingList from "../components/pages/Booking/BookingWaiting/BookingWaitingList";
import ByPackage from "../components/pages/Booking/BookingWaitingDetail/ByPackage";
import ByWeeks from "../components/pages/Booking/BookingWaitingDetail/ByWeeks";
import CourseOfflineList from "../components/pages/CourseOffline/CourseOfflineList";
import CourseOfflineDetail from "../components/pages/CourseOffline/CourseOfflineDetail";
import CourseOfflineEdit from "../components/pages/CourseOffline/CourseOfflineEdit";
import CourseOfflineCreate from "../components/pages/CourseOffline/CourseOfflineCreate";
import ItemDetail from "../components/pages/Course/CourseItem/ItemDetail";
import ItemCreate from "../components/pages/Course/CourseItem/ItemCreate";
import ItemEdit from "../components/pages/Course/CourseItem/ItemEdit";
import LessonBookingEdit from "../components/pages/LessonBooking/LessonBookingEdit";
import CourseTopicCreate from "../components/pages/Course/CourseTopic/CourseTopicCreate";
import CourseTopicEdit from "../components/pages/Course/CourseTopic/CourseTopicEdit";
import TutorRegistration from "../components/pages/Tutor/TutorRegistration";
import BookingList from "../components/pages/Booking/BookingList";
import BookingDetail from "../components/pages/Booking/BookingDetail";
import SubjectCreate from "../components/pages/CourseOffline/Subject/SubjectCreate";
import Meeting from "../components/pages/Room/Meeting";
import ClassListTeacher from "../components/pages/ClassesTeacher/ClassListTeacher";
import ClassCourseListTeacher from "../components/pages/ClassesTeacher/ClassCourse/ClassCourseListTeacher";
import ClassCourseDetailTeacher from "../components/pages/ClassesTeacher/ClassCourse/ClassCourseDetailTeacher";
import ClassCourseSubjectTeacher from "../components/pages/ClassesTeacher/ClassCourseSubject/ClassCourseSubjectTeacher";
import ClassCourseSlotDetailTeacher from "../components/pages/ClassesTeacher/ClassCourseSlot/ClassCourseSlotDetailTeacher";
import ClassCourseSlotCreateTeacher from "../components/pages/ClassesTeacher/ClassCourseSlot/ClassCourseSlotCreate";
import ClassCourseSlotEditTeacher from "../components/pages/ClassesTeacher/ClassCourseSlot/ClassCourseSlotEditTeacher";
import ClassCourseSlotAnswerTeacher from "../components/pages/ClassesTeacher/ClassCourseSlot/ClassCourseSlotAnswerTeacher";
import DashboardTeacher from "../components/pages/Dashboard/DashboardTeacher";
import DashboardAdmissions from "../components/pages/Dashboard/DashboardAdmissions";
import EntranceTest from "../components/pages/EntranceTest";
import EntranceTestDetail from "../components/pages/EntranceTest/EntranceTestDetail";
import EntranceTestCreate from "../components/pages/EntranceTest/EntranceTestCreate";

const privateRoutes = [
    // Dashboard routes
    { path: config.routes.dashboard, component: Dashboard },
    { path: config.routes.dashboard_teacher, component: DashboardTeacher },
    { path: config.routes.dashboard_admissions, component: DashboardAdmissions },

    // Course Online routes
    { path: config.routes.course_online, component: CourseList },
    { path: config.routes.course_online_detail, component: CourseDetail },
    { path: config.routes.course_online_create, component: CourseCreate },
    { path: config.routes.course_online_edit, component: CourseEdit },

    { path: config.routes.course_online_topic_create, component: CourseTopicCreate },
    { path: config.routes.course_online_topic_edit, component: CourseTopicEdit },

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

    // Class routes by Teacher
    { path: config.routes.class_list_teacher, component: ClassListTeacher },
    { path: config.routes.class_course_list_teacher, component: ClassCourseListTeacher },
    { path: config.routes.class_course_detail_teacher, component: ClassCourseDetailTeacher },
    { path: config.routes.class_course_subject_list_teacher, component: ClassCourseSubjectTeacher },

    { path: config.routes.class_course_slot_detail_teacher, component: ClassCourseSlotDetailTeacher },
    { path: config.routes.class_course_slot_create_teacher, component: ClassCourseSlotCreateTeacher },
    { path: config.routes.class_course_slot_edit_teacher, component: ClassCourseSlotEditTeacher },
    { path: config.routes.class_course_slot_answer_teacher, component: ClassCourseSlotAnswerTeacher },

    // Tutor routes
    { path: config.routes.tutor_registration, component: TutorRegistration },

    // Booking routes
    { path: config.routes.booking_waiting_list, component: BookingWaitingList },
    { path: config.routes.booking_waiting_package, component: ByPackage },
    { path: config.routes.booking_waiting_weeks, component: ByWeeks },

    { path: config.routes.booking_list, component: BookingList },
    { path: config.routes.booking_detail, component: BookingDetail },
    { path: config.routes.lesson_booking_edit, component: LessonBookingEdit },

    { path: config.routes.subject_create, component: SubjectCreate },

    // Meeting routes
    { path: config.routes.meeting, component: Meeting },

    { path: config.routes.not_found, component: NotFound },

    { path: config.routes.timetable, component: Timetable },

    { path: config.routes.student_list, component: StudentList },
    { path: config.routes.student_create, component: StudentCreate },
    { path: config.routes.student_edit, component: StudentEdit },

    { path: config.routes.staff_list, component: StaffList },
    { path: config.routes.staff_create, component: StaffCreate },
    { path: config.routes.staff_edit, component: StaffEdit },
    { path: config.routes.profile, component: ProfileWrap },

    // Entrance Test routes
    { path: config.routes.entrance_test, component: EntranceTest },
    { path: config.routes.entrance_test_detail, component: EntranceTestDetail },
    { path: config.routes.entrance_test_create, component: EntranceTestCreate },
];

const authenticationRoutes = [
    { path: config.routes.login, component: Login },
    { path: config.routes.forgot_password, component: ForgotPassword },
    { path: config.routes.reset_password, component: ResetPassword },
];

export { privateRoutes };
export { authenticationRoutes };
