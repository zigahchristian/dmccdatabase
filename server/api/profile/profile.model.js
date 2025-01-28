import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  userid: { type: String, require: true },
  firstname: { type: String, require: false },
  lastname: { type: String, require: false },
  dob: { type: String, require: true },
  avatar: { type: String, default: "avatar.png" },
});

export const ProfileModel = mongoose.model("Profile", ProfileSchema);

export const getProfiles = () => ProfileModel.find();

export const getProfileById = (id) =>
  ProfileModel.findOne({ userid: id });

export const createProfile = (values) =>
  new ProfileModel(values).save().then((profile) => profile.toObject());

export const updateProfileById = (id, values) =>
  ProfileModel.findOneAndUpdate({ userid: id }, values);

export const deleteProfileById = (id) =>
  ProfileModel.findOneAndDelete({ userid: id });
