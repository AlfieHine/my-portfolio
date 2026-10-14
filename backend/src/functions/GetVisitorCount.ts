import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";

export async function GetVisitorCount(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;

  if (!connectionString) {
    context.error("Cosmos DB connection string is missing.");
    return {
      status: 500,
      jsonBody: { error: "Database configuration error" }
    };
  }

  try {
    const client = new CosmosClient(connectionString);
    const database = client.database("AzureResume");
    const container = database.container("Counter");

    // Atomic increment operation on document id "1"
    const { resource } = await container.item("1", "1").patch([
      { op: "incr", path: "/count", value: 1 }
    ]);

    return {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      jsonBody: { count: resource?.count ?? 0 }
    };
  } catch (error) {
    context.error("Error updating visitor count:", error);
    return {
      status: 500,
      jsonBody: { error: "Failed to update visitor count" }
    };
  }
}

app.http("GetVisitorCount", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: GetVisitorCount
});