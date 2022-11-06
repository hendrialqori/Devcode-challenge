export const formatDate = (date: Date): string => {
  return Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long'
  }).format(date)
}
