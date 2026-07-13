import {
  FeedCreatePost,
  FeedLeftSidebar,
  FeedRightSidebar,
  FeedStories,
  FeedTimeline
} from "@/components/feed";
import { getUserInfo } from "@/services/auth.actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feed — Buddy Script",
  description: "Buddy Script Main Feed",
};

export default async function FeedPage() {
  const user = await getUserInfo();

  return (
    <div className="w-full max-w-[1440px] md:px-16 px-4 mx-auto h-full">
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
            <FeedCreatePost user={user} />

            {/* Post Timeline */}
            <FeedTimeline currentUser={user} />
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
