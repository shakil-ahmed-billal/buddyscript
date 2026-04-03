"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export function VerifyEmailForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const otp = formData.get("otp") as string;

    if (!email) {
      toast.error("Email is missing from the URL");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_API_URL}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Email verified successfully! You can now log in.");
        router.push("/login");
      } else {
        toast.error(data.message || "Verification failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bs-bg font-[Poppins,sans-serif]">
      <div className="bg-white rounded-xl shadow-[7px_20px_60px_rgba(108,126,147,0.15)] p-8 w-full max-w-[420px]">
        <div className="mb-7">
          <img src="/assets/images/logo.svg" alt="Buddy Script" className="h-10 w-auto" />
        </div>

        <h4 className="text-[#1A202C] font-semibold text-[17px] mb-2">Verify your email</h4>
        <p className="text-[#767676] text-sm mb-8">We've sent a 6-digit code to <span className="font-medium text-bs-dark">{email}</span></p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <Label className="text-bs-text text-sm font-medium">OTP Code</Label>
            <Input
              name="otp"
              required
              placeholder="Enter 6-digit code"
              className="h-11 rounded-[6px] border-bs-border bg-[#F5F5F5] focus:border-bs-primary focus:bg-white text-center text-xl tracking-[10px] font-bold"
              maxLength={6}
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-bs-primary disabled:opacity-50 hover:bg-[#0d7de8] text-white font-medium text-base rounded-[6px] transition-all"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-[#767676]">
          Didn't receive code?{" "}
          <button className="text-bs-primary font-medium hover:underline">Resend code</button>
        </p>
      </div>
    </div>
  );
}
