import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import validateRequest from "../../middleware/validateRequest.js";
import { AuthValidation } from "./auth.validation.js";

const router = Router();

router.post(
  "/register",
  validateRequest(AuthValidation.registerValidationSchema),
  AuthController.registerUser
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser
);

router.post("/logout", AuthController.logoutUser);

export const AuthRoutes = router;
