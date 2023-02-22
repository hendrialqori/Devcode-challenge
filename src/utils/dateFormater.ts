export const DateFormater = (date: Date): string => {
  return Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long',
  }).format(date);
};
