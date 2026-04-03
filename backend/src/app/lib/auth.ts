import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { bearer, emailOTP } from "better-auth/plugins";
import config from "../config/index.js";
import { prisma } from "./prisma.js";
import { sendEmail } from "../utils/email.js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: config.better_auth_secret,
  baseURL: config.better_auth_base_url,
  trustedOrigins: [
    config.client_url as string,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000"
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },
  user: {
    additionalFields: {
      firstName: {
        type: "string",
      },
      lastName: {
        type: "string",
      },
      role: {
        type: "string",
        required: false,
      },
      position: {
        type: "string",
        required: false,
      },
      isSuggested: {
        type: "boolean",
        required: false,
      },
      isYouMightLike: {
        type: "boolean",
        required: false,
      },
    },
  },
  plugins: [
    bearer(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) return;

        const subject = type === "email-verification" ? "Verify your email" : "Password Reset OTP";
        
        await sendEmail({
          to: email,
          subject,
          templateName: "otp",
          templateData: {
            name: user.name,
            otp,
          },
        });
      },
      expiresIn: 60 * 5, // 5 minutes
      otpLength: 6,
    }),
  ],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  advanced: {
    disableCSRFCheck: true,
  },
});
