import { Router, Response, Request } from "express";
import members from "../db/data.json"
const router = Router();

import usersRoutes from "../api/users/users.routes";
import profileRoutes from "../api/profile/profile.routes";
import memberRoutes from "../api/member/member.routes";
import duesRoutes from "../api/dues/dues.routes";



router.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Landed Well !" });
});

router.get("/members", (req: Request, res: Response) => {
  return res.status(200).send(members);
});

//Users Routes
router.use("/users", usersRoutes);
router.use("/profile", profileRoutes);
router.use("/member", memberRoutes);
router.use("/dues", duesRoutes);

export default router;
