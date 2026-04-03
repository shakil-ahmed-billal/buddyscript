import { NextRequest, NextResponse } from "next/server";
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from "./lib/authUtils";
import { jwtUtils } from "./lib/jwtUtils";
import { isTokenExpiringSoon } from "./lib/tokenUtils";
import { getNewTokensWithRefreshToken, getUserInfo } from "./services/auth.actions";

async function refreshTokenMiddleware(refreshToken: string): Promise<boolean> {
    try {
        const refresh = await getNewTokensWithRefreshToken(refreshToken);
        if (!refresh) {
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error refreshing token in middleware:", error);
        return false;
    }
}

export async function proxy(request: NextRequest) {
    try {
        const { pathname } = request.nextUrl;
        const pathWithQuery = `${pathname}${request.nextUrl.search}`;
        const accessToken = request.cookies.get("accessToken")?.value;
        const refreshToken = request.cookies.get("refreshToken")?.value;

        const jwtSecret = process.env.JWT_SECRET || "3a9f7ff527137c4bc9dc95559159803c5d72b7fe040b3d3e17f5a643c92569a7"; // fallback for dev

        const decodedAccessToken = accessToken && jwtUtils.verifyToken(accessToken, jwtSecret).data;
        const isValidAccessToken = accessToken && jwtUtils.verifyToken(accessToken, jwtSecret).success;

        let userRole: UserRole | null = null;
        if (decodedAccessToken) {
            userRole = (decodedAccessToken.role || "USER") as UserRole;
        }

        const routeOwner = getRouteOwner(pathname);
        const isAuth = isAuthRoute(pathname);

        // 1. Proactively refresh token if about to expire
        if (isValidAccessToken && refreshToken && (await isTokenExpiringSoon(accessToken))) {
            const requestHeaders = new Headers(request.headers);
            const response = NextResponse.next({
                request: {
                    headers: requestHeaders
                },
            })

            try {
                const refreshed = await refreshTokenMiddleware(refreshToken);
                if (refreshed) {
                    requestHeaders.set("x-token-refreshed", "1");
                }
                return NextResponse.next({
                    request: {
                        headers: requestHeaders
                    },
                    headers: response.headers
                });
            } catch (error) {
                console.error("Error refreshing token in middleware:", error);
            }
            return response;
        }

        // 2. Logged-in users should not access auth pages
        if (isAuth && isValidAccessToken && pathname !== "/verify-email" && pathname !== "/reset-password") {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
        }

        // 3. Public routes (null owner) -> allow
        if (routeOwner === null) {
            return NextResponse.next();
        }

        // 4. Common protected routes -> allow if logged in
        if (routeOwner === "COMMON") {
            if (!accessToken || !isValidAccessToken) {
                const loginUrl = new URL("/login", request.url);
                loginUrl.searchParams.set("redirect", pathWithQuery);
                return NextResponse.redirect(loginUrl);
            }
            return NextResponse.next();
        }

        // 5. Not logged in but trying to access protected route -> redirect to login
        if (!accessToken || !isValidAccessToken) {
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("redirect", pathWithQuery);
            return NextResponse.redirect(loginUrl);
        }

        // 6. Mandatory state enforcement (email verification) - DISABLED as per user request
        /*
        if (accessToken) {
            const userInfo = await getUserInfo();
            if (userInfo) {
                if (userInfo.emailVerified === false) {
                    if (pathname !== "/verify-email") {
                        const verifyEmailUrl = new URL("/verify-email", request.url);
                        verifyEmailUrl.searchParams.set("email", userInfo.email);
                        return NextResponse.redirect(verifyEmailUrl);
                    }
                    return NextResponse.next();
                }

                if (userInfo.emailVerified && pathname === "/verify-email") {
                    return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
                }
            }
        }
        */

        // 7. Role-based access control
        if (routeOwner === "ADMIN" || routeOwner === "USER") {
            if (routeOwner !== userRole && userRole !== "ADMIN") { // Admin can access user routes usually
                return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
            }
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Error in middleware:", error);
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
    ]
}
