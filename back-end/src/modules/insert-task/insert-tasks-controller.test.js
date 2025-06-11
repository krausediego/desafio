import { jest } from "@jest/globals";
import { InsertTasksController } from "./insert-tasks-controller.js";
import { InsertTasksService } from "./insert-tasks-service.js";

jest.mock("./insert-tasks-service.js", () => ({
  InsertTasksService: jest.fn().mockImplementation(() => ({
    insertTasks: jest.fn(),
  })),
}));

describe("InsertTasksController", () => {
  let controller;
  let insertTasksService;

  beforeEach(() => {
    insertTasksService = new InsertTasksService();
    controller = new InsertTasksController();
    controller.service = insertTasksService;
  });

  it("should insert task when service returns success", async () => {
    insertTasksService.insertTasks.mockResolvedValue();

    const req = {
      body: {
        description: "Task 1",
        responsible: "John Doe",
        status: "pending",
        computer: "PC-001",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await controller.store(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith("Tarefa(s) inserida(s) com sucesso");
  });

  it("should handle errors correctly", async () => {
    const errorMessage = "Failed to insert task";
    insertTasksService.insertTasks.mockRejectedValue(new Error(errorMessage));

    const req = {
      body: {
        description: "Task 1",
        responsible: "John Doe",
        status: "pending",
        computer: "PC-001",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await controller.store(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Erro ao inserir a(s) tarefa(s)");
  });
});
