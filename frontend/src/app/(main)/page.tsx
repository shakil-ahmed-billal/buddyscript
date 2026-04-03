import {
  FeedCreatePost,
  FeedLeftSidebar,
  FeedRightSidebar,
  FeedStories,
  PostCard,
} from "@/components/feed";
import { feedData } from "@/data/feedData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feed — Buddy Script",
  description: "Buddy Script Main Feed",
};

export default function FeedPage() {
  return (
    <div className="w-full max-w-[1300px] mx-auto h-full">
      <div className="flex flex-col lg:flex-row gap-5 justify-center items-start h-full">
        {/* ── Left Sidebar ── */}
        <div className="hidden lg:block w-full lg:w-[280px] xl:w-[320px] shrink-0 h-full overflow-y-auto scrollbar-hide">
          <div className="">
            <FeedLeftSidebar />
          </div>
        </div>

        {/* ── Main Feed (Middle) ── */}
        <div className="flex-1 w-full max-w-[680px] h-full overflow-y-auto scrollbar-hide">
           <div className="">
            <FeedStories />
            <FeedCreatePost />

            {/* Post Timeline */}
            <div className="space-y-[16px]">
              {feedData.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Sidebar ── */}
        <div className="hidden lg:block w-full lg:w-[280px] xl:w-[320px] shrink-0 h-full overflow-y-auto scrollbar-hide">
          <div className="">
            <FeedRightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
