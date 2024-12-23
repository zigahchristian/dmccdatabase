import { Request, Response } from "express";
import {
  createMember,
  getMembers,
  getMemberById,
  deleteMemberById,
  updateMemberById,
} from "./member.model";

import fs from "fs";
import path from "path";
import sharp from "sharp";
import { imagepath } from "../../app";
import { generateId, saveBase64ToFile } from "../../helpers";
import csv from "csvtojson";
const imgpath = "/app/src/avatar";

export const newBulkMemberUpdload = async (req: Request, res: Response) => {
  try {
    const csvData = await csv().fromString(req?.file.buffer.toString());

    for (let i = 0; i < csvData.length; i++) {
      const newmember = csvData[i];
      await createMember(newmember);
    }
    res.status(200).json({ msg: "Success" });
  } catch (e) {
    console.log(e);
  }
};

export const newMember = async (req: Request, res: Response) => {
  try {
    const { firstname, othernames, lastname, gender } = req.body;

    if (!firstname || !lastname || !gender || !othernames) {
      return res.sendStatus(500);
    }

    const enteredByUser = req.session.authUserId;

    if (!enteredByUser) {
      return res.status(400).json({ msg: "Not a registered User" });
    }

    const newId = generateId(4, "DM");

    const member = await createMember({
      alive: req.body.alive,
      membership: req.body.membership,
      memberid: newId,
      avatar: saveBase64ToFile(req.body.avatar, imgpath, newId),
      firstname: req.body.firstname,
      othernames: req.body.othernames,
      lastname: req.body.lastname,
      dayofbirth: req.body.dayofbirth,
      numberdayofbirth: req.body.numberdayofbirth,
      monthofbirth: req.body.monthofbirth,
      yearofbirth: req.body.yearofbirth,
      gender: req.body.gender,
      mothertongue: req.body.mothertongue,
      placeofbirth: req.body.placeofbirth,
      hometown: req.body.hometown,
      fathersname: req.body.fathersname,
      mothersname: req.body.mothersname,
      country: req.body.country,
      email: req.body.email,
      emergencycontact: req.body.emergencycontact,
      phonenumber1: req.body.phonenumber1,
      phonenumber2: req.body.phonenumber2,
      digitaladdress: req.body.digitaladdress,
      city: req.body.city,
      landmark: req.body.landmark,
      education: req.body.education,
      otherlanguages: req.body.otherlanguages,
      skills: req.body.skills,
      occupationstatus: req.body.occupationstatus,
      occupation: req.body.occupation,
      placeofwork: req.body.placeofwork,
      nameofschool: req.body.nameofschool,
      previousparish: req.body.previousparish,
      previousassociations: req.body.previousassociations,
      currentassociations: req.body.currentassociations,
      baptised: req.body.baptised,
      baptised_officiatingminister: req.body.baptised_officiatingminister,
      baptised_placeofbaptism: req.body.baptised_placeofbaptism,
      baptised_datebaptism: req.body.baptised_datebaptism,
      baptised_nlb: req.body.baptised_nlb,
      baptised_godparent: req.body.baptised_godparent,
      firstcommunion: req.body.firstcommunion,
      firstcommunion_officiatingminister:
        req.body.firstcommunion_officiatingminister,
      firstcommunion_placeoffirstcommunion:
        req.body.firstcommunion_placeoffirstcommunion,
      firstcommunion_datefirstcommunion:
        req.body.firstcommunion_datefirstcommunion,
      firstcommunion_nlc: req.body.firstcommunion_nlc,
      firstcommunion_godparent: req.body.firstcommunion_godparent,
      confirmed: req.body.confirmed,
      confirmed_officiatingminister: req.body.confirmed_officiatingminister,
      confirmed_placeofconfirmation: req.body.confirmed_placeofconfirmation,
      confirmed_datefconfirmation: req.body.confirmed_datefconfirmation,
      confirmed_nlconf: req.body.confirmed_nlconf,
      confirmed_godparent: req.body.confirmed_godparent,
      maritalstatus: req.body.maritalstatus,
      married_officiatingminister: req.body.married_officiatingminister,
      married_placeofholymatrimony: req.body.married_placeofholymatrimony,
      married_dateofholymatrimony: req.body.married_dateofholymatrimony,
      married_nlm: req.body.married_nlm,
      married_godparent: req.body.married_godparent,
      nameofspouse: req.body.nameofspouse,
      spousedenomination: req.body.spousedenomination,
      spousenationality: req.body.spousenationality,
      numberofchildren: req.body.numberofchildren,
      nameofchildren: req.body.nameofchildren,
      dues: req.body.dues,
      created_by: enteredByUser,
    });

    console.log(member);

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
