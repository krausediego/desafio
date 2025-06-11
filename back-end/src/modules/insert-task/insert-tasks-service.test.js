import { jest } from "@jest/globals";
import { InsertTasksService } from "./insert-tasks-service.js";
import { database } from "../../infra/database.js";

jest.mock("../../infra/database.js", () => ({
  database: {
    collection: jest.fn(),
    batch: jest.fn(),
  },
}));

describe("InsertTasksService", () => {
  let service;

  beforeEach(() => {
    service = new InsertTasksService();
  });

  it("should insert task into database", async () => {
    const mockTask = {
      description: "Task 1",
      responsible: "John Doe",
      status: "pending",
      computer: "PC-001",
    };

    const mockBatch = {
      set: jest.fn().mockReturnThis(),
      commit: jest.fn().mockResolvedValue(),
    };

    database.collection.mockReturnValue({
      doc: jest.fn().mockReturnThis(),
    });

    database.batch.mockReturnValue(mockBatch);

    await service.insertTasks(mockTask);

    expect(database.collection).toHaveBeenCalledWith("tasks");
    expect(database.batch).toHaveBeenCalled();
    expect(mockBatch.set).toHaveBeenCalled();
    expect(mockBatch.commit).toHaveBeenCalled();
  });

  it("should handle errors correctly", async () => {
    const errorMessage = "Failed to insert task";
    const mockTask = {
      description: "Task 1",
      responsible: "John Doe",
      status: "pending",
      computer: "PC-001",
    };

    const mockBatch = {
      set: jest.fn().mockReturnThis(),
      commit: jest.fn().mockRejectedValue(new Error(errorMessage)),
    };

    database.collection.mockReturnValue({
      doc: jest.fn().mockReturnThis(),
    });

    database.batch.mockReturnValue(mockBatch);

    await expect(service.insertTasks(mockTask)).rejects.toThrow(errorMessage);
  });
});
