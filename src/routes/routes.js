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
import BookingWaitingList from "../components/pages/BookingWaiting/BookingWaitingList";
import ByWeeks from "../components/pages/BookingWaiting/BookingWaitingDetail/ByWeeks";
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
import TestOnlineCreate from "../components/pages/TestOnline/TestOnlineCreate";
import QuestionEdit from "../components/pages/Course/Quiz/QuestionEdit";
import TestOnlineEdit from "../components/pages/TestOnline/TestOnlineEdit";
import TestOnlineDetail from "../components/pages/TestOnline/TestOnlineDetail";
import SubjectDetail from "../components/pages/CourseOffline/Subject/SubjectDetail";
import ExamOfflineCreate from "../components/pages/ExamOffline/ExamOfflineCreate";
import ClassCourseExamDetail from "../components/pages/ClassesTeacher/ClassCourseExam/ClassCourseExamDetail";
import ExamDetailOfStudent from "../components/pages/ClassesTeacher/ExamDetailOfStudent/ExamDetailOfStudent";
import ByPackage from "../components/pages/BookingWaiting/BookingWaitingDetail/ByPackage";
import TutoringSchedule from "../components/pages/TutoringSchedule";
import TutoringScheduleDetail from "../components/pages/TutoringSchedule/TutoringScheduleDetail";
import Room from "../components/pages/Room";

