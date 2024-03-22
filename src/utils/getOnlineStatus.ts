export default function getOnlineStatus(lastActiveDate: Date): string {
    const currentDate = new Date();

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const elapsed = currentDate.getTime() - lastActiveDate.getTime();

    if (elapsed < msPerMinute) {
        return 'online';
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerDay * 1.5) {
        return '1 day ago';
    } else if (elapsed < msPerDay * 2) {
        return '1.5 days ago';
    } else if (elapsed <= msPerDay * 30) {
        return Math.round(elapsed / msPerDay) + ' days ago';
    } else {
        return 'inactive';
    }
}
