export function addWithPrecision(num1, num2) {
  const sum = num1 + num2;
  const decimalPlaces = sum % 1 !== 0 ? 2 : 0; // Check if there's a decimal part

  const roundedSum = parseFloat(sum.toFixed(decimalPlaces));

  return roundedSum;
}
