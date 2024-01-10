export function roundToTwoDecimalPlaces(value) {
  value = Number(value);
  // Check if the value is an integer
  if (Number.isInteger(value)) {
    return value; // Return the integer value as-is
  }

  // Round the number to 2 decimal places
  return parseFloat(value.toFixed(2));
}
