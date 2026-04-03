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

// Delete a Post
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postId: string) => {
      const response: any = await httpClient.delete(`/api/v1/posts/${postId}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
    },
  });
};

// Toggle Like on a Post
export const useTogglePostLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postId: string) => {
      const response: any = await httpClient.post(`/api/v1/posts/${postId}/like`);
      return response;
    },
    onSuccess: () => {
      // Invalidate the post feed to update like counts ideally we should do optimistic updates
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
    },
  });
};

// Create a Comment/Reply
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

// Toggle Like on a Comment
export const useToggleCommentLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (commentId: string) => {
      const response: any = await httpClient.post(`/api/v1/comments/${commentId}/like`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
    },
  });
};
