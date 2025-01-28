import React, { useContext, useEffect, useState } from "react";
import securelocalStorage from "react-secure-storage";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";
import { useParams } from "react-router-dom";
import { CurrentMemberContext } from "@/contexts/CurrentMemberContext";
import MemberService from "@/services/memberService";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../contexts/NotificationContext";
import secureLocalStorage from "react-secure-storage";

interface MemberFormInputs {
  alive: string;
  membership: string;
  avatar: string;
  firstname: string;
  othernames: string;
  lastname: string;
  dayofbirth: string;
  numberdayofbirth: string;
  monthofbirth: string;
  yearofbirth: string;
  gender: string;
  active: string;
  mothertongue: string;
  placeofbirth: string;
  hometown: string;
  fathersname: string;
  mothersname: string;
  country: string;
  email: string;
  emergencycontact: string;
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
  baptised_datebaptism?: string;
  baptised_nlb: string;
  baptised_godparent: string;
  firstcommunion: string;
  firstcommunion_officiatingminister: string;
  firstcommunion_placeoffirstcommunion: string;
  firstcommunion_datefirstcommunion?: string;
  firstcommunion_nlc: string;
  firstcommunion_godparent: string;
  confirmed: string;
  confirmed_officiatingminister: string;
  confirmed_placeofconfirmation: string;
  confirmed_datefconfirmation?: string;
  confirmed_nlconf: string;
  confirmed_godparent: string;
  maritalstatus: string;
  married_officiatingminister: string;
  married_placeofholymatrimony: string;
  married_dateofholymatrimony?: string;
  married_nlm: string;
  married_godparent: string;
  nameofspouse: string;
  spousedenomination: string;
  spousenationality: string;
  numberofchildren: string;
  nameofchildren: string[];
  dues: string[];
}

