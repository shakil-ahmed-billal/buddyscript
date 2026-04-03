"use client";

import { useState } from "react";
import Link from "next/link";
import type { Post } from "@/data/feedData";

// ─── Post Dropdown Menu ───────────────────────────────────────────────────
const dropdownItems = [
  {
    label: "Save Post",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
        <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M14.25 15.75L9 12l-5.25 3.75v-12a1.5 1.5 0 011.5-1.5h7.5a1.5 1.5 0 011.5 1.5v12z" />
      </svg>
    ),
  },
  {
    label: "Turn On Notification",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
        <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M9 1.5A6 6 0 003 7.5c0 5.25-1.5 6.75-1.5 6.75h15s-1.5-1.5-1.5-6.75A6 6 0 009 1.5zM10.304 16.5a1.5 1.5 0 01-2.608 0" />
      </svg>
    ),
  },
  {
    label: "Hide",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
        <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M14.25 2.25H3.75a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V3.75a1.5 1.5 0 00-1.5-1.5zM6.75 6.75l4.5 4.5M11.25 6.75l-4.5 4.5" />
      </svg>
    ),
  },
  {
    label: "Edit Post",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
        <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M8.25 3H3a1.5 1.5 0 00-1.5 1.5V15A1.5 1.5 0 003 16.5h10.5A1.5 1.5 0 0015 15V9.75M13.875 1.875a1.591 1.591 0 112.25 2.25L9 11.25 6 12l.75-3 7.125-7.125z" />
      </svg>
    ),
  },
  {
    label: "Delete Post",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
        <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M2.25 4.5h13.5M6 4.5V3a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0112 3v1.5m2.25 0V15a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5V4.5h10.5z" />
      </svg>
    ),
  },
];

// ─── Reaction Buttons ─────────────────────────────────────────────────────
const reactions = [
  {
    label: "Haha",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 19 19">
        <path fill="#FFCC4D" d="M9.5 19a9.5 9.5 0 100-19 9.5 9.5 0 000 19z" />
        <path fill="#664500" d="M9.5 11.083c-1.912 0-3.181-.222-4.75-.527-.358-.07-1.056 0-1.056 1.055 0 2.111 2.425 4.75 5.806 4.75 3.38 0 5.805-2.639 5.805-4.75 0-1.055-.697-1.125-1.055-1.055-1.57.305-2.838.527-4.75.527z" />
        <path fill="#fff" d="M4.75 11.611s1.583.528 4.75.528 4.75-.528 4.75-.528-1.056 2.111-4.75 2.111-4.75-2.11-4.75-2.11z" />
        <path fill="#664500" d="M6.333 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847zM12.667 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847z" />
      </svg>
    ),
    active: true,
  },
  {
    label: "Comment",
    icon: (
      <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21">
        <path stroke="#000" d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z" />
        <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="M6.938 9.313h7.125M10.5 14.063h3.563" />
      </svg>
    ),
  },
  {
    label: "Share",
    icon: (
      <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="21" fill="none" viewBox="0 0 24 21">
        <path stroke="#000" strokeLinejoin="round" d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z" />
      </svg>
    ),
  },
];

