export function generateDateStringsFromDateToDate(
  startDate,
  endDate = new Date()
) {
  // Convert the start and end dates to Date objects if they are in string format
  const start = new Date(
    `${startDate.substr(0, 4)}-${startDate.substr(4, 2)}-${startDate.substr(
      6,
      2
    )}`
  );
  const end = new Date(endDate);

  // Set the time of 'end' to 23:59:59 to include the entire day
  end.setHours(23, 59, 59, 999);

  const dateStrings = [];
  let currentDate = start;

  while (currentDate <= end) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    dateStrings.push(`${year}${month}${day}`);

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateStrings;
}
