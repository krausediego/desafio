import { database } from "../../infra/database.js";

export class GetTasksService {
  constructor() {}

  /**
   * Get tasks in database.
   * @returns {Promise<[{id: string, description: string, responsible: string, status: string, computer: string}]>}
   */
  async getTasks() {
    try {
      const snapshot = await database.collection("tasks").get();

      if (!snapshot || !snapshot.docs) {
        throw new Error("Failed to get tasks from database");
      }

      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return tasks;
    } catch (err) {
      throw new Error(err.message || "Failed to get tasks");
    }
  }
}
