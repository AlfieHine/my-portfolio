import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";

const connectionString = process.env.COSMOS_DB_CONNECTION_STRING || "";

export async function GetPosts(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    if (request.method === "OPTIONS") {
        return {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            }
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
        const slug = request.params.slug;

        if (slug) {
            // Fetch single active post by slug
            const querySpec = {
                query: "SELECT * FROM c WHERE c.slug = @slug AND c.status = 'active'",
                parameters: [{ name: "@slug", value: slug }]
            };

            const { resources } = await container.items.query(querySpec).fetchAll();

            if (resources.length === 0) {
                return {
                    status: 404,
                    headers: { "Access-Control-Allow-Origin": "*" },
                    jsonBody: { error: "Post not found" }
                };
            }

            return {
                status: 200,
                headers: { "Access-Control-Allow-Origin": "*" },
                jsonBody: resources[0]
            };
        } else {
            // Fetch all active posts for the blog feed
            const querySpec = {
                query: "SELECT c.id, c.slug, c.title, c.summary, c.coverImage, c.status, c.createdAt, c.updatedAt FROM c WHERE c.status = 'active' ORDER BY c.createdAt DESC"
            };

            const { resources } = await container.items.query(querySpec).fetchAll();

            return {
                status: 200,
                headers: { "Access-Control-Allow-Origin": "*" },
                jsonBody: resources
            };
        }
    } catch (error: any) {
        context.error("GetPosts error:", error);
        return {
            status: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            jsonBody: { error: error.message || "Failed to fetch posts" }
        };
    }
}

app.http('GetPosts', {
    methods: ['GET', 'OPTIONS'],
    authLevel: 'anonymous',
    route: 'posts/{slug?}',
    handler: GetPosts
});