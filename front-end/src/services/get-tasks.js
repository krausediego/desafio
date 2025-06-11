import { api } from "../lib/axios";

async function getTasks() {
  const response = await api.get("/get-tasks");

  return response.data;
}

export { getTasks };
