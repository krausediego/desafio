import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { HomePage } from "../../../pages/home";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(() => ({
    mutateAsync: jest.fn(),
  })),
  useQueryClient: () => ({
    invalidateQueries: jest.fn(),
  }),
}));

import { useQuery } from "@tanstack/react-query";

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deve renderizar a lista de tarefas quando houver dados", () => {
    // Simula dados retornados pelo useQuery
    useQuery.mockReturnValue({
      data: [
        {
          id: 1,
          description: "Tarefa 1",
          responsible: "Fulano",
          status: "Pendente",
          createdBy: "Admin",
        },
      ],
      isLoading: false,
      isRefetching: false,
    });

    render(<HomePage />);

    expect(screen.getByText("Tarefa 1")).toBeInTheDocument();
    expect(
      screen.queryByText("Nenhuma tarefa cadastrada")
    ).not.toBeInTheDocument();
  });

  test("deve mostrar mensagem de lista vazia quando não houver tarefas", () => {
    useQuery.mockReturnValue({
      data: [],
      isLoading: false,
      isRefetching: false,
    });

    render(<HomePage />);

    expect(screen.getByText("Nenhuma tarefa cadastrada")).toBeInTheDocument();
  });

  test("deve mostrar loading quando isLoading for true", () => {
    useQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isRefetching: false,
    });

    render(<HomePage />);

    // Verifica se o TableSkeleton está presente
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("should render tasks when data is loaded", async () => {
    const mockTasks = [
      {
        id: "1",
        description: "Test Task",
        responsible: "John Doe",
        status: "todo",
        computer: "PC-001",
      },
    ];

    // Mock do useQuery para retornar os dados
    useQuery.mockReturnValue({
      data: mockTasks,
      isLoading: false,
      isRefetching: false,
      isSuccess: true,
    });

    render(<HomePage />);

    // Espera os dados aparecerem
    await waitFor(() => {
      expect(screen.getByText("Test Task")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      const pendenteElements = screen.getAllByText("Pendente");
      expect(pendenteElements[1]).toBeInTheDocument();
    });
  });
});
