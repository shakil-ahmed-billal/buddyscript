import { z } from "zod";

const createPostValidationSchema = z.object({
  body: z.object({
    content: z.string().optional(),
    visibility: z.enum(["PUBLIC", "PRIVATE"]).optional(),
  }).optional(),
  file: z.any().optional(),
}).refine(data => (data.body && data.body.content) || data.file, {
  message: "Either content or image must be provided",
});

export const PostValidation = {
  createPostValidationSchema,
};