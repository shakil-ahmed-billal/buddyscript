import { Router } from "express";
import { PostController } from "./post.controller.js";
import validateRequest from "../../middleware/validateRequest.js";
import { PostValidation } from "./post.validation.js";
import { multerUpload } from "../../config/multer.config.js";
import authMiddleware from "../../middleware/auth.js";

const router = Router();

router.use(authMiddleware());

router.post(
  "/",
  multerUpload.single('image'),
  validateRequest(PostValidation.createPostValidationSchema),
  PostController.createPost
);

router.get(
  "/",
  PostController.getFeed
);

router.post(
  "/:id/like",
  PostController.toggleLikePost
);

export const PostRoutes = router;
