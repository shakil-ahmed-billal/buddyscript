"use server";

import { setTokenInCookies } from "@/lib/tokenUtils";
import { deleteCookie } from "@/lib/cookieUtils";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const loginAction = async (payload: any) => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const response = await res.json();
    
    if (response?.success && response?.data) {
      const { accessToken, refreshToken, sessionToken } = response.data;
      if (accessToken) await setTokenInCookies("accessToken", accessToken);
      if (refreshToken) await setTokenInCookies("refreshToken", refreshToken);
      if (sessionToken) await setTokenInCookies("better-auth.session_token", sessionToken, 24 * 60 * 60);
    }
    return response;
  } catch (error: any) {
    return { success: false, message: error.message || "Login failed" };
  }
};

export const registerAction = async (payload: any) => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const response = await res.json();

    if (response?.success && response?.data) {
      const { accessToken, refreshToken, sessionToken } = response.data;
      if (accessToken) await setTokenInCookies("accessToken", accessToken);
      if (refreshToken) await setTokenInCookies("refreshToken", refreshToken);
      if (sessionToken) await setTokenInCookies("better-auth.session_token", sessionToken, 24 * 60 * 60);
    }
    return response;
  } catch (error: any) {
    return { success: false, message: error.message || "Registration failed" };
  }
};

export const logoutAction = async () => {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;
    const accessToken = cookieStore.get("accessToken")?.value;
    
    await fetch(`${BASE_API_URL}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`,
            "x-access-token": accessToken || "",
            Cookie: `accessToken=${accessToken}; better-auth.session_token=${sessionToken}`
        }
    });
  } catch (error) {
    console.error("Logout API error:", error);
  }
  await deleteCookie("accessToken");
  await deleteCookie("refreshToken");
  await deleteCookie("better-auth.session_token");
  redirect("/login");
};

export async function getNewTokensWithRefreshToken(refreshToken: string): Promise<boolean> {
    try {
        const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `refreshToken=${refreshToken}`
            }
        });

        if (!res.ok) {
            return false;
        }

        const { data } = await res.json();

        const { accessToken, refreshToken: newRefreshToken, sessionToken } = data;

        if (accessToken) {
            await setTokenInCookies("accessToken", accessToken);
        }

        if (newRefreshToken) {
            await setTokenInCookies("refreshToken", newRefreshToken);
        }

        if (sessionToken) {
            await setTokenInCookies("better-auth.session_token", sessionToken, 24 * 60 * 60);
        }

        return true;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return false;
    }
}

export async function getUserInfo() {
    try {
        const cookieStore = await cookies();
        const accessToken = (await cookieStore).get("accessToken")?.value;
        const sessionToken = (await cookieStore).get("better-auth.session_token")?.value

        console.log(`[getUserInfo] accessToken: ${accessToken ? "Found" : "Missing"}`);
        console.log(`[getUserInfo] sessionToken: ${sessionToken ? "Found" : "Missing"}`);

        if (!accessToken) {
            return null;
        }

        const res = await fetch(`${BASE_API_URL}/auth/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionToken}`,
                "x-access-token": accessToken || "",
                Cookie: `accessToken=${accessToken}; better-auth.session_token=${sessionToken}`
            }
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Failed to fetch user info:", res.status, res.statusText, errorText);
            return null;
        }

        const { data } = await res.json();

        return data;
    } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
    }
}
export async function getPosts() {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;
        const sessionToken = cookieStore.get("better-auth.session_token")?.value

        const res = await fetch(`${BASE_API_URL}/posts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionToken}`,
                Cookie: `accessToken=${accessToken}; better-auth.session_token=${sessionToken}`
            },
            cache: "no-store"
        });

        if (!res.ok) {
            return [];
        }

        const { data } = await res.json();
        return data || [];
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}
