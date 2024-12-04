import { Router } from "express";
import {
  register,
  login,
  getAUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  logout,
  getsession,
  uploadAvatar,
  updateAvatar,
  deleteAvatar,
} from "./users.controller";
import { isAuthenticated, forwardAuthentication } from "../../middlewares";
import upload from "../../middlewares/multerConfig";

const router = Router();

router.post("/auth/register", register);

router.post("/auth/login", forwardAuthentication, login);

router.get("/getsession", isAuthenticated, getsession);

router.get("/:id", isAuthenticated, getAUserById);

router.get("/", isAuthenticated, getAllUsers);

router.patch("/:id", isAuthenticated, updateUser);

router.delete("/:id", isAuthenticated, deleteUser);

router.get("/auth/logout", isAuthenticated, logout);

router.post("/avatar", isAuthenticated, upload.single("avatar"), uploadAvatar);

router.patch(
  "/avatar/:avatarid",
  isAuthenticated,
  upload.single("avatar"),
  updateAvatar
);

router.delete("/avatar/:avatarid", isAuthenticated, deleteAvatar);

export default router;
