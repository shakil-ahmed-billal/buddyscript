"use client";

import { useState } from "react";
import { useCreatePost } from "@/hooks/useFeed";
import { UserProfileImage } from "@/components/ui/user-profile-image";
import { BsIcon } from "@/components/ui/bs-icons";

// ─── Action Buttons Data ──────────────────────────────────────────────────
const actions = [
  {
    label: "Photo",
    iconName: "photo-fill" as const,
  },
  {
    label: "Video",
    iconName: "video-fill" as const,
  },
  {
    label: "Event",
    iconName: "event-fill" as const,
  },
  {
    label: "Article",
    iconName: "article-fill" as const,
  },
];

// ─── Create Post Component ────────────────────────────────────────────────
export function FeedCreatePost({ user }: { user?: any }) {
  const [text, setText] = useState("");
  const { mutate: createPostMutate, isPending } = useCreatePost();

  const handleCreatePost = () => {
    if (!text.trim()) return;
    createPostMutate({ content: text }, {
      onSuccess: () => {
        setText("");
      }
    });
  };

  return (
    <div className="bg-white dark:bg-bs-dark1 rounded-[6px] mb-[24px] border border-bs-bg dark:border-bs-dark2">
      <div className="p-[24px]">
        {/* Textarea Area */}
        <div className="flex items-start">
          <div className="mr-[12px]">
            <UserProfileImage src={user?.image} name={user?.name || `${user?.firstName || ""} ${user?.lastName || ""}`.trim()} size={43} />
          </div>
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write something..."
              rows={2}
              className="w-full resize-none bg-transparent text-[14px] text-bs-dark dark:text-bs-text font-[Poppins] border-none placeholder-[#666] focus:outline-none focus:ring-0 pt-[12px] pb-[12px] min-h-[44px]"
            />
          </div>
        </div>
      </div>

      <hr className="border-t border-bs-bg dark:border-bs-dark2 mx-[24px]" />

      {/* Bottom Bar */}
      <div className="px-[24px] py-[16px] flex flex-wrap items-center justify-between gap-y-4">
        {/* Action Buttons */}
        <div className="flex items-center gap-[24px]">
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              className="flex items-center gap-[10px] text-[#767676] dark:text-bs-muted text-[14px] font-medium font-[Poppins] hover:text-bs-primary transition-all group"
            >
              <BsIcon name={action.iconName} size={20} className="text-[#888]" />
              <span className="hidden sm:inline">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Post Button */}
        <button
          type="button"
          onClick={handleCreatePost}
          disabled={isPending || !text.trim()}
          className="flex items-center gap-[6px] bg-bs-primary hover:bg-[#1580E0] disabled:opacity-50 text-white font-medium text-[14px] font-[Poppins] px-[24px] py-[10px] rounded-[6px] transition-all"
        >
          {isPending ? (
            <span className="pb-px">Posting...</span>
          ) : (
            <>
              <BsIcon name="send-fill" size={14} className="text-white" active />
              <span className="pb-px">Post</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}