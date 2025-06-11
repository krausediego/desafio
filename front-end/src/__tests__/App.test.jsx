import { render, screen } from "@testing-library/react";
import { App } from "../App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "../components/ThemeProvider";

const queryClient = new QueryClient();

describe("App", () => {
  it("should render without crashing", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    );

    // Verifica se o componente HomePage está sendo renderizado
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
