export function roundToTwoDecimalPlaces(value) {
  // Check if the value is an integer
  if (Number.isInteger(value)) {
    return value; // Return the integer value as-is
  }

  // Round the number to 2 decimal places
  return parseFloat(value.toFixed(2));
}

// Test cases:
console.log(roundToTwoDecimalPlaces(3.4567)); // Outputs: 3.46
console.log(roundToTwoDecimalPlaces(5));
