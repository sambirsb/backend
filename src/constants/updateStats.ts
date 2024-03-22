export const UPDATE_STATS_INTERVAL = '0 0,12 * * *';
// cron schedule runs every 12 hours

export const TWELVE_HOURS_AGO = new Date(
    new Date().getTime() - 12 * 60 * 60 * 1000
);
// отримуємо 12 годин назад

export const SEVEN_DAYS_AGO = new Date(
    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
);
// отримуємо 7 днів тому
