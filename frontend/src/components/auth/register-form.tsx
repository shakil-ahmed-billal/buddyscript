"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
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
              src="/assets/images/registration.png"
              alt="Registration Illustration"
              width={650}
              height={650}
              className="w-full h-auto object-contain max-w-[600px] dark:hidden"
            />
            <Image
              src="/assets/images/registration1.png"
              alt="Registration Illustration Dark"
              width={650}
              height={650}
              className="w-full h-auto object-contain max-w-[600px] hidden dark:block"
            />
          </div>

          {/* Right — Form Card */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="auth-card">
              <div className="mb-8">
                <Image src="/assets/images/logo.svg" alt="Buddy Script" width={170} height={40} className="h-10 w-auto object-contain" />
              </div>

              <p className="text-bs-muted text-sm mb-2">Get Started Now</p>
              <h4 className="text-bs-text font-semibold text-[22px] mb-10 leading-tight">Registration</h4>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 border border-bs-border rounded-[6px] py-3.5 px-4 mb-8 hover:bg-bs-bg dark:hover:bg-bs-dark2 transition-all duration-300 text-bs-text text-sm font-medium"
              >
                <Image src="/assets/images/google.svg" alt="Google" width={20} height={20} className="w-5 h-5 object-contain" />
                <span>Register with google</span>
              </button>

              <div className="relative flex items-center mb-8">
                <div className="flex-1 border-t border-bs-border" />
                <span className="mx-4 text-bs-muted text-sm">Or</span>
                <div className="flex-1 border-t border-bs-border" />
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="flex gap-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="firstName" className="auth-label">First name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      required
                      placeholder="First name"
                      className="auth-input"
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="lastName" className="auth-label">Last name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      required
                      placeholder="Last name"
                      className="auth-input"
                    />
                  </div>
                </div>

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
                  <Label htmlFor="password" className="auth-label">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    required
                    minLength={6}
                    placeholder="Create a password"
                    className="auth-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="repeatPassword" className="auth-label">Repeat Password</Label>
                  <Input
                    id="repeatPassword"
                    type="password"
                    name="repeatPassword"
                    required
                    minLength={6}
                    placeholder="Confirm your password"
                    className="auth-input"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1 pb-2">
                  <Checkbox
                    id="terms"
                    checked={agreed}
                    onCheckedChange={(v) => setAgreed(!!v)}
                    className="border-[#C4C4C4] dark:border-bs-border data-[state=checked]:bg-bs-primary data-[state=checked]:border-bs-primary"
                  />
                  <label htmlFor="terms" className="text-sm text-bs-muted cursor-pointer select-none">
                    I agree to terms &amp; conditions
                  </label>
                </div>

                <div className="pt-2 pb-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="auth-btn-primary"
                  >
                    {loading ? "Registering..." : "Register now"}
                  </button>
                </div>
              </form>

              <div className="text-center text-sm text-bs-muted mt-4">
                Already have an account?{" "}
                <Link href="/login" className="text-bs-primary font-semibold hover:underline ml-1">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


