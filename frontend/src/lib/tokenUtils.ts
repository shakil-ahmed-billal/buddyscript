"use server";
import { cookies } from "next/headers";

export async function setTokenInCookies(name: string, token: string, maxAge?: number) {
  const cookieStore = await cookies();
  cookieStore.set(name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: maxAge || 3600,
  });
}
