import { prisma } from "../../lib/prisma.js";
import AppError from "../../errorHelpers/ApiError.js";
import httpStatus from "http-status";
import { deleteFileFromCloudinary } from "../../config/cloudinary.config.js";
import { getCache, setCache, delCacheByPrefix } from "../../utils/cache.utils.js";

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

  // Invalidate feed cache
  await delCacheByPrefix("feed:");
  return result;
};

const getFeed = async (userId: string) => {
  const cacheKey = `feed:${userId}`;
  const cachedFeed = await getCache<any[]>(cacheKey);
  if (cachedFeed) {
    console.log(`✅ [Redis] Cache hit for ${cacheKey}`);
    return cachedFeed;
  }

  console.log(`❌ [Redis] Cache miss for ${cacheKey}. Fetching from DB...`);
  
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
      likes: {
        include: {
          user: {
            select: { id: true, name: true, firstName: true, lastName: true, image: true }
          }
        }
      },
      comments: {
        include: {
          author: { select: { id: true, name: true, firstName: true, lastName: true, image: true } },
          likes: {
            include: {
              user: {
                select: { id: true, name: true, firstName: true, lastName: true, image: true }
              }
            }
          },
          replies: {
            include: {
              author: { select: { id: true, name: true, firstName: true, lastName: true, image: true } },
              likes: {
                include: {
                  user: {
                    select: { id: true, name: true, firstName: true, lastName: true, image: true }
                  }
                }
              }
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

  // Cache only if there are posts (avoid caching empty results for short bit)
  if (posts.length > 0) {
    await setCache(cacheKey, posts, 300); // 5 minutes TTL
  }
  
  return posts;
};

const deletePost = async (userId: string, postId: string) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  
  if (post.authorId !== userId) {
    throw new AppError(httpStatus.FORBIDDEN, "You can only delete your own posts");
  }

  // Delete image from Cloudinary if it exists
  if (post.image) {
    try {
      await deleteFileFromCloudinary(post.image);
    } catch (error) {
      console.error("Cloudinary deletion failed, proceeding with DB deletion:", error);
    }
  }

  await prisma.post.delete({ where: { id: postId } });
  
  // Invalidate feed cache
  await delCacheByPrefix("feed:");
  return { id: postId };
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
    await delCacheByPrefix("feed:");
    return { liked: false };
  } else {
    await prisma.like.create({
      data: {
        userId,
        postId
      }
    });
    await delCacheByPrefix("feed:");
    return { liked: true };
  }
};

export const PostService = {
  createPost,
  getFeed,
  toggleLikePost,
  deletePost
};