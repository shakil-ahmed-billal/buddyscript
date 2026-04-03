import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { PostService } from "./post.service.js";

const createPost = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const file = (req as any).file;
    
    // Multer-Cloudinary sets the path attribute
    const postData = {
        ...req.body,
        image: file ? file.path : req.body.image,
    };

    const result = await PostService.createPost(user.id, postData);

    sendResponse(res, {
        httpStatusCode: httpStatus.CREATED,
        success: true,
        message: "Post created successfully",
        data: result
    });
});

const getFeed = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await PostService.getFeed(user.id);

    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: "Feed retrieved successfully",
        data: result
    });
});

const toggleLikePost = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const id = req.params.id as string;
    const result = await PostService.toggleLikePost(user.id, id);

    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: result.liked ? "Post liked" : "Post unliked",
        data: result
    });
});

export const PostController = {
    createPost,
    getFeed,
    toggleLikePost
};
