import { prisma } from "../../lib/prisma.js";
import AppError from "../../errorHelpers/ApiError.js";
import httpStatus from "http-status";

const createPost = async (userId: string, payload: { content?: string; image?: string; visibility?: "PUBLIC" | "PRIVATE" }) => {
  const result = await prisma.post.create({
    data: {
      ...payload,
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

const getFeed = async (userId: string) => {
  // Get all PUBLIC posts from all users AND PRIVATE posts from the logged-in user
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { visibility: "PUBLIC" },
        { authorId: userId }
      ]
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      author: {
        select: { id: true, name: true, firstName: true, lastName: true, image: true }
      },
      likes: true,
      comments: {
        include: {
          author: { select: { id: true, name: true, firstName: true, lastName: true, image: true } },
          likes: true,
          replies: {
            include: {
              author: { select: { id: true, name: true, firstName: true, lastName: true, image: true } },
              likes: true
            }
          }
        },
        where: {
          parentId: null // Only fetch top-level comments initially
        },
        orderBy: { createdAt: "asc" }
      }
    }
  });
  return posts;
};

const toggleLikePost = async (userId: string, postId: string) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new AppError(httpStatus.NOT_FOUND, "Post not found");

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId,
        postId
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
        postId
      }
    });
    return { liked: true };
  }
};

export const PostService = {
  createPost,
  getFeed,
  toggleLikePost
};