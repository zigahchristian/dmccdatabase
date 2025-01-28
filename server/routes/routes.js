import { Router } from "express";
const router = Router();

import usersRoutes from "../api/users/users.routes.js";
import profileRoutes from "../api/profile/profile.routes.js";
import memberRoutes from "../api/member/member.routes.js";
import duesRoutes from "../api/dues/dues.routes.js";

router.get("/", (req, res) => {
  return res.status(200).json({ message: "Landed Well !" });
});

//Users Routes
router.use("/api/users", usersRoutes);
router.use("/api/profile", profileRoutes);
router.use("/api/members", memberRoutes);
router.use("/api/dues", duesRoutes);

export default router;
