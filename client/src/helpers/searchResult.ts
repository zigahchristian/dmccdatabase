// Define the TypeScript interface for the user object

interface User {
  avatar: string;
  firstname: string;
  othernames: string;
  lastname: string;
  dayofbirth: string;
  numberdayofbirth: number;
  monthofbirth: string;
  yearofbirth: number;
  age: string;
  gender: string;
  active: string;
  mothertongue: string;
  placeofbirth: string;
  hometown: string;
  country: string;
  email: string;
  phonenumber1: string;
  phonenumber2: string;
  digitaladdress: string;
  city: string;
  landmark: string;
  education: string;
  otherlanguages: string[];
  skills: string[];
  occupationstatus: string;
  occupation: string;
  placeofwork: string;
  nameofschool: string;
  previousparish: string;
  previousassociations: string[];
  currentassociations: string[];
  baptised: string;
  baptised_officiatingminister: string;
  baptised_placeofbaptism: string;
  baptised_datebaptism: string;
  baptised_nlb: string;
  baptised_godparent: string;
  firstcommunion: string;
  firstcommunion_officiatingminister: string;
  firstcommunion_placeoffirstcommunion: string;
  firstcommunion_datefirstcommunion: string;
  firstcommunion_nlc: string;
  firstcommunion_godparent: string;
  confirmed: string;
  confirmed_officiatingminister: string;
  confirmed_placeofconfirmation: string;
  confirmed_datefconfirmation: string;
  confirmed_nlconf: string;
  confirmed_godparent: string;
  maritalstatus: string;
  married_officiatingminister: string;
  married_placeofholymatrimony: string;
  married_dateofholymatrimony: string;
  married_nlm: string;
  married_godparent: string;
  nameofspouse: string;
  spousedenomination: string;
  spousenationality: string;
  numberofchildren: string;
  nameofchildren: string;
  id: string;
}

const getSearchResult = (data: User[], query: string): string[] => {
  // Get today's date
  const searchArray = [];
  const searchQuery = query;

  // Filter users whose birthday is today
  const searchResult = data.filter(
    (user: User) =>
      user.firstname.toLowerCase() === query.toLowerCase() ||
      user.lastname.toLowerCase() === query.toLowerCase() ||
      user.id === parseInt(query)
  );


  // Return an array of names (or any other details you want)
  searchResult.map((user) =>
    searchArray.push({
      id: `${user.id}`,
      avatar: `${user.avatar}`,
      firstname: `${user.firstname}`,
      lastname: `${user.lastname}`,
      age: `${user.age}`,
      active: `${user.active}`,
      gender: `${user.gender}`,
      email: `${user.email}`,
      occupation: `${user.occupation}`,
      placeofwork: `${user.placeofwork}`,
      landmark: `${user.occupation}`,
      phonenumber1: `${user.phonenumber1}`,
      phonenumber2: `${user.phonenumber2}`,
      digitaladdress: `${user.digitaladdress}`,
    })
  );
  return searchArray;
};

export default getSearchResult;
