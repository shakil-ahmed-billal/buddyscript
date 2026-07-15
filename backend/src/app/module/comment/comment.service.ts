import { prisma } from "../../lib/prisma.js";
import AppError from "../../errorHelpers/ApiError.js";
import httpStatus from "http-status";

const createComment = async (userId: string, payload: { content: string; postId: string; parentId?: string }) => {
  const result = await prisma.comment.create({
    data: {
      content: payload.content,
      postId: payload.postId,
      parentId: payload.parentId,
      authorId: userId,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          firstName: true,
          lastName: true,
          image: true,
        }
      }
    }
  });
  return result;
};

const toggleLikeComment = async (userId: string, commentId: string) => {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) throw new AppError(httpStatus.NOT_FOUND, "Comment not found");

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_commentId: {
        userId,
        commentId,
      }
    }
  });

  if (existingLike) {
    await prisma.like.delete({ where: { id: existingLike.id } });
    return { liked: false };
  } else {
    await prisma.like.create({
      data: {
        userId,
        commentId
      }
    });
    return { liked: true };
  }
};

const deleteComment = async (userId: string, commentId: string) => {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) throw new AppError(httpStatus.NOT_FOUND, "Comment not found");

  if (comment.authorId !== userId) {
    throw new AppError(httpStatus.FORBIDDEN, "You can only delete your own comments");
  }

  await prisma.comment.delete({ where: { id: commentId } });
  return { id: commentId };
};

export const CommentService = {
  createComment,
  toggleLikeComment,
  deleteComment,
};