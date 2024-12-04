import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    //Basic Information
    alive: { type: Boolean, default: true, required: true },
    avatar: { type: String, default: "avatar.jpg", required: true },
    firstname: { type: String, required: true },
    othernames: { type: String, required: true },
    lastname: { type: String, required: true },
    dayofbirth: { type: String, required: true },
    numberdayofbirth: { type: String, required: true },
    monthofbirth: { type: String, required: true },
    yearofbirth: { type: String, required: true },
    gender: { type: String, required: true },
    active: { type: String, required: true },
    mothertongue: { type: String, required: true },
    placeofbirth: { type: String, required: true },
    hometown: { type: String, required: true },
    fathersname: { type: String, required: true },
    mothersname: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true },
    emergencycontact: { type: String, required: true },
    phonenumber1: { type: String, required: true },
    phonenumber2: { type: String, required: true },
    digitaladdress: { type: String, required: true },
    city: { type: String, required: true },
    landmark: { type: String, required: true },
    education: { type: String, required: true },
    otherlanguages: { type: Array, required: true },
    skills: { type: Array, required: true },
    occupationstatus: { type: String, required: true },
    occupation: { type: String },
    placeofwork: { type: String },
    nameofschool: { type: String },
    previousparish: { type: String },
    previousassociations: { type: Array },
    currentassociations: { type: Array },
    baptised: { type: Boolean, required: true },
    baptised_officiatingminister: { type: String },
    baptised_placeofbaptism: { type: String },
    baptised_datebaptism: { type: String },
    baptised_nlb: { type: String },
    baptised_godparent: { type: String },
    firstcommunion: { type: Boolean, required: true },
    firstcommunion_officiatingminister: { type: String },
    firstcommunion_placeoffirstcommunion: { type: String },
    firstcommunion_datefirstcommunion: { type: String },
    firstcommunion_nlc: { type: String },
    firstcommunion_godparent: { type: String },
    confirmed: { type: Boolean, required: true },
    confirmed_officiatingminister: { type: String },
    confirmed_placeofconfirmation: { type: String },
    confirmed_datefconfirmation: { type: String },
    confirmed_nlconf: { type: String },
    confirmed_godparent: { type: String },
    maritalstatus: { type: String, required: true },
    married_officiatingminister: { type: String },
    married_placeofholymatrimony: { type: String },
    married_dateofholymatrimony: { type: String },
    married_nlm: { type: String },
    married_godparent: { type: String },
    nameofspouse: { type: String },
    spousedenomination: { type: String },
    spousenationality: { type: String },
    numberofchildren: { type: String },
    nameofchildren: { type: Array },
    dues: { type: Array },

    //Information entered by which user?
    created_by: {
      type: String,
      default: "bulk-upload",
    },
  },

  // Timestamps for createdAt and updatedAt
  {
    timestamps: true,
  }
);

export const MemberModel = mongoose.model("Member", MemberSchema);

export const getMembers = () => MemberModel.find();

export const getMemberById = (id: string) => MemberModel.findOne({ _id: id });

export const createMember = (values: Record<string, any>) =>
  new MemberModel(values).save();

export const updateMemberById = (id: string, values: Record<string, any>) =>
  MemberModel.findOneAndUpdate({ _id: id }, values);

export const deleteMemberById = (id: String) =>
  MemberModel.findOneAndDelete({ _id: id });
