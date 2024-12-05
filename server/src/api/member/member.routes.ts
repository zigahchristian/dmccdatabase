import { Router } from "express";
import {
  newMember,
  getAllMembers,
  getRegisteredMemberById,
  updateMember,
  deleteMember,
  uploadAvatar,
  updateAvatar,
  deleteAvatar,
  newBulkMemberUpdload,
} from "./member.controllers";

import uploads from "../../middlewares/multerConfig";
import csvuploads from "../../middlewares/csvuploads";
import { isAuthenticated } from "../../middlewares";

const router = Router();

router.post("/create/:id", newMember);

router.get("/", isAuthenticated, getAllMembers);

router.get("/:id", isAuthenticated, getRegisteredMemberById);

router.patch("/:id", isAuthenticated, updateMember);

router.delete("/:id", isAuthenticated, deleteMember);

router.post(
  "/avatar/:memberid",
  isAuthenticated,
  uploads.single("avatar"),
  uploadAvatar
);

router.patch(
  "/avatar/:memberid/:avatarid",
  isAuthenticated,
  uploads.single("avatar"),
  updateAvatar
);

router.post(
  "/newBulkMembersUpload",
  csvuploads.single("member"),
  newBulkMemberUpdload
);

router.delete("/avatar/:memberid/:avatarid", isAuthenticated, deleteAvatar);

export default router;
