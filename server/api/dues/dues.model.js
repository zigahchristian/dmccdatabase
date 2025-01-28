import mongoose from "mongoose";

const DuesSchema = new mongoose.Schema(
  {
    //Basic Information
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    date: {
      type: String,
      defualt: new Date().toISOString().split(".")[0].replace("T", " @ "),
    },

    // paid by
    paid_by: {
      type: String,
      required: true,
    },

    //Information entered by which user?
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },

  // Timestamps for createdAt and updatedAt
  {
    timestamps: true,
  }
);

export const DuesModel = mongoose.model("Dues", DuesSchema);

export const getDues = () => DuesModel.find();

export const getDuesById = (id) => DuesModel.findOne({ _id: id });

export const createDues = (values) =>
  new DuesModel(values).save();

export const updateDuesById = (id, values) =>
  DuesModel.findOneAndUpdate({ _id: id }, values);

export const deleteDuesById = (id) =>
  DuesModel.findOneAndDelete({ _id: id });
