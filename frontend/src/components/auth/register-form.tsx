"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { registerAction } from "@/services/auth.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export function RegisterForm() {
  const [agreed, setAgreed] = useState(false);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("Please agree to the terms & conditions");
      return;
    }
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const repeatPassword = formData.get("repeatPassword") as string;

    if (password !== repeatPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    const result = await registerAction({ firstName, lastName, email, password });
    setLoading(false);

    if (result.success) {
      toast.success("Successfully registered! Redirecting...");
      router.push("/");
    } else {
      toast.error(result.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bs-bg relative overflow-hidden font-[Poppins,sans-serif]">
      {/* Background Shape Decorations */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] pointer-events-none select-none opacity-60">
        <img src="/assets/images/shape1.svg" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] pointer-events-none select-none opacity-60">
        <img src="/assets/images/shape2.svg" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-1/2 right-1/4 w-[200px] h-[200px] pointer-events-none select-none opacity-40">
        <img src="/assets/images/shape3.svg" alt="" className="w-full h-full object-contain" />
      </div>

      {/* Main Container */}
      <div className="container max-w-6xl mx-auto px-4 py-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">

          {/* Left — Illustration */}
          <div className="w-full lg:w-2/3 hidden lg:flex items-center justify-center">
            <img
              src="/assets/images/registration.png"
              alt="Registration Illustration"
              className="max-w-[520px] w-full h-auto object-contain"
            />
          </div>

          {/* Right — Form Card */}
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
            <div className="bg-white rounded-xl shadow-[7px_20px_60px_rgba(108,126,147,0.15)] p-8 w-full max-w-[420px]">

              {/* Logo */}
              <div className="mb-7">
                <img src="/assets/images/logo.svg" alt="Buddy Script" className="h-10 w-auto object-contain" />
              </div>

              {/* Heading */}
              <p className="text-[#767676] text-sm mb-2">Get Started Now</p>
              <h4 className="text-[#1A202C] font-semibold text-[17px] mb-10">Registration</h4>

              {/* Google Sign-up */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 border border-bs-border rounded-[6px] py-3 px-4 mb-8 hover:bg-[#f5f5f5] transition-all duration-300 text-bs-text text-sm font-medium"
              >
                <img src="/assets/images/google.svg" alt="Google" className="w-5 h-5 object-contain" />
                <span>Register with google</span>
              </button>

              {/* Divider */}
              <div className="relative flex items-center mb-8">
                <div className="flex-1 border-t border-bs-border" />
                <span className="mx-4 text-[#767676] text-sm">Or</span>
                <div className="flex-1 border-t border-bs-border" />
              </div>

              {/* Form */}
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div className="flex gap-2">
                  {/* First Name */}
                  <div className="space-y-1.5 flex-1">
                    <Label className="text-bs-text text-sm font-medium">First name</Label>
                    <Input
                      name="firstName"
                      required
                      placeholder="First name"
                      className="h-11 rounded-[6px] border-bs-border bg-[#F5F5F5] focus:border-bs-primary focus:bg-white transition-all text-sm"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="space-y-1.5 flex-1">
                    <Label className="text-bs-text text-sm font-medium">Last name</Label>
                    <Input
                      name="lastName"
                      required
                      placeholder="Last name"
                      className="h-11 rounded-[6px] border-bs-border bg-[#F5F5F5] focus:border-bs-primary focus:bg-white transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Email */}
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

                {/* Password */}
                <div className="space-y-1.5">
                  <Label className="text-bs-text text-sm font-medium">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    required
                    minLength={6}
                    placeholder="Create a password"
                    className="h-11 rounded-[6px] border-bs-border bg-[#F5F5F5] focus:border-bs-primary focus:bg-white transition-all text-sm"
                  />
                </div>

                {/* Repeat Password */}
                <div className="space-y-1.5">
                  <Label className="text-bs-text text-sm font-medium">Repeat Password</Label>
                  <Input
                    type="password"
                    name="repeatPassword"
                    required
                    minLength={6}
                    placeholder="Confirm your password"
                    className="h-11 rounded-[6px] border-bs-border bg-[#F5F5F5] focus:border-bs-primary focus:bg-white transition-all text-sm"
                  />
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-center gap-2 pt-1">
                  <Checkbox
                    id="terms"
                    checked={agreed}
                    onCheckedChange={(v) => setAgreed(!!v)}
                    className="border-[#C4C4C4] data-[state=checked]:bg-bs-primary data-[state=checked]:border-bs-primary"
                  />
                  <label htmlFor="terms" className="text-sm text-[#767676] cursor-pointer select-none">
                    I agree to terms &amp; conditions
                  </label>
                </div>

                {/* Submit */}
                <div className="pt-6 pb-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-bs-primary disabled:opacity-50 hover:bg-[#0d7de8] text-white font-medium text-base rounded-[6px] transition-all duration-300 hover:shadow-lg"
                  >
                    {loading ? "Registering..." : "Register now"}
                  </button>
                </div>
              </form>

              {/* Bottom Link */}
              <p className="text-center text-sm text-[#767676]">
                Already have an account?{" "}
                <Link href="/login" className="text-bs-primary font-medium hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
