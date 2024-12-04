import { Router } from "express";
import {
  newProfile,
  getAllProfiles,
  getUserProfileById,
  updateProfile,
  deleteProfile,
} from "./profile.controller";
import { isAuthenticated } from "../../middlewares";

const router = Router();

router.post("/new/:id", newProfile);

router.get("/", isAuthenticated, getAllProfiles);

router.get("/:id", isAuthenticated, getUserProfileById);

router.patch("/:id", isAuthenticated, updateProfile);

router.delete("/:id", isAuthenticated, deleteProfile);

export default router;