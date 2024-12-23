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
import { Link, replace, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import MemberService from "../../services/memberService";
import { useNotification } from "@/contexts/NotificationContext";
import { serverName } from "@/helpers/http-common";

const PreviewAddMember = () => {
  const currentMember: any = secureLocalStorage.getItem("currentMember");
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  console.log(currentMember);
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
      alive: currentMember?.alive || "true",
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
      otherlanguages: currentMember?.otherlanguages || [],
      skills: currentMember?.skills || [],
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
      baptised_datebaptism: currentMember?.baptised_datebaptism || "",
      baptised_nlb: currentMember?.baptised_nlb || "",
      baptised_godparent: currentMember?.baptised_godparent || "",
      firstcommunion: currentMember?.firstcommunion || "No",
      firstcommunion_officiatingminister:
        currentMember?.firstcommunion_officiatingminister || "",
      firstcommunion_placeoffirstcommunion:
        currentMember?.firstcommunion_placeoffirstcommunion || "",
      firstcommunion_datefirstcommunion:
        currentMember?.firstcommunion_datefirstcommunion || "",
      firstcommunion_nlc: currentMember?.firstcommunion_nlc || "",
      firstcommunion_godparent: currentMember?.firstcommunion_godparent || "",
      confirmed: currentMember?.confirmed || "No",
      confirmed_officiatingminister:
        currentMember?.confirmed_officiatingminister || "",
      confirmed_placeofconfirmation:
        currentMember?.confirmed_placeofconfirmation || "",
      confirmed_datefconfirmation:
        currentMember?.confirmed_datefconfirmation || "",
      confirmed_nlconf: currentMember?.confirmed_nlconf || "",
      confirmed_godparent: currentMember?.confirmed_godparent || "",
      maritalstatus: currentMember?.maritalstatus || "Single",
      married_officiatingminister:
        currentMember?.married_officiatingminister || "",
      married_placeofholymatrimony:
        currentMember?.married_placeofholymatrimony || "",
      married_dateofholymatrimony:
        currentMember?.married_dateofholymatrimony || "",
      married_nlm: currentMember?.married_nlm || "",
      married_godparent: currentMember?.married_godparent || "",
      nameofspouse: currentMember?.nameofspouse || "",
      spousedenomination: currentMember?.spousedenomination || "",
      spousenationality: currentMember?.spousenationality || "",
      numberofchildren: currentMember?.numberofchildren || "",
      nameofchildren: currentMember?.nameofchildren || [],
      dues: currentMember?.dues || [],
    },
  });

  async function onSubmit(values: FormValues) {
    const res = await MemberService.addMember(values);
    if (res === 200 || res === 304) {
      secureLocalStorage.removeItem("currentMember");
      navigate("/", { replace: true });
      return showNotification({
        message: "Adding new member was Successful!",
        type: "success",
      });
    }

    return showNotification({
      message: "Adding Member Failed - Please Try Again later",
      type: "error",
    });
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
                    {currentMember.avatar.split(":")[0] === "data" ? (
                      <img
                        src={currentMember.avatar}
                        className="h-36 w-36"
                        alt={currentMember.firstname}
                      />
                    ) : (
                      <img
                        className="object-cover object-top w-full"
                        src={`${serverName}static/${currentMember.avatar}`}
                        alt={currentMember.firstame}
                      />
                    )}
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
                    {currentMember?.alive}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Membership
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.membership}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    First Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.firstname}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Last Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.lastname}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Other Names
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.othernames}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.gender}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Date of Birth
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.dayofbirth}{" "}
                    {currentMember?.numberdayofbirth}-
                    {currentMember?.monthofbirth}-{currentMember?.yearofbirth}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Mother Tongue
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.mothertongue}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Hometown
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.hometown}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Place of Birth
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.placeofbirth}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Fathers Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.fathersname}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Mother's Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.mothersname}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Emergency Contact
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.emergencycontact}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Country</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.country}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Phone Number 1 - WhatsApp
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.phonenumber1}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Phone Number 2
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.phonenumber2}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.email}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Education
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.education}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Skills</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.skills.length > 0
                      ? currentMember?.skills.join(", ")
                      : "None"}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Other Languages
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.otherlanguages.length > 0
                      ? currentMember?.otherlanguages.join("  ,  ")
                      : "None"}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Occupation Status
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.occupationstatus}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Occupation
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.occupation}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Place of Work
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.placeofwork}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Previous Parish
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.previousparish}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Previous Associations
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.previousassociations.length > 0
                      ? currentMember?.previousassociations.join("  ,  ")
                      : "None"}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Current Associations
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.currentassociations.length > 0
                      ? currentMember?.currentassociations.join("  ,  ")
                      : "None"}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Baptised
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.baptised}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Baptism Officiating Minister
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.baptised_officiatingminister}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Place of Baptism
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.baptised_placeofbaptism}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Date of Baptism
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.baptised_datebaptism}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">NLB</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.baptised_nlb}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Batism - GodParent
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.baptised_godparent}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Received First Communion
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.firstcommunion}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    First Communion Officiating Minister:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.firstcommunion_officiatingminister}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Place of First Communion:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.firstcommunion_placeoffirstcommunion}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Date of First Communion:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.firstcommunion_datefirstcommunion}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">NLC:</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.firstcommunion_nlc}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    First Communion GodParent:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.firstcommunion_godparent}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Confirmed:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.confirmed}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Confirmation Officiating Minister:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.confirmed_officiatingminister}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Place of Confirmation:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.confirmed_placeofconfirmation}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Date of Confirmation:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.confirmed_datefconfirmation}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Confirmation GodParent:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.confirmed_godparent}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Marital Status:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.married_placeofholymatrimony}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Holy Matrimony Officiating Minister:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.married_officiatingminister}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Place of Holy Matrimony:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.married_placeofholymatrimony}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Date of Holy Matrimony:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.married_dateofholymatrimony}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Place of Holy Matrimony:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.married_placeofholymatrimony}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">NLM:</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.married_nlm}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Holy Matrimony GodParent:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.married_godparent}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Name of Spouse:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.nameofspouse}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Spouse Denomination:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.spousedenomination}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Spouse Nationality:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.spousenationality}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Number of Children:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.numberofchildren}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Name of Children:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentMember?.nameofchildren.length > 0
                      ? currentMember?.nameofchildren.join(", ")
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
          <Button type="submit">Add Member</Button>
        </div>
      </form>
    </Form>
  );
};

export default PreviewAddMember;
