import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { prisma } from "../../lib/prisma.js";

const getSuggestedPeople = catchAsync(async (req: Request, res: Response) => {
    const { type } = req.query;
    
    const where: any = {};
    if (type === "YOU_MIGHT_LIKE") {
        where.isYouMightLike = true;
    } else {
        where.isSuggested = true;
    }

    const result = await prisma.user.findMany({
        where,
        select: {
            id: true,
            name: true,
            firstName: true,
            lastName: true,
            image: true,
            position: true,
            role: true
        },
        take: 10
    });

    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: "Suggested people retrieved successfully",
        data: result
    });
});

export const UserController = {
    getSuggestedPeople
};
