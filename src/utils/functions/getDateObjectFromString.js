export function getDateObjectFromString(dateString) {
  // Extract year, month, and day from the string
  const year = parseInt(dateString.substr(0, 4), 10);
  const month = parseInt(dateString.substr(4, 2), 10) - 1; // Months in JS are 0-indexed
  const day = parseInt(dateString.substr(6, 2), 10);

  // Create a new Date object
  return new Date(year, month, day);
}
