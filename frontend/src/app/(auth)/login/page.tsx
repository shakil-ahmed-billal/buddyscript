import type { Metadata } from "next";
import { LoginForm } from "@/components/auth";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login — Buddy Script",
  description: "Welcome back! Login to your Buddy Script account.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-bs-bg">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
