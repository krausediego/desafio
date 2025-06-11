import { database } from "../../infra/database.js";
import os from "node:os";

export class InsertTasksService {
  constructor() {}

  /**
   * Insert new task in database
   * @param {{description: string, responsible: string, status: string}} task - Task params
   * @returns {Promise<void>}
   */
  async insertTasks(task) {
    try {
      const batch = database.batch();
      const docRef = database.collection("tasks").doc();

      batch.set(docRef, {
        ...task,
        computer: os.hostname(),
      });

      await batch.commit();
    } catch (err) {
      throw new Error(err.message || "Failed to insert task");
    }
  }
}
