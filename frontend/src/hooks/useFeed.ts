import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/lib/axios/httpClient";

// Fetch the Feed (All Posts)
export const useFeedPosts = () => {
  return useQuery({
    queryKey: ["feedPosts"],
    queryFn: async () => {
      const response: any = await httpClient.get("/api/v1/posts");
      return response; // Return the whole body { success, message, data: [...] }
    },
  });
};

// Create a new Post
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: FormData) => {
      const response: any = await httpClient.post("/api/v1/posts", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
    },
  });
};

// Delete a Post (Optimistic)
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postId: string) => {
      const response: any = await httpClient.delete(`/api/v1/posts/${postId}`);
      return response;
    },
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["feedPosts"] });
      const previousPosts = queryClient.getQueryData(["feedPosts"]);
      queryClient.setQueryData(["feedPosts"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: (old.data || []).filter((post: any) => post.id !== postId),
        };
      });
      return { previousPosts };
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(["feedPosts"], context?.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
    },
  });
};

// Toggle Like on a Post (Optimistic)
export const useTogglePostLike = () => {
  const queryClient = useQueryClient();
  // We need to know who is the current user to update the likes array optimistically
  // For now we'll just invalidate OR try a generic optimistic update if we can identify the user
  return useMutation({
    mutationFn: async (postId: string) => {
      const response: any = await httpClient.post(`/api/v1/posts/${postId}/like`);
      return response;
    },
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["feedPosts"] });
      const previousPosts = queryClient.getQueryData(["feedPosts"]);

      queryClient.setQueryData(["feedPosts"], (old: any) => {
        if (!old || !old.data) return old;
        return {
          ...old,
          data: old.data.map((post: any) => {
            if (post.id === postId) {
              const isLiked = post.likes?.some((l: any) => l.isOptimisticMe); // Hypothetical flag
              // Since we don't have the user ID easily here without a hook, we'll just toggle the count
              // and a temporary UI state if possible. 
              // Better: just invalidate for now or pass userId to the hook
              return {
                ...post,
                _isOptimisticLiked: !post._isOptimisticLiked,
                likesCount: (post.likesCount || 0) + (post._isOptimisticLiked ? -1 : 1),
              };
            }
            return post;
          }),
        };
      });

      return { previousPosts };
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(["feedPosts"], context?.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
    },
  });
};

// Create a Comment (Optimistic-ish)
export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { content: string; postId: string; parentId?: string }) => {
      const response: any = await httpClient.post("/api/v1/comments", payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
    },
  });
};

// Toggle Like on a Comment (Optimistic)
export const useToggleCommentLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (commentId: string) => {
      const response: any = await httpClient.post(`/api/v1/comments/${commentId}/like`);
      return response;
    },
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey: ["feedPosts"] });
      const previousPosts = queryClient.getQueryData(["feedPosts"]);

      queryClient.setQueryData(["feedPosts"], (old: any) => {
        if (!old || !old.data) return old;
        return {
          ...old,
          data: old.data.map((post: any) => ({
            ...post,
            comments: (post.comments || []).map((comment: any) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  _isOptimisticLiked: !comment._isOptimisticLiked,
                  likesCount: (comment.likesCount || 0) + (comment._isOptimisticLiked ? -1 : 1),
                };
              }
              // Check replies too
              const updatedReplies = (comment.replies || []).map((reply: any) => {
                if (reply.id === commentId) {
                  return {
                    ...reply,
                    _isOptimisticLiked: !reply._isOptimisticLiked,
                    likesCount: (reply.likesCount || 0) + (reply._isOptimisticLiked ? -1 : 1),
                  };
                }
                return reply;
              });
              return { ...comment, replies: updatedReplies };
            }),
          })),
        };
      });

      return { previousPosts };
    },
    onError: (err, commentId, context) => {
      queryClient.setQueryData(["feedPosts"], context?.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
    },
  });
};
