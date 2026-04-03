import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { PostService } from "./post.service.js";
import { deleteFileFromCloudinary } from "../../config/cloudinary.config.js";

const createPost = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const file = (req as any).file;
    
    // Multer-Cloudinary sets the path attribute
    const postData = {
        ...req.body,
        image: file ? file.path : req.body.image,
    };

    try {
        const result = await PostService.createPost(user.id, postData);

        sendResponse(res, {
            httpStatusCode: httpStatus.CREATED,
            success: true,
            message: "Post created successfully",
            data: result
        });
    } catch (error) {
        // If image was uploaded but DB creation failed, delete the image from Cloudinary
        if (file && file.path) {
            try {
                await deleteFileFromCloudinary(file.path);
            } catch (cleanupError) {
                console.error("Cloudinary rollback failed:", cleanupError);
            }
        }
        throw error; // Re-throw for global error handler
    }
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

const deletePost = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const id = req.params.id as string;
    const result = await PostService.deletePost(user.id, id);

    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: "Post deleted successfully",
        data: result
    });
});

export const PostController = {
    createPost,
    getFeed,
    toggleLikePost,
    deletePost
};
