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
} from "./member.controllers";

import csvuploads from "../../middlewares/csvuploads";
import { isAuthenticated } from "../../middlewares";

const router = Router();

router.post("/create", newMember);

router.get("/", isAuthenticated, getAllMembers);

router.get("/:id", isAuthenticated, getRegisteredMemberById);

router.patch("/:id", isAuthenticated, updateMember);

router.patch("/avatar/:memberid", isAuthenticated, updateAvatar);

router.delete("/:id", isAuthenticated, deleteMember);

router.post(
  "/newBulkMembersUpload",
  csvuploads.single("members"),
  newBulkMemberUpdload
);

router.delete("/avatar/:memberid/:avatarid", isAuthenticated, deleteAvatar);

export default router;
