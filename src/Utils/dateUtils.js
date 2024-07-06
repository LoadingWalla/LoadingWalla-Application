/**
 * Converts an ISO 8601 date-time string to a YYYY-MM-DD format.
 *
 * @param {string} isoString - The ISO 8601 date-time string to convert.
 * @returns {string} The formatted date string in YYYY-MM-DD format.
 */
export const formatDate = isoString => {
  const date = new Date(isoString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth() returns 0-11
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
