import { HttpRequest } from "@azure/functions";
import jwt from "jsonwebtoken";

export interface AuthenticatedUser {
    username: string;
    role: string;
}

export function verifyAdminToken(request: HttpRequest): AuthenticatedUser | null {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }

    const token = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET || "default_dev_secret";

    try {
        const decoded = jwt.verify(token, jwtSecret) as AuthenticatedUser;
        if (decoded && decoded.role === "admin") {
            return decoded;
        }
        return null;
    } catch {
        return null;
    }
}