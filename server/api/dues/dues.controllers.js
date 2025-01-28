import {
  createDues,
  getDues,
  deleteDuesById,
  updateDuesById,
  getDuesById,
} from "./dues.model.js";
import { getMemberById } from "../member/member.model.js";

export const newDues = async (req, res) => {
  try {
    const { memberid } = req.params;
    const { description, amount, paid_by } = req.body;

    if (!description || !amount) {
      return res.sendStatus(500);
    }

    const created_by = "67689e90bc6f973f7f087ec7"; //req.session.authUserId;

    if (!created_by) {
      return res.status(400).end();
    }

    const dues = await createDues({
      description: description,
      amount: amount,
      date: Date.now(),
      paid_by: paid_by,
      created_by: created_by,
    });

    const member = await getMemberById(memberid);

    member.dues.push(dues._id);
    console.log(member);
    await member.save();

    return res
      .status(200)
      .json({ success: true, msg: "successfully added a new dues record" });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getAllDues = async (req, res) => {
  try {
    const dues = await getDues();
    return res.status(200).json(dues);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const getRegisteredDuesById = async (req, res) => {
  try {
    const { id } = req.params;
    const dbDues = await getDuesById(id);
    return res.status(200).json(dbDues);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const updateDues = async (req, res) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    const updatedDues = await updateDuesById(id, changes);
    console.log(updatedDues);
    return res.status(200).end();
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const deleteDues = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDues = await deleteDuesById(id);
    console.log(deleteDues);
    return res.status(401).json(deletedDues);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};
