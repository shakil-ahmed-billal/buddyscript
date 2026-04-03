import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { CommentService } from "./comment.service.js";

const createComment = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await CommentService.createComment(user.id, req.body);

    sendResponse(res, {
        httpStatusCode: httpStatus.CREATED,
        success: true,
        message: req.body.parentId ? "Reply created successfully" : "Comment created successfully",
        data: result
    });
});

const toggleLikeComment = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const id = req.params.id as string;
    const result = await CommentService.toggleLikeComment(user.id, id);

    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: result.liked ? "Comment liked" : "Comment unliked",
        data: result
    });
});

export const CommentController = {
    createComment,
    toggleLikeComment
};
