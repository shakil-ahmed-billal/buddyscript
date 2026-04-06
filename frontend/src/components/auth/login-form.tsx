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
      <div className="absolute top-0 -left-40 w-[400px] h-[400px] pointer-events-none select-none">
        <Image src="/assets/images/shape1.svg" alt="" width={400} height={400} className="w-full h-full object-contain dark:hidden" />
        <Image src="/assets/images/dark_shape.svg" alt="" width={400} height={400} className="w-full h-full object-contain hidden dark:block" />
      </div>
      <div className="absolute bottom-0 right-[-5%] w-[450px] h-[450px] pointer-events-none select-none">
        <Image src="/assets/images/shape2.svg" alt="" width={450} height={450} className="w-full h-full object-contain dark:hidden" />
        <Image src="/assets/images/dark_shape1.svg" alt="" width={450} height={450} className="w-full h-full object-contain hidden dark:block opacity-40" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none select-none opacity-20">
        <Image src="/assets/images/shape3.svg" alt="" width={600} height={600} className="w-full h-full object-contain dark:hidden" />
        <Image src="/assets/images/dark_shape2.svg" alt="" width={600} height={600} className="w-full h-full object-contain hidden dark:block opacity-40" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left — Illustration */}
          <div className="w-full lg:w-1/2 hidden lg:flex items-center justify-center">
            <Image
              src="/assets/images/login.png"
              alt="Login Illustration"
              width={650}
              height={650}
              className="w-full h-auto object-contain max-w-[600px]"
              priority
            />
          </div>

          {/* Right — Form Card */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="auth-card">
              <div className="mb-8">
                <Image src="/assets/images/logo.svg" alt="Buddy Script" width={170} height={45} className="h-10 w-auto object-contain" />
              </div>

              <p className="text-bs-muted text-sm mb-2">Welcome back</p>
              <h4 className="text-bs-text font-semibold text-[22px] mb-10 leading-tight">Login to your account</h4>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 border border-bs-border rounded-[6px] py-3.5 px-4 mb-8 hover:bg-bs-bg dark:hover:bg-bs-dark2 transition-all duration-300 text-bs-text text-sm font-medium"
              >
                <Image src="/assets/images/google.svg" alt="Google" width={20} height={20} className="w-5 h-5 object-contain" />
                <span>Or sign-in with google</span>
              </button>

              <div className="relative flex items-center mb-8">
                <div className="flex-1 border-t border-bs-border" />
                <span className="mx-4 text-bs-muted text-sm">Or</span>
                <div className="flex-1 border-t border-bs-border" />
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="auth-label">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="auth-input"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="password" className="text-bs-text text-sm font-medium">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    required
                    placeholder="Enter your password"
                    className="auth-input"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      className="border-[#C4C4C4] dark:border-bs-border data-[state=checked]:bg-bs-primary data-[state=checked]:border-bs-primary"
                    />
                    <label htmlFor="remember" className="text-sm text-bs-muted cursor-pointer select-none">
                      Remember me
                    </label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-bs-muted hover:text-bs-primary transition-colors">
                    Forgot password?
                  </Link>
                </div>

                <div className="pt-6 pb-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="auth-btn-primary"
                  >
                    {loading ? "Logging in..." : "Login now"}
                  </button>
                </div>
              </form>

              <div className="text-center text-sm text-bs-muted mt-4">
                Dont have an account?{" "}
                <Link href="/register" className="text-bs-primary font-semibold hover:underline ml-1">
                  Create New Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

