import { jest } from "@jest/globals";
import { GetTasksService } from "./get-tasks-service.js";
import { database } from "../../infra/database.js";

jest.mock("../../infra/database.js", () => ({
  database: {
    collection: jest.fn(),
  },
}));

describe("GetTasksService", () => {
  let service;

  beforeEach(() => {
    service = new GetTasksService();
  });

  it("should return tasks from database", async () => {
    const mockTasks = [
      { id: "1", description: "Task 1" },
      { id: "2", description: "Task 2" },
    ];

    const mockDocs = mockTasks.map((task) => ({
      id: task.id,
      data: () => ({ description: task.description }),
    }));

    database.collection.mockReturnValue({
      get: jest.fn().mockResolvedValue({
        docs: mockDocs,
      }),
    });

    const result = await service.getTasks();

    expect(database.collection).toHaveBeenCalledWith("tasks");
    expect(result).toEqual(mockTasks);
  });

  it("should handle errors correctly", async () => {
    const errorMessage = "Failed to get tasks";
    database.collection.mockReturnValue({
      get: jest.fn().mockRejectedValue(new Error(errorMessage)),
    });

    await expect(service.getTasks()).rejects.toThrow(errorMessage);
  });
});
