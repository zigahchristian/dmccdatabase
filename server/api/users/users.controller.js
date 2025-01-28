import fs from "fs";

import {
  getUserByEmail,
  createUser,
  getUsers,
  deleteUserById,
  getUserById,
} from "./users.model.js";

import {
  createProfile,
  deleteProfileById,
  getProfileById,
} from "../profile/profile.model.js";

import { random, authentication } from "../../helpers/helpers.js";
import { imagepath } from "../../app.js";
import { generateId } from "../../helpers/helpers.js";
import path from "path";


export const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password) {
      return res.sendStatus(500);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "Email ALready Registered" });
    }

    const salt = random();

    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    // Create User Profile
    await createProfile({
      userid: user._id,
    });

    return res.status(201).sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(500)
        .json({ message: "Invalid Username/Password combination" });
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res
        .status(403)
        .json({ message: "Invalid Password/Username Combination" });
    }

    if (!email) {
      return res.status(500).json({ message: "usere does not exist" });
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res
        .status(403)
        .json({ message: "Invalid Password/Username Combination" });
    }

    const authUser = await getUserByEmail(email);

    req.session.authUserId = authUser._id;

    return res.status(200).sendStatus(200);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "something went wrong", isAuth: false });
  }
};

export const getsession = async (req, res) => {
  const { authUserId } = req.session;
  try {
    const sessionUserId = authUserId === undefined ? "123" : authUserId;
    const authUser = await getUserById(sessionUserId);
    return res.status(200).json({ authUser });
  } catch (error) {
    return res.status(500).json({ message: "Something Went Wrong" });
  }
};

export const logout = async ( req, res,next) => {
  const cookieName = process.env.COOKIE_SESSION_NAME;
  console.log(cookieName);
  res.clearCookie(cookieName);
  req.session.destroy((err) => {
    if (err) return next(err);
    return res
      .status(200)
      .json({ message: "Logout Successfully", isAuth: false });
  });
};

export const getAUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const dbUser = await getUserById(id);

    if (!dbUser) {
      return res.status(400).json({ message: "No user found" });
    }

    const deletedUser = await deleteUserById(id);
    await deleteProfileById(id);
    return res.status(401).json(deletedUser);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let { username } = req.body;

    if (!username) {
      return res.sendStatus(400);
    }

    const dbUser = await getUserById(id);

    if (!dbUser) {
      return res.sendStatus(403);
    }

    dbUser.username = username;
    await dbUser.save();

    return res.status(200).json(dbUser).end();
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};


export const updateAvatar = async (req, res,next) => {
  try {
    const { authUserId } = req.session;
    const { avatarid } = req.params;
    const id = authUserId === undefined ? "123" : authUserId.toString();

    if (!avatarid) {
      return res.sendStatus(403).end();
    }

    // Delete Image before Adding New One
    const avatarToDelete = `${imagepath}/${avatarid}`;
    fs.unlinkSync(avatarToDelete);

    // Generate filename, resize and save to avatar folder
    const newfilename = `${generateId(12, "avatar")}${path.extname(
      req?.file?.originalname
    )}`;
    const saveTo = imagepath;
    const filePath = path.join(saveTo, newfilename);

    await sharp(req?.file?.buffer)
      .resize({ width: 400, height: 300, fit: "inside" })
      .toFile(filePath);

    // Update User Profile
    const dbUser = await getProfileById(id);
    dbUser.avatar = newfilename;
    await dbUser.save();
    return res.status(200).end();
  } catch (err) {
    return res.status(500).end();
  }
};

export const deleteAvatar = async (req, res, next) => {
  try {
    const { authUserId } = req.session;
    const { avatarid } = req.params;
    const id = authUserId === undefined ? "123" : authUserId.toString();

    if (!avatarid) {
      return res.sendStatus(403).end();
    }

    // Delete Image before Adding New One
    const avatarToDelete = `${imagepath}/${avatarid}`;
    fs.unlinkSync(avatarToDelete);

    // Update User Profile
    const dbUser = await getProfileById(id);
    dbUser.avatar = "avatar.png";
    await dbUser.save();
    return res.status(200).end();
  } catch (err) {
    return res.status(500).end();
  }
};
