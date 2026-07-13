import { VerifyEmailForm } from "@/components/auth/verify-email-form";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Verify Email — Buddy Script",
  description: "Enter the code sent to your email to verify your account.",
};

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-bs-bg">Loading...</div>}>
      <VerifyEmailForm />
    </Suspense>
  );
}
