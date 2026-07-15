import { Router } from "express";
import { UserController } from "./user.controller.js";
import authMiddleware from "../../middleware/auth.js";

const router = Router();

router.get("/suggested", authMiddleware(), UserController.getSuggestedPeople);

export const UserRoutes = router;
