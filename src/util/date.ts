export const hasDateExpired = (date: Date): boolean => {
    return timeRemainingBetweenDateAndNow(date) <= 0;
}

export const timeRemainingBetweenDateAndNow = (date: Date): number => {
    const now = new Date();
    const difference = date.getTime() - now.getTime();
    const differenceRounded = Math.round(difference / 1000);
    return differenceRounded;
}


export const timeRemainingBetween = (futureDate: Date, currentDate: Date): number => {
    const difference = futureDate.getTime() - currentDate.getTime();
    const differenceRounded = Math.round(difference / 1000);
    return differenceRounded;
}