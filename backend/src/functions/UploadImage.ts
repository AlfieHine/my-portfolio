import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";
import { verifyAdminToken } from "../utils/auth";

const storageConnectionString = process.env.STORAGE_CONNECTION_STRING || process.env.AzureWebJobsStorage || "";

export async function UploadImage(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
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

    const user = verifyAdminToken(request);
    if (!user) {
        return {
            status: 401,
            headers: { "Access-Control-Allow-Origin": "*" },
            jsonBody: { error: "Unauthorized access" }
        };
    }

    try {
        const body = await request.json() as { fileName?: string; fileData?: string; contentType?: string };
        const { fileName, fileData, contentType } = body;

        if (!fileName || !fileData) {
            return {
                status: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                jsonBody: { error: "fileName and fileData (base64) are required." }
            };
        }

        if (!storageConnectionString) {
            return {
                status: 500,
                headers: { "Access-Control-Allow-Origin": "*" },
                jsonBody: { error: "Storage connection string not configured." }
            };
        }

        const blobServiceClient = BlobServiceClient.fromConnectionString(storageConnectionString);
        const containerClient = blobServiceClient.getContainerClient("blog-images");

        // Ensure container exists
        await containerClient.createIfNotExists({ access: "blob" });

        // Generate unique filename to avoid overwrites
        const cleanName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
        const blobName = `${Date.now()}-${cleanName}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Convert base64 string to buffer
        const buffer = Buffer.from(fileData.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        const mimeType = contentType || 'image/jpeg';

        await blockBlobClient.uploadData(buffer, {
            blobHTTPHeaders: { blobContentType: mimeType }
        });

        return {
            status: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            jsonBody: {
                success: true,
                url: blockBlobClient.url
            }
        };
    } catch (error: any) {
        context.error("UploadImage error:", error);
        return {
            status: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            jsonBody: { error: error.message || "Failed to upload image" }
        };
    }
}

app.http('UploadImage', {
    methods: ['POST', 'OPTIONS'],
    authLevel: 'anonymous',
    route: 'cms/upload',
    handler: UploadImage
});