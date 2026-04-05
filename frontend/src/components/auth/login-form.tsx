"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { loginAction } from "@/services/auth.actions";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setLoading(true);
    const result = await loginAction({ email, password });
    setLoading(false);

    if (result.success) {
      toast.success("Successfully logged in!");
      router.push(redirectPath);
    } else {
      toast.error(result.message || "Login failed");
    }
  };

  const handleGoogleLogin = () => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
    const encodedRedirect = encodeURIComponent(redirectPath);
    window.location.href = `${apiBaseUrl}/auth/login/google?redirect=${encodedRedirect}`;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bs-bg relative overflow-hidden font-[Poppins,sans-serif]">
      {/* Background Shape Decorations */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] pointer-events-none select-none opacity-60">
        <Image src="/assets/images/shape1.svg" alt="" width={300} height={300} className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] pointer-events-none select-none opacity-60">
        <Image src="/assets/images/shape2.svg" alt="" width={300} height={300} className="w-full h-full object-contain" />
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
          
          <div className="w-full lg:w-2/3 hidden lg:flex items-center justify-center">
            <Image
              src="/assets/images/login.png"
              alt="Login Illustration"
              width={500}
              height={500}
              className="max-w-[500px] w-full h-auto object-contain"
              priority
            />
          </div>

          <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
            <div className="bg-white rounded-xl shadow-[7px_20px_60px_rgba(108,126,147,0.15)] p-8 w-full max-w-[420px]">
              <div className="mb-7">
                <Image src="/assets/images/logo.svg" alt="Buddy Script" width={160} height={40} className="h-10 w-auto object-contain" />
              </div>

              <p className="text-[#767676] text-sm mb-2">Welcome Back!</p>
              <h4 className="text-[#1A202C] font-semibold text-[17px] mb-10">Login to account</h4>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 border border-bs-border rounded-[6px] py-3 px-4 mb-8 hover:bg-[#f5f5f5] transition-all duration-300 text-bs-text text-sm font-medium"
              >
                <Image src="/assets/images/google.svg" alt="Google" width={20} height={20} className="w-5 h-5 object-contain" />
                <span>Login with google</span>
              </button>

              <div className="relative flex items-center mb-8">
                <div className="flex-1 border-t border-bs-border" />
                <span className="mx-4 text-[#767676] text-sm">Or</span>
                <div className="flex-1 border-t border-bs-border" />
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                  <Label className="text-bs-text text-sm font-medium">Email</Label>
                  <Input
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="h-11 rounded-[6px] border-bs-border bg-[#F5F5F5] focus:border-bs-primary focus:bg-white transition-all text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <Label className="text-bs-text text-sm font-medium">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-bs-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    type="password"
                    name="password"
                    required
                    placeholder="Enter your password"
                    className="h-11 rounded-[6px] border-bs-border bg-[#F5F5F5] focus:border-bs-primary focus:bg-white transition-all text-sm"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Checkbox
                    id="remember"
                    className="border-[#C4C4C4] data-[state=checked]:bg-bs-primary data-[state=checked]:border-bs-primary"
                  />
                  <label htmlFor="remember" className="text-sm text-[#767676] cursor-pointer select-none">
                    Remember me
                  </label>
                </div>

                <div className="pt-6 pb-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-bs-primary disabled:opacity-50 hover:bg-[#0d7de8] text-white font-medium text-base rounded-[6px] transition-all duration-300 hover:shadow-lg"
                  >
                    {loading ? "Logging in..." : "Login now"}
                  </button>
                </div>
              </form>

              <p className="text-center text-sm text-[#767676]">
                Don't have an account?{" "}
                <Link href="/register" className="text-bs-primary font-medium hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
