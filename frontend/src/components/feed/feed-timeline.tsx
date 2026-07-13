"use client";

import { useFeedPosts } from "@/hooks/useFeed";
import { PostCard } from "./feed-post-card";
import { PostSkeleton } from "./feed-skeleton";

export function FeedTimeline({ currentUser }: { currentUser?: any }) {
  const { data, isLoading, isError } = useFeedPosts();

  if (isLoading) {
    return (
      <div className="space-y-[16px]">
        {[...Array(3)].map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError || !data?.data) {
    return <div className="text-center text-bs-text py-10">Failed to load feed</div>;
  }

  const posts = data.data;

  return (
    <div className="space-y-[16px]">
      {posts.length === 0 && (
        <div className="text-center text-bs-text py-10">No posts. Be the first to post!</div>
      )}
      {posts.map((post: any) => (
        <PostCard key={post.id} post={post} currentUser={currentUser} />
      ))}
    </div>
  );
}
