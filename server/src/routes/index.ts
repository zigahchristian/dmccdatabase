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
router.use("/users", usersRoutes);
router.use("/profile", profileRoutes);
router.use("/members", memberRoutes);
router.use("/dues", duesRoutes);

export default router;
