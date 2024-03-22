export const formatDate = (dateString: string) =>
    new Date(dateString).toISOString().split('T')[0];
