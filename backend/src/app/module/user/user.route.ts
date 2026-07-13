import { Router } from "express";
import { UserController } from "./user.controller.js";

const router = Router();

router.get("/suggested", UserController.getSuggestedPeople);

export const UserRoutes = router;
