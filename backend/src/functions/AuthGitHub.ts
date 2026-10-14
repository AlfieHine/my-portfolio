import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import jwt from "jsonwebtoken";

export async function AuthGitHub(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    // Handle CORS preflight browser checks
    if (request.method === "OPTIONS") {
        return {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
            }
        };
    }

    try {
        const body = await request.json() as { code?: string };
        const code = body?.code;

        if (!code) {
            return {
                status: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                jsonBody: { error: "Missing authorization code" }
            };
        }

        const clientId = process.env.GITHUB_CLIENT_ID;
        const clientSecret = process.env.GITHUB_CLIENT_SECRET;
        const adminUsername = process.env.GITHUB_ADMIN_USERNAME;
        const jwtSecret = process.env.JWT_SECRET || "default_dev_secret";

        if (!clientId || !clientSecret) {
            return {
                status: 500,
                headers: { "Access-Control-Allow-Origin": "*" },
                jsonBody: { error: "GitHub OAuth credentials not configured on backend." }
            };
        }

        // 1. Exchange temporary authorization code for GitHub access token
        const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code: code
            })
        });

        const tokenData = await tokenResponse.json() as { access_token?: string; error_description?: string };

        if (!tokenData.access_token) {
            return {
                status: 401,
                headers: { "Access-Control-Allow-Origin": "*" },
                jsonBody: { error: tokenData.error_description || "Failed to authenticate with GitHub." }
            };
        }

        // 2. Fetch authenticated user profile from GitHub
        const userResponse = await fetch("https://api.github.com/user", {
            headers: {
                "Authorization": `Bearer ${tokenData.access_token}`,
                "User-Agent": "CloudResumeApp"
            }
        });

        const userData = await userResponse.json() as { login?: string; avatar_url?: string; name?: string };

        // 3. Admin user verification
        if (userData.login?.toLowerCase() !== adminUsername?.toLowerCase()) {
            return {
                status: 403,
                headers: { "Access-Control-Allow-Origin": "*" },
                jsonBody: { error: `Access denied. Account '${userData.login}' is not authorized.` }
            };
        }

        // 4. Generate signed JWT session token (valid for 8 hours)
        const token = jwt.sign(
            { username: userData.login, role: "admin" },
            jwtSecret,
            { expiresIn: "8h" }
        );

        return {
            status: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            jsonBody: {
                success: true,
                token,
                user: {
                    login: userData.login,
                    name: userData.name || userData.login,
                    avatar: userData.avatar_url
                }
            }
        };
    } catch (error: any) {
        context.error("AuthGitHub error:", error);
        return {
            status: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            jsonBody: { error: error.message || "Internal authentication error" }
        };
    }
}

app.http('AuthGitHub', {
    methods: ['POST', 'OPTIONS'],
    authLevel: 'anonymous',
    handler: AuthGitHub
});