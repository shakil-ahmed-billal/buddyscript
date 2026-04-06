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
    <div className="min-h-screen w-full flex items-center justify-center bg-bs-bg relative overflow-hidden font-[Poppins,sans-serif]">
      {/* Background Shape Decorations */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] pointer-events-none select-none px-4 py-10">
        <img src="/assets/images/shape1.svg" alt="" className="w-full h-full object-contain dark:hidden" />
        <img src="/assets/images/dark_shape.svg" alt="" className="w-full h-full object-contain hidden dark:block" />
      </div>
      <div className="absolute bottom-0 right-[-5%] w-[450px] h-[450px] pointer-events-none select-none">
        <img src="/assets/images/shape2.svg" alt="" className="w-full h-full object-contain dark:hidden" />
        <img src="/assets/images/dark_shape1.svg" alt="" className="w-full h-full object-contain hidden dark:block opacity-40" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none select-none opacity-20">
        <img src="/assets/images/shape3.svg" alt="" className="w-full h-full object-contain dark:hidden" />
        <img src="/assets/images/dark_shape2.svg" alt="" className="w-full h-full object-contain hidden dark:block opacity-40" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-10 relative z-10">
        <div className="flex justify-center">
          <div className="auth-card">
            <div className="mb-8">
              <img src="/assets/images/logo.svg" alt="Buddy Script" className="h-10 w-auto object-contain" />
            </div>

            <h4 className="text-bs-text font-semibold text-[22px] mb-2 leading-tight">Verify your email</h4>
            <p className="text-bs-muted text-sm mb-8">We've sent a 6-digit code to <span className="font-medium text-bs-text">{email}</span></p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="otp" className="auth-label">OTP Code</Label>
                <Input
                  id="otp"
                  name="otp"
                  required
                  placeholder="Enter 6-digit code"
                  className="auth-input text-center text-xl tracking-[10px] font-bold"
                  maxLength={6}
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="auth-btn-primary"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            </form>

            <div className="text-center text-sm text-bs-muted mt-8">
              Didn't receive code?{" "}
              <button className="text-bs-primary font-semibold hover:underline ml-1">Resend code</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

