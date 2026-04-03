import type { Metadata } from "next";
import { LoginForm } from "@/components/auth";

export const metadata: Metadata = {
  title: "Login — Buddy Script",
  description: "Welcome back! Login to your Buddy Script account.",
};

export default function LoginPage() {
  return <LoginForm />;
}
