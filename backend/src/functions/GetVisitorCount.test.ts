import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetVisitorCount } from "./GetVisitorCount";
import { InvocationContext } from "@azure/functions";

// Mock InvocationContext
const mockContext = {
  error: vi.fn(),
  log: vi.fn()
} as unknown as InvocationContext;

describe("GetVisitorCount Azure Function", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
  });

  it("should return status 500 when COSMOS_DB_CONNECTION_STRING is missing", async () => {
    delete process.env.COSMOS_DB_CONNECTION_STRING;

    const response = await GetVisitorCount({} as any, mockContext);

    expect(response.status).toBe(500);
    expect(response.jsonBody).toEqual({ error: "Database configuration error" });
    expect(mockContext.error).toHaveBeenCalledWith("Cosmos DB connection string is missing.");
  });
});