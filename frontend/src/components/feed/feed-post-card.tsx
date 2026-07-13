"use client";

import { BsIcon } from "@/components/ui/bs-icons";
import { BsInput } from "@/components/ui/bs-shared";
import { UserProfileImage } from "@/components/ui/user-profile-image";
import { useCreateComment, useDeletePost, useToggleCommentLike, useTogglePostLike } from "@/hooks/useFeed";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

// ─── Reaction Buttons ─────────────────────────────────────────────────────
const reactions = [
  { label: "Haha", icon: "haha" },
  { label: "Comment", icon: "chat" },
  { label: "Share", icon: "share" },
];

// ─── Single Post Card ─────────────────────────────────────────────────────
export function PostCard({ post, currentUser }: { post: any; currentUser?: any }) {
  const [dropOpen, setDropOpen] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [allCommentsVisible, setAllCommentsVisible] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [showLikeList, setShowLikeList] = useState(false);

  const { mutate: toggleLike } = useTogglePostLike();
  const { mutate: deletePostMutate } = useDeletePost();
  const { mutate: createCommentMutate, isPending: isCommenting } = useCreateComment();
  const { mutate: toggleCommentLike } = useToggleCommentLike();

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

  const handleReplySubmit = (commentId: string, e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e && e.key !== "Enter") return;
    if (!replyText.trim()) return;

    createCommentMutate({ postId: post.id, content: replyText, parentId: commentId }, {
      onSuccess: () => {
        setReplyText("");
        setReplyingTo(null);
      }
    });
  };

  const handleDeletePost = () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    deletePostMutate(post.id, {
      onSuccess: () => {
        toast.success("Post deleted successfully");
        setDropOpen(false);
      },
      onError: (err: any) => {
        toast.error(err.message || "Failed to delete post");
      }
    });
  };

  // Safe checks for the author object from backend
  const authorName = post.author?.name || `${post.author?.firstName || ""} ${post.author?.lastName || ""}`.trim() || "Unknown";
  const isPostAuthor = currentUser?.id === post.authorId;
  const isPostLikedByMe = post.likes?.some((like: any) => like.userId === currentUser?.id);

  return (
    <div className="bg-white dark:bg-bs-dark1 rounded-[6px] mb-[24px] border border-bs-border dark:border-bs-dark2 transition-colors overflow-hidden bs-card-shadow">
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
              <button className="w-full flex items-center gap-[12px] px-[20px] py-[10px] text-[14px] text-bs-muted hover:bg-bs-bg dark:hover:bg-bs-dark2 hover:text-bs-primary font-[Poppins] transition-all">
                <BsIcon name="save" size={16} /> Save Post
              </button>
              <button className="w-full flex items-center gap-[12px] px-[20px] py-[10px] text-[14px] text-bs-muted hover:bg-bs-bg dark:hover:bg-bs-dark2 hover:text-bs-primary font-[Poppins] transition-all">
                <BsIcon name="bell" size={16} /> Notifications
              </button>
              {isPostAuthor && (
                <>
                   <button className="w-full flex items-center gap-[12px] px-[20px] py-[10px] text-[14px] text-bs-muted hover:bg-bs-bg dark:hover:bg-bs-dark2 hover:text-bs-primary font-[Poppins] transition-all">
                    <BsIcon name="settings" size={16} /> Edit Post
                  </button>
                  <button 
                    onClick={handleDeletePost}
                    className="w-full flex items-center gap-[12px] px-[20px] py-[10px] text-[14px] text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 font-[Poppins] transition-all"
                  >
                    <BsIcon name="logout" size={16} /> Delete Post
                  </button>
                </>
              )}
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
        <div className="w-full relative min-h-[300px] bg-white dark:bg-bs-dark1 px-[24px]">
          <Image
            src={post.image}
            alt="post image"
            width={800}
            height={500}
            className="w-full h-auto object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            onError={(e) => {
              const target = e.target as any;
              target.srcset = "";
              target.src = "/assets/images/placeholder.png";
            }}
          />
        </div>
      )}

      {/* ── Reaction Summary ── */}
      <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-bs-bg dark:border-bs-dark2">
        <div className="flex items-center gap-[8px] relative">
          <div className="flex -space-x-1">
             {post.likes?.slice(0, 3).map((like: any, i: number) => (
                <UserProfileImage key={i} src={like.user?.image} name={like.user?.name} size={20} className="border border-white dark:border-bs-dark1" />
             ))}
          </div>
          <button 
            onClick={() => setShowLikeList(!showLikeList)}
            className="text-[13px] text-bs-muted font-[Poppins] font-medium hover:text-bs-primary"
          >
            {post.likes?.length || 0} Likes
          </button>
          
          {showLikeList && post.likes?.length > 0 && (
             <div className="absolute left-0 bottom-[30px] w-[200px] bg-white dark:bg-bs-dark1 rounded-[6px] shadow-lg border border-bs-bg dark:border-bs-dark2 z-40 p-3 max-h-[250px] overflow-y-auto">
                <h5 className="text-[12px] font-bold mb-2 border-b pb-1">Liked by</h5>
                {post.likes.map((like: any) => (
                   <div key={like.id} className="flex items-center gap-2 mb-2">
                      <UserProfileImage src={like.user?.image} name={like.user?.name} size={24} />
                      <span className="text-[12px] truncate">{like.user?.name || "User"}</span>
                   </div>
                ))}
             </div>
          )}
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
           const active = r.label === "Haha" && isPostLikedByMe;
           
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
                placeholder="Write a comment..."
                className="pr-[30px]"
                disabled={isCommenting}
              />
              <div className="absolute right-[8px] top-1/2 -translate-y-1/2 flex items-center">
                 {isCommenting ? <span className="w-4 h-4 border-2 border-bs-primary border-t-transparent animate-spin rounded-full"></span> : <BsIcon name="send-fill" size={14} className="text-bs-muted" />}
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-[16px]">
            {!allCommentsVisible && post.comments && post.comments.length > 3 && (
              <button
                onClick={() => setAllCommentsVisible(true)}
                className="text-[13px] font-medium text-bs-primary hover:underline transition-colors mb-[16px] block font-[Poppins]"
              >
                View previous comments
              </button>
            )}

            {(post.comments && (allCommentsVisible ? post.comments : post.comments.slice(-3))).map((comment: any) => {
              const commentAuthorName = comment.author?.name || `${comment.author?.firstName || ""} ${comment.author?.lastName || ""}`.trim() || "Unknown";
              const isCommentLikedByMe = comment.likes?.some((l: any) => l.userId === currentUser?.id);

              return (
              <div key={comment.id} className="flex gap-[12px] items-start group">
                <UserProfileImage src={comment.author?.image} name={commentAuthorName} size={36} />
                <div className="flex-1 min-w-0">
                  <div className="bs-comment-bubble p-[12px_16px]">
                    <div className="flex justify-between items-start">
                        <Link href="/profile" className="text-[14px] font-semibold text-bs-dark dark:text-bs-text font-[Poppins] hover:text-bs-primary transition-colors inline-block mb-[2px]">
                        {commentAuthorName}
                        </Link>
                    </div>
                    <p className="text-[13px] text-bs-muted dark:text-bs-muted font-[Poppins] leading-[20px]">
                      {comment.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-[14px] mt-[6px] pl-[4px]">
                    <button 
                       onClick={() => toggleCommentLike(comment.id)}
                       className={`text-[11px] font-semibold font-[Poppins] transition-all ${isCommentLikedByMe ? "text-bs-primary" : "text-bs-muted hover:text-bs-primary"}`}
                    >
                        Like {comment.likes?.length > 0 ? `(${comment.likes.length})` : ""}
                    </button>
                    <button 
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        className="text-[11px] text-bs-muted font-semibold font-[Poppins] hover:text-bs-primary transition-all"
                    >
                        Reply
                    </button>
                    <span className="text-[11px] text-bs-muted font-normal font-[Poppins] opacity-60">• {new Date(comment.createdAt || Date.now()).toLocaleDateString()}</span>
                  </div>

                  {/* Reply Input */}
                  {replyingTo === comment.id && (
                     <div className="mt-3 flex gap-2 items-center">
                        <UserProfileImage src={currentUser?.image} name={currentUser?.name} size={28} />
                        <BsInput 
                           autoFocus
                           placeholder="Write a reply..."
                           value={replyText}
                           onChange={(e) => setReplyText(e.target.value)}
                           onKeyDown={(e) => handleReplySubmit(comment.id, e)}
                           className="h-[32px] text-[12px]"
                        />
                     </div>
                  )}

                  {/* Replies List */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-[12px] space-y-[12px] border-l-2 border-bs-bg dark:border-bs-dark2 pl-[16px]">
                      {comment.replies.map((reply: any) => {
                          const replyAuthorName = reply.author?.name || `${reply.author?.firstName || ""} ${reply.author?.lastName || ""}`.trim() || "Unknown";
                          const isReplyLikedByMe = reply.likes?.some((l: any) => l.userId === currentUser?.id);
                          
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
                                  <button 
                                    onClick={() => toggleCommentLike(reply.id)}
                                    className={`text-[10px] font-bold font-[Poppins] transition-all ${isReplyLikedByMe ? "text-bs-primary" : "text-bs-muted hover:text-bs-primary"}`}
                                  >
                                      Like {reply.likes?.length > 0 ? `(${reply.likes.length})` : ""}
                                  </button>
                                  <button 
                                    onClick={() => setReplyingTo(replyingTo === comment.id ? comment.id : comment.id)}
                                    className="text-[10px] text-bs-muted font-bold font-[Poppins] hover:text-bs-primary transition-all"
                                  >
                                      Reply
                                  </button>
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
