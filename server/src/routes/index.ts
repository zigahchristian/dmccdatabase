import { Router, Response, Request } from "express";
const router = Router();

import usersRoutes from "../api/users/users.routes";
import profileRoutes from "../api/profile/profile.routes";
import memberRoutes from "../api/member/member.routes";
import duesRoutes from "../api/dues/dues.routes";

router.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Landed Well !" });
});

//Users Routes
router.use("/api/users", usersRoutes);
router.use("/api/profile", profileRoutes);
router.use("/api/members", memberRoutes);
router.use("/api/dues", duesRoutes);

export default router;
