import { jest } from "@jest/globals";
import { GetTasksController } from "./get-tasks-controller.js";
import { GetTasksService } from "./get-tasks-service.js";

jest.mock("./get-tasks-service.js", () => ({
  GetTasksService: jest.fn().mockImplementation(() => ({
    getTasks: jest.fn(),
  })),
}));

describe("GetTasksController", () => {
  let controller;
  let getTasksService;

  beforeEach(() => {
    getTasksService = new GetTasksService();
    controller = new GetTasksController();
    controller.service = getTasksService;
  });

  it("should return tasks when service returns data", async () => {
    const mockTasks = [
      { id: "1", description: "Task 1" },
      { id: "2", description: "Task 2" },
    ];

    getTasksService.getTasks.mockResolvedValue(mockTasks);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.index(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTasks);
  });

  it("should handle errors correctly", async () => {
    const errorMessage = "Failed to get tasks";
    getTasksService.getTasks.mockRejectedValue(new Error(errorMessage));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.index(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
