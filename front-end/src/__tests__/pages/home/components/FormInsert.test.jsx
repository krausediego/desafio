import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormInsert } from "../../../../pages/home/components/FormInsert";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "../../../../components/ThemeProvider";
import { insertTasks } from "../../../../services/insert-tasks";

jest.mock("../../../../services/insert-tasks", () => ({
  insertTasks: jest.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderFormInsert = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <FormInsert />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe("FormInsert", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render form fields correctly", () => {
    renderFormInsert();

    expect(screen.getByLabelText("Descrição")).toBeInTheDocument();
    expect(screen.getByLabelText("Responsável")).toBeInTheDocument();
    expect(screen.getByLabelText("Status")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Salvar tarefa" })
    ).toBeInTheDocument();
  });

  it("should show validation error for empty description", async () => {
    renderFormInsert();

    const submitButton = screen.getByRole("button", { name: "Salvar tarefa" });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("A descrição é obrigatória")).toBeInTheDocument();
    });
  });

  it("should submit form successfully with valid data", async () => {
    insertTasks.mockResolvedValueOnce({});
    renderFormInsert();

    // Preenche o formulário
    await userEvent.type(
      screen.getByLabelText("Descrição"),
      "Test Task Description"
    );
    await userEvent.type(screen.getByLabelText("Responsável"), "John Doe");

    // Seleciona o status
    const statusSelect = screen.getByLabelText("Status");
    await userEvent.click(statusSelect);
    const statusOption = screen.getByRole("option", { name: "Pendente" });
    await userEvent.click(statusOption);

    // Submete o formulário
    const submitButton = screen.getByRole("button", { name: "Salvar tarefa" });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(insertTasks).toHaveBeenCalledWith({
        description: "Test Task Description",
        responsible: "John Doe",
        status: "todo",
      });
    });

    // Verifica se o formulário foi resetado
    expect(screen.getByLabelText("Descrição")).toHaveValue("");
    expect(screen.getByLabelText("Responsável")).toHaveValue("");
  });

  it("should handle submission error", async () => {
    const error = new Error("Failed to insert task");
    insertTasks.mockRejectedValueOnce(error);
    console.error = jest.fn();

    renderFormInsert();

    // Preenche o formulário
    await userEvent.type(
      screen.getByLabelText("Descrição"),
      "Test Task Description"
    );
    await userEvent.type(screen.getByLabelText("Responsável"), "John Doe");

    // Seleciona o status
    const statusSelect = screen.getByLabelText("Status");
    await userEvent.click(statusSelect);
    const statusOption = screen.getByRole("option", { name: "Pendente" });
    await userEvent.click(statusOption);

    // Submete o formulário
    const submitButton = screen.getByRole("button", { name: "Salvar tarefa" });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(error);
    });
  });
});
