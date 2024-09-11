// export const formatDate = isoString => {
//   const date = new Date(isoString);
//   const year = date.getUTCFullYear();
//   const month = String(date.getUTCMonth() + 1).padStart(2, '0');
//   const day = String(date.getUTCDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };

export const formatDate = isoString => {
  const date = new Date(isoString);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth() returns 0-11
  const day = String(date.getUTCDate()).padStart(2, '0');

  // Get the hours and minutes, and determine AM/PM
  let hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  // Return in MM/DD/YYYY h:mm A format
  return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
};
