export function extractYear(yyyyMMdd) {
  return yyyyMMdd.substr(0, 4);
}

export function extractMonth(yyyyMMdd) {
  return yyyyMMdd.substr(4, 2);
}

export function extractDay(yyyyMMdd) {
  return yyyyMMdd.substr(6, 2);
}
