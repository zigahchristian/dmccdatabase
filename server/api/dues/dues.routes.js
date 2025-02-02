import { Router } from "express";
import {
  newDues,
  getAllDues,
  getRegisteredDuesById,
  updateDues,
  deleteDues,
} from "./dues.controllers.js";

import { isAuthenticated } from "../../middlewares/middlewares.js";

const router = Router();

router.post("/create/:memberid", newDues);

router.get("/", isAuthenticated, getAllDues);

router.get("/:id", isAuthenticated, getRegisteredDuesById);

router.patch("/:id", isAuthenticated, updateDues);

router.delete("/:id", isAuthenticated, deleteDues);

export default router;
