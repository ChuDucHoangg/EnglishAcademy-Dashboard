const routes = {
    dashboard: "/",

    // Start routes Course Online
    course_online: "/course-online",
    course_online_detail: "/course-online/detail/:slug",
    course_online_create: "/course-online/create",
    course_online_edit: "/course-online/edit/:slug",
    // End routes Course Online

    // Start routes Category
    category_list: "/category-list",
    category_create: "/category-create",
    category_edit: "/category-edit/:slug",
    // End routes Category

    // Start routes Lesson
    lesson_online: "/lesson-online",
    lesson_online_create: "/lesson-online/create",
    lesson_online_edit: "/lesson-online/edit/:slug",
    // End routes Lesson

    // Start routes Exam
    exam_online: "/exam-online",
    exam_online_create: "/exam-online/create",
    exam_online_edit: "/exam-online/edit/:slug",
    // End routes Exam

    // Start routes Test
    test_online: "/test-online",
    test_online_create: "/test-online/create",
    test_online_edit: "/test-online/edit/:slug",

    multiple_choice: "/multiple-choice",
    practical_exam: "/practical-exam",
    entrance_test: "/entrance-test",

    question_online: "/question-online",
    // End routes Test

    // Start routes Timetable
    timetable: "/timetable",
    // End routes Timetable

    // Start routes Class
    class_list: "/classes",
    class_create: "/class/create",
    class_edit: "/class/edit/:slug",
    classroom: "/classroom",
    // End routes Class

    // Start routes Device
    device: "/device",
    // End routes Device

    // Start routes Student
    student_list: "/students",
    student_create: "/student/create",
    student_edit: "/student/edit/:slug",
    // End routes Student

    // Start routes Staff
    staff_list: "/staff",
    staff_create: "/staff/create",
    staff_edit: "/staff/edit/:slug",
    // End routes Staff

    // Start routes Authentication
    profile: "/profile",
    login: "/login",
    forgot_password: "/forgot-password",
    reset_password: "/reset-password/:resetToken",
    // End routes Authentication

    // Start routes Tutor
    tutor_booking_list: "/tutor/bookings",
    booking_detail_package: "/tutor/booking-package/:bookingId",
    booking_detail_weeks: "/tutor/booking-weeks/:bookingId",
    // End routes Tutor

    // Start routes Other
    not_found: "*",
    // End routes Other
};

export default routes;
