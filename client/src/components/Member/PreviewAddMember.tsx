import React, { useContext } from "react";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImageUpload } from "./ImageUpload";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import MemberService from "../../services/memberService";
import { AuthContext } from "../../contexts/AuthContext";
import base64ToImageFile from "../../helpers/base64ToImageFile";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const PreviewAddMember = () => {
  const newmember: any = secureLocalStorage.getItem("newmember");
  const { authUser } = useContext(AuthContext);
  console.log(newmember);
  const formSchema = z.object({
    alive: z.string(),
    avatar: z.string().optional(),
    firstname: z.string().min(4, {
      message: "Username must be at least 4 characters.",
    }),
    othernames: z.string().min(4, {
      message: "Username must be at least 4 characters.",
    }),
    lastname: z.string().min(4, {
      message: "Password must be at least 4 characters.",
    }),
    dayofbirth: z.string().min(4, {
      message: "Day of Birth must be a day of the week.",
    }),
    numberdayofbirth: z.string().min(1, {
      message: "Day of Birth must be a number",
    }),
    monthofbirth: z.string().min(1, {
      message: "Please Select Month of Birth",
    }),
    yearofbirth: z.string().min(1, {
      message: "Please Select Year of Birth",
    }),
    active: z.string().min(1, {
      message: "Please Select Active or Inactive",
    }),
    gender: z.string().min(1, {
      message: "Please Select Gender",
    }),
    mothertongue: z.string().min(1, {
      message: "Please Select Mother Tongue",
    }),
    placeofbirth: z.string().min(1, {
      message: "Please Enter Place of Birth",
    }),
    hometown: z.string().min(1, {
      message: "Please Enter Hometown",
    }),
    fathersname: z.string().min(1, {
      message: "Please Enter Hometown",
    }),
    mothersname: z.string().min(1, {
      message: "Please Enter Hometown",
    }),
    country: z.string().min(1, {
      message: "Please Enter Country",
    }),
    emergencycontact: z.string(),
    email: z.string().email("Please enter a valid email"),
    phonenumber1: z.string().min(10, {
      message: "Please Enter a valid Phone Number",
    }),
    phonenumber2: z.string().min(10, {
      message: "Please Enter a valid Phone Number 2",
    }),
    digitaladdress: z.string().min(5, {
      message: "Please Enter a valid Digital Address",
    }),
    city: z.string().min(2, {
      message: "Please Enter a valid City",
    }),
    landmark: z.string().min(5, {
      message: "Please Enter a valid Landmark location",
    }),
    education: z.string().min(2, {
      message: "Highest Education must be atleast 2 characters.",
    }),
    otherlanguages: z
      .array(z.string())
      .min(1, "At least one language is required"),
    skills: z.array(z.string()).min(1, "At least one skill is required"),
    occupationstatus: z.string().min(2, {
      message: "Occuation Status must be atleast 2 characters.",
    }),
    occupation: z.string(),
    placeofwork: z.string(),
    nameofschool: z.string(),
    previousparish: z.string().min(2, {
      message: "Parish must be atleast 2 characters.",
    }),
    previousassociations: z
      .array(z.string())
      .min(1, "At least one Association is required"),
    currentassociations: z.array(z.string()),
    baptised: z.string(),
    baptised_officiatingminister: z.string(),
    baptised_placeofbaptism: z.string(),
    baptised_datebaptism: z.string(),
    baptised_nlb: z.string(),
    baptised_godparent: z.string(),
    firstcommunion: z.string(),
    firstcommunion_officiatingminister: z.string(),
    firstcommunion_placeoffirstcommunion: z.string(),
    firstcommunion_datefirstcommunion: z.string(),
    firstcommunion_nlc: z.string(),
    firstcommunion_godparent: z.string(),
    confirmed: z.string(),
    confirmed_officiatingminister: z.string(),
    confirmed_placeofconfirmation: z.string(),
    confirmed_datefconfirmation: z.string(),
    confirmed_nlconf: z.string(),
    confirmed_godparent: z.string(),
    maritalstatus: z.string(),
    married_officiatingminister: z.string(),
    married_placeofholymatrimony: z.string(),
    married_dateofholymatrimony: z.string(),
    married_nlm: z.string(),
    married_godparent: z.string(),
    nameofspouse: z.string(),
    spousedenomination: z.string(),
    spousenationality: z.string(),
    numberofchildren: z.string(),
    nameofchildren: z.array(z.string()),
    dues: z.array(z.string()),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      alive: newmember?.alive || "true",
      avatar: newmember?.avatar || "",
      firstname: newmember?.firstname || "",
      othernames: newmember?.othernames || "",
      lastname: newmember?.lastname || "",
      dayofbirth: newmember?.dayofbirth || "",
      numberdayofbirth: newmember?.numberdayofbirth || "",
      monthofbirth: newmember?.monthofbirth || "",
      yearofbirth: newmember?.yearofbirth || "",
      gender: newmember?.gender || "",
      active: newmember?.active || "active",
      mothertongue: newmember?.mothertongue || "",
      placeofbirth: newmember?.placeofbirth || "",
      hometown: newmember?.hometown || "",
      fathersname: newmember?.fathersname || "",
      mothersname: newmember?.mothersname || "",
      country: newmember?.country || "",
      email: newmember?.email || "",
      emergencycontact: newmember?.emergencycontact || "",
      phonenumber1: newmember?.phonenumber1 || "",
      phonenumber2: newmember?.phonenumber2 || "",
      digitaladdress: newmember?.digitaladdress || "",
      city: newmember?.city || "",
      landmark: newmember?.landmark || "",
      education: newmember?.education || "",
      otherlanguages: newmember?.otherlanguages || [],
      skills: newmember?.skills || [],
      occupationstatus:
        newmember?.occupationstatus || "Choose Employment Stats",
      occupation: newmember?.occupation || "",
      placeofwork: newmember?.placeofwork || "",
      nameofschool: newmember?.nameofschool || "",
      previousparish: newmember?.previousparish || "",
      previousassociations: newmember?.previousassociations || [],
      currentassociations: newmember?.currentassociations || [],
      baptised: newmember?.baptised || "No",
      baptised_officiatingminister:
        newmember?.baptised_officiatingminister || "",
      baptised_placeofbaptism: newmember?.baptised_placeofbaptism || "",
      baptised_datebaptism: newmember?.baptised_datebaptism || "",
      baptised_nlb: newmember?.baptised_nlb || "",
      baptised_godparent: newmember?.baptised_godparent || "",
      firstcommunion: newmember?.firstcommunion || "No",
      firstcommunion_officiatingminister:
        newmember?.firstcommunion_officiatingminister || "",
      firstcommunion_placeoffirstcommunion:
        newmember?.firstcommunion_placeoffirstcommunion || "",
      firstcommunion_datefirstcommunion:
        newmember?.firstcommunion_datefirstcommunion || "",
      firstcommunion_nlc: newmember?.firstcommunion_nlc || "",
      firstcommunion_godparent: newmember?.firstcommunion_godparent || "",
      confirmed: newmember?.confirmed || "No",
      confirmed_officiatingminister:
        newmember?.confirmed_officiatingminister || "",
      confirmed_placeofconfirmation:
        newmember?.confirmed_placeofconfirmation || "",
      confirmed_datefconfirmation: newmember?.confirmed_datefconfirmation || "",
      confirmed_nlconf: newmember?.confirmed_nlconf || "",
      confirmed_godparent: newmember?.confirmed_godparent || "",
      maritalstatus: newmember?.maritalstatus || "Single",
      married_officiatingminister: newmember?.married_officiatingminister || "",
      married_placeofholymatrimony:
        newmember?.married_placeofholymatrimony || "",
      married_dateofholymatrimony: newmember?.married_dateofholymatrimony || "",
      married_nlm: newmember?.married_nlm || "",
      married_godparent: newmember?.married_godparent || "",
      nameofspouse: newmember?.nameofspouse || "",
      spousedenomination: newmember?.spousedenomination || "",
      spousenationality: newmember?.spousenationality || "",
      numberofchildren: newmember?.numberofchildren || "",
      nameofchildren: newmember?.nameofchildren || [],
      dues: newmember?.dues || [],
    },
  });

  async function onSubmit(values: FormValues) {
    const response = await MemberService.addMember(values, authUser._id);
    console.log(resonse);
    return;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Preview Details
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Please review your information before submitting
            </p>
          </div>

          <div>
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormControl>
                    <img src={newmember.avatar} className="h-36 w-36" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4 border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Alive</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.alive}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Membership
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.membership}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    First Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.firstname}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Last Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.lastname}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Other Names
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.othernames}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.gender}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Date of Birth
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.dayofbirth} {newmember?.numberdayofbirth}-
                    {newmember?.monthofbirth}-{newmember?.yearofbirth}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Mother Tongue
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.mothertongue}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Hometown
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.hometown}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Place of Birth
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.placeofbirth}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Fathers Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.fathersname}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Mother's Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.mothersname}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Emergency Contact
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.emergencycontact}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Country</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.country}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Phone Number 1 - WhatsApp
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.phonenumber1}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Phone Number 2
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.phonenumber2}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.email}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Education
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.education}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Skills</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.skills.length > 0
                      ? newmember?.skills.join(", ")
                      : "None"}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Other Languages
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.otherlanguages.length > 0
                      ? newmember?.otherlanguages.join("  ,  ")
                      : "None"}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Occupation Status
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.occupationstatus}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Occupation
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.occupation}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Place of Work
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.placeofwork}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Previous Parish
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.previousparish}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Previous Associations
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.previousassociations.length > 0
                      ? newmember?.previousassociations.join("  ,  ")
                      : "None"}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Current Associations
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.currentassociations.length > 0
                      ? newmember?.currentassociations.join("  ,  ")
                      : "None"}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Baptised
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.baptised}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Baptism Officiating Minister
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.baptised_officiatingminister}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Place of Baptism
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.baptised_placeofbaptism}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Date of Baptism
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.baptised_datebaptism}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">NLB</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.baptised_nlb}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Batism - GodParent
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.baptised_godparent}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Received First Communion
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.firstcommunion}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    First Communion Officiating Minister:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.firstcommunion_officiatingminister}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Place of First Communion:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.firstcommunion_placeoffirstcommunion}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Date of First Communion:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.firstcommunion_datefirstcommunion}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">NLC:</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.firstcommunion_nlc}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    First Communion GodParent:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.firstcommunion_godparent}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Confirmed:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.confirmed}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Confirmation Officiating Minister:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.confirmed_officiatingminister}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Place of Confirmation:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.confirmed_placeofconfirmation}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Date of Confirmation:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.confirmed_datefconfirmation}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Confirmation GodParent:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.confirmed_godparent}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Marital Status:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.married_placeofholymatrimony}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Holy Matrimony Officiating Minister:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.married_officiatingminister}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Place of Holy Matrimony:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.married_placeofholymatrimony}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Date of Holy Matrimony:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.married_dateofholymatrimony}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Place of Holy Matrimony:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.married_placeofholymatrimony}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">NLM:</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.married_nlm}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Holy Matrimony GodParent:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.married_godparent}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Name of Spouse:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.nameofspouse}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Spouse Denomination:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.spousedenomination}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Spouse Nationality:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.spousenationality}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Number of Children:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.numberofchildren}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Name of Children:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {newmember?.nameofchildren.length > 0
                      ? newmember?.nameofchildren.join(", ")
                      : "None"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </>
        <div className="flex justify-between items-center">
          <Button>
            {" "}
            <Link to="/addmember">Go Back</Link>
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default PreviewAddMember;
