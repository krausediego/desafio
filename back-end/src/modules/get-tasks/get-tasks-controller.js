import { GetTasksService } from "./get-tasks-service.js";

export class GetTasksController {
  constructor() {
    this.service = new GetTasksService();
  }

  /**
   * Get all tasks.
   */
  async index(req, res) {
    try {
      const tasks = await this.service.getTasks();
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
