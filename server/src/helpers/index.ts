import crypto from "crypto";
const dotenv = require("dotenv");
import mongoose from "mongoose";
import path from "path";

import { unlink } from "node:fs/promises";

import fs from "fs";

/**
 * Saves a Base64 string as an image file in a specified folder.
 * @param base64 - The Base64 string, including the data URL prefix.
 * @param folderPath - The path to the folder where the file should be saved.
 * @param fileName - The name of the output file.
 * @returns The full path of the saved file.
 */
export const saveBase64ToFile = (
  base64: string,
  folderPath: string,
  fileName: string
): string => {
  // Ensure the folder exists
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  // Split the Base64 string into metadata and data parts
  const [metadata, data] = base64.split(",");
  if (!metadata || !data) {
    throw new Error("Invalid Base64 format");
  }

  // Extract the file extension from the metadata
  const mimeMatch = metadata.match(/data:(.*?);base64/);
  if (!mimeMatch) {
    throw new Error("Unable to determine MIME type");
  }
  const mimeType = mimeMatch[1];
  const extension = mimeType.split("/")[1];

  // Decode the Base64 string
  const buffer = Buffer.from(data, "base64");

  // Define the file path
  const filePath = path.join(folderPath, `${fileName}.${extension}`);

  // Write the file to the specified folder
  fs.writeFileSync(filePath, buffer);

  return fileName;
};

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

export const getError = (error: any) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};
