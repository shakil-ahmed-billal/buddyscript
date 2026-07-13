import { z } from "zod";

const createPostValidationSchema = z.object({
  content: z.string().optional(),
  image: z.string().url().optional(),
  visibility: z.enum(["PUBLIC", "PRIVATE"]).optional(),
}).refine(data => data.content || data.image, {
  message: "Either content or image must be provided",
});

export const PostValidation = {
  createPostValidationSchema,
};