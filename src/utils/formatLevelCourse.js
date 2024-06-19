export function levelCourse() {
    const levelCourse = [
        {
            level: 0,
            title: "Basic",
        },
        {
            level: 1,
            title: "Intermediate",
        },
        {
            level: 2,
            title: "Advanced",
        },
        {
            level: 3,
            title: "Expert",
        },
    ];

    return levelCourse;
}

export function formatLevelCourse(level) {
    let formatLevel;
    switch (level) {
        case 0:
            formatLevel = "Basic";
            break;
        case 1:
            formatLevel = "Intermediate";
            break;
        case 2:
            formatLevel = "Advanced";
            break;
        case 3:
            formatLevel = "Expert";
            break;
        default:
            break;
    }

    return formatLevel;
}
