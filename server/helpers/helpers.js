import crypto from "crypto";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";

const { unlink } = "node:fs/promises";

import fs from "fs";

export const saveBase64ToFile = (base64, folderPath, fileName) => {
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

  return `${fileName}.${extension}`;
};

export const random = () => crypto.randomBytes(128).toString("base64");

export const authentication = (salt, password) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET_KEY)
    .digest("hex");
};

export const getenv = () => {
  return process.env.NODE_ENV === undefined || "test"
    ? dotenv.config({ path: "./.env" })
    : dotenv.config();
};

export const connectDB = async (mongoUri) => {
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

export const generateId = (length, text) => {
  let pretext = text;
  const randInt = Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  );
  return `${pretext.toUpperCase()}${randInt}`;
};

export const deleteUploadedAvatar = (filePath) => {
  return unlink(filePath);
};

export const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};