// ─── Single Post Card ─────────────────────────────────────────────────────
export function PostCard({ post }: { post: Post }) {
  const [dropOpen, setDropOpen] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [allCommentsVisible, setAllCommentsVisible] = useState(false);

  return (
    <div className="bg-white rounded-[6px] mb-[24px] border border-bs-bg">
      {/* ── Post Header ── */}
      <div className="flex items-center justify-between px-[24px] pt-[24px] pb-[16px]">
        <div className="flex items-center gap-[12px]">
          <img src={post.authorImg} alt={post.author} className="w-[42px] h-[42px] rounded-full object-cover shrink-0" />
          <div>
            <h4 className="text-[15px] font-medium text-bs-dark font-[Poppins] hover:text-bs-primary cursor-pointer transition-colors leading-[20px]">{post.author}</h4>
            <p className="text-[12px] text-bs-muted font-[Poppins] flex items-center gap-1 leading-normal">
              {post.time}
              <span className="w-1 h-1 rounded-full bg-bs-muted mx-[4px]"></span>
              <a href="#0" className="text-bs-muted hover:text-bs-primary transition-colors flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                  <path stroke="#666" d="M5 9A4 4 0 105 1a4 4 0 000 8z" />
                  <path stroke="#666" d="M1.332 3.5h7.336M1.332 6.5h7.336" />
                  <path stroke="#666" d="M5 9c1.076 0 1.948-1.79 1.948-4S6.076 1 5 1m0 8C3.924 9 3.051 7.21 3.051 5S3.924 1 5 1" />
                </svg>
              </a>
            </p>
          </div>
        </div>

        {/* 3-dot Menu */}
        <div className="relative">
          <button
            onClick={() => setDropOpen((v) => !v)}
            className="w-[24px] h-[24px] flex items-center justify-center text-bs-muted"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
              <circle cx="2" cy="2" r="2" fill="#666" />
              <circle cx="2" cy="8" r="2" fill="#666" />
              <circle cx="2" cy="14" r="2" fill="#666" />
            </svg>
          </button>

          {dropOpen && (
            <div className="absolute right-0 top-[30px] w-[210px] bg-white rounded-[6px] shadow-[7px_20px_rgba(108,126,147,0.15)] border border-bs-bg z-30 py-2">
              {dropdownItems.map((item) => (
                <a
                  key={item.label}
                  href="#0"
                  className="flex items-center gap-[12px] px-[20px] py-[10px] text-[14px] text-bs-muted hover:bg-bs-bg hover:text-bs-primary font-[Poppins] transition-all"
                  onClick={() => setDropOpen(false)}
                >
                  <span className="w-5 h-5 flex items-center justify-center group-hover:text-bs-primary">{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Post Content ── */}
      <div className="px-[24px] pb-[16px]">
        {post.content && <p className="text-[14px] text-bs-dark font-[Poppins] leading-[26px] mb-[16px] whitespace-pre-wrap">{post.content}</p>}
        {post.title && <h4 className="text-[16px] font-medium text-bs-dark font-[Poppins] leading-[26px] mb-[12px]">{post.title}</h4>}
      </div>

      {/* ── Post Image ── */}
      {post.postImg && (
        <div className="w-full">
          <img src={post.postImg} alt={post.title || ""} className="w-full px-[24px] h-auto object-cover max-h-[500px]" />
        </div>
      )}

      {/* ── Reaction Summary ── */}
      <div className="flex items-center justify-between px-[24px] pt-[16px] pb-[16px] border-b border-bs-bg">
        <div className="flex items-center gap-[8px]">
          <div className="flex -space-x-2">
            {["/assets/images/react_img1.png", "/assets/images/react_img2.png", "/assets/images/react_img3.png"].map((src, i) => (
              <img key={i} src={src} alt="" className="w-[20px] h-[20px] rounded-full border border-white object-cover" />
            ))}
          </div>
          <span className="text-[13px] text-bs-muted font-[Poppins] font-medium">{post.likes}</span>
        </div>
        <div className="flex items-center gap-[16px]">
          <button
            onClick={() => setShowComment((v) => !v)}
            className="text-[13px] text-bs-muted font-[Poppins] hover:text-bs-primary transition-colors"
          >
            <span className="font-semibold text-bs-dark">{post.comments.length}</span> Comments
          </button>
          <span className="text-[13px] text-bs-muted font-[Poppins]">
            <span className="font-semibold text-bs-dark">{post.shares || 0}</span> Share
          </span>
        </div>
      </div>

      {/* ── Reaction Buttons ── */}
      <div className="flex items-center justify-between px-[16px] py-[8px] border-b border-bs-bg">
        {reactions.map((r, i) => (
          <button
            key={i}
            onClick={() => {
              if (r.label === "Comment") setShowComment((v) => !v);
            }}
            className={`flex items-center gap-[8px] px-[20px] py-[10px] rounded-[6px] text-[15px] font-[Poppins] transition-all hover:bg-bs-bg ${
              r.active ? "text-bs-primary" : "text-bs-muted"
            } flex-1 justify-center`}
          >
            <span className="flex items-center justify-center">{r.icon}</span>
            <span className="hidden sm:inline">{r.label}</span>
          </button>
        ))}
      </div>

      {/* ── Comment Box ── */}
      {showComment && (
        <div className="px-[24px] pt-[24px] pb-[24px]">
          {/* Write a comment */}
          <div className="flex gap-[16px] items-center mb-[24px]">
            <img src="/assets/images/comment_img.png" alt="You" className="w-[42px] h-[42px] rounded-full object-cover shrink-0" />
            <div className="flex-1 relative">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="w-full h-[40px] bg-[#F2F4F7] rounded-[20px] px-[16px] pr-[80px] text-[14px] text-bs-dark font-[Poppins] placeholder-[#666] border border-transparent focus:outline-none focus:bg-white focus:border-bs-primary transition-all"
              />
              <div className="absolute right-[12px] top-1/2 -translate-y-1/2 flex items-center gap-[4px]">
                <button className="w-[28px] h-[28px] flex items-center justify-center text-bs-muted hover:text-bs-primary hover:bg-bs-bg rounded-full transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <path fill="currentColor" fillOpacity=".46" fillRule="evenodd" d="M13.167 6.534a.5.5 0 01.5.5c0 3.061-2.35 5.582-5.333 5.837V14.5a.5.5 0 01-1 0v-1.629C4.35 12.616 2 10.096 2 7.034a.5.5 0 011 0c0 2.679 2.168 4.859 4.833 4.859 2.666 0 4.834-2.18 4.834-4.86a.5.5 0 01.5-.5zM7.833.667a3.218 3.218 0 013.208 3.22v3.126c0 1.775-1.439 3.22-3.208 3.22a3.218 3.218 0 01-3.208-3.22V3.887c0-1.776 1.44-3.22 3.208-3.22z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="w-[28px] h-[28px] flex items-center justify-center text-bs-muted hover:text-bs-primary hover:bg-bs-bg rounded-full transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <path fill="currentColor" fillOpacity=".46" fillRule="evenodd" d="M10.867 1.333c2.257 0 3.774 1.581 3.774 3.933v5.435c0 2.352-1.517 3.932-3.774 3.932H5.101c-2.254 0-3.767-1.58-3.767-3.932V5.266c0-2.352 1.513-3.933 3.767-3.933h5.766zM5.706 4.42c.921 0 1.67.75 1.67 1.67 0 .92-.75 1.67-1.67 1.67-.92 0-1.67-.75-1.67-1.67 0-.921.75-1.67 1.67-1.67zm0 1a.67.67 0 10.001 1.34.67.67 0 00-.002-1.34z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

  {/* Render mapping of comments dynamically */}
          <div className="space-y-[16px]">
            {/* View previous comments toggle */}
            {!allCommentsVisible && post.comments.length > 1 && (
              <button
                onClick={() => setAllCommentsVisible(true)}
                className="text-[14px] text-bs-muted font-[Poppins] hover:text-bs-primary transition-colors mb-[16px] block"
              >
                View {post.comments.length - 1} previous comments
              </button>
            )}

            {(allCommentsVisible ? post.comments : post.comments.slice(-1)).map((comment) => (
              <div key={comment.id} className="flex gap-[16px] items-start animate-in fade-in slide-in-from-top-1 duration-200">
                <img src={comment.authorImg} alt={comment.author} className="w-[42px] h-[42px] rounded-full object-cover shrink-0" />
                <div className="flex-1">
                  <div className="bg-[#F2F4F7] rounded-[16px] px-[16px] py-[12px] inline-block">
                    <Link href="/profile" className="text-[14px] font-semibold text-bs-dark font-[Poppins] hover:text-bs-primary leading-[20px] transition-colors inline-block mb-[4px]">
                      {comment.author}
                    </Link>
                    <p className="text-[14px] text-bs-muted font-[Poppins] leading-[22px]">
                      {comment.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-[16px] mt-[8px] pl-[12px]">
                    <button className="text-[12px] text-bs-muted font-[Poppins] hover:text-bs-primary transition-all font-medium">Like.</button>
                    <button className="text-[12px] text-bs-muted font-[Poppins] hover:text-bs-primary transition-all font-medium">Reply.</button>
                    <button className="text-[12px] text-bs-muted font-[Poppins] hover:text-bs-primary transition-all font-medium flex items-center gap-[6px]">
                      Share
                    </button>
                    <span className="text-[12px] text-bs-primary font-[Poppins]">{comment.time}</span>
                  </div>

                  {/* Render mapping for nested replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-[16px] space-y-[16px]">
                      {comment.replies.map((reply) => (
                         <div key={reply.id} className="flex gap-[16px] items-start animate-in fade-in slide-in-from-top-1 duration-200">
                           <img src={reply.authorImg} alt={reply.author} className="w-[32px] h-[32px] rounded-full object-cover shrink-0" />
                           <div className="flex-1">
                              <div className="bg-[#F2F4F7] rounded-[16px] px-[16px] py-[12px] inline-block">
                                <Link href="/profile" className="text-[14px] font-semibold text-bs-dark font-[Poppins] hover:text-bs-primary leading-[20px] transition-colors inline-block mb-[4px]">
                                  {reply.author}
                                </Link>
                                <p className="text-[14px] text-bs-muted font-[Poppins] leading-[22px]">
                                  {reply.content}
                                </p>
                              </div>
                              <div className="flex items-center gap-[16px] mt-[8px] pl-[12px]">
                                <button className="text-[12px] text-bs-muted font-[Poppins] hover:text-bs-primary transition-all font-medium">Like.</button>
                                <button className="text-[12px] text-bs-muted font-[Poppins] hover:text-bs-primary transition-all font-medium">Reply.</button>
                                <button className="text-[12px] text-bs-muted font-[Poppins] hover:text-bs-primary transition-all font-medium flex items-center gap-[6px]">
                                  Share
                                </button>
                                <span className="text-[12px] text-bs-primary font-[Poppins]">{reply.time}</span>
                              </div>
                           </div>
                         </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}
