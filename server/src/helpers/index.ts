import crypto from "crypto";
const dotenv = require("dotenv");
import mongoose from "mongoose";

import { unlink } from "node:fs/promises";

export const random = () => crypto.randomBytes(128).toString("base64");

export const authentication = (salt: string, password: string) => {
  const SECRET_KEY: any = process.env.SECRET_KEY;
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET_KEY)
    .digest("hex");
};

export const getenv = () => {
  return process.env.NODE_ENV === undefined || "test"
    ? dotenv.config({ path: "./src/.env" })
    : dotenv.config();
};

interface configOptions {
  useNewUrlParser: boolean;
  useCreateIndex: boolean;
  usefindAndModify: boolean;
}

export const connectDB = async (mongoUri: string) => {
  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(
      `MongoDB connected in ${process.env.NODE_ENV} mode on host:${conn.connection.host}`
    );
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};



export const generateId = (length: any, text: String) => {
  let pretext = text;
  const randInt = Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  );
  return `${pretext}_${randInt}`;
};

export const deleteUploadedAvatar = (filePath: any) => {
  return unlink(filePath);
};


export const getError = (error:any) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};


