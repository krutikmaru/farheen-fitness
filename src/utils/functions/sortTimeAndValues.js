export function sortTimeAndValues(obj) {
  // Create an array of objects with time and value pairs
  const data = obj.time.map((time, index) => ({
    time,
    value: obj.values[index],
  }));

  // Sort the data array based on time
  const sortedData = [...data].sort((a, b) => {
    const [aHour, aMinute] = a.time.split(":").map(Number);
    const [bHour, bMinute] = b.time.split(":").map(Number);

    if (aHour !== bHour) {
      return aHour - bHour;
    } else {
      return aMinute - bMinute;
    }
  });

  // Create a new object with sorted arrays
  const sortedObj = {
    values: sortedData.map((item) => item.value),
    time: sortedData.map((item) => item.time),
  };

  return sortedObj;
}
