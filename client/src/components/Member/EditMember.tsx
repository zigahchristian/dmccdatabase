import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { ImageUpload } from "./ImageUpload";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Stepper } from "./Stepper";
import { StepButtons } from "./StepButtons";
import { X, CalendarIcon } from "lucide-react";
import memberBackdrop from "../../assets/member_backdrop.jpg";
import members from "../../helpers/data/data.json";
import { useParams } from "react-router-dom";

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
  country: z.string().min(1, {
    message: "Please Enter Country",
  }),
  fathersname: z.string().min(1, {
    message: "Please Fathers Name",
  }),
  mothersname: z.string().min(1, {
    message: "Please Mothers Name",
  }),

  email: z.string().email("Please enter a valid email"),
  phonenumber1: z.string().min(10, {
    message: "Please Enter a valid Phone Number",
  }),
  emergencycontact: z.string().min(1, {
    message: "Please Emergency Contact",
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
  currentassociations: z
    .array(z.string())
    .min(1, "At least one Association is required"),
  baptised: z.string().min(3, { message: "Baptised is required" }),
  baptised_officiatingminister: z.string(),
  baptised_placeofbaptism: z.string(),
  baptised_datebaptism: z.date(),
  baptised_nlb: z.string(),
  baptised_godparent: z.string(),
  firstcommunion: z.string(),
  firstcommunion_officiatingminister: z.string(),
  firstcommunion_placeoffirstcommunion: z.string(),
  firstcommunion_datefirstcommunion: z.date(),
  firstcommunion_nlc: z.string(),
  firstcommunion_godparent: z.string(),
  confirmed: z.string(),
  confirmed_officiatingminister: z.string(),
  confirmed_placeofconfirmation: z.string(),
  confirmed_datefconfirmation: z.date(),
  confirmed_nlconf: z.string(),
  confirmed_godparent: z.string(),
  maritalstatus: z.string(),
  married_officiatingminister: z.string(),
  married_placeofholymatrimony: z.string(),
  married_dateofholymatrimony: z.date(),
  married_nlm: z.string(),
  married_godparent: z.string(),
  nameofspouse: z.string(),
  spousedenomination: z.string(),
  spousenationality: z.string(),
  numberofchildren: z.string(),
  nameofchildren: z.array(z.string()),
  dues: z.array(z.string()),
});

const steps = [
  {
    title: "Bio Data",
    fields: ["firstname"],
  },
  {
    title: "Preview",
    fields: [],
  },
] as const;

type FormValues = z.infer<typeof formSchema>;

