import { z } from "zod";
import { AuthValidation } from "./auth.validation.js";

export type IRegisterUserPayload = z.infer<typeof AuthValidation.registerValidationSchema>;
export type ILoginUserPayload = z.infer<typeof AuthValidation.loginValidationSchema>;

export interface IChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
}
