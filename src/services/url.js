import config from "../config/index";

const url = {
    BASE_URL: config.key.BASE_API_URL,

    COURSE: {
        LIST: "any/course-online",
        DETAIL: "any/course-online/detail/{}",
        CREATE: "course-online",
        UPDATE: "course-online",
        DELETE: "course-online",
    },

    AUTH: {
        LOGIN: "auth/user/signip",
        CHANGE_PASSWORD: "user/change-password",
        FORGOT_PASSWORD: "auth/user/forgot-password",
        RESET_PASSWORD: "auth/user/reset-password",
    },

    TUTOR: {
        BOOKINGS: "any/booking",
        BOOKING_WAITING: "tutor/booking-waiting",
        BOOKING_DETAIL_PACKAGE: "package-student/tutor",
        BOOKING_DETAIL_WEEKS: "subscription/tutor",

        BOOKING_CONFIRM_PACKAGE: "package-student/confirm",
        BOOKING_CANCEL_PACKAGE: "package-student/cancel",

        BOOKING_CONFIRM_WEEKS: "subscription/confirm",
        BOOKING_CANCEL_WEEKS: "subscription/cancel",
    },
};
export default url;
