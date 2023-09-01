export const useDate = (date: string) => {
    const _date = new Date(date);
    const day = _date.getDate();
    const monthName = _date.toLocaleString("default", { month: "long" });
    const dayName = _date.toLocaleDateString("default", { weekday: "long" });

    return { day, dayName, monthName }
}