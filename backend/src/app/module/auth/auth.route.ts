import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import validateRequest from "../../middleware/validateRequest.js";
import { AuthValidation } from "./auth.validation.js";
import authMiddleware from "../../middleware/auth.js";

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

router.get("/me", authMiddleware(), AuthController.getMe);
router.post("/refresh-token", AuthController.getNewToken);

router.post(
  "/change-password",
  authMiddleware(),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassword
);

router.post("/logout", authMiddleware(), AuthController.logoutUser);

router.post(
  "/verify-email",
  validateRequest(AuthValidation.verifyEmailValidationSchema),
  AuthController.verifyEmail
);

router.post(
  "/forget-password",
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthController.forgetPassword
);

router.post(
  "/reset-password",
  validateRequest(AuthValidation.resetPasswordValidationSchema),
  AuthController.resetPassword
);

router.get("/login/google", AuthController.googleLogin);
router.get("/google/success", AuthController.googleLoginSuccess);
router.get("/oauth/error", AuthController.handleOAuthError);

export const AuthRoutes = router;
