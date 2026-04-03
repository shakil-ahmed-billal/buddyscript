import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthService } from "./auth.service.js";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { tokenUtils } from "../../utils/token.js";
import config from "../../config/index.js";

const registerUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.registerUser(req.body);
    const { accessToken, refreshToken, token, ...rest } = result as Record<string, any>;

    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    tokenUtils.setBetterAuthSessionCookie(res, token as string);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User registered successfully",
        data: { token, accessToken, refreshToken, ...rest }
    });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.loginUser(req.body);
    const { accessToken, refreshToken, token, ...rest } = result as Record<string, any>;

    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    tokenUtils.setBetterAuthSessionCookie(res, token as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        data: { token, accessToken, refreshToken, ...rest }
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

    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);
    res.clearCookie('better-auth.session_token', cookieOptions);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged out successfully",
        data: null
    });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User session retrieved successfully",
        data: { user }
    });
});

export const AuthController = { registerUser, loginUser, logoutUser, getMe };
