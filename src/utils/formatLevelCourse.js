export function levelCourse() {
    const levelCourse = [
        {
            level: 0,
        },
        {
            level: 1,
        },
        {
            level: 2,
        },
        {
            level: 3,
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
