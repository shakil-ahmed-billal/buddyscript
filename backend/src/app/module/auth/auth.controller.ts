import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthService } from "./auth.service.js";
import catchAsync from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { tokenUtils } from "../../utils/token.js";
import config from "../../config/index.js";
import { CookieUtils } from "../../utils/cookie.js";
import { auth } from "../../lib/auth.js";

const registerUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.registerUser(req.body);
    const { accessToken, refreshToken, sessionToken, ...rest } = result as Record<string, any>;

    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    tokenUtils.setBetterAuthSessionCookie(res, sessionToken as string);

    sendResponse(res, {
        httpStatusCode: httpStatus.CREATED,
        success: true,
        message: "User registered successfully",
        data: { sessionToken, accessToken, refreshToken, ...rest }
    });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.loginUser(req.body);
    const { accessToken, refreshToken, sessionToken, ...rest } = result as Record<string, any>;

    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    tokenUtils.setBetterAuthSessionCookie(res, sessionToken as string);

    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        data: { sessionToken, accessToken, refreshToken, ...rest }
    });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
    const betterAuthSessionToken = req.cookies?.["better-auth.session_token"] || "";
    await AuthService.logoutUser(betterAuthSessionToken);

    const isProd = config.env === 'production';
    const cookieOptions = { 
        httpOnly: true, 
        secure: isProd, 
        sameSite: isProd ? "none" : "lax" as any,
        path: '/'
    };

    CookieUtils.clearCookie(res, 'accessToken', cookieOptions);
    CookieUtils.clearCookie(res, 'refreshToken', cookieOptions);
    CookieUtils.clearCookie(res, 'better-auth.session_token', cookieOptions);

    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: "User logged out successfully",
        data: null
    });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await AuthService.getMe(user.id);

    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: "User session retrieved successfully",
        data: result
    });
});

const getNewToken = catchAsync(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];
    if (!refreshToken) {
        sendResponse(res, {
            httpStatusCode: httpStatus.UNAUTHORIZED,
            success: false,
            message: "Refresh token is missing",
            data: null
        });
        return;
    }

    const result = await AuthService.getNewToken(refreshToken, betterAuthSessionToken);
    const { accessToken, refreshToken: newRefreshToken, sessionToken } = result;

    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, newRefreshToken);
    tokenUtils.setBetterAuthSessionCookie(res, sessionToken);

    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: "New tokens generated successfully",
        data: { accessToken, refreshToken: newRefreshToken, sessionToken }
    });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];
    const result = await AuthService.changePassword(req.body, betterAuthSessionToken);

    const { accessToken, refreshToken, sessionToken } = result as Record<string, any>;

    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    tokenUtils.setBetterAuthSessionCookie(res, sessionToken as string);

    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: "Password changed successfully",
        data: result,
    });
});

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    await AuthService.verifyEmail(email, otp);

    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: "Email verified successfully",
        data: null
    });
});

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;
    await AuthService.forgetPassword(email);

    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: "Password reset OTP sent to email successfully",
        data: null
    });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
    const { email, otp, newPassword } = req.body;
    await AuthService.resetPassword(email, otp, newPassword);

    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: "Password reset successfully",
        data: null
    });
});

const googleLogin = catchAsync(async (req: Request, res: Response) => {
    const redirectPath = req.query.redirect || "/";
    const encodedRedirectPath = encodeURIComponent(redirectPath as string);
    const callbackURL = `${config.better_auth_base_url}/api/v1/auth/google/success?redirect=${encodedRedirectPath}`;

    res.render("googleRedirect", {
        callbackURL: callbackURL,
        betterAuthUrl: config.better_auth_base_url,
    });
});

const googleLoginSuccess = catchAsync(async (req: Request, res: Response) => {
    const redirectPath = req.query.redirect as string || "/";
    const sessionToken = req.cookies["better-auth.session_token"];

    if (!sessionToken) {
        return res.redirect(`${config.client_url}/login?error=oauth_failed`);
    }

    const session = await auth.api.getSession({
        headers: {
            "Cookie": `better-auth.session_token=${sessionToken}`
        }
    });

    if (!session || !session.user) {
        return res.redirect(`${config.client_url}/login?error=no_session_found`);
    }

    const result = await AuthService.googleLoginSuccess(session);
    const { accessToken, refreshToken } = result;

    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);

    const isValidRedirectPath = redirectPath.startsWith("/") && !redirectPath.startsWith("//");
    const finalRedirectPath = isValidRedirectPath ? redirectPath : "/";

    res.redirect(`${config.client_url}${finalRedirectPath}`);
});

const handleOAuthError = catchAsync(async (req: Request, res: Response) => {
    const error = req.query.error as string || "oauth_failed";
    res.redirect(`${config.client_url}/login?error=${error}`);
});

export const AuthController = {
    registerUser,
    loginUser,
    logoutUser,
    getMe,
    getNewToken,
    changePassword,
    verifyEmail,
    forgetPassword,
    resetPassword,
    googleLogin,
    googleLoginSuccess,
    handleOAuthError,
};
