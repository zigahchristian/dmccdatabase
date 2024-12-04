// Define the type for the data object
interface Person {
  dayofbirth: string; // Assuming dayofbirth is a string in the data
  // Add other properties if needed for better type safety
}

function calculateDaysBorn(data: Person[]): Record<string, number> {
  // Object to hold the count of each day of the week
  const daysCount: Record<string, number> = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  };

  // Loop through each record in the data
  data.forEach((record) => {
    const day = record.dayofbirth;
    if (day in daysCount) {
      // Type-safe way to check if the key exists
      daysCount[day]++;
    }
  });

  return daysCount;
}

export default calculateDaysBorn;
