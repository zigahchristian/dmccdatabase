import { Router } from "express";
import {
  newMember,
  getAllMembers,
  getRegisteredMemberById,
  updateMember,
  deleteMember,
  updateAvatar,
  deleteAvatar,
  newBulkMemberUpdload,
} from "./member.controllers.js";

import { isAuthenticated } from "../../middlewares/middlewares.js";

const router = Router();

router.post("/create", newMember);

router.get("/", isAuthenticated, getAllMembers);

router.get("/:id", isAuthenticated, getRegisteredMemberById);

router.patch("/:id", isAuthenticated, updateMember);

router.patch("/avatar/:memberid", isAuthenticated, updateAvatar);

router.delete("/:id", isAuthenticated, deleteMember);

router.post(
  "/newBulkMembersUpload",
  newBulkMemberUpdload
);

router.delete("/avatar/:memberid/:avatarid", isAuthenticated, deleteAvatar);

export default router;
