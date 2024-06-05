const url = {
    BASE_URL: "http://localhost:8080/api/v1/",
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
    },
};
export default url;
