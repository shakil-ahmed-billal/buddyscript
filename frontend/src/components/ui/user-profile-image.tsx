"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface UserProfileImageProps {
  src?: string | null;
  name?: string | null;
  alt?: string;
  size?: number; // in px
  className?: string;
}

/**
 * A consistent, reusable profile image component.
 * - Renders the real image from `src` if available.
 * - Falls back to name initials on image load error or if src is absent.
 * - Accepts a flexible `size` prop (in px) and any extra `className`.
 */
export function UserProfileImage({
  src,
  name,
  alt,
  size = 40,
  className,
}: UserProfileImageProps) {
  const [imgError, setImgError] = useState(false);

  const initials = name
    ? name
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const sizeStyle: React.CSSProperties = {
    width: size,
    height: size,
    minWidth: size,
    minHeight: size,
    fontSize: Math.max(size * 0.36, 11),
  };

  const baseClass = cn(
    "rounded-full object-cover shrink-0 border border-bs-bg dark:border-bs-dark2 select-none",
    className
  );

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={alt || name || "User"}
        style={sizeStyle}
        className={baseClass}
        onError={() => setImgError(true)}
      />
    );
  }

  // Fallback: initials avatar
  return (
    <span
      style={sizeStyle}
      className={cn(
        baseClass,
        "inline-flex items-center justify-center bg-bs-primary text-white font-semibold"
      )}
      aria-label={alt || name || "User"}
    >
      {initials}
    </span>
  );
}
