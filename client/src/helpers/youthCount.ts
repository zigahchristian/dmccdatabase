// Define the type for the data object
interface Person {
  yearofbirth: string; // Assuming yearofbirth is a string in the data
  // Add other properties if needed for better type safety
}

function calculateYouthCount(data: Person[]): number {
  // Get the current year to calculate age
  const currentYear = new Date().getFullYear();

  // Counter for youth in the age range 16 to 35
  let youthCount = 0;

  // Loop through each record in the data
  data.forEach((record) => {
    const yearOfBirth = parseInt(record.yearofbirth);
    if (!isNaN(yearOfBirth)) {
      // Check if yearOfBirth is a valid number
      const age = currentYear - yearOfBirth;
      if (age >= 16 && age <= 35) {
        youthCount++;
      }
    }
  });

  return youthCount;
}

export default calculateYouthCount;
