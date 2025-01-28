import React, { useState } from "react";
import securelocalStorage from "react-secure-storage";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useNotification } from "../../contexts/NotificationContext";
import secureLocalStorage from "react-secure-storage";
import compressBase64Image from "../../helpers/compressBase64Image";

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

const AddMember: React.FC<{
  currentMember?: Partial<MemberFormInputs>;
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

  const currentMember = securelocalStorage.getItem("currentMember");
  const [formData, setFormData] = useState<MemberFormInputs>({
    alive: currentMember?.alive || "true",
    membership: currentMember?.membership || "active",
    avatar: currentMember?.avatar || "",
    firstname: currentMember?.firstname || "",
    othernames: currentMember?.othernames || "",
    lastname: currentMember?.lastname || "",
    dayofbirth: currentMember?.dayofbirth || "",
    numberdayofbirth: currentMember?.numberdayofbirth || "",
    monthofbirth: currentMember?.monthofbirth || "",
    yearofbirth: currentMember?.yearofbirth || "",
    gender: currentMember?.gender || "",
    active: currentMember?.active || "active",
    mothertongue: currentMember?.mothertongue || "",
    placeofbirth: currentMember?.placeofbirth || "",
    hometown: currentMember?.hometown || "",
    fathersname: currentMember?.fathersname || "",
    mothersname: currentMember?.mothersname || "",
    country: currentMember?.country || "",
    email: currentMember?.email || "",
    emergencycontact: currentMember?.emergencycontact || "",
    phonenumber1: currentMember?.phonenumber1 || "",
    phonenumber2: currentMember?.phonenumber2 || "",
    digitaladdress: currentMember?.digitaladdress || "",
    city: currentMember?.city || "",
    landmark: currentMember?.landmark || "",
    education: currentMember?.education || "",
    otherlanguages: currentMember?.otherlanguages || languages,
    skills: currentMember?.skills || skills,
    occupationstatus:
      currentMember?.occupationstatus || "Choose Employment Stats",
    occupation: currentMember?.occupation || "",
    placeofwork: currentMember?.placeofwork || "",
    nameofschool: currentMember?.nameofschool || "",
    previousparish: currentMember?.previousparish || "",
    previousassociations: currentMember?.previousassociations || [],
    currentassociations: currentMember?.currentassociations || [],
    baptised: currentMember?.baptised || "No",
    baptised_officiatingminister:
      currentMember?.baptised_officiatingminister || "",
    baptised_placeofbaptism: currentMember?.baptised_placeofbaptism || "",
    baptised_datebaptism: currentMember?.baptised_datebaptism,
    baptised_nlb: currentMember?.baptised_nlb || "",
    baptised_godparent: currentMember?.baptised_godparent || "",
    firstcommunion: currentMember?.firstcommunion || "No",
    firstcommunion_officiatingminister:
      currentMember?.firstcommunion_officiatingminister || "",
    firstcommunion_placeoffirstcommunion:
      currentMember?.firstcommunion_placeoffirstcommunion || "",
    firstcommunion_datefirstcommunion:
      currentMember?.firstcommunion_datefirstcommunion,
    firstcommunion_nlc: currentMember?.firstcommunion_nlc || "",
    firstcommunion_godparent: currentMember?.firstcommunion_godparent || "",
    confirmed: currentMember?.confirmed || "No",
    confirmed_officiatingminister:
      currentMember?.confirmed_officiatingminister || "",
    confirmed_placeofconfirmation:
      currentMember?.confirmed_placeofconfirmation || "",
    confirmed_datefconfirmation: currentMember?.confirmed_datefconfirmation,
    confirmed_nlconf: currentMember?.confirmed_nlconf || "",
    confirmed_godparent: currentMember?.confirmed_godparent || "",
    maritalstatus: currentMember?.maritalstatus || "Single",
    married_officiatingminister:
      currentMember?.married_officiatingminister || "",
    married_placeofholymatrimony:
      currentMember?.married_placeofholymatrimony || "",
    married_dateofholymatrimony: currentMember?.married_dateofholymatrimony,
    married_nlm: currentMember?.married_nlm || "",
    married_godparent: currentMember?.married_godparent || "",
    nameofspouse: currentMember?.nameofspouse || "",
    spousedenomination: currentMember?.spousedenomination || "",
    spousenationality: currentMember?.spousenationality || "",
    numberofchildren: currentMember?.numberofchildren || "",
    nameofchildren: currentMember?.nameofchildren || [],
    dues: currentMember?.dues || [],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const resizeImage = (
    dataUrl: string,
    width: number,
    height: number,
    callback: (resizedDataUrl: string) => void
  ) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);
      callback(canvas.toDataURL("image/png"));
    };
    img.src = dataUrl;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        resizeImage(reader.result as string, 300, 300, (resizedDataUrl) => {
          setFormData({ ...formData, avatar: resizedDataUrl });
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
      setLanguages([...languages, newLanguage.trim()]);
      setNewLanguage(""); // Clear input after adding
    }
  };

  const removeLanguage = (language: string) => {
    setLanguages(languages.filter((item) => item !== language));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill(""); // Clear input after adding
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((item) => item !== skill));
  };

  const addAssociation = () => {
    if (
      newAssociation.trim() &&
      !associations.includes(newAssociation.trim())
    ) {
      setAssociations([...associations, newAssociation.trim()]);
      setNewAssociation(""); // Clear input after adding
    }
  };

  const removeAssociation = (associationToRemove: string) => {
    setAssociations(
      associations.filter((item) => item !== associationToRemove)
    );
  };

  const addChildren = () => {
    if (newChild.trim() && !children.includes(newChild.trim())) {
      setChildren([...children, newChild.trim()]);
      setNewChild(""); // Clear input after adding
    }
  };

  const removeChildren = (childToRemove: string) => {
    setChildren(children.filter((item) => item !== childToRemove));
  };

  const addCassociation = () => {
    if (
      newCassociation.trim() &&
      !cassociations.includes(newCassociation.trim())
    ) {
      setCassociations([...cassociations, newCassociation.trim()]);
      setNewCassociation(""); // Clear input after adding
    }
  };

  const removeCassociation = (associationToRemove: string) => {
    setCassociations(
      cassociations.filter((item) => item !== associationToRemove)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const compressedFile = await compressBase64Image(formData.avatar);
      formData.avatar = compressedFile;
      formData.otherlanguages = languages;
      formData.skills = skills;
      formData.previousassociations = associations;
      formData.currentsassociations = cassociations;
      formData.nameofchildren = children;

      secureLocalStorage.setItem("currentMember", formData);

      navigate("/previewaddmember");
      return showNotification({
        message: "Proceed to Preview Details & Submit",
        type: "info",
      });
    } catch (error) {
      console.error("Error previewing Form", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Register A new Member
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Fill in the details below to get started
        </p>
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
          <option value="">Select Gender</option>
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
        <label htmlFor="phonenumber1" className="font-medium text-gray-700">
          Phone Number 1
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
        <div className="sm:col-span-2">
          <label htmlFor="otherlanguages" className="font-medium text-gray-700">
            Other Languages
          </label>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {languages.map((language, index) => (
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
              {skills.map((skill, index) => (
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
        <label htmlFor="gender" className="font-medium text-gray-700">
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
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
              {associations.map((association, index) => (
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
              {cassociations.map((association, index) => (
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
          Baptised Date of Baptism
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
          <option value="Yes">{formData.firstcommunion}</option>
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
          First Communion Date of First Communion
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
          htmlFor="confirmed_dateconfirmation"
          className="font-medium text-gray-700"
        >
          Confirmed Date of Confirmation
        </label>
        <input
          id="confirmed_dateconfirmation"
          name="confirmed_dateconfirmation"
          type="date"
          value={formData.confirmed_dateconfirmation}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full"
        />
      </div>
      <div
        className={`sm:col-span-2 flex flex-col ${
          formData.confirmed === "No" ? "hidden" : ""
        }`}
      >
        <label htmlFor="confirmed_nlb" className="font-medium text-gray-700">
          NLConf from Confirmation Card
        </label>
        <input
          id="confirmed_nlconf"
          name="confirmed_nlconf"
          value={formData.confirmed_nlb}
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
            Marriage - Date of Marriage
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
          <label htmlFor="spouse" className="font-medium text-gray-700">
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
          <label htmlFor="spouse" className="font-medium text-gray-700">
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
            htmlFor="nameofdemonination"
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
            htmlFor="spousenationality"
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
              {children.map((child, index) => (
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

      <div className="flex flex-col">
        <label htmlFor="avatar" className="font-medium text-gray-700">
          Avatar
        </label>
        <input
          id="avatar"
          name="avatar"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {formData.avatar && (
          <img
            src={formData.avatar}
            alt="Avatar Preview"
            className="mt-4 w-32 h-32 object-cover rounded-full"
          />
        )}
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

export default AddMember;
