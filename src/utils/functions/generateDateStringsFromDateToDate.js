export function generateDateStringsFromDateToDate(
  startDate,
  endDate = new Date()
) {
  const start = new Date(
    `${startDate.substr(0, 4)}-${startDate.substr(4, 2)}-${startDate.substr(
      6,
      2
    )}`
  );
  const end = new Date(endDate);

  const dateStrings = [];
  let currentDate = start;

  while (currentDate <= end) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    dateStrings.push(`${year}${month}${day}`);

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateStrings;
}
