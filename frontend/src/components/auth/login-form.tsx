
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginAction } from "@/services/auth.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const response = await loginAction(data);
      if (response?.success) {
        toast.success("Logged in successfully!");
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error(response?.message || "Login failed");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col bg-muted p-10 text-white dark:border-r">
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-3xl" />
        <div className="absolute inset-0 bg-linear-to-br from-primary via-primary/80 to-background opacity-90" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute inset-0 bg-grid-white/[0.05]" />

        <div className="relative z-20 flex items-center text-2xl font-bold gap-2">
          <Logo />
        </div>
        
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-3xl font-medium leading-tight tracking-tight text-white">
              &ldquo;The fastest way to take your ideas from zero to production. Beautifully crafted, production-ready, and developer-obsessed.&rdquo;
            </p>
            <footer className="text-lg opacity-80 mt-4 font-sans text-white">&mdash; Shakil Ahmed Billal</footer>
          </blockquote>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-6 sm:p-12 lg:bg-background bg-muted/30">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center space-y-2">
            <Link href="/" className="lg:hidden mb-6 flex items-center gap-2">
               <Logo />
            </Link>
            <h1 className="text-3xl font-extrabold tracking-tight">Welcome Back</h1>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>

          <div className="bg-background lg:bg-transparent p-8 lg:p-0 rounded-3xl border border-border/50 lg:border-none shadow-xl lg:shadow-none space-y-6">
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="email">Email Address</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="h-12 bg-muted/50 border-transparent focus:bg-background transition-all"
                    {...register("email")}
                  />
                  {errors.email && <p className="text-sm text-destructive font-medium">{errors.email.message}</p>}
                </Field>
                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Link href="#" className="text-sm font-medium text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="h-12 bg-muted/50 border-transparent focus:bg-background transition-all"
                    {...register("password")}
                  />
                  {errors.password && <p className="text-sm text-destructive font-medium">{errors.password.message}</p>}
                </Field>
              </FieldGroup>

              <Button type="submit" disabled={loading} className="w-full h-12 text-base font-bold transition-all hover:scale-[1.01] active:scale-[0.99] group shadow-lg shadow-primary/20">
                {loading ? "Signing in..." : (
                  <>
                    Sign in <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground whitespace-nowrap">Or continue with</span>
              </div>
            </div>

            <Link 
              href="#" 
              className={cn(
                buttonVariants({ variant: "outline" }), 
                "w-full h-12 border-muted-foreground/20 hover:bg-muted/50 transition-colors"
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-3 h-5 w-5">
                <path d="M12.452 11.01v3.007h7.375c-.226 1.686-.803 2.921-1.681 3.788-1.08 1.052-2.76 2.2-5.694 2.2-4.541 0-8.09-3.568-8.09-7.993s3.549-7.993 8.09-7.993c2.446 0 4.24.941 5.557 2.151l2.17-2.115C18.347 2.32 15.889 1 12.452 1 6.23 1 1 5.938 1 12s5.23 11 11.452 11c3.36 0 5.895-1.075 7.876-3.08C22.36 17.94 23 15.141 23 12.892c0-.697-.05-1.345-.163-1.882z" fill="currentColor" />
              </svg>
              Google account
            </Link>

            <p className="text-center text-sm text-muted-foreground pt-4">
              New here?{" "}
              <Link href="/register" className="font-bold text-primary hover:underline underline-offset-4">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
