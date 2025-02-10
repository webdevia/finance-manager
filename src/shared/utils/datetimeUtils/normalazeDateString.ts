export const normalizeDateString = (dateString: string) => {
  const date = new Date(dateString);
  const isValidDate = (date: Date) => !isNaN(date.getTime());
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return isValidDate(date) ? formatDate(date) : '';
};
