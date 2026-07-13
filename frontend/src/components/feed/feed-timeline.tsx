"use client";

import { useFeedPosts } from "@/hooks/useFeed";
import { PostCard } from "./feed-post-card";
import { PostSkeleton } from "./feed-skeleton";

export function FeedTimeline({ currentUser }: { currentUser?: any }) {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useFeedPosts();

  if (isLoading) {
    return (
      <div className="space-y-[16px]">
        {[...Array(3)].map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError || !data?.pages) {
    return <div className="text-center text-bs-text py-10">Failed to load feed</div>;
  }

  const posts = data.pages.flatMap((page: any) => page?.data?.data || []);

  return (
    <div className="space-y-[16px]">
      {posts.length === 0 && (
        <div className="text-center text-bs-text py-10">No posts. Be the first to post!</div>
      )}
      {posts.map((post: any) => (
        <PostCard key={post.id} post={post} currentUser={currentUser} />
      ))}

      {hasNextPage && (
        <div className="pt-4 pb-10 flex justify-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-2 bg-bs-primary text-white rounded-full font-medium hover:bg-bs-primary/90 transition-colors disabled:opacity-70"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More Posts"}
          </button>
        </div>
      )}
    </div>
  );
}
