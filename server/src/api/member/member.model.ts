import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    //Basic Information
    alive: { type: String, default: "true" },
    membership: { type: String, default: "active" },
    memberid: { type: String },
    avatar: { type: String, default: "avatar.jpg" },
    firstname: { type: String },
    othernames: { type: String },
    lastname: { type: String },
    dayofbirth: { type: String },
    numberdayofbirth: { type: String },
    monthofbirth: { type: String },
    yearofbirth: { type: String },
    gender: { type: String },
    age: { type: String },
    mothertongue: { type: String },
    placeofbirth: { type: String },
    hometown: { type: String },
    fathersname: { type: String },
    mothersname: { type: String },
    country: { type: String },
    email: { type: String },
    emergencycontact: { type: String },
    phonenumber1: { type: String },
    phonenumber2: { type: String },
    digitaladdress: { type: String },
    city: { type: String },
    landmark: { type: String },
    education: { type: String },
    otherlanguages: { type: Array },
    skills: { type: Array },
    occupationstatus: { type: String },
    occupation: { type: String },
    placeofwork: { type: String },
    nameofschool: { type: String },
    previousparish: { type: String },
    previousassociations: { type: Array },
    currentassociations: { type: Array },
    baptised: { type: String },
    baptised_officiatingminister: { type: String },
    baptised_placeofbaptism: { type: String },
    baptised_datebaptism: { type: String },
    baptised_nlb: { type: String },
    baptised_godparent: { type: String },
    firstcommunion: { type: String },
    firstcommunion_officiatingminister: { type: String },
    firstcommunion_placeoffirstcommunion: { type: String },
    firstcommunion_datefirstcommunion: { type: String },
    firstcommunion_nlc: { type: String },
    firstcommunion_godparent: { type: String },
    confirmed: { type: String },
    confirmed_officiatingminister: { type: String },
    confirmed_placeofconfirmation: { type: String },
    confirmed_datefconfirmation: { type: String },
    confirmed_nlconf: { type: String },
    confirmed_godparent: { type: String },
    maritalstatus: { type: String },
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
