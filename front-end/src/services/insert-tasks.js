import { api } from "../lib/axios";

/**
 * Insert new task
 * @param {{description: string, responsible: string, status: string}} task - Task params
 * @returns {Promise<void>}
 */
async function insertTasks(task) {
  await api.post("/insert-tasks", { ...task });
}

export { insertTasks };
