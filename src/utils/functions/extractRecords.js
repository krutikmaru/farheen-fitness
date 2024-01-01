export function extractRecordsOfYear(records, year) {
  return records.filter((record) => String(record.dateId).startsWith(year));
}

export function extractRecordsOfMonth(records, year, month) {
  const monthStr = String(month).padStart(2, "0");
  const startDay = `${year}${monthStr}01`;
  const endDay = `${year}${monthStr}31`; // Assuming all months have 31 days for simplicity

  return records.filter(
    (record) =>
      record.dateId >= parseInt(startDay) && record.dateId <= parseInt(endDay)
  );
}

export function extractRecordsOfDay(records, day) {
  return records.filter((record) => record.dateId === Number(day));
}
