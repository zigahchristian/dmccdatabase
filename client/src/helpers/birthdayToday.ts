interface User {
  firstname: string;
  lastname: string;
  dayofbirth: string;
  monthofbirth: string;
  yearofbirth: string;
  age: string;
  avatar: string;
  id: string;
  numberdayofbirth: string;
}

const getTodaysBirthdays = (data: User[]): string[] => {
  // Get today's date
  const birthdayArray = [];
  const today = new Date();

  const todayMonth = String(today.getMonth() + 1); // Months are 0-based

  const numtoday = today.toString();
  const numberdayoftoday = numtoday.split(" ")[2].toString();

  // Filter users whose birthday is today
  const todaysBirthdays = data.filter(
    (user) =>
      user.numberdayofbirth == numberdayoftoday &&
      user.monthofbirth == todayMonth
  );

  // Return an array of names (or any other details you want)
  todaysBirthdays.map((user) =>
    birthdayArray.push({
      id: `${user._id}`,
      avatar: `${user.avatar}`,
      firstname: `${user.firstname}`,
      lastname: `${user.lastname}`,
      age: `${user.age}`,
      yearOfBirth: `${user.yearofbirth}`,
    })
  );

  return birthdayArray;
};

export default getTodaysBirthdays;
