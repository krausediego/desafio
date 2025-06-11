import { jest } from "@jest/globals";
import { database as db } from "./database.js";

jest.mock("firebase-admin", () => {
  const mockFirestore = {
    collection: jest.fn(),
    batch: jest.fn(),
  };

  return {
    initializeApp: jest.fn(),
    firestore: jest.fn(() => mockFirestore),
    credential: {
      cert: jest.fn(),
    },
  };
});

jest.mock("node:fs", () => ({
  readFileSync: jest
    .fn()
    .mockReturnValue(JSON.stringify({ type: "service_account" })),
}));

describe("database", () => {
  it("should initialize firebase app", () => {
    expect(db).toBeDefined();
    expect(db.collection).toBeDefined();
    expect(db.batch).toBeDefined();
  });
});