const EditMember = () => {
  const [step, setStep] = useState(0);
  const [avatarFile, setAvatarFile] = useState<File>();
  const [newLanguage, setNewLanguage] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [newAssociation, setNewAssociation] = useState("");
  const [newCurrentAssociation, setNewCurrentAssociation] = useState("");
  const [newChildren, setNewChildren] = useState("");
  const params = useParams();
  const { id } = params;
  const member = members.find((member) => member.id === Number(id));

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      alive: member?.alive || true,
      avatar: member?.avatar || "",
      firstname: member?.firstname || "",
      othernames: member?.othernames || "",
      lastname: member?.lastname || "",
      dayofbirth: member?.dayofbirth || "",
      numberdayofbirth: member?.numberdayofbirth || "",
      monthofbirth: member?.monthofbirth || "",
      yearofbirth: member?.yearofbirth || "",
      gender: member?.gender || "",
      active: member?.active || "active",
      mothertongue: member?.mothertongue || "",
      placeofbirth: member?.placeofbirth || "",
      hometown: member?.hometown || "",
      country: member?.country || "",
      email: member?.email || "",
      fathersname: member?.fathersname || "",
      mothersname: member?.mothersname || "",
      emergencycontact: member?.emergencycontact || "",
      phonenumber1: member?.phonenumber1 || "",
      phonenumber2: member?.phonenumber2 || "",
      digitaladdress: member?.digitaladdress || "",
      city: member?.city || "",
      landmark: member?.landmark || "",
      education: member?.education || "",
      otherlanguages: member?.otherlanguages || [],
      skills: member?.skills || [],
      occupationstatus: member?.occupationstatus || "Choose Employment Stats",
      occupation: member?.occupation || "",
      placeofwork: member?.placeofwork || "",
      nameofschool: member?.nameofschool || "",
      previousparish: member?.previousparish || "",
      previousassociations: member?.previousassociations || [],
      currentassociations: member?.currentassociations || [],
      baptised: member?.baptised || "No",
      baptised_officiatingminister: member?.baptised_officiatingminister || "",
      baptised_placeofbaptism: member?.baptised_placeofbaptism || "",
      baptised_datebaptism: member?.baptised_datebaptism || undefined,
      baptised_nlb: member?.baptised_nlb || "",
      baptised_godparent: member?.baptised_godparent || "",
      firstcommunion: member?.firstcommunion || "No",
      firstcommunion_officiatingminister:
        member?.firstcommunion_officiatingminister || "",
      firstcommunion_placeoffirstcommunion:
        member?.firstcommunion_placeoffirstcommunion || "",
      firstcommunion_datefirstcommunion:
        member?.firstcommunion_datefirstcommunion || undefined,
      firstcommunion_nlc: member?.firstcommunion_nlc || "",
      firstcommunion_godparent: member?.firstcommunion_godparent || "",
      confirmed: member?.confirmed || "No",
      confirmed_officiatingminister:
        member?.confirmed_officiatingminister || "",
      confirmed_placeofconfirmation:
        member?.confirmed_placeofconfirmation || "",
      confirmed_datefconfirmation:
        member?.confirmed_datefconfirmation || undefined,
      confirmed_nlconf: member?.confirmed_nlconf || "",
      confirmed_godparent: member?.confirmed_godparent || "",
      maritalstatus: member?.maritalstatus || "Single",
      married_officiatingminister: member?.married_officiatingminister || "",
      married_placeofholymatrimony: member?.married_placeofholymatrimony || "",
      married_dateofholymatrimony:
        member?.married_dateofholymatrimony || undefined,
      married_nlm: member?.married_nlm || "",
      married_godparent: member?.married_godparent || "",
      nameofspouse: member?.nameofspouse || "",
      spousedenomination: member?.spousedenomination || "",
      spousenationality: member?.spousenationality || "",
      numberofchildren: member?.numberofchildren || "",
      nameofchildren: member?.nameofchildren || [],
      dues: member?.dues || [],
    },
  });

  const addlanguage = () => {
    if (
      newLanguage.trim() &&
      !form.getValues("otherlanguages").includes(newLanguage.trim())
    ) {
      form.setValue("otherlanguages", [
        ...form.getValues("otherlanguages"),
        newLanguage.trim(),
      ]);
      setNewLanguage("");
    }
  };

  const removeLanguage = (languageToRemove: string) => {
    form.setValue(
      "otherlanguages",
      form
        .getValues("otherlanguages")
        .filter((language) => language !== languageToRemove)
    );
  };

  const addSkill = () => {
    if (
      newSkill.trim() &&
      !form.getValues("skills").includes(newSkill.trim())
    ) {
      form.setValue("skills", [...form.getValues("skills"), newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    form.setValue(
      "skills",
      form.getValues("skills").filter((skill) => skill !== skillToRemove)
    );
  };

  const addAssociation = () => {
    if (
      newAssociation.trim() &&
      !form.getValues("previousassociations").includes(newAssociation.trim())
    ) {
      form.setValue("previousassociations", [
        ...form.getValues("previousassociations"),
        newAssociation.trim(),
      ]);
      setNewAssociation("");
    }
  };

  const removeAssociation = (associationToRemove: string) => {
    form.setValue(
      "previousassociations",
      form
        .getValues("previousassociations")
        .filter((association) => association !== associationToRemove)
    );
  };

  const addCurrentAssociation = () => {
    if (
      newCurrentAssociation.trim() &&
      !form
        .getValues("currentassociations")
        .includes(newCurrentAssociation.trim())
    ) {
      form.setValue("currentassociations", [
        ...form.getValues("currentassociations"),
        newCurrentAssociation.trim(),
      ]);
      setNewCurrentAssociation("");
    }
  };

  const removeCurrrentAssociation = (associationToRemove: string) => {
    form.setValue(
      "currentassociations",
      form
        .getValues("currentassociations")
        .filter((association) => association !== associationToRemove)
    );
  };

  const addChildren = () => {
    if (
      newChildren.trim() &&
      !form.getValues("nameofchildren").includes(newChildren.trim())
    ) {
      form.setValue("nameofchildren", [
        ...form.getValues("nameofchildren"),
        newChildren.trim(),
      ]);
      setNewChildren("");
    }
  };

  const removeChildren = (childrenToRemove: string) => {
    form.setValue(
      "nameofchildren",
      form
        .getValues("nameofchildren")
        .filter((children) => children !== childrenToRemove)
    );
  };

  const renderPreview = () => {
    const values = form.getValues();
    return (
      <>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Preview Details</h1>
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
                  <ImageUpload
                    value={field.value}
                    onChange={(dataUrl, file) => {
                      field.onChange(dataUrl);
                      if (file) setAvatarFile(file);
                    }}
                    disabled={form.formState.isSubmitting}
                  />
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
                  {values.alive}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Membership
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.active}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  First Name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.firstname}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.lastname}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Other Names
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.othernames}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Gender</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.gender}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Date of Birth
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.dayofbirth} {values.numberdayofbirth}-
                  {values.monthofbirth}-{values.yearofbirth}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Mother Tongue
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.mothertongue}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Hometown</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.hometown}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Country</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.country}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Father's Name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.fathersname}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Mother's Name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.mothersname}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Phone Number 1 - WhatsApp
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.phonenumber1}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Phone Number 2
                </dt>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Emergency Contact
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {values.emergencycontact}
                  </dd>
                </div>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.phonenumber2}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.email}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Education</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.education}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Skills</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.skills.length > 0 ? values.skills.join(", ") : "None"}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Other Languages
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.otherlanguages.length > 0
                    ? values.otherlanguages.join("  ,  ")
                    : "None"}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Occupation Status
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.occupationstatus}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Occupation
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.occupation}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Place of Work
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.placeofwork}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Previous Parish
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.previousparish}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Previous Associations
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.previousassociations.length > 0
                    ? values.previousassociations.join("  ,  ")
                    : "None"}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Current Associations
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.currentassociations.length > 0
                    ? values.currentassociations.join("  ,  ")
                    : "None"}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Baptised</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.baptised}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Baptism Officiating Minister
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.baptised_officiatingminister}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Place of Baptism
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.baptised_placeofbaptism}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Date of Baptism
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.baptised_datebaptism}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">NLB</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.baptised_nlb}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Batism - GodParent
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.baptised_godparent}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Received First Communion
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.firstcommunion}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  First Communion Officiating Minister:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.firstcommunion_officiatingminister}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Place of First Communion:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.firstcommunion_placeoffirstcommunion}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Date of First Communion:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.firstcommunion_datefirstcommunion}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">NLC:</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.firstcommunion_nlc}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  First Communion GodParent:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.firstcommunion_godparent}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Confirmed:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.confirmed}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Confirmation Officiating Minister:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.confirmed_officiatingminister}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Place of Confirmation:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.confirmed_placeofconfirmation}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Date of Confirmation:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.confirmed_datefconfirmation}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Confirmation GodParent:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.confirmed_godparent}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Marital Status:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.married_placeofholymatrimony}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Holy Matrimony Officiating Minister:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.married_officiatingminister}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Place of Holy Matrimony:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.married_placeofholymatrimony}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Date of Holy Matrimony:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.married_dateofholymatrimony}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Place of Holy Matrimony:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.married_placeofholymatrimony}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">NLM:</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.married_nlm}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Holy Matrimony GodParent:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.married_godparent}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Name of Spouse:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.nameofspouse}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Spouse Denomination:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.spousedenomination}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Spouse Nationality:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.spousenationality}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Number of Children:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.numberofchildren}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Name of Children:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {values.nameofchildren.length > 0
                    ? values.nameofchildren.join(", ")
                    : "None"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </>
    );
  };

  async function onSubmit(values: FormValues) {
    try {
      const formData = new FormData();

      formData.append("alive", values.alive);
      formData.append("avatar", avatarFile);
      formData.append("firstname", values.firstname);
      formData.append("othernames", values.othernames);
      formData.append("lastname", values.lastname);
      formData.append("dayofbirth", values.dayofbirth);
      formData.append("numberdayofbirth", values.numberdayofbirth);
      formData.append("monthofbirth", values.monthofbirth);
      formData.append("yearofbirth", values.yearofbirth);
      formData.append("active", values.active);
      formData.append("placeofbirth", values.placeofbirth);
      formData.append("hometown", values.hometown);
      formData.append("fathersname", values.fathersname);
      formData.append("mothersname", values.mothersname);
      formData.append("country", values.country);
      formData.append("email", values.email);
      formData.append("phonenumber1", values.phonenumber1);
      formData.append("phonenumber2", values.phonenumber2);
      formData.append("emergencycontact", values.emergencycontact);
      formData.append("digitaladdress", values.digitaladdress);
      formData.append("city", values.city);
      formData.append("landmark", values.landmark);
      formData.append("education", values.education);
      formData.append("otherlanguages", values.otherlanguages);
      formData.append("skills", values.skills);
      formData.append("occupationstatus", values.occupationstatus);
      formData.append("occupation", values.occupation);
      formData.append("placeofwork", values.placeofwork);
      formData.append("nameofschool", values.nameofschool);
      formData.append("previousparish", values.previousparish);
      formData.append("previousassociations", values.previousassociations);
      formData.append("baptised", values.baptised);
      formData.append(
        "baptised_officiatingminister",
        values.baptised_officiatingminister
      );
      formData.append(
        "baptised_placeofbaptism",
        values.baptised_placeofbaptism
      );
      formData.append("baptised_datebaptism", values.baptised_datebaptism);
      formData.append("baptised_nlb", values.baptised_nlb);
      formData.append("baptised_godparent", values.baptised_godparent);
      formData.append("firstcommunion", values.firstcommunion);
      formData.append(
        "firstcommunion_officiatingminister",
        values.firstcommunion_officiatingminister
      );
      formData.append(
        "firstcommunion_placeoffirstcommunion",
        values.firstcommunion_placeoffirstcommunion
      );
      formData.append(
        "firstcommunion_datefirstcommunion",
        values.firstcommunion_datefirstcommunion
      );
      formData.append("firstcommunion_nlc", values.firstcommunion_nlc);
      formData.append(
        "firstcommunion_godparent",
        values.firstcommunion_godparent
      );
      formData.append("confirmed", values.confirmed);
      formData.append(
        "confirmed_officiatingminister",
        values.confirmed_officiatingminister
      );
      formData.append(
        "confirmed_placeofconfirmation",
        values.confirmed_placeofconfirmation
      );
      formData.append(
        "confirmed_datefconfirmation",
        values.confirmed_datefconfirmation
      );
      formData.append("confirmed_nlconf", values.confirmed_nlconf);
      formData.append("confirmed_godparent", values.confirmed_godparent);
      formData.append("maritalstatus", values.maritalstatus);
      formData.append(
        "married_officiatingminister",
        values.married_officiatingminister
      );
      formData.append(
        "married_placeofholymatrimony",
        values.married_placeofholymatrimony
      );
      formData.append(
        "married_dateofholymatrimony",
        values.married_dateofholymatrimony
      );
      formData.append("married_nlm", values.married_nlm);
      formData.append("nameofspouse", values.nameofspouse);
      formData.append("spousedenomination", values.spousedenomination);
      formData.append("spousenationality", values.spousenationality);
      formData.append("numberofchildren", values.numberofchildren);
      formData.append("nameofchildren", values.nameofchildren);

      console.log(avatarFile);
      console.log(values);

      // Send to backend
      const response = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      // Handle success
      console.log("Registration successful");
    } catch (error) {
      console.error("Registration error:", error);
    }
  }

  const isLastStep = step === steps.length - 1;

  const handleNext = async () => {
    const fields = steps[step].fields;
    const output = await form.trigger(fields as any);
    if (output) {
      setStep(step + 1);
    }
  };

  return (
    <div className="w-full m-2 mx-auto p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <Stepper steps={steps} currentStep={step} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="">
              {step === 0 && (
                <>
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                      Register A new Member
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                      Fill in the details below to get started
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <FormField
                        control={form.control}
                        name="avatar"
                        render={({ field }) => (
                          <FormItem className="flex flex-col items-center">
                            <FormControl>
                              <ImageUpload
                                value={field.value}
                                onChange={(dataUrl, file) => {
                                  field.onChange(dataUrl);
                                  if (file) setAvatarFile(file);
                                }}
                                disabled={form.formState.isSubmitting}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/** Membership */}
                    <div className="sm:col-span-1">
                      <FormField
                        control={form.control}
                        name="active"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Membership</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Membership" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">
                                  Inactive
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/** Alive */}
                    <div className="sm:col-span-1">
                      <FormField
                        control={form.control}
                        name="alive"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Member Alive?</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose True or False" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="true">True</SelectItem>
                                <SelectItem value="false">False</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/**First Name Field */}
                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter First Name"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/*Last Name Field */}
                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter First Name"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/*Other Name Field */}
                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="othernames"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Other Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Other Name"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/*Day */}
                    <div className="sm:col-span-2 flex gap-4">
                      <FormField
                        control={form.control}
                        name="dayofbirth"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Day Born</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Day" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Monday">Monday</SelectItem>
                                <SelectItem value="Tuesday">Tuesday</SelectItem>
                                <SelectItem value="Wednesday">
                                  Wednesday
                                </SelectItem>
                                <SelectItem value="Thursday">
                                  Thursday
                                </SelectItem>
                                <SelectItem value="Friday">Friday</SelectItem>
                                <SelectItem value="Saturday">
                                  Saturday
                                </SelectItem>
                                <SelectItem value="Sunday">Sunday</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Day of Birth */}
                      <FormField
                        control={form.control}
                        name="numberdayofbirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Day of Birth</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Day" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="6">6</SelectItem>
                                <SelectItem value="7">7</SelectItem>
                                <SelectItem value="8">8</SelectItem>
                                <SelectItem value="9">9</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="11">11</SelectItem>
                                <SelectItem value="12">12</SelectItem>
                                <SelectItem value="13">13</SelectItem>
                                <SelectItem value="14">14</SelectItem>
                                <SelectItem value="15">15</SelectItem>
                                <SelectItem value="16">16</SelectItem>
                                <SelectItem value="17">17</SelectItem>
                                <SelectItem value="18">18</SelectItem>
                                <SelectItem value="19">19</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                                <SelectItem value="21">21</SelectItem>
                                <SelectItem value="22">22</SelectItem>
                                <SelectItem value="23">23</SelectItem>
                                <SelectItem value="24">24</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="26">26</SelectItem>
                                <SelectItem value="27">27</SelectItem>
                                <SelectItem value="28">28</SelectItem>
                                <SelectItem value="29">29</SelectItem>
                                <SelectItem value="30">30</SelectItem>
                                <SelectItem value="31">31</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Month of Birth */}
                    <div className="sm:col-span-2 flex gap-4">
                      <FormField
                        control={form.control}
                        name="monthofbirth"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Month of Birth</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Month" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="January">January</SelectItem>
                                <SelectItem value="February">
                                  February
                                </SelectItem>
                                <SelectItem value="March">March</SelectItem>
                                <SelectItem value="April">April</SelectItem>
                                <SelectItem value="May">May</SelectItem>
                                <SelectItem value="June">June</SelectItem>
                                <SelectItem value="July">July</SelectItem>
                                <SelectItem value="August">August</SelectItem>
                                <SelectItem value="September">
                                  September
                                </SelectItem>
                                <SelectItem value="October">October</SelectItem>
                                <SelectItem value="November">
                                  November
                                </SelectItem>
                                <SelectItem value="December">
                                  December
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Year of Birth */}
                      <FormField
                        control={form.control}
                        name="yearofbirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Month of Birth</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Year" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1955">1955</SelectItem>
                                <SelectItem value="1956">1956</SelectItem>
                                <SelectItem value="1957">1957</SelectItem>
                                <SelectItem value="1958">1958</SelectItem>
                                <SelectItem value="1959">1959</SelectItem>
                                <SelectItem value="1960">1960</SelectItem>
                                <SelectItem value="1961">1961</SelectItem>
                                <SelectItem value="1962">1962</SelectItem>
                                <SelectItem value="1963">1963</SelectItem>
                                <SelectItem value="1964">1964</SelectItem>
                                <SelectItem value="1965">1965</SelectItem>
                                <SelectItem value="1966">1966</SelectItem>
                                <SelectItem value="1967">1967</SelectItem>
                                <SelectItem value="1968">1968</SelectItem>
                                <SelectItem value="1969">1969</SelectItem>
                                <SelectItem value="1970">1970</SelectItem>
                                <SelectItem value="1971">1971</SelectItem>
                                <SelectItem value="1972">1972</SelectItem>
                                <SelectItem value="1973">1973</SelectItem>
                                <SelectItem value="1974">1974</SelectItem>
                                <SelectItem value="1975">1975</SelectItem>
                                <SelectItem value="1976">1976</SelectItem>
                                <SelectItem value="1977">1977</SelectItem>
                                <SelectItem value="1978">1978</SelectItem>
                                <SelectItem value="1979">1979</SelectItem>
                                <SelectItem value="1980">1980</SelectItem>
                                <SelectItem value="1981">1981</SelectItem>
                                <SelectItem value="1982">1982</SelectItem>
                                <SelectItem value="1983">1983</SelectItem>
                                <SelectItem value="1984">1984</SelectItem>
                                <SelectItem value="1985">1985</SelectItem>
                                <SelectItem value="1986">1986</SelectItem>
                                <SelectItem value="1987">1987</SelectItem>
                                <SelectItem value="1988">1988</SelectItem>
                                <SelectItem value="1989">1989</SelectItem>
                                <SelectItem value="1990">1990</SelectItem>
                                <SelectItem value="1991">1991</SelectItem>
                                <SelectItem value="1992">1992</SelectItem>
                                <SelectItem value="1993">1993</SelectItem>
                                <SelectItem value="1994">1994</SelectItem>
                                <SelectItem value="1995">1995</SelectItem>
                                <SelectItem value="1996">1996</SelectItem>
                                <SelectItem value="1997">1997</SelectItem>
                                <SelectItem value="1998">1998</SelectItem>
                                <SelectItem value="1999">1999</SelectItem>
                                <SelectItem value="2000">2000</SelectItem>
                                <SelectItem value="2001">2001</SelectItem>
                                <SelectItem value="2002">2002</SelectItem>
                                <SelectItem value="2003">2003</SelectItem>
                                <SelectItem value="2004">2004</SelectItem>
                                <SelectItem value="2005">2005</SelectItem>
                                <SelectItem value="2006">2006</SelectItem>
                                <SelectItem value="2007">2007</SelectItem>
                                <SelectItem value="2008">2008</SelectItem>
                                <SelectItem value="2009">2009</SelectItem>
                                <SelectItem value="2010">2010</SelectItem>
                                <SelectItem value="2011">2011</SelectItem>
                                <SelectItem value="2012">2012</SelectItem>
                                <SelectItem value="2013">2013</SelectItem>
                                <SelectItem value="2014">2014</SelectItem>
                                <SelectItem value="2015">2015</SelectItem>
                                <SelectItem value="2016">2016</SelectItem>
                                <SelectItem value="2017">2017</SelectItem>
                                <SelectItem value="2018">2018</SelectItem>
                                <SelectItem value="2019">2019</SelectItem>
                                <SelectItem value="2020">2020</SelectItem>
                                <SelectItem value="2021">2021</SelectItem>
                                <SelectItem value="2022">2022</SelectItem>
                                <SelectItem value="2023">2023</SelectItem>
                                <SelectItem value="2024">2024</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="sm:col-span-2 flex gap-4">
                      {/* Mother Tongue / Native Language */}
                      <FormField
                        control={form.control}
                        name="mothertongue"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Mother Tongue</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Language" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Ewe">Ewe</SelectItem>
                                <SelectItem value="Twi">Twi</SelectItem>
                                <SelectItem value="Ga">Ga</SelectItem>
                                <SelectItem value="Dagari">Dagari</SelectItem>
                                <SelectItem value="Fafra">Fafra</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Gender */}
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="January">Male</SelectItem>
                                <SelectItem value="February">Female</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* Place of Birth */}
                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="placeofbirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Place of Birth</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Place of Birth"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Hometown */}
                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="hometown"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hometown</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="City"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Country */}
                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Country"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* Fathers Name */}
                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="fathersname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Father's Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter father's name"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Mothers Name */}
                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="mothersname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mother's Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter mother's name"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Emergency Contact */}
                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="emergency contact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Emergency Contact</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Emergency Contact Phone Number"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* Email */}
                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Email"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Phone Number 1 */}
                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="phonenumber1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number 1 - Whatsapp</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Phone Number Whatsapp"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Phone Number 2 */}
                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="phonenumber2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number 2</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Phone Number 2"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* Digital Address */}
                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="digitaladdress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Digital Address</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Digital Address"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* City */}
                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="City"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Landmark */}
                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="landmark"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Landmark</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Phone Number 2"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-2">
                      {/* Education */}
                      <FormField
                        control={form.control}
                        name="education"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Highest Education Qualification
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Highest Education Qualification"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/*Other Languages */}
                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="otherlanguages"
                        render={() => (
                          <FormItem>
                            <FormLabel>Other Languages</FormLabel>
                            <div className="space-y-4">
                              <div className="flex flex-wrap gap-2">
                                {form
                                  .watch("otherlanguages")
                                  .map((language, index) => (
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
                                  onChange={(e) =>
                                    setNewLanguage(e.target.value)
                                  }
                                  placeholder="Add other Languages"
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      addlanguage();
                                    }
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={addlanguage}
                                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      {/* Skills */}
                      <FormField
                        control={form.control}
                        name="skills"
                        render={() => (
                          <FormItem>
                            <FormLabel>Skills</FormLabel>
                            <div className="space-y-4">
                              <div className="flex flex-wrap gap-2">
                                {form.watch("skills").map((skill, index) => (
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
                                  placeholder="Add a skills"
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      addSkill();
                                    }
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={addSkill}
                                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/** Occupation Status */}
                    <div className="sm:col-span-2 flex gap-4">
                      <FormField
                        control={form.control}
                        name="occupationstatus"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Occupation Status</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Occupation Status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Employed">
                                  Employed
                                </SelectItem>
                                <SelectItem value="Self Employed">
                                  Self Employed
                                </SelectItem>
                                <SelectItem value="Unemployed">
                                  Unemployed
                                </SelectItem>
                                <SelectItem value="Retired">Retired</SelectItem>
                                <SelectItem value="Student">Student</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Occupation */}
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("occupationstatus") === "Student" ||
                        form.getValues("occupationstatus") === "Unemployed"
                          ? "hidden"
                          : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="occupation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Occupation</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Occupation"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Place of Work*/}
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("occupationstatus") === "Student" ||
                        form.getValues("occupationstatus") === "Unemployed"
                          ? "hidden"
                          : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="placeofwork"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Place of Work</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Place of Work"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Name of School */}
                    <div
                      className={` ${
                        form.getValues("occupationstatus") === "Student"
                          ? "sm:col-span-2"
                          : "hidden"
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="nameofschool"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name of School / Institution</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Name of School / Institution"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* Previous Parish */}
                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="previousparish"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Previous Parish</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Previous Parish"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="sm:col-span-4">
                      {/* Previous Associations */}
                      <FormField
                        control={form.control}
                        name="previousassociations"
                        render={() => (
                          <FormItem>
                            <FormLabel>Previous Associations</FormLabel>
                            <div className="space-y-4">
                              <div className="flex flex-wrap gap-2">
                                {form
                                  .watch("previousassociations")
                                  .map((association, index) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="pl-3 pr-2 py-1 flex items-center gap-1"
                                    >
                                      {association}
                                      <button
                                        type="button"
                                        onClick={() =>
                                          removeAssociation(association)
                                        }
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
                                  onChange={(e) =>
                                    setNewAssociation(e.target.value)
                                  }
                                  placeholder="Add a previous Association / Group"
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      addAssociation();
                                    }
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={addAssociation}
                                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />{" "}
                    </div>
                    <div className="sm:col-span-4">
                      {/* Previous Associations */}
                      <FormField
                        control={form.control}
                        name="currentassociations"
                        render={() => (
                          <FormItem>
                            <FormLabel>
                              Associations You will like to Join in DMCC
                            </FormLabel>
                            <div className="space-y-4">
                              <div className="flex flex-wrap gap-2">
                                {form
                                  .watch("currentassociations")
                                  .map((association, index) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="pl-3 pr-2 py-1 flex items-center gap-1"
                                    >
                                      {association}
                                      <button
                                        type="button"
                                        onClick={() =>
                                          removeCurrrentAssociation(association)
                                        }
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
                                  onChange={(e) =>
                                    setNewCurrentAssociation(e.target.value)
                                  }
                                  placeholder="Add a previous Association / Group"
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      addCurrentAssociation();
                                    }
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={addCurrentAssociation}
                                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />{" "}
                    </div>
                  </div>
                  {/* Sacraments */}

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* Baptised */}
                    <div className="sm:col-span-2">
                      {/* Gender */}
                      <FormField
                        control={form.control}
                        name="baptised"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Are you Baptised?</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Are you Baptised?" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Yes">Yes</SelectItem>
                                <SelectItem value="No">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/*Officiating Minister */}
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("baptised") === "No" ? "hidden" : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="baptised_officiatingminister"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Officiating Minister</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Name of Officiating Minister"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Place of Baptism */}
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("baptised") === "No" ? "hidden" : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="baptised_placeofbaptism"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Place of Baptism</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Place of Baptism"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* Date of Baptised */}
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("baptised") === "No" ? "hidden" : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="baptised_datebaptism"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date of Baptism</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full py-2 mt-2 pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* NLB */}
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("baptised") === "No" ? "hidden" : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="baptised_nlb"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NLB</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter NLB"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("baptised") === "No" ? "hidden" : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="baptised_godparent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Baptism - God Parent</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Baptism God Parent"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  {/* First Communion  */}

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* Confirmed */}
                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="firstcommunion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Did you received First Communion?
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Did you received first communion" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Yes">Yes</SelectItem>
                                <SelectItem value="No">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/*Officiating Minister  First Communion*/}
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("firstcommunion") === "No"
                          ? "hidden"
                          : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="firstcommunion_officiatingminister"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Officiating Minister - First Communion
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Name of First Communion Officiating Minister "
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Place of Confirmation */}
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("firstcommunion") === "No"
                          ? "hidden"
                          : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="firstcommunion_placeoffirstcommunion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Place of First Communion</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Place of Confirmation."
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* Date of Confirmation */}
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("firstcommunion") === "No"
                          ? "hidden"
                          : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="firstcommunion_datefirstcommunion"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date of First Communion</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full py-2 mt-2 pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* NLC */}
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("firstcommunion") === "No"
                          ? "hidden"
                          : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="firstcommunion_nlc"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NLC</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter NLC"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("firstcommunion") === "No"
                          ? "hidden"
                          : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="firstcommunion_godparent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Communion - God Parent</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Confirmation God Parent"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Confirmation */}
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* Confirmed */}
                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="confirmed"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Did you received confirmation?
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Are you confirmed" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Yes">Yes</SelectItem>
                                <SelectItem value="No">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/*Officiating Minister  Confirmation*/}
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("confirmed") === "No" ? "hidden" : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="confirmed_officiatingminister"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Officiating Minister</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Name of Confirmation Officiating Minister "
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Place of Confirmation */}
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("confirmed") === "No" ? "hidden" : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="confirmed_placeofconfirmation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Place of Confirmation</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Place of Confirmation."
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* Date of Confirmation */}
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("confirmed") === "No" ? "hidden" : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="confirmed_datefconfirmation"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date of Confirmation</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full py-2 mt-2 pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* NLC */}
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("confirmed") === "No" ? "hidden" : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="confirmed_nlconf"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NLCONF</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter NLCONF"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("confirmed") === "No" ? "hidden" : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="confirmed_godparent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirmation - God Parent</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Confirmation God Parent"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  {/* Holy Matrimony */}

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* Married */}
                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="maritalstatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Marital Status ?</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Are you married" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Single">Single</SelectItem>
                                <SelectItem value="Married">Married</SelectItem>
                                <SelectItem value="Divorced">
                                  Divorced
                                </SelectItem>
                                <SelectItem value="Seperated">
                                  Seperated
                                </SelectItem>
                                <SelectItem value="Widowed">Widowed</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/*Officiating Minister  Holy Matrimony*/}
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("maritalstatus") === "Single"
                          ? "hidden"
                          : "sm:col-span-2 "
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="married_officiatingminister"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Officiating Minister - Holy Matrimony
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Name of Officiating Minister - Holy Matrimony "
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Place of Holy Matrimony */}
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("maritalstatus") === "Single"
                          ? "hidden"
                          : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="married_placeofholymatrimony"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Place of Holy Matrimony</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Place of Confirmation."
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* Date of Confirmation */}
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("maritalstatus") === "Single"
                          ? "hidden"
                          : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="married_dateofholymatrimony"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date of Holy Matrimony</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full py-2 mt-2 pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* NLM */}
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("maritalstatus") === "Single"
                          ? "hidden"
                          : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="married_nlm"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NLM</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter NLM"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("maritalstatus") === "Single"
                          ? "hidden"
                          : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="married_godparent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Holy Matrimony - God Parent</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Confirmation God Parent"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("maritalstatus") === "Single"
                          ? "hidden"
                          : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="nameofspouse"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name of Spouse</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter name of Spouse"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("maritalstatus") === "Single"
                          ? "hidden"
                          : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="spousedenomination"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Spouse Denomination</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Spouse Denomination"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("maritalstatus") === "Single"
                          ? "hidden"
                          : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="spousenationality"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Spouse Nationality</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Spouse Nationality"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div
                      className={`sm:col-span-2 ${
                        form.getValues("maritalstatus") === "Single"
                          ? "hidden"
                          : ""
                      }`}
                    >
                      <FormField
                        control={form.control}
                        name="numberofchildren"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Enter Number of Children</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Number of Children"
                                {...field}
                                className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div
                      className={`sm:col-span-4 ${
                        form.getValues("maritalstatus") === "Single"
                          ? "hidden"
                          : ""
                      }`}
                    >
                      {/* Number of Children */}
                      <FormField
                        control={form.control}
                        name="nameofchildren"
                        render={() => (
                          <FormItem>
                            <FormLabel>Name of Children</FormLabel>
                            <div className="space-y-4">
                              <div className="flex flex-wrap gap-2">
                                {form
                                  .watch("nameofchildren")
                                  .map((children, index) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="pl-3 pr-2 py-1 flex items-center gap-1"
                                    >
                                      {children}
                                      <button
                                        type="button"
                                        onClick={() => removeChildren(children)}
                                        className="hover:bg-gray-200 rounded-full p-0.5"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </Badge>
                                  ))}
                              </div>
                              <div className="flex gap-2">
                                <Input
                                  value={newChildren}
                                  onChange={(e) =>
                                    setNewChildren(e.target.value)
                                  }
                                  placeholder="Add a previous Association / Group"
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      addChildren();
                                    }
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={addChildren}
                                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </>
              )}

              {step === 1 && renderPreview()}
            </div>

            <StepButtons
              currentStep={step}
              isLastStep={isLastStep}
              onPrevious={() => setStep(step - 1)}
              onNext={handleNext}
              isSubmitting={form.formState.isSubmitting}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditMember;
