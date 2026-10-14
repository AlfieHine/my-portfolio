import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";
import { verifyAdminToken } from "../utils/auth";

const connectionString = process.env.COSMOS_DB_CONNECTION_STRING || "";

export async function AdminPosts(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    // 1. Preflight CORS
    if (request.method === "OPTIONS") {
        return {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
            }
        };
    }

    // 2. Authorize Request
    const user = verifyAdminToken(request);
    if (!user) {
        return {
            status: 401,
            headers: { "Access-Control-Allow-Origin": "*" },
            jsonBody: { error: "Unauthorized access" }
        };
    }

    try {
        if (!connectionString) {
            return {
                status: 500,
                headers: { "Access-Control-Allow-Origin": "*" },
                jsonBody: { error: "Cosmos DB connection string not configured." }
            };
        }

        const client = new CosmosClient(connectionString);
        const container = client.database("AzureResume").container("Posts");

        // --- GET: Fetch ALL posts (active and sleeping) ---
        if (request.method === "GET") {
            const querySpec = {
                query: "SELECT * FROM c ORDER BY c.createdAt DESC"
            };
            const { resources } = await container.items.query(querySpec).fetchAll();
            return {
                status: 200,
                headers: { "Access-Control-Allow-Origin": "*" },
                jsonBody: resources
            };
        }

        // --- POST: Create a new blog post ---
        if (request.method === "POST") {
            const body = await request.json() as any;
            const { title, slug, summary, content, coverImage, status } = body;

            if (!title || !slug || !content) {
                return {
                    status: 400,
                    headers: { "Access-Control-Allow-Origin": "*" },
                    jsonBody: { error: "Title, slug, and content are required." }
                };
            }

            const now = new Date().toISOString();
            const newPost = {
                id: `post-${Date.now()}`,
                slug: slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-'),
                title,
                summary: summary || "",
                content,
                coverImage: coverImage || "",
                status: status === "active" ? "active" : "sleeping",
                createdAt: now,
                updatedAt: now
            };

            const { resource } = await container.items.create(newPost);
            return {
                status: 201,
                headers: { "Access-Control-Allow-Origin": "*" },
                jsonBody: resource
            };
        }

        // --- PUT: Update existing post / toggle active or sleeping status ---
        if (request.method === "PUT") {
            const body = await request.json() as any;
            const { id, slug, title, summary, content, coverImage, status } = body;

            if (!id || !slug) {
                return {
                    status: 400,
                    headers: { "Access-Control-Allow-Origin": "*" },
                    jsonBody: { error: "Post id and slug are required for updates." }
                };
            }

            // Fetch existing post to preserve createdAt
            const { resource: existingPost } = await container.item(id, slug).read();
            if (!existingPost) {
                return {
                    status: 404,
                    headers: { "Access-Control-Allow-Origin": "*" },
                    jsonBody: { error: "Post not found" }
                };
            }

            const updatedPost = {
                ...existingPost,
                title: title !== undefined ? title : existingPost.title,
                summary: summary !== undefined ? summary : existingPost.summary,
                content: content !== undefined ? content : existingPost.content,
                coverImage: coverImage !== undefined ? coverImage : existingPost.coverImage,
                status: status !== undefined ? status : existingPost.status,
                updatedAt: new Date().toISOString()
            };

            const { resource } = await container.item(id, slug).replace(updatedPost);
            return {
                status: 200,
                headers: { "Access-Control-Allow-Origin": "*" },
                jsonBody: resource
            };
        }

        // --- DELETE: Delete singular or multiple posts ---
        if (request.method === "DELETE") {
            const body = await request.json() as { items?: Array<{ id: string; slug: string }> };
            const items = body?.items;

            if (!items || !Array.isArray(items) || items.length === 0) {
                return {
                    status: 400,
                    headers: { "Access-Control-Allow-Origin": "*" },
                    jsonBody: { error: "Array of items containing { id, slug } is required." }
                };
            }

            // Perform parallel point-deletes for single or bulk actions
            await Promise.all(
                items.map(item => container.item(item.id, item.slug).delete())
            );

            return {
                status: 200,
                headers: { "Access-Control-Allow-Origin": "*" },
                jsonBody: { success: true, count: items.length }
            };
        }

        return { status: 405, headers: { "Access-Control-Allow-Origin": "*" } };
    } catch (error: any) {
        context.error("AdminPosts error:", error);
        return {
            status: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            jsonBody: { error: error.message || "Failed to process post action" }
        };
    }
}

app.http('AdminPosts', {
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    authLevel: 'anonymous',
    route: 'cms/posts',
    handler: AdminPosts
});