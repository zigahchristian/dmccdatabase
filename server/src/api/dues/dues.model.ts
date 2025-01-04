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

export const getDuesById = (id: string) => DuesModel.findOne({ _id: id });

export const createDues = (values: Record<string, any>) =>
  new DuesModel(values).save();

export const updateDuesById = (id: string, values: Record<string, any>) =>
  DuesModel.findOneAndUpdate({ _id: id }, values);

export const deleteDuesById = (id: String) =>
  DuesModel.findOneAndDelete({ _id: id });
