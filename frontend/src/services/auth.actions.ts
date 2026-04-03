"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { deleteCookie } from "@/lib/cookieUtils";
import { redirect } from "next/navigation";

export const loginAction = async (payload: any) => {
  try {
    const response: any = await httpClient.post("/auth/login", payload);
    if (response?.success && response?.data) {
      const { accessToken, refreshToken, token } = response.data;
      if (accessToken) await setTokenInCookies("accessToken", accessToken);
      if (refreshToken) await setTokenInCookies("refreshToken", refreshToken);
      if (token) await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60);
    }
    return response;
  } catch (error: any) {
    return { success: false, message: error?.response?.data?.message || error.message || "Login failed" };
  }
};

export const registerAction = async (payload: any) => {
  try {
    const response: any = await httpClient.post("/auth/register", payload);
    if (response?.success && response?.data) {
      const { accessToken, refreshToken, token } = response.data;
      if (accessToken) await setTokenInCookies("accessToken", accessToken);
      if (refreshToken) await setTokenInCookies("refreshToken", refreshToken);
      if (token) await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60);
    }
    return response;
  } catch (error: any) {
    return { success: false, message: error?.response?.data?.message || error.message || "Registration failed" };
  }
};

export const logoutAction = async () => {
  try {
    await httpClient.post("/auth/logout", {});
  } catch {}
  await deleteCookie("accessToken");
  await deleteCookie("refreshToken");
  await deleteCookie("better-auth.session_token");
  redirect("/login");
};
