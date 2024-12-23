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
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import MemberService from "../../services/memberService";
import { useNotification } from "@/contexts/NotificationContext";
import { serverName } from "@/helpers/http-common";

const PreviewUpdateMember = () => {
  const updateMember: any = secureLocalStorage.getItem("updateMember");
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  console.log(updateMember);
  const formSchema = z.object({
    _id: z.string().optional(),
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
      _id: updateMember?._id || null,
      alive: updateMember?.alive || "true",
      avatar: updateMember?.avatar || "",
      firstname: updateMember?.firstname || "",
      othernames: updateMember?.othernames || "",
      lastname: updateMember?.lastname || "",
      dayofbirth: updateMember?.dayofbirth || "",
      numberdayofbirth: updateMember?.numberdayofbirth || "",
      monthofbirth: updateMember?.monthofbirth || "",
      yearofbirth: updateMember?.yearofbirth || "",
      gender: updateMember?.gender || "",
      active: updateMember?.active || "active",
      mothertongue: updateMember?.mothertongue || "",
      placeofbirth: updateMember?.placeofbirth || "",
      hometown: updateMember?.hometown || "",
      fathersname: updateMember?.fathersname || "",
      mothersname: updateMember?.mothersname || "",
      country: updateMember?.country || "",
      email: updateMember?.email || "",
      emergencycontact: updateMember?.emergencycontact || "",
      phonenumber1: updateMember?.phonenumber1 || "",
      phonenumber2: updateMember?.phonenumber2 || "",
      digitaladdress: updateMember?.digitaladdress || "",
      city: updateMember?.city || "",
      landmark: updateMember?.landmark || "",
      education: updateMember?.education || "",
      otherlanguages: updateMember?.otherlanguages || [],
      skills: updateMember?.skills || [],
      occupationstatus:
        updateMember?.occupationstatus || "Choose Employment Stats",
      occupation: updateMember?.occupation || "",
      placeofwork: updateMember?.placeofwork || "",
      nameofschool: updateMember?.nameofschool || "",
      previousparish: updateMember?.previousparish || "",
      previousassociations: updateMember?.previousassociations || [],
      currentassociations: updateMember?.currentassociations || [],
      baptised: updateMember?.baptised || "No",
      baptised_officiatingminister:
        updateMember?.baptised_officiatingminister || "",
      baptised_placeofbaptism: updateMember?.baptised_placeofbaptism || "",
      baptised_datebaptism: updateMember?.baptised_datebaptism || "",
      baptised_nlb: updateMember?.baptised_nlb || "",
      baptised_godparent: updateMember?.baptised_godparent || "",
      firstcommunion: updateMember?.firstcommunion || "No",
      firstcommunion_officiatingminister:
        updateMember?.firstcommunion_officiatingminister || "",
      firstcommunion_placeoffirstcommunion:
        updateMember?.firstcommunion_placeoffirstcommunion || "",
      firstcommunion_datefirstcommunion:
        updateMember?.firstcommunion_datefirstcommunion || "",
      firstcommunion_nlc: updateMember?.firstcommunion_nlc || "",
      firstcommunion_godparent: updateMember?.firstcommunion_godparent || "",
      confirmed: updateMember?.confirmed || "No",
      confirmed_officiatingminister:
        updateMember?.confirmed_officiatingminister || "",
      confirmed_placeofconfirmation:
        updateMember?.confirmed_placeofconfirmation || "",
      confirmed_datefconfirmation:
        updateMember?.confirmed_datefconfirmation || "",
      confirmed_nlconf: updateMember?.confirmed_nlconf || "",
      confirmed_godparent: updateMember?.confirmed_godparent || "",
      maritalstatus: updateMember?.maritalstatus || "Single",
      married_officiatingminister:
        updateMember?.married_officiatingminister || "",
      married_placeofholymatrimony:
        updateMember?.married_placeofholymatrimony || "",
      married_dateofholymatrimony:
        updateMember?.married_dateofholymatrimony || "",
      married_nlm: updateMember?.married_nlm || "",
      married_godparent: updateMember?.married_godparent || "",
      nameofspouse: updateMember?.nameofspouse || "",
      spousedenomination: updateMember?.spousedenomination || "",
      spousenationality: updateMember?.spousenationality || "",
      numberofchildren: updateMember?.numberofchildren || "",
      nameofchildren: updateMember?.nameofchildren || [],
      dues: updateMember?.dues || [],
    },
  });

  async function onSubmit(values: FormValues) {
    console.log(values);
    const res = await MemberService.updateMember(values, values?._id);
    if (res === 200 || res === 304) {
      secureLocalStorage.removeItem("updateMember");
      navigate("/", { replace: true });
      return showNotification({
        message: "Updating member was Successful!",
        type: "success",
      });
    }

    return showNotification({
      message: "Updating Member Failed - Please Try Again later",
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
                    {updateMember.avatar.split(":")[0] === "data" ? (
                      <img
                        src={updateMember.avatar}
                        className="h-36 w-36"
                        alt={updateMember.firstname}
                      />
                    ) : (
                      <img
                        className="object-cover object-top w-full"
                        src={`${serverName}static/{currentNember.avatar}`}
                        alt={updateMember.firstame}
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
                    {updateMember?.alive}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Membership
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.membership}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    First Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.firstname}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Last Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.lastname}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Other Names
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.othernames}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.gender}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Date of Birth
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.dayofbirth} {updateMember?.numberdayofbirth}-
                    {updateMember?.monthofbirth}-{updateMember?.yearofbirth}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Mother Tongue
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.mothertongue}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Hometown
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.hometown}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Place of Birth
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.placeofbirth}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Fathers Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.fathersname}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Mother's Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.mothersname}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Emergency Contact
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.emergencycontact}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Country</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.country}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Phone Number 1 - WhatsApp
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.phonenumber1}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Phone Number 2
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.phonenumber2}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.email}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Education
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.education}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Skills</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.skills.length > 0
                      ? updateMember?.skills.join(", ")
                      : "None"}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Other Languages
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.otherlanguages.length > 0
                      ? updateMember?.otherlanguages.join("  ,  ")
                      : "None"}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Occupation Status
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.occupationstatus}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Occupation
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.occupation}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Place of Work
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.placeofwork}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Previous Parish
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.previousparish}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Previous Associations
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.previousassociations.length > 0
                      ? updateMember?.previousassociations.join("  ,  ")
                      : "None"}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Current Associations
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.currentassociations.length > 0
                      ? updateMember?.currentassociations.join("  ,  ")
                      : "None"}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Baptised
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.baptised}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Baptism Officiating Minister
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.baptised_officiatingminister}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Place of Baptism
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.baptised_placeofbaptism}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Date of Baptism
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.baptised_datebaptism}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">NLB</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.baptised_nlb}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Batism - GodParent
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.baptised_godparent}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Received First Communion
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.firstcommunion}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    First Communion Officiating Minister:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.firstcommunion_officiatingminister}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Place of First Communion:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.firstcommunion_placeoffirstcommunion}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Date of First Communion:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.firstcommunion_datefirstcommunion}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">NLC:</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.firstcommunion_nlc}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    First Communion GodParent:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.firstcommunion_godparent}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Confirmed:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.confirmed}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Confirmation Officiating Minister:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.confirmed_officiatingminister}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Place of Confirmation:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.confirmed_placeofconfirmation}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Date of Confirmation:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.confirmed_datefconfirmation}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Confirmation GodParent:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.confirmed_godparent}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Marital Status:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.married_placeofholymatrimony}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Holy Matrimony Officiating Minister:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.married_officiatingminister}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Place of Holy Matrimony:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.married_placeofholymatrimony}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Date of Holy Matrimony:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.married_dateofholymatrimony}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Place of Holy Matrimony:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.married_placeofholymatrimony}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">NLM:</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.married_nlm}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Holy Matrimony GodParent:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.married_godparent}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Name of Spouse:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.nameofspouse}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Spouse Denomination:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.spousedenomination}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Spouse Nationality:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.spousenationality}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Number of Children:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.numberofchildren}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Name of Children:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {updateMember?.nameofchildren.length > 0
                      ? updateMember?.nameofchildren.join(", ")
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
          <Button type="submit">Update Member</Button>
        </div>
      </form>
    </Form>
  );
};

export default PreviewUpdateMember;
