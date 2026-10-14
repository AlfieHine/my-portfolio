import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";

let cosmosClient: CosmosClient | null = null;

const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

function getCosmosClient(connectionString: string): CosmosClient {
  if (!cosmosClient) {
    cosmosClient = new CosmosClient(connectionString);
  }
  return cosmosClient;
}

export async function GetVisitorCount(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  // Handle CORS preflight options request
  if (request.method === "OPTIONS") {
    return { status: 204, headers: corsHeaders };
  }

  context.log(`Http function processed request for url "${request?.url || "unknown"}"`);

  // Check for missing connection string to satisfy test contract
  const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;
  if (!connectionString) {
    context.error("Cosmos DB connection string is missing.");
    return {
      status: 500,
      headers: corsHeaders,
      jsonBody: { error: "Database configuration error" }
    };
  }

  // Safely check query string using optional chaining
  const incrementParam = request?.query?.get?.("increment");
  const shouldIncrement = incrementParam !== "false";

  try {
    const client = getCosmosClient(connectionString);
    const database = client.database("CloudResume");
    const container = database.container("Counter");

    const itemId = "1";
    const partitionKey = "1";

    let count = 0;

    // Read existing count item
    try {
      const { resource } = await container.item(itemId, partitionKey).read();
      if (resource && typeof resource.count === "number") {
        count = resource.count;
      }
    } catch (readError: any) {
      if (readError.code !== 404) {
        throw readError;
      }
    }

    // Increment count if requested
    if (shouldIncrement) {
      count += 1;
      await container.items.upsert({
        id: itemId,
        count: count
      });
    }

    return {
      status: 200,
      headers: corsHeaders,
      jsonBody: { count }
    };
  } catch (error: any) {
    context.error("Failed to process visitor count:", error);

    return {
      status: 500,
      headers: corsHeaders,
      jsonBody: {
        error: "Failed to process visitor count",
        message: error.message || "Internal server error"
      }
    };
  }
}

app.http("GetVisitorCount", {
  methods: ["GET", "POST", "OPTIONS"],
  authLevel: "anonymous",
  handler: GetVisitorCount
});