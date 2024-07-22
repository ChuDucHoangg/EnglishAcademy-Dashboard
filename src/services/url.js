import config from "../config/index";

const url = {
    BASE_URL: config.key.BASE_API_URL,

    COURSE: {
        LIST: "any/course-online",
        DETAIL: "any/course-online/detail",
        CREATE: "any/course-online",
        UPDATE: "any/course-online",
        DELETE: "any/course-online",
    },

    QUESTION_ITEM_ONLINE: {
        CREATE: "question-item-online",
        UPDATE: "question-item-online",
        DETAIL: "question-item-online",
        DELETE: "question-item-online/item-online",
    },

    COURSE_ITEM: {
        CREATE: "item-online",
        DETAIL: "any/item-online/get-by-slug",
    },

    TOPIC: {
        DETAIL: "any/topic-online/get-by-slug",
        CREATE: "any/topic-online",
        UPDATE: "any/topic-online",
        DELETE: "any/topic-online",
    },

    ITEM: {
        DETAIL: "any/item-online/get-by-slug",
        CREATE: "item-online",
        UPDATE: "item-online",
        DELETE: "item-online",
    },

    COURSE_OFFLINE: {
        LIST: "course-offline",
        DETAIL: "course-offline/user/detail",
        CREATE: "course-offline",
        UPDATE: "course-offline",
        DELETE: "course-offline",
    },

    CATEGORY: {
        LIST: "any/category",
        DETAIL: "category",
        CREATE: "category",
        EDIT: "category",
        DELETE: "category",
    },

    AUTH: {
        LOGIN: "auth/user/signip",
        CHANGE_PASSWORD: "user/change-password",
        FORGOT_PASSWORD: "auth/user/forgot-password",
        RESET_PASSWORD: "auth/user/reset-password",
        PROFILE: "user/profile",
        UPDATE_PROFILE: "user/update-profile",
    },

    TUTOR: {
        TUTOR_REGISTRATION: "any/tutor/hello",

        BOOKING_LIST: "any/booking",

        BOOKING_WAITING: "tutor/booking-waiting",
        BOOKING_WAITING_PACKAGE: "package-student/tutor",
        BOOKING_WAITING_WEEKS: "subscription/tutor",

        BOOKING_CONFIRM_PACKAGE: "package-student/confirm",
        BOOKING_CANCEL_PACKAGE: "package-student/cancel",

        BOOKING_CONFIRM_WEEKS: "subscription/confirm",
        BOOKING_CANCEL_WEEKS: "subscription/cancel",

        BOOKING_BY_TUTOR: "tutor/booking",
        BOOKING_DETAIL: "user/booking",

        BOOKING_ROOM: "lession-booking",
    },

    LESSON_BOOKING: {
        CREATE: "lession-booking",
        LIST: "tutor/lession-booking",
        DETAIL: "lession-booking",

        STATUS_CANCEL: "status-cancel/lession-booking",
        STATUS_INPROCESS: "status-inprocess/lession-booking",
        STATUS_COMPLETE: "status-complete/lession-booking",
        STATUS_RESCHEDULE: "status-rescheduled/lession-booking",
    },

    SUBJECT: {
        CREATE: "subject",
    },

    CLASS: {
        LIST: "classes/by-teacher",
        COURSE_BY_CLASS: "course-offline/user/get-by-class",
        COURSE_DETAIL_BY_CLASS: "course-offline/user/detail",
        COURSE_SUBJECT_LIST_BY_CLASS: "subject/detail/user",
        COURSE_SLOT_DETAIL_BY_CLASS: "item-slot/user",

        COURSE_ITEM_SLOT_CREATE: "item-slot",
        COURSE_ITEM_SLOT_EDIT: "item-slot",
        COURSE_ITEM_SLOT_DELETE: "item-slot",

        ITEM_SLOT_MARK_POINT: "answer-student-item-slot/teacher/score",
    },

    DASHBOARD_TEACHER: {
        TOTAL_CLASS: "classes/by-teacher/count",
        COUNT_STUDENT_STUDYING: "tutor/get-count-student-studing",
    },

    DASHBOARD_TRAINER: {
        POTENTIAL_CUSTOMER: "potential-customer",
    },

    ENTRANCE_TEST: {
        LIST: "any/test-input",
        CREATE: "test-input",
        UPDATE: "test-input",
        DETAIL: "any/detail",
        DETAIL_QUESTION: "any/detail",
        DELETE: "test-input",
    },

    TEST_ONLINE: {
        CREATE: "test-online/create",
        DETAIL: "test-online/user/detail",
        EDIT: "test-online/edit",
        DELETE: "test-online/delete",
    },

    TEST_OFFLINE: {
        CREATE: "test-offline/create",
        MARK_POINT: "test-offline/score",
        LIST_STUDENT_TEST: "test-offline/list-student",
        DETAIL_OF_STUDENT: "test-offline/detail-score",
    },

    CLASSES: {
        GET_ALL: "classes/get-all",
    },

    MENU: {
        GET_ALL: "menu",
    },
};
export default url;