const EditMember: React.FC<{
  currentmember?: Partial<MemberFormInputs>;
}> = () => {
  const [languages, setLanguages] = useState<string[]>([]);
  const [newLanguage, setNewLanguage] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState<string>("");
  const [associations, setAssociations] = useState<string[]>([]);
  const [newAssociation, setNewAssociation] = useState<string>("");
  const [cassociations, setCassociations] = useState<string[]>([]);
  const [newCassociation, setNewCassociation] = useState<string>("");
  const [children, setChildren] = useState<string[]>([]);
  const [newChild, setNewChild] = useState<string>("");
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const params = useParams();
  const { id } = params;
  const { currentmember } = useContext(CurrentMemberContext);
  const { dispatch } = useContext(CurrentMemberContext);

  const [formData, setFormData] = useState<MemberFormInputs>({
    _id: currentmember?._id,
    alive: currentmember?.alive || "true",
    membership: currentmember?.membership || "active",
    avatar: currentmember?.avatar || "",
    firstname: currentmember?.firstname || "",
    othernames: currentmember?.othernames || "",
    lastname: currentmember?.lastname || "",
    dayofbirth: currentmember?.dayofbirth || "",
    numberdayofbirth: currentmember?.numberdayofbirth || "",
    monthofbirth: currentmember?.monthofbirth || "",
    yearofbirth: currentmember?.yearofbirth || "",
    gender: currentmember?.gender || "",
    active: currentmember?.active || "active",
    mothertongue: currentmember?.mothertongue || "",
    placeofbirth: currentmember?.placeofbirth || "",
    hometown: currentmember?.hometown || "",
    fathersname: currentmember?.fathersname || "",
    mothersname: currentmember?.mothersname || "",
    country: currentmember?.country || "",
    email: currentmember?.email || "",
    emergencycontact: currentmember?.emergencycontact || "",
    phonenumber1: currentmember?.phonenumber1 || "",
    phonenumber2: currentmember?.phonenumber2 || "",
    digitaladdress: currentmember?.digitaladdress || "",
    city: currentmember?.city || "",
    landmark: currentmember?.landmark || "",
    education: currentmember?.education || "",
    otherlanguages: currentmember?.otherlanguages,
    skills: currentmember?.skills || skills,
    occupationstatus:
      currentmember?.occupationstatus || "Choose Employment Stats",
    occupation: currentmember?.occupation || "",
    placeofwork: currentmember?.placeofwork || "",
    nameofschool: currentmember?.nameofschool || "",
    previousparish: currentmember?.previousparish || "",
    previousassociations: currentmember?.previousassociations,
    currentassociations: currentmember?.currentassociations,
    baptised: currentmember?.baptised || "No",
    baptised_officiatingminister:
      currentmember?.baptised_officiatingminister || "",
    baptised_placeofbaptism: currentmember?.baptised_placeofbaptism || "",
    baptised_datebaptism: currentmember?.baptised_datebaptism,
    baptised_nlb: currentmember?.baptised_nlb || "",
    baptised_godparent: currentmember?.baptised_godparent || "",
    firstcommunion: currentmember?.firstcommunion || "No",
    firstcommunion_officiatingminister:
      currentmember?.firstcommunion_officiatingminister || "",
    firstcommunion_placeoffirstcommunion:
      currentmember?.firstcommunion_placeoffirstcommunion || "",
    firstcommunion_datefirstcommunion:
      currentmember?.firstcommunion_datefirstcommunion,
    firstcommunion_nlc: currentmember?.firstcommunion_nlc || "",
    firstcommunion_godparent: currentmember?.firstcommunion_godparent || "",
    confirmed: currentmember?.confirmed || "No",
    confirmed_officiatingminister:
      currentmember?.confirmed_officiatingminister || "",
    confirmed_placeofconfirmation:
      currentmember?.confirmed_placeofconfirmation || "",
    confirmed_datefconfirmation: currentmember?.confirmed_datefconfirmation,
    confirmed_nlconf: currentmember?.confirmed_nlconf || "",
    confirmed_godparent: currentmember?.confirmed_godparent || "",
    maritalstatus: currentmember?.maritalstatus || "Single",
    married_officiatingminister:
      currentmember?.married_officiatingminister || "",
    married_placeofholymatrimony:
      currentmember?.married_placeofholymatrimony || "",
    married_dateofholymatrimony: currentmember?.married_dateofholymatrimony,
    married_nlm: currentmember?.married_nlm || "",
    married_godparent: currentmember?.married_godparent || "",
    nameofspouse: currentmember?.nameofspouse || "",
    spousedenomination: currentmember?.spousedenomination || "",
    spousenationality: currentmember?.spousenationality || "",
    numberofchildren: currentmember?.numberofchildren || "",
    nameofchildren: currentmember?.nameofchildren,
    dues: currentmember?.dues,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
      formData.otherlanguages.push(newLanguage.trim());
      setNewLanguage(""); // Clear input after adding
    }
  };

  const removeLanguage = (language: string) => {
    const updateLanguages = formData.otherlanguages.filter(
      (item) => item !== language
    );
    formData.otherlanguages = updateLanguages;
    setNewLanguage(updateLanguages);
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      // Add to FormData
      formData.skills.push(newSkill.trim());

      // Update local state
      setSkills([...skills, newSkill.trim()]);
      setNewSkill(""); // Clear input after adding
    }
  };

  const removeSkill = (skill: string) => {
    // Update FormData
    const updatedSkills = formData.skills.filter((item) => item !== skill);
    formData.skills = updatedSkills;

    // Update local state
    setSkills(updatedSkills);
  };

  const addAssociation = () => {
    if (
      newAssociation.trim() &&
      !associations.includes(newAssociation.trim())
    ) {
      formData.previousassociations.push(newAssociation.trim());
      setNewAssociation(""); // Clear input after adding
    }
  };

  const removeAssociation = (associationToRemove: string) => {
    const updatedAssociations = formData.previousassociations.filter(
      (item) => item !== associationToRemove
    );
    formData.previousassociations = updatedAssociations;
    setAssociations(updatedAssociations);
  };

  const addChildren = () => {
    if (newChild.trim() && !children.includes(newChild.trim())) {
      formData.nameofchildren.push(newChild.trim());
      setNewChild(""); // Clear input after adding
    }
  };

  const removeChildren = (childToRemove: string) => {
    const updatedChildren = formData.nameofchildren.filter(
      (item) => item !== childToRemove
    );
    formData.nameofchildren = updatedChildren;
    setChildren(updatedChildren);
  };

  const addCassociation = () => {
    if (
      newCassociation.trim() &&
      !cassociations.includes(newCassociation.trim())
    ) {
      formData.currentassociations.push(newCassociation.trim());
      setNewCassociation(""); // Clear input after adding
    }
  };

  const removeCassociation = (associationToRemove: string) => {
    const updatedAssociations = formData.currentassociations.filter(
      (item) => item !== associationToRemove
    );
    formData.currentassociations = updatedAssociations;
    setCassociations(updatedAssociations);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      console.log(formData);
      const currentMember: any = secureLocalStorage.getItem("currentMember");
      console.log(currentMember._id);
      const res = await MemberService.updateMember(formData._id, formData);
      if (res === 200 || res === 304) {
        secureLocalStorage.removeItem("updateMember");
        navigate(`/viewmember/${currentMember._id}`, { replace: true });
        return showNotification({
          message: "Updating member was Successful!",
          type: "success",
        });
      }
    } catch (error) {
      return showNotification({
        message: "Adding Member Failed - Please Try Again later",
        type: "error",
      });
    }
  };

  useEffect(() => {
    const fetchMember = async () => {
      dispatch({ type: "FETCH REQUEST" });
      try {
        const dbdata = await MemberService.getMemberById(id);
        dispatch({ type: "FETCH_SUCCESS", payload: dbdata });
      } catch (error) {
        console.error(error);
        dispatch({ type: "FETCH_FAILED", payload: error });
      }
    };
    fetchMember();
  }, []);

  return currentmember === undefined ? (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div>Fetcting Member ........</div>
    </div>
  ) : (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Edit credentials of an existing member.
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Change information and submit to save information.
        </p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="alive" className="font-medium text-gray-700">
          Alive
        </label>
        <select
          id="alive"
          name="alive"
          value={formData.alive}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Male">True</option>
          <option value="Female">False</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="membership" className="font-medium text-gray-700">
          Membership
        </label>
        <select
          id="membership"
          name="membership"
          value={formData.membership}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Male">Active</option>
          <option value="Female">Inactive</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="firstname" className="font-medium text-gray-700">
          First Name
        </label>
        <input
          id="firstname"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="lastname" className="font-medium text-gray-700">
          Last Name
        </label>
        <input
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="lastname" className="font-medium text-gray-700">
          Other Names
        </label>
        <input
          id="othernames"
          name="othernames"
          value={formData.othernames}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="dayofbirth" className="font-medium text-gray-700">
          Day Of Birth
        </label>
        <select
          id="dayofbirth"
          name="dayofbirth"
          value={formData.dayofbirth}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Day of Birth</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="dayofbirth" className="font-medium text-gray-700">
          Number Day of Birth
        </label>
        <select
          id="numberdayofbirth"
          name="numberdayofbirth"
          value={formData.numberdayofbirth}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
          <option value="31">31</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="dayofbirth" className="font-medium text-gray-700">
          Month Of Birth
        </label>
        <select
          id="monthofbirth"
          name="monthofbirth"
          value={formData.monthofbirth}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="dayofbirth" className="font-medium text-gray-700">
          Year Of Birth
        </label>
        <select
          id="yearofbirth"
          name="yearofbirth"
          value={formData.yearofbirth}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="1955">1955</option>
          <option value="1956">1956</option>
          <option value="1957">1957</option>
          <option value="1958">1958</option>
          <option value="1959">1959</option>
          <option value="1960">1960</option>
          <option value="1961">1961</option>
          <option value="1962">1962</option>
          <option value="1963">1963</option>
          <option value="1964">1964</option>
          <option value="1965">1965</option>
          <option value="1966">1966</option>
          <option value="1967">1967</option>
          <option value="1968">1968</option>
          <option value="1969">1969</option>
          <option value="1970">1970</option>
          <option value="1971">1971</option>
          <option value="1972">1972</option>
          <option value="1973">1973</option>
          <option value="1974">1974</option>
          <option value="1975">1975</option>
          <option value="1976">1976</option>
          <option value="1977">1977</option>
          <option value="1978">1978</option>
          <option value="1979">1979</option>
          <option value="1980">1980</option>
          <option value="1981">1981</option>
          <option value="1982">1982</option>
          <option value="1983">1983</option>
          <option value="1984">1984</option>
          <option value="1985">1985</option>
          <option value="1986">1986</option>
          <option value="1987">1987</option>
          <option value="1988">1988</option>
          <option value="1989">1989</option>
          <option value="1990">1990</option>
          <option value="1991">1991</option>
          <option value="1992">1992</option>
          <option value="1993">1993</option>
          <option value="1994">1994</option>
          <option value="1995">1995</option>
          <option value="1996">1996</option>
          <option value="1997">1997</option>
          <option value="1998">1998</option>
          <option value="1999">1999</option>
          <option value="2000">2000</option>
          <option value="2001">2001</option>
          <option value="2002">2002</option>
          <option value="2003">2003</option>
          <option value="2004">2004</option>
          <option value="2005">2005</option>
          <option value="2006">2006</option>
          <option value="2007">2007</option>
          <option value="2008">2008</option>
          <option value="2009">2009</option>
          <option value="2010">2010</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="gender" className="font-medium text-gray-700">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">{formData.gender}</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="mothertongue" className="font-medium text-gray-700">
          Mother Tongue
        </label>
        <input
          id="mothertongue"
          name="mothertongue"
          value={formData.mothertongue}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="placeofbirth" className="font-medium text-gray-700">
          Place Of Birth
        </label>
        <input
          id="placeofbirth"
          name="placeofbirth"
          value={formData.placeofbirth}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="hometown" className="font-medium text-gray-700">
          Hometown
        </label>
        <input
          id="hometown"
          name="hometown"
          value={formData.hometown}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="fathersname" className="font-medium text-gray-700">
          Father's Name
        </label>
        <input
          id="fathersname"
          name="fathersname"
          value={formData.fathersname}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="mothersname" className="font-medium text-gray-700">
          Mother's Name
        </label>
        <input
          id="mothersname"
          name="mothersname"
          value={formData.mothersname}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="country" className="font-medium text-gray-700">
          Country
        </label>
        <input
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="emergencycontact" className="font-medium text-gray-700">
          Emergency Contact
        </label>
        <input
          id="emergencycontact"
          name="emergencycontact"
          value={formData.emergencycontact}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="phonenumber1" className="font-medium text-gray-700">
          Phone Number - WhatsApp
        </label>
        <input
          id="phonenumber1"
          name="phonenumber1"
          value={formData.phonenumber1}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="phonenumber2" className="font-medium text-gray-700">
          Phone Number 2
        </label>
        <input
          id="phonenumber2"
          name="phonenumber2"
          value={formData.phonenumber2}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="digitaladdress" className="font-medium text-gray-700">
          Digital Address
        </label>
        <input
          id="digitaladdress"
          name="digitaladdress"
          value={formData.digitaladdress}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="city" className="font-medium text-gray-700">
          City
        </label>
        <input
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="landmark" className="font-medium text-gray-700">
          Landmark
        </label>
        <input
          id="landmark"
          name="landmark"
          value={formData.landmark}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="education" className="font-medium text-gray-700">
          Highest Education
        </label>
        <input
          id="education"
          name="education"
          value={formData.education}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <div className="sm:col-span-2">
          <label htmlFor="otherlanguages" className="font-medium text-gray-700">
            Other Languages
          </label>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {formData.otherlanguages.map((language, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="pl-3 pr-2 py-1 flex items-center gap-1"
                >
                  {language}
                  <button
                    type="button"
                    onClick={() => removeLanguage(language)}
                    className="hover:bg-gray-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder="Add other Languages"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addLanguage();
                  }
                }}
              />
              <Button
                type="button"
                onClick={addLanguage}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="sm:col-span-2">
          <label htmlFor="skills" className="font-medium text-gray-700">
            Add Skills
          </label>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="pl-3 pr-2 py-1 flex items-center gap-1"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="hover:bg-gray-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add other Languages"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
              />
              <Button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="occupationstatus" className="font-medium text-gray-700">
          Occupation Status
        </label>
        <select
          id="occupationstatus"
          name="occupationstatus"
          value={formData.occupationstatus}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Employed">Employed</option>
          <option value="Self Employed">Self Employed</option>
          <option value="Unemployed">Unemployed</option>
          <option value="Retired">Retired</option>
          <option value="Student">Student</option>
        </select>
      </div>
      <div
        className={`sm:col-span-2 ${
          formData.occupationstatus === "Student" ||
          formData.occupationstatus === "Unemployed"
            ? "hidden"
            : ""
        }`}
      >
        <label htmlFor="occupation" className="font-medium text-gray-700">
          Occupation
        </label>
        <input
          id="occupation"
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div
        className={`sm:col-span-2 ${
          formData.occupationstatus === "Student" ||
          formData.occupationstatus === "Unemployed"
            ? "hidden"
            : ""
        }`}
      >
        <label htmlFor="placeofwork" className="font-medium text-gray-700">
          Place of Work
        </label>
        <input
          id="placeofwork"
          name="placeofwork"
          value={formData.placeofwork}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div
        className={` ${
          formData.occupationstatus === "Student" ? "sm:col-span-2" : "hidden"
        }`}
      >
        <label htmlFor="nameofschool" className="font-medium text-gray-700">
          Name of School
        </label>
        <input
          id="nameofschool"
          name="nameofschool"
          value={formData.nameofschool}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="previousparish" className="font-medium text-gray-700">
          Previous Parish
        </label>
        <input
          id="previousparish"
          name="previousparish"
          value={formData.previousparish}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <div className="flex flex-col">
          <label
            htmlFor="previousassociations"
            className="font-medium text-gray-700"
          >
            Previous Associations
          </label>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {formData.previousassociations.map((association, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="pl-3 pr-2 py-1 flex items-center gap-1"
                >
                  {association}
                  <button
                    type="button"
                    onClick={() => removeAssociation(association)}
                    className="hover:bg-gray-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newAssociation}
                onChange={(e) => setNewAssociation(e.target.value)}
                placeholder="Add other Languages"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addAssociation();
                  }
                }}
              />
              <Button
                type="button"
                onClick={addAssociation}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col">
          <label
            htmlFor="currentassociations"
            className="font-medium text-gray-700"
          >
            Associations You will like to Join in DMCC
          </label>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {formData.currentassociations.map((association, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="pl-3 pr-2 py-1 flex items-center gap-1"
                >
                  {association}
                  <button
                    type="button"
                    onClick={() => removeCassociation(association)}
                    className="hover:bg-gray-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newCassociation}
                onChange={(e) => setNewCassociation(e.target.value)}
                placeholder="Add other Languages"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCassociation();
                  }
                }}
              />
              <Button
                type="button"
                onClick={addCassociation}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="baptised" className="font-medium text-gray-700">
          Baptised
        </label>
        <select
          id="baptised"
          name="baptised"
          value={formData.baptised}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div
        className={`sm:col-span-2 flex flex-col ${
          formData.baptised === "No" ? "hidden" : ""
        }`}
      >
        <label
          htmlFor="baptised_officiatingminister"
          className="font-medium text-gray-700"
        >
          Baptised Officiating Minister
        </label>
        <input
          id="baptised_officiatingminister"
          name="baptised_officiatingminister"
          value={formData.baptised_officiatingminister}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div
        className={`sm:col-span-2 flex flex-col ${
          formData.baptised === "No" ? "hidden" : ""
        }`}
      >
        <label
          htmlFor="baptised_placeofbaptism"
          className="font-medium text-gray-700"
        >
          Baptised Place of Baptism
        </label>
        <input
          id="baptised_placeofbaptism"
          name="baptised_placeofbaptism"
          value={formData.baptised_placeofbaptism}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div
        className={`sm:col-span-2 flex flex-col ${
          formData.baptised === "No" ? "hidden" : ""
        }`}
      >
        <label
          htmlFor="baptised_datebaptism"
          className="font-medium text-gray-700"
        >
          Baptised Date of Baptism. Seletected Date{" "}
          {formData.baptised_datebaptism}
        </label>
        <input
          id="baptised_datebaptism"
          name="baptised_datebaptism"
          type="date"
          value={formData.baptised_datebaptism}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full"
        />
      </div>
      <div
        className={`sm:col-span-2 flex flex-col ${
          formData.baptised === "No" ? "hidden" : ""
        }`}
      >
        <label htmlFor="baptised_nlb" className="font-medium text-gray-700">
          NLB from Baptisma Card
        </label>
        <input
          id="baptised_nlb"
          name="baptised_nlb"
          value={formData.baptised_nlb}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div
        className={`sm:col-span-2 flex flex-col ${
          formData.baptised === "No" ? "hidden" : ""
        }`}
      >
        <label
          htmlFor="baptised_godparent"
          className="font-medium text-gray-700"
        >
          Baptised Godparent
        </label>
        <input
          id="baptised_godparent"
          name="baptised_godparent"
          value={formData.baptised_godparent}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="confirmed" className="font-medium text-gray-700">
          Received First Communion?
        </label>
        <select
          id="firstcommunion"
          name="firstcommunion"
          value={formData.firstcommunion}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={formData.firstcommunion}>
            {formData.firstcommunion}
          </option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div
        className={`sm:col-span-2 flex flex-col ${
          formData.firstcommunion === "No" ? "hidden" : ""
        }`}
      >
        <label
          htmlFor="firstcommunion_officiatingminister"
          className="font-medium text-gray-700"
        >
          First Communion Officiating Minister
        </label>
        <input
          id="firstcommunion_officiatingminister"
          name="firstcommunion_officiatingminister"
          value={formData.firstcommunion_officiatingminister}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div
        className={`sm:col-span-2 flex flex-col ${
          formData.firstcommunion === "No" ? "hidden" : ""
        }`}
      >
        <label
          htmlFor="firstcommunion_placeoffirstcommunion"
          className="font-medium text-gray-700"
        >
          First Communion Place of First Communion
        </label>
        <input
          id="firstcommunion_placeoffirstcommunion"
          name="firstcommunion_placeoffirstcommunion"
          value={formData.firstcommunion_placeoffirstcommunion}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div
        className={`sm:col-span-2 flex flex-col ${
          formData.firstcommunion === "No" ? "hidden" : ""
        }`}
      >
        <label
          htmlFor="firstcommunion_dateoffirstcommunion"
          className="font-medium text-gray-700"
        >
          First Communion Date of First Communion. Selected Date:{" "}
          {formData.firstcommunion_dateoffirstcommunion}
        </label>
        <input
          id="firstcommunion_dateoffirstcommunion"
          name="firstcommunion_dateoffirstcommunion"
          type="date"
          value={formData.firstcommunion_dateoffirstcommunion}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full"
        />
      </div>
      <div
        className={`sm:col-span-2 flex flex-col ${
          formData.firstcommunion === "No" ? "hidden" : ""
        }`}
      >
        <label
          htmlFor="firstcommunion_nlb"
          className="font-medium text-gray-700"
        >
          NLB from First Communion Card
        </label>
        <input
          id="firstcommunion_nlb"
          name="firstcommunion_nlb"
          value={formData.firstcommunion_nlb}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div
        className={`sm:col-span-2 flex flex-col ${
          formData.firstcommunion === "No" ? "hidden" : ""
        }`}
      >
        <label
          htmlFor="firstcommunion_godparent"
          className="font-medium text-gray-700"
        >
          First Communion Godparent
        </label>
        <input
          id="firstcommunion_godparent"
          name="firstcommunion_godparent"
          value={formData.firstcommunion_godparent}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="confirmed" className="font-medium text-gray-700">
          Confirmed
        </label>
        <select
          id="confirmed"
          name="confirmed"
          value={formData.confirmed}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={formData.confirmed}>{formData.confirmed}</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div
        className={`sm:col-span-2 flex flex-col ${
          formData.confirmed === "No" ? "hidden" : ""
        }`}
      >
        <label
          htmlFor="confirmed_officiatingminister"
          className="font-medium text-gray-700"
        >
          Confirmed Officiating Minister
        </label>
        <input
          id="confirmed_officiatingminister"
          name="confirmed_officiatingminister"
          value={formData.confirmed_officiatingminister}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div
        className={`sm:col-span-2 flex flex-col ${
          formData.confirmed === "No" ? "hidden" : ""
        }`}
      >
        <label
          htmlFor="confirmed_placeofconfirmation"
          className="font-medium text-gray-700"
        >
          Confirmed Place of Confirmation
        </label>
        <input
          id="confirmed_placeofconfirmation"
          name="confirmed_placeofconfirmation"
          value={formData.confirmed_placeofconfirmation}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div
        className={`sm:col-span-2 flex flex-col ${
          formData.confirmed === "No" ? "hidden" : ""
        }`}
      >
        <label
          htmlFor="confirmed_datefconfirmation"
          className="font-medium text-gray-700"
        >
          Confirmed Date of Confirmation. Selected Date:{" "}
          {formData.confirmed_datefconfirmation}
        </label>
        <input
          id="confirmed_datefconfirmation"
          name="confirmed_datefconfirmation"
          value={formData.confirmed_datefconfirmation}
          type="date"
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full"
        />
      </div>
      <div
        className={`sm:col-span-2 flex flex-col ${
          formData.confirmed === "No" ? "hidden" : ""
        }`}
      >
        <label htmlFor="confirmed_nlconf" className="font-medium text-gray-700">
          NLConf from Confirmation Card
        </label>
        <input
          id="confirmed_nlconf"
          name="confirmed_nlconf"
          value={formData.confirmed_nlconf}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div
        className={`sm:col-span-2 flex flex-col ${
          formData.confirmed === "No" ? "hidden" : ""
        }`}
      >
        <label
          htmlFor="confirmed_godparent"
          className="font-medium text-gray-700"
        >
          Confirmed Godparent
        </label>
        <input
          id="confirmed_godparent"
          name="confirmed_godparent"
          value={formData.confirmed_godparent}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="maritalstatus" className="font-medium text-gray-700">
          Marital Status
        </label>
        <select
          id="maritalstatus"
          name="maritalstatus"
          value={formData.maritalstatus}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={formData.maritalstatus}>
            {formData.maritalstatus}
          </option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
          <option value="Widowed">Widowed</option>
        </select>
      </div>
      <div
        className={`sm:col-span-2 flex flex-col ${
          formData.maritalstatus === "Single" ? "hidden" : ""
        }`}
      >
        <div className="flex flex-col">
          <label
            htmlFor="officiatingminister"
            className="font-medium text-gray-700"
          >
            Marriage - Officiating Minister
          </label>
          <input
            id="marriage_officiatingminister"
            name="marriage_officiatingminister"
            value={formData.marriage_officiatingminister}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div
        className={`sm:col-span-2 flex flex-col ${
          formData.maritalstatus === "Single" ? "hidden" : ""
        }`}
      >
        <div className="flex flex-col">
          <label
            htmlFor="placeofmarriage"
            className="font-medium text-gray-700"
          >
            Marriage - Place of Marriage
          </label>
          <input
            id="marriage_placeofmarriage"
            name="marriage_placeofmarriage"
            value={formData.marriage_placeofmarriage}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div
        className={`sm:col-span-2 flex flex-col ${
          formData.maritalstatus === "Single" ? "hidden" : ""
        }`}
      >
        <div className="flex flex-col">
          <label htmlFor="dateofmarriage" className="font-medium text-gray-700">
            Marriage - Date of Marriage. Selected Date{" "}
            {formData.married_dateofholymatrimony}
          </label>
          <input
            id="marriage_dateofmarriage"
            name="marriage_dateofmarriage"
            type="date"
            value={formData.marriage_dateofmarriage}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full"
          />
        </div>
      </div>
      <div
        className={`sm:col-span-2 flex flex-col ${
          formData.maritalstatus === "Single" ? "hidden" : ""
        }`}
      >
        <div className="flex flex-col">
          <label htmlFor="marriage_nlm" className="font-medium text-gray-700">
            Marriage - NLM
          </label>
          <input
            id="marriage_nlm"
            name="marriage_nlm"
            value={formData.marriage_nlm}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div
        className={`sm:col-span-2 flex flex-col ${
          formData.maritalstatus === "Single" ? "hidden" : ""
        }`}
      >
        <div className="flex flex-col">
          <label
            htmlFor="marriage_godparent"
            className="font-medium text-gray-700"
          >
            Marriage - GodParent
          </label>
          <input
            id="marriage_godparent"
            name="marriage_godparent"
            value={formData.marriage_godparent}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div
        className={`sm:col-span-2 flex flex-col ${
          formData.maritalstatus === "Single" ? "hidden" : ""
        }`}
      >
        <div className="flex flex-col">
          <label htmlFor="nameofspouse" className="font-medium text-gray-700">
            Name of Spouse
          </label>
          <input
            id="nameofspouse"
            name="nameofspouse"
            value={formData.spouse}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div
        className={`sm:col-span-2 flex flex-col ${
          formData.maritalstatus === "Single" ? "hidden" : ""
        }`}
      >
        <div className="flex flex-col">
          <label
            htmlFor="spousedemonination"
            className="font-medium text-gray-700"
          >
            Spouse Denominations
          </label>
          <input
            id="spousedenomination"
            name="spousedemonination"
            value={formData.spousedemonination}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div
        className={`sm:col-span-2 flex flex-col ${
          formData.maritalstatus === "Single" ? "hidden" : ""
        }`}
      >
        <div className="flex flex-col">
          <label
            htmlFor="numberofchildren"
            className="font-medium text-gray-700"
          >
            Number of Children
          </label>

          <input
            id="numberofchildren"
            name="numberofchildren"
            value={formData.numberofchildren}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <div
          className={`sm:col-span-2 flex flex-col ${
            formData.maritalstatus === "Single" ? "hidden" : ""
          }`}
        >
          <label htmlFor="nameofchildren" className="font-medium text-gray-700">
            Name of Children
          </label>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {formData.nameofchildren.map((child, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="pl-3 pr-2 py-1 flex items-center gap-1"
                >
                  {child}
                  <button
                    type="button"
                    onClick={() => removeChildren(child)}
                    className="hover:bg-gray-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newChild}
                onChange={(e) => setNewChild(e.target.value)}
                placeholder="Add other Languages"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addChildren();
                  }
                }}
              />
              <Button
                type="button"
                onClick={addChildren}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
      >
        Submit
      </button>
    </form>
  );
};

export default EditMember;
