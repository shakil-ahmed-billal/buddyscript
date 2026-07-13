import { z } from "zod";

const createCommentValidationSchema = z.object({
  content: z.string().min(1, "Comment content cannot be empty"),
  postId: z.string().min(1, "Post ID is required"),
  parentId: z.string().optional(),
});

export const CommentValidation = {
  createCommentValidationSchema,
};