import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CosmosClient, Container } from "@azure/cosmos";

interface Post {
    id: string;
    slug: string;
    title: string;
    summary: string;
    coverImage?: string;
    status: string;
    createdAt: string;
    updatedAt?: string;
}

// Singleton container reference reused across warm function invocations
let containerInstance: Container | null = null;

function getContainer(): Container {
    if (!containerInstance) {
        const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;
        if (!connectionString) {
            throw new Error("COSMOS_DB_CONNECTION_STRING environment variable is missing or empty.");
        }
        const client = new CosmosClient(connectionString);
        containerInstance = client.database("AzureResume").container("Posts");
    }
    return containerInstance;
}

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
};

export async function GetPosts(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    if (request.method === "OPTIONS") {
        return { status: 204, headers: corsHeaders };
    }

    try {
        const container = getContainer();
        const slug = request.params.slug;

        if (slug) {
            // Fetch single active post by slug
            const querySpec = {
                query: "SELECT * FROM c WHERE c.slug = @slug AND c.status = 'active'",
                parameters: [{ name: "@slug", value: slug }]
            };

            const { resources } = await container.items.query<Post>(querySpec).fetchAll();

            if (resources.length === 0) {
                return {
                    status: 404,
                    headers: corsHeaders,
                    jsonBody: { error: `Post with slug '${slug}' not found.` }
                };
            }

            return {
                status: 200,
                headers: corsHeaders,
                jsonBody: resources[0]
            };
        } else {
            // Fetch all active posts for the blog feed
            const querySpec = {
                query: "SELECT c.id, c.slug, c.title, c.summary, c.coverImage, c.status, c.createdAt, c.updatedAt FROM c WHERE c.status = 'active' ORDER BY c.createdAt DESC"
            };

            const { resources } = await container.items.query<Post>(querySpec).fetchAll();

            return {
                status: 200,
                headers: corsHeaders,
                jsonBody: resources
            };
        }
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch posts";
        context.error("GetPosts error:", error);
        return {
            status: 500,
            headers: corsHeaders,
            jsonBody: { error: errorMessage }
        };
    }
}

app.http('GetPosts', {
    methods: ['GET', 'OPTIONS'],
    authLevel: 'anonymous',
    route: 'posts/{slug?}',
    handler: GetPosts
});