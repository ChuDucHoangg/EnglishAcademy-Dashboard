const routes = {
    dashboard: "/",
    dashboard_teacher: "/dashboard-teacher",
    dashboard_admissions: "/dashboard-admissions",

    // Start routes Course Online
    course_online: "/course-online",
    course_online_detail: "/course-online/detail/:slug",
    course_online_create: "/course-online/create",
    course_online_edit: "/course-online/edit/:slug",

    course_online_topic_create: "/course-online/topic-create/:courseId",
    course_online_topic_edit: "/course-online/topic-edit/:courseId/:topicSlug",

    course_online_item: "/course-online/item/:slug",
    course_online_item_create: "/course-online/item-create/:slug",
    course_online_item_edit: "/course-online/item-edit/:slug",
    // End routes Course Online

    // Start routes Course Online
    course_offline: "/course-offline",
    course_offline_detail: "/course-offline/:slug",
    course_offline_create: "/course-offline/create",
    course_offline_edit: "/course-offline/edit/:slug",
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

    // Start routes Class Teacher
    class_list_teacher: "/teacher/class",
    class_course_list_teacher: "/teacher/class/:classId",
    class_course_detail_teacher: "/teacher/class/:classId/detail/:courseSlug",
    class_course_subject_list_teacher: "/teacher/class/:classId/subject/:courseSlug",
    class_course_slot_list_teacher: "/teacher/class/:classId/subject/:courseSlug",
    class_course_slot_detail_teacher: "/teacher/class/:classId/slot/:slug",
    class_course_slot_create_teacher: "/teacher/class/:classId/:slug/item-slot/create",
    class_course_slot_edit_teacher: "/teacher/class/:classId/:slug/item-slot/edit/:itemSlug",
    class_course_slot_answer_teacher: "/teacher/class/:classId/answer/:slug",
    // End routes Class Teacher

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
    tutor_registration: "/tutor/registration",

    booking_list: "/booking",
    booking_detail: "/booking/:bookingId",
    lesson_booking_create: "/lesson-booking",
    lesson_booking_edit: "/lesson-booking/edit/:bookingId",

    booking_waiting_list: "/booking-waiting",
    booking_waiting_package: "/booking-waiting/package/:bookingId",
    booking_waiting_weeks: "/booking-waiting/weeks/:bookingId",
    // End routes Tutor

    // Start routes Subject
    subject_create: "/subject/create/:courseId",
    // End routes Subject

    // Start routes Meeting
    meeting: "/room/:roomId",
    // End routes Meeting

    // Start routes Other
    not_found: "*",
    // End routes Other
};

export default routes;
