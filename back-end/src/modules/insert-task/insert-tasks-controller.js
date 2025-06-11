import { InsertTasksService } from "./insert-tasks-service.js";

export class InsertTasksController {
  constructor() {
    this.service = new InsertTasksService();
  }

  /**
   * Save new task(s) in database.
   */
  async store(req, res) {
    try {
      if (Array.isArray(req.body)) {
        await Promise.all(
          req.body.map(async (task) => {
            await this.service.insertTasks(task);
          })
        );
      } else {
        await this.service.insertTasks(req.body);
      }

      return res.status(201).send("Tarefa(s) inserida(s) com sucesso");
    } catch (err) {
      return res.status(400).send("Erro ao inserir a(s) tarefa(s)");
    }
  }
}
