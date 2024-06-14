export function statusColor(status) {
    let color;
    switch (status) {
        case "pending":
            color = "text-indigo-600";
            break;
        case "confirmed":
            color = "text-blue-600";
            break;
        case "completed":
            color = "text-cyan-600";
            break;
        case "cancelled":
            color = "text-red-600";
            break;
        default:
            break;
    }
    return color;
}
