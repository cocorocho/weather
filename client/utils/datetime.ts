export const getTimezone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export const formatDate = (date: string): string => {
  const timestamp = Date.parse(date);
  const parsedDate = new Date(timestamp);

  const options: any = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = parsedDate.toLocaleDateString(undefined, options);

  return formattedDate
}