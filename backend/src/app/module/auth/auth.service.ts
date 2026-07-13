import status from "http-status";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/ApiError.js";
import { auth } from "../../lib/auth.js";
import { prisma } from "../../lib/prisma.js";
import { tokenUtils } from "../../utils/token.js";
import { jwtUtils } from "../../utils/jwt.js";
import config from "../../config/index.js";
import { IChangePasswordPayload, ILoginUserPayload, IRegisterUserPayload } from "./auth.interface.js";

const registerUser = async (payload: IRegisterUserPayload) => {
    const { firstName, lastName, email, password } = payload;
    const name = `${firstName} ${lastName}`;

    const data = await auth.api.signUpEmail({
        body: { name, firstName, lastName, email, password: password || "" }
    });

    if (!data.user) {
        throw new AppError(status.BAD_REQUEST, "Failed to register user");
    }

    const accessToken = tokenUtils.getAccessToken({
        userId: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        emailVerified: data.user.emailVerified,
    });

    const refreshToken = tokenUtils.getRefreshToken({
        userId: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        emailVerified: data.user.emailVerified,
    });

    return { ...data, accessToken, refreshToken, sessionToken: data.token };
}

const loginUser = async (payload: ILoginUserPayload) => {
    const { email, password } = payload;

    const data = await auth.api.signInEmail({
        body: { email, password: password || "" }
    });

    if (!data.user) {
        throw new AppError(status.UNAUTHORIZED, "Invalid credentials");
    }

    const accessToken = tokenUtils.getAccessToken({
        userId: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        emailVerified: data.user.emailVerified,
    });

    const refreshToken = tokenUtils.getRefreshToken({
        userId: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        emailVerified: data.user.emailVerified,
    });

    return { ...data, accessToken, refreshToken, sessionToken: data.token };
}

const getMe = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new AppError(status.NOT_FOUND, "User not found");
    }

    return user;
}

const getNewToken = async (refreshToken: string, sessionToken: string) => {
    const isSessionTokenExists = await prisma.session.findUnique({
        where: { token: sessionToken },
        include: { user: true }
    });

    if (!isSessionTokenExists) {
        throw new AppError(status.UNAUTHORIZED, "Invalid session token");
    }

    const verifiedRefreshToken = jwtUtils.verifyToken(refreshToken, config.jwt_secret as string);
    if (!verifiedRefreshToken.success) {
        throw new AppError(status.UNAUTHORIZED, "Invalid refresh token");
    }

    const data = verifiedRefreshToken.data as JwtPayload;

    const newAccessToken = tokenUtils.getAccessToken({
        userId: data.userId,
        role: data.role,
        name: data.name,
        email: data.email,
        emailVerified: data.emailVerified,
    });

    const newRefreshToken = tokenUtils.getRefreshToken({
        userId: data.userId,
        role: data.role,
        name: data.name,
        email: data.email,
        emailVerified: data.emailVerified,
    });

    const updatedSession = await prisma.session.update({
        where: { token: sessionToken },
        data: {
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // extends session
            updatedAt: new Date(),
        }
    });

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        sessionToken: updatedSession.token,
    }
}

const changePassword = async (payload: IChangePasswordPayload, sessionToken: string) => {
    const session = await auth.api.getSession({
        headers: new Headers({
            Authorization: `Bearer ${sessionToken}`
        })
    });

    if (!session) {
        throw new AppError(status.UNAUTHORIZED, "Invalid session token");
    }

    const result = await auth.api.changePassword({
        body: {
            currentPassword: payload.currentPassword,
            newPassword: payload.newPassword,
            revokeOtherSessions: true,
        },
        headers: new Headers({
            Authorization: `Bearer ${sessionToken}`
        })
    });

    const accessToken = tokenUtils.getAccessToken({
        userId: session.user.id,
        role: session.user.role,
        name: session.user.name,
        email: session.user.email,
        emailVerified: session.user.emailVerified,
    });

    const refreshToken = tokenUtils.getRefreshToken({
        userId: session.user.id,
        role: session.user.role,
        name: session.user.name,
        email: session.user.email,
        emailVerified: session.user.emailVerified,
    });

    return {
        ...result,
        accessToken,
        refreshToken,
        sessionToken: (result as any)?.session?.token || sessionToken,
    }
}

const logoutUser = async (sessionToken: string) => {
    const result = await auth.api.signOut({
        headers: new Headers({ Authorization: `Bearer ${sessionToken}` })
    });
    return result;
}

const verifyEmail = async (email: string, otp: string) => {
    const result = await auth.api.verifyEmailOTP({
        body: {
            email,
            otp,
        }
    });

    if (result.status && !result.user.emailVerified) {
        await prisma.user.update({
            where: { email },
            data: { emailVerified: true }
        });
    }
    return result;
}

const forgetPassword = async (email: string) => {
    const isUserExist = await prisma.user.findUnique({
        where: { email }
    });

    if (!isUserExist) {
        throw new AppError(status.NOT_FOUND, "User not found");
    }

    await auth.api.requestPasswordResetEmailOTP({
        body: { email }
    });
}

const resetPassword = async (email: string, otp: string, newPassword: string) => {
    const isUserExist = await prisma.user.findUnique({
        where: { email }
    });

    if (!isUserExist) {
        throw new AppError(status.NOT_FOUND, "User not found");
    }

    await auth.api.resetPasswordEmailOTP({
        body: {
            email,
            otp,
            password: newPassword,
        }
    });

    // Revoke all sessions after password reset
    await prisma.session.deleteMany({
        where: { userId: isUserExist.id }
    });
}

const googleLoginSuccess = async (session: any) => {
    const accessToken = tokenUtils.getAccessToken({
        userId: session.user.id,
        role: session.user.role,
        name: session.user.name,
        email: session.user.email,
        emailVerified: session.user.emailVerified,
    });

    const refreshToken = tokenUtils.getRefreshToken({
        userId: session.user.id,
        role: session.user.role,
        name: session.user.name,
        email: session.user.email,
        emailVerified: session.user.emailVerified,
    });

    return {
        accessToken,
        refreshToken,
    }
}

export const AuthService = {
    registerUser,
    loginUser,
    getMe,
    getNewToken,
    changePassword,
    logoutUser,
    verifyEmail,
    forgetPassword,
    resetPassword,
    googleLoginSuccess,
};
