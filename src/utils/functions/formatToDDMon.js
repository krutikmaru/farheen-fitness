export function formatToDDMon(inputDate) {
  const month = inputDate.substr(4, 2);
  const day = inputDate.substr(6, 2);

  // Convert month number to month name
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = monthNames[parseInt(month, 10) - 1];

  return `${parseInt(day, 10)} ${monthName}`;
}
