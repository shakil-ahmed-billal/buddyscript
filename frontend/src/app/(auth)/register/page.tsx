import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth";

export const metadata: Metadata = {
  title: "Register — Buddy Script",
  description: "Get started now! Create a new Buddy Script account.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
