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
  updateAvatar,
  deleteAvatar,
} from "./users.controller.js";
import { isAuthenticated, forwardAuthentication } from "../../middlewares/middlewares.js";


const router = Router();

router.post("/auth/register", register);

router.post("/auth/login", forwardAuthentication, login);

router.get("/getsession", isAuthenticated, getsession);

router.get("/:id", isAuthenticated, getAUserById);

router.get("/", isAuthenticated, getAllUsers);

router.patch("/:id", isAuthenticated, updateUser);

router.delete("/:id", isAuthenticated, deleteUser);

router.get("/auth/logout", isAuthenticated, logout);


router.patch(
  "/avatar/:avatarid",
  isAuthenticated,
  updateAvatar
);

router.delete("/avatar/:avatarid", isAuthenticated, deleteAvatar);

export default router;
