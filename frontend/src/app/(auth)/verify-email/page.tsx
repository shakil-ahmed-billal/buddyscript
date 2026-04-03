import { VerifyEmailForm } from "@/components/auth/verify-email-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email — Buddy Script",
  description: "Enter the code sent to your email to verify your account.",
};

export default function VerifyEmailPage() {
  return <VerifyEmailForm />;
}
