import { Request, Response } from "express";
import {
  createDues,
  getDues,
  deleteDuesById,
  updateDuesById,
  getDuesById,
} from "./dues.model";
import { getMemberById } from "../member/member.model";

export const newDues = async (req: Request, res: Response) => {
  try {
    const { memberid } = req.params;
    const { type_of_dues, price } = req.body;

    if (!type_of_dues || !price) {
      return res.sendStatus(500);
    }

    const created_by = req.session.authUserId;
    const paid_by = memberid;

    if (!created_by) {
      return res.status(400).end();
    }

    const dues = await createDues({
      type_of_dues: type_of_dues,
      price: price,
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

export const getAllDues = async (req: Request, res: Response) => {
  try {
    const dues = await getDues();
    return res.status(200).json(dues);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const getRegisteredDuesById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dbDues = await getDuesById(id);
    return res.status(200).json(dbDues);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const updateDues = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    const updatedDues = await updateDuesById(id, changes);
    return res.status(200).end();
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const deleteDues = async (req: Request, res: Response) => {
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
