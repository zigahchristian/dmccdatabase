import { Request, Response } from "express";

import {
  createMember,
  getMembers,
  deleteMemberById,
  updateMemberById,
  getMemberById,
} from "./member.model";

import fs from "fs";
import path from "path";
import sharp from "sharp";
import { imagepath } from "../../app";
import { generateId } from "../../helpers";
import csv from "csvtojson";

export const newBulkMemberUpdload = async (req: Request, res: Response) => {
  try {
    console.log(req?.file);
    const csvData = await csv().fromString(req?.file.buffer.toString()); //(`${csvpath}/bulkmembers.csv`);

    for (let i = 0; i < csvData.length; i++) {
      const newmember = csvData[i];
      await createMember(newmember);
      console.log(`${i} member created`);
    }
    res.status(200).json({ msg: "Success" });
  } catch (e) {
    console.log(e);
  }
};

export const newMember = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    return;
    const {
      first_name,
      last_name,
      other_names,
      dob,
      gender,
      email,
      phone1,
      phone2,
      country,
      avatar,
      dayborn,
      digital_address,
      location,
      hometown,
      hometown_region,
      education_qualifications,
      occupations,
      place_of_work,
      occupation_status,
      other_skills,
      baptised,
      officiating_minister,
      b_place_of_baptism,
      b_date_of_baptism,
      nlb,
      god_parent,
      first_communion,
      fc_officiating_minister,
      place_of_first_communion,
      date_of_first_communion,
      nlc,
      fc_god_parent,
      confirmed,
      c_officiating_minister,
      place_of_confirmation,
      date_of_confirmation,
      nlconf,
      c_god_parent,
      married,
      hm_officiating_minister,
      type_of_marriage,
      hm_place_of_confirmation,
      hm_date_of_confirmation,
      nlm,
      name_of_spouse,
      spouse_nationality,
      spouse_religious_demomination,
      number_of_children,
      hm_god_parent,
      previous_parish,
      associations,
    } = req.body;

    const { id } = req.params;

    if (!first_name || !last_name || !gender || !dob) {
      return res.sendStatus(500);
    }

    const enteredByUser = req.session.authUserId;

    if (!enteredByUser) {
      return res.status(400).json({ msg: "Not a registered User" });
    }

    const member = await createMember({
      first_name,
      last_name,
      other_names,
      dob,
      gender,
      email,
      phone1,
      phone2,
      country,
      avatar,
      dayborn,
      digital_address,
      location,
      hometown,
      hometown_region,
      education_qualifications,
      occupations,
      place_of_work,
      occupation_status,
      other_skills,
      baptised,
      officiating_minister,
      b_place_of_baptism,
      b_date_of_baptism,
      nlb,
      god_parent,
      first_communion,
      fc_officiating_minister,
      place_of_first_communion,
      date_of_first_communion,
      nlc,
      fc_god_parent,
      confirmed,
      c_officiating_minister,
      place_of_confirmation,
      date_of_confirmation,
      nlconf,
      c_god_parent,
      married,
      hm_officiating_minister,
      type_of_marriage,
      hm_place_of_confirmation,
      hm_date_of_confirmation,
      nlm,
      name_of_spouse,
      spouse_nationality,
      spouse_religious_demomination,
      number_of_children,
      hm_god_parent,
      previous_parish,
      associations,
      created_by: enteredByUser,
    });

    return res
      .status(200)
      .json({ success: true, msg: "successfully added a new member" });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getAllMembers = async (req: Request, res: Response) => {
  try {
    const members = await getMembers();
    return res.status(200).json(members);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const getRegisteredMemberById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dbmember = await getMemberById(id);
    return res.status(200).json(dbmember);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const updateMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    const updatedMember = await updateMemberById(id, changes);
    return res.status(200).end();
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedMember = await deleteMemberById(id);
    return res.status(401).json(deletedMember);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const uploadAvatar = async (req: Request, res: Response) => {
  try {
    const { memberid } = req.params;

    // Generate filename, resize and save to avatar folder
    const newfilename = `${generateId(12, "member")}${path.extname(
      req?.file?.originalname
    )}`;
    const saveTo = imagepath;
    const filePath = path.join(saveTo, newfilename);

    await sharp(req?.file?.buffer)
      .resize({ width: 400, height: 300, fit: "inside" })
      .toFile(filePath);

    // Update Member
    const dbMember = await getMemberById(memberid);
    dbMember.avatar = newfilename;
    await dbMember.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(200).end();
};

export const updateAvatar = async (req: Request, res: Response) => {
  try {
    const { memberid, avatarid } = req.params;

    if (!avatarid && !memberid) {
      return res.sendStatus(403).end();
    }

    // Delete Image before Adding New One
    const avatarToDelete = `${imagepath}/${avatarid}`;
    fs.unlinkSync(avatarToDelete);

    // Generate filename, resize and save to avatar folder
    const newfilename = `${generateId(12, "member")}${path.extname(
      req?.file?.originalname
    )}`;
    const saveTo = imagepath;
    const filePath = path.join(saveTo, newfilename);

    await sharp(req?.file?.buffer)
      .resize({ width: 400, height: 300, fit: "inside" })
      .toFile(filePath);

    // Update Member
    const dbMember = await getMemberById(memberid);
    dbMember.avatar = newfilename;
    await dbMember.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(200).end();
};

export const deleteAvatar = async (req: Request, res: Response) => {
  try {
    const { memberid, avatarid } = req.params;

    if (!avatarid && !memberid) {
      return res.sendStatus(403).end();
    }

    // Delete Image before Adding New One
    const avatarToDelete = `${imagepath}/${avatarid}`;
    fs.unlinkSync(avatarToDelete);

    // Update Member
    const dbMember = await getMemberById(memberid);
    dbMember.avatar = "avatar.png";
    await dbMember.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(200).end();
};
