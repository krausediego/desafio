import { jest } from "@jest/globals";
import router from "./index.js";

jest.mock("express", () => ({
  Router: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
  })),
}));

describe("router", () => {
  it("should be defined", () => {
    expect(router).toBeDefined();
  });
});
