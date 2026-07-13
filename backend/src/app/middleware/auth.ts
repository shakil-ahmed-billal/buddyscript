import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import AppError from "../errorHelpers/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import { prisma } from "../lib/prisma.js";
import config from "../config/index.js";
import { jwtUtils } from "../utils/jwt.js";
import { CookieUtils } from "../utils/cookie.js";

const authMiddleware = (...authRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // 1. Session Token Verification (Direct DB check like Structure)
    const sessionToken = CookieUtils.getCookie(req, "better-auth.session_token") || 
                         req.headers.authorization?.split(" ")?.[1];

    if (!sessionToken) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access! No session token provided.");
    }

    const sessionExists = await prisma.session.findFirst({
        where: {
            token: sessionToken,
            expiresAt: {
                gt: new Date(),
            }
        },
        include: {
            user: true,
        }
    });

    if (!sessionExists || !sessionExists.user) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access! Invalid or expired session.");
    }

    const user = sessionExists.user;

    // 2. User status checks (Pattern from Structure)
    if ((user as any).status === "BLOCKED" || (user as any).status === "DELETED") {
        throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access! User is not active.");
    }

    // 3. Access Token Verification (Pattern from Structure)
    let accessToken = CookieUtils.getCookie(req, 'accessToken');
    
    // Fallback: If not in cookies, check if it was provided in headers (e.g. from server actions)
    if (!accessToken && req.headers['x-access-token']) {
        accessToken = req.headers['x-access-token'] as string;
    }

    if (!accessToken) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access! No access token provided.');
    }

    const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_secret as string);
    if (!verifiedToken.success) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access! Invalid access token.');
    }

    // 4. Role-based access control
    if (authRoles.length > 0 && !authRoles.includes(user.role)) {
        throw new AppError(httpStatus.FORBIDDEN, "Forbidden access! You do not have permission.");
    }

    // 5. Attach standardized user info to request (Pattern from Structure)
    (req as any).user = {
        id: user.id,
        userId: user.id,
        role: user.role,
        email: user.email,
        name: user.name,
        image: user.image
    };
    (req as any).session = sessionExists;

    next();
  });
};

export default authMiddleware;