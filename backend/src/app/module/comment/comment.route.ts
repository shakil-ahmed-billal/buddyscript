import { Router } from "express";
import { CommentController } from "./comment.controller.js";
import validateRequest from "../../middleware/validateRequest.js";
import { CommentValidation } from "./comment.validation.js";
import authMiddleware from "../../middleware/auth.js";

const router = Router();

router.use(authMiddleware());

router.post(
  "/",
  validateRequest(CommentValidation.createCommentValidationSchema),
  CommentController.createComment
);

router.post(
  "/:id/like",
  CommentController.toggleLikeComment
);

router.delete(
  "/:id",
  CommentController.deleteComment
);

export const CommentRoutes = router;
