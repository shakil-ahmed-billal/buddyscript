import { cookies } from "next/headers";

export interface SessionUser {
  userId: string;
  name: string;
  email: string;
  role?: string;
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) return null;
    const parts = accessToken.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString());
    if (!payload?.userId) return null;
    return { userId: payload.userId, name: payload.name, email: payload.email, role: payload.role };
  } catch {
    return null;
  }
}