const privateRoutes = [
    // Dashboard routes
    { path: config.routes.dashboard, component: Dashboard, allowedRoles: ["ADMIN", "TRAINERS"] },
    { path: config.routes.dashboard_teacher, component: DashboardTeacher, allowedRoles: ["TEACHER"] },
    { path: config.routes.dashboard_admissions, component: DashboardAdmissions, allowedRoles: ["ADMISSIONS"] },

    // Course Online routes
    { path: config.routes.course_online, component: CourseList, allowedRoles: ["ADMIN", "TRAINERS"] },
    { path: config.routes.course_online_detail, component: CourseDetail, allowedRoles: ["ADMIN", "TRAINERS"] },
    { path: config.routes.course_online_create, component: CourseCreate, allowedRoles: ["ADMIN", "TRAINERS"] },
    { path: config.routes.course_online_edit, component: CourseEdit, allowedRoles: ["ADMIN", "TRAINERS"] },
    { path: config.routes.course_online_question_item_edit, component: QuestionEdit, allowedRoles: ["ADMIN", "TRAINERS"] },

    // Test Online routes
    { path: config.routes.test_online_create, component: TestOnlineCreate, allowedRoles: ["ADMIN", "TRAINERS"] },
    { path: config.routes.test_online_edit, component: TestOnlineEdit, allowedRoles: ["ADMIN", "TRAINERS"] },
    { path: config.routes.test_online_detail, component: TestOnlineDetail, allowedRoles: ["ADMIN", "TRAINERS"] },

    { path: config.routes.course_online_topic_create, component: CourseTopicCreate, allowedRoles: ["ADMIN", "TRAINERS"] },
    { path: config.routes.course_online_topic_edit, component: CourseTopicEdit, allowedRoles: ["ADMIN", "TRAINERS"] },

    { path: config.routes.course_online_item, component: ItemDetail, allowedRoles: ["ADMIN", "TRAINERS"] },
    { path: config.routes.course_online_item_create, component: ItemCreate, allowedRoles: ["ADMIN", "TRAINERS"] },
    { path: config.routes.course_online_item_edit, component: ItemEdit, allowedRoles: ["ADMIN", "TRAINERS"] },

    // Course Offline routes
    { path: config.routes.course_offline, component: CourseOfflineList, allowedRoles: ["ADMIN", "TRAINERS"] },
    { path: config.routes.course_offline_detail, component: CourseOfflineDetail, allowedRoles: ["ADMIN", "TRAINERS"] },
    { path: config.routes.course_offline_create, component: CourseOfflineCreate, allowedRoles: ["ADMIN", "TRAINERS"] },
    { path: config.routes.course_offline_edit, component: CourseOfflineEdit, allowedRoles: ["ADMIN", "TRAINERS"] },

    { path: config.routes.course_offline_subject_detail, component: SubjectDetail, allowedRoles: ["ADMIN", "TRAINERS"] },
    { path: config.routes.course_offline_exam_create, component: ExamOfflineCreate, allowedRoles: ["ADMIN", "TRAINERS"] },

    // Category routes
    { path: config.routes.category_list, component: CategoryList, allowedRoles: ["ADMIN", "TRAINERS"] },
    { path: config.routes.category_create, component: CategoryCreate, allowedRoles: ["ADMIN", "TRAINERS"] },
    { path: config.routes.category_edit, component: CategoryEdit, allowedRoles: ["ADMIN", "TRAINERS"] },

    // Class routes by Teacher
    { path: config.routes.class_list_teacher, component: ClassListTeacher, allowedRoles: ["TEACHER"] },
    { path: config.routes.class_course_list_teacher, component: ClassCourseListTeacher, allowedRoles: ["TEACHER"] },
    { path: config.routes.class_course_detail_teacher, component: ClassCourseDetailTeacher, allowedRoles: ["TEACHER"] },
    { path: config.routes.class_course_subject_list_teacher, component: ClassCourseSubjectTeacher, allowedRoles: ["TEACHER"] },
    { path: config.routes.class_course_slot_view_exam_teacher, component: ExamDetailOfStudent, allowedRoles: ["TEACHER"] },

    { path: config.routes.class_course_slot_detail_teacher, component: ClassCourseSlotDetailTeacher, allowedRoles: ["TEACHER"] },
    { path: config.routes.class_course_slot_create_teacher, component: ClassCourseSlotCreateTeacher, allowedRoles: ["TEACHER"] },
    { path: config.routes.class_course_slot_edit_teacher, component: ClassCourseSlotEditTeacher, allowedRoles: ["TEACHER"] },
    { path: config.routes.class_course_slot_answer_teacher, component: ClassCourseSlotAnswerTeacher, allowedRoles: ["TEACHER"] },

    { path: config.routes.class_course_slot_exam_teacher, component: ClassCourseExamDetail, allowedRoles: ["TEACHER"] },

    // Tutor routes
    { path: config.routes.tutor_registration, component: TutorRegistration },
    { path: config.routes.tutoring_schedule, component: TutoringSchedule, allowedRoles: ["TEACHER"] },
    { path: config.routes.tutoring_schedule_detail, component: TutoringScheduleDetail, allowedRoles: ["TEACHER"] },

    // Booking routes
    { path: config.routes.booking_waiting_list, component: BookingWaitingList, allowedRoles: ["TEACHER"] },
    { path: config.routes.booking_waiting_package, component: ByPackage, allowedRoles: ["TEACHER"] },
    { path: config.routes.booking_waiting_weeks, component: ByWeeks, allowedRoles: ["TEACHER"] },

    { path: config.routes.booking_list, component: BookingList, allowedRoles: ["ADMIN", "TRAINERS"] },

    { path: config.routes.booking_detail, component: BookingDetail, allowedRoles: ["ADMIN", "TRAINERS"] },
    { path: config.routes.lesson_booking_edit, component: LessonBookingEdit, allowedRoles: ["TEACHER"] },

    { path: config.routes.subject_create, component: SubjectCreate, allowedRoles: ["ADMIN", "TRAINERS"] },

    // Meeting routes
    { path: config.routes.room, component: Room },
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
    { path: config.routes.entrance_test, component: EntranceTest, allowedRoles: ["ADMIN", "TRAINERS"] },
    { path: config.routes.entrance_test_detail, component: EntranceTestDetail, allowedRoles: ["ADMIN", "TRAINERS"] },
    { path: config.routes.entrance_test_create, component: EntranceTestCreate, allowedRoles: ["ADMIN", "TRAINERS"] },
];

const authenticationRoutes = [
    { path: config.routes.login, component: Login },
    { path: config.routes.forgot_password, component: ForgotPassword },
    { path: config.routes.reset_password, component: ResetPassword },
];

export { privateRoutes };
export { authenticationRoutes };
