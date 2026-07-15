import { z } from "zod";

const createCommentValidationSchema = z.object({
  body: z.object({
    content: z.string().min(1, "Comment content cannot be empty").max(1000, "Comment cannot exceed 1000 characters"),
    postId: z.string().min(1, "Post ID is required"),
    parentId: z.string().optional(),
  })
});

export const CommentValidation = {
  createCommentValidationSchema,
};