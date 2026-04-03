"use client";

import { useState } from "react";
import Link from "next/link";
import { useTogglePostLike, useCreateComment } from "@/hooks/useFeed";
import type { Post } from "@/data/mock-data";
import { BsIcon } from "@/components/ui/bs-icons";
import { BsButton, BsInput } from "@/components/ui/bs-shared";
import { UserProfileImage } from "@/components/ui/user-profile-image";

// ─── Post Dropdown Menu ───────────────────────────────────────────────────
const dropdownItems = [
  { label: "Save Post", icon: "save" },
  { label: "Turn On Notification", icon: "bell" },
  { label: "Hide", icon: "close" },
  { label: "Edit Post", icon: "settings" },
  { label: "Delete Post", icon: "logout" },
];

// ─── Reaction Buttons ─────────────────────────────────────────────────────
const reactions = [
  { label: "Haha", icon: "haha", active: true },
  { label: "Comment", icon: "chat" },
  { label: "Share", icon: "share" },
];

// ─── Single Post Card ─────────────────────────────────────────────────────
export function PostCard({ post, currentUser }: { post: any; currentUser?: any }) {
  const [dropOpen, setDropOpen] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [allCommentsVisible, setAllCommentsVisible] = useState(false);
  const { mutate: toggleLike } = useTogglePostLike();
  const { mutate: createCommentMutate, isPending: isCommenting } = useCreateComment();

  const handleLike = () => {
    toggleLike(post.id);
  };

  const handleCommentSubmit = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e && e.key !== "Enter") return;
    if (!commentText.trim()) return;

    createCommentMutate({ postId: post.id, content: commentText }, {
      onSuccess: () => {
        setCommentText("");
      }
    });
  };

  // Safe checks for the author object from backend
  const authorName = post.author?.name || `${post.author?.firstName || ""} ${post.author?.lastName || ""}`.trim() || "Unknown";
  const isPostLikedByMe = post.likes && post.likes.length > 0;

  return (
    <div className="bg-white dark:bg-bs-dark1 rounded-[6px] mb-[24px] border border-bs-bg dark:border-bs-dark2 transition-colors overflow-hidden">
      {/* ── Post Header ── */}
      <div className="flex items-center justify-between px-[24px] pt-[24px] pb-[16px]">
        <div className="flex items-center gap-[12px]">
          <UserProfileImage src={post.author?.image} name={authorName} size={42} />
          <div>
            <h4 className="text-[15px] font-medium text-bs-dark dark:text-bs-text font-[Poppins] hover:text-bs-primary cursor-pointer transition-colors leading-[20px]">{authorName}</h4>
            <div className="flex items-center gap-1">
              <p className="text-[12px] text-bs-muted font-[Poppins] leading-normal">{new Date(post.createdAt || Date.now()).toLocaleDateString()}</p>
              <span className="w-1.5 h-1.5 rounded-full bg-bs-bg dark:bg-bs-dark2 mx-[4px]"></span>
              <button className="text-bs-muted hover:text-bs-primary transition-colors flex items-center justify-center">
                <BsIcon name={(post.visibility === "PRIVATE" ? "lock" : "explore") as any} size={10} />
              </button>
            </div>
          </div>
        </div>

        {/* 3-dot Menu */}
        <div className="relative">
          <button
            onClick={() => setDropOpen((v) => !v)}
            className="w-[24px] h-[24px] flex items-center justify-center text-bs-muted hover:text-bs-primary transition-colors"
          >
            <BsIcon name="more-vertical" size={17} />
          </button>

          {dropOpen && (
            <div className="absolute right-0 top-[30px] w-[210px] bg-white dark:bg-bs-dark1 rounded-[6px] shadow-[7px_20px_60px_rgba(108,126,147,0.15)] border border-bs-bg dark:border-bs-dark2 z-30 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
              {dropdownItems.map((item) => (
                <a
                  key={item.label}
                  href="#0"
                  className="flex items-center gap-[12px] px-[20px] py-[10px] text-[14px] text-bs-muted hover:bg-bs-bg dark:hover:bg-bs-dark2 hover:text-bs-primary font-[Poppins] transition-all"
                  onClick={() => setDropOpen(false)}
                >
                  <BsIcon name={item.icon as any} size={16} />
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Post Content ── */}
      <div className="px-[24px] pb-[16px]">
        {post.content && <p className="text-[14px] text-bs-dark dark:text-bs-text font-[Poppins] leading-[26px] mb-[16px] whitespace-pre-wrap">{post.content}</p>}
      </div>

      {/* ── Post Image ── */}
      {post.image && (
        <div className="w-full">
          <img src={post.image} alt="post image" className="w-full h-auto object-cover px-[24px] max-h-[500px]" onError={(e) => { (e.target as HTMLImageElement).src = '/assets/images/placeholder.png' }} />
        </div>
      )}

      {/* ── Reaction Summary ── */}
      <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-bs-bg dark:border-bs-dark2">
        <div className="flex items-center gap-[8px]">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <img key={i} src={`/assets/images/react_img${i}.png`} alt="" className="w-[20px] h-[20px] rounded-full border border-white dark:border-bs-dark1 object-cover" />
            ))}
          </div>
          <span className="text-[13px] text-bs-muted font-[Poppins] font-medium">{post.likes?.length || 0}</span>
        </div>
        <div className="flex items-center gap-[16px]">
          <button
            onClick={() => setShowComment((v) => !v)}
            className="text-[13px] text-bs-muted font-[Poppins] hover:text-bs-primary transition-colors"
          >
            <span className="font-semibold text-bs-dark dark:text-bs-text">{post.comments?.length || 0}</span> Comments
          </button>
          <span className="text-[13px] text-bs-muted font-[Poppins]">
            <span className="font-semibold text-bs-dark dark:text-bs-text">0</span> Share
          </span>
        </div>
      </div>

      {/* ── Reaction Buttons ── */}
      <div className="flex items-center justify-between px-[16px] py-[8px] border-b border-bs-bg dark:border-bs-dark2">
        {reactions.map((r, i) => {
           let active = false;
           if (r.label === "Haha") active = isPostLikedByMe;
           
           return (
            <button
              key={i}
              onClick={() => {
                if (r.label === "Comment") setShowComment((v) => !v);
                if (r.label === "Haha") handleLike();
              }}
              className={`flex items-center gap-[8px] px-[20px] py-[10px] rounded-[6px] text-[15px] font-[Poppins] transition-all hover:bg-bs-bg dark:hover:bg-bs-dark2 ${
                active ? "text-bs-primary" : "text-bs-muted"
              } flex-1 justify-center group`}
            >
              <BsIcon name={r.icon as any} size={20} active={active} className="group-hover:text-bs-primary transition-colors" />
              <span className="hidden sm:inline font-medium">{r.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Comment Box ── */}
      {showComment && (
        <div className="px-[24px] pt-[24px] pb-[24px] animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Write a comment */}
          <div className="flex gap-[12px] items-center mb-[24px]">
            <UserProfileImage src={currentUser?.image} name={currentUser?.name || `${currentUser?.firstName || ""} ${currentUser?.lastName || ""}`.trim()} size={36} />
            <div className="flex-1 relative">
              <BsInput
                type="text"
                value={commentText}
                onKeyDown={handleCommentSubmit}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment and press Enter..."
                className="pr-[80px]"
                disabled={isCommenting}
              />
              <div className="absolute right-[8px] top-1/2 -translate-y-1/2 flex items-center gap-[2px]">
                <button className="w-[28px] h-[28px] flex items-center justify-center text-bs-muted hover:text-bs-primary hover:bg-bs-bg dark:hover:bg-bs-dark2 rounded-full transition-all">
                  <BsIcon name="explore" size={16} />
                </button>
                <button className="w-[28px] h-[28px] flex items-center justify-center text-bs-muted hover:text-bs-primary hover:bg-bs-bg dark:hover:bg-bs-dark2 rounded-full transition-all">
                  <BsIcon name="photo-fill" size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-[16px]">
            {/* View previous comments toggle */}
            {!allCommentsVisible && post.comments && post.comments.length > 1 && (
              <button
                onClick={() => setAllCommentsVisible(true)}
                className="text-[13px] font-medium text-bs-muted hover:text-bs-primary transition-colors mb-[16px] block font-[Poppins]"
              >
                View {post.comments.length - 1} previous comments
              </button>
            )}

            {(post.comments && (allCommentsVisible ? post.comments : post.comments.slice(-1))).map((comment: any) => {
              const commentAuthorName = comment.author?.name || `${comment.author?.firstName || ""} ${comment.author?.lastName || ""}`.trim() || "Unknown";
              const commentAuthorImg = comment.author?.image || "/assets/images/user.png";

              return (
              <div key={comment.id} className="flex gap-[12px] items-start group">
                <UserProfileImage src={comment.author?.image} name={commentAuthorName} size={36} />
                <div className="flex-1 min-w-0">
                  <div className="bs-comment-bubble p-[12px_16px]">
                    <Link href="/profile" className="text-[14px] font-semibold text-bs-dark dark:text-bs-text font-[Poppins] hover:text-bs-primary transition-colors inline-block mb-[2px]">
                      {commentAuthorName}
                    </Link>
                    <p className="text-[13px] text-bs-muted dark:text-bs-muted font-[Poppins] leading-[20px]">
                      {comment.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-[14px] mt-[6px] pl-[4px]">
                    <button className="text-[11px] text-bs-muted font-semibold font-[Poppins] hover:text-bs-primary transition-all">Like ({comment.likes?.length || 0})</button>
                    <button className="text-[11px] text-bs-muted font-semibold font-[Poppins] hover:text-bs-primary transition-all">Reply</button>
                    <span className="text-[11px] text-bs-muted font-normal font-[Poppins] opacity-60">• {new Date(comment.createdAt || Date.now()).toLocaleDateString()}</span>
                  </div>

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-[12px] space-y-[12px] border-l-2 border-bs-bg dark:border-bs-dark2 pl-[16px]">
                      {comment.replies.map((reply: any) => {
                          const replyAuthorName = reply.author?.name || `${reply.author?.firstName || ""} ${reply.author?.lastName || ""}`.trim() || "Unknown";
                          const replyAuthorImg = reply.author?.image || "/assets/images/user.png";
                          return (
                         <div key={reply.id} className="flex gap-[10px] items-start">
                           <UserProfileImage src={reply.author?.image} name={replyAuthorName} size={28} />
                           <div className="flex-1 min-w-0">
                              <div className="bs-comment-bubble p-[10px_14px]">
                                <Link href="/profile" className="text-[13px] font-semibold text-bs-dark dark:text-bs-text font-[Poppins] hover:text-bs-primary transition-colors inline-block mb-px">
                                  {replyAuthorName}
                                </Link>
                                <p className="text-[13px] text-bs-muted dark:text-bs-muted font-[Poppins] leading-[18px]">
                                  {reply.content}
                                </p>
                              </div>
                              <div className="flex items-center gap-[12px] mt-[4px] pl-[4px]">
                                <button className="text-[10px] text-bs-muted font-bold font-[Poppins] hover:text-bs-primary transition-all">Like</button>
                                <button className="text-[10px] text-bs-muted font-bold font-[Poppins] hover:text-bs-primary transition-all">Reply</button>
                                <span className="text-[10px] text-bs-muted font-normal font-[Poppins] opacity-60">• {new Date(reply.createdAt || Date.now()).toLocaleDateString()}</span>
                              </div>
                           </div>
                         </div>
                      )})}
                    </div>
                  )}
                </div>
              </div>
            )})}
          </div>
        </div>
      )}
    </div>
  );
}
