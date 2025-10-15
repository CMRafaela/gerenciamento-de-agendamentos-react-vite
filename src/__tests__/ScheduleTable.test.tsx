import { describe, expect, it, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { ScheduleTable } from "@/components/organisms/ScheduleTable";
import { renderWithQueryClient } from "./test-utils";

// Mock simples do fetch do json-server
const samplePage1 = {
  data: [
    {
      id: 1,
      description: "A",
      date: "2025-10-16",
      time: "09:00",
      responsible: "X",
    },
    {
      id: 2,
      description: "B",
      date: "2025-10-17",
      time: "10:00",
      responsible: "Y",
    },
  ],
  total: 6, // perPage=5 => 2 páginas
};
const samplePage2 = {
  data: [
    {
      id: 3,
      description: "C",
      date: "2025-10-18",
      time: "11:00",
      responsible: "Z",
    },
  ],
  total: 6,
};

function mockFetch(handler: (url: string) => any) {
  (vi.spyOn(globalThis as any, "fetch") as any).mockImplementation(
    async (input: any) => {
      const url =
        typeof input === "string" ? input : input?.url ?? String(input);
      const payload = handler(url);
      return new Response(JSON.stringify(payload.data), {
        headers: { "X-Total-Count": String(payload.total) },
        status: 200,
      }) as any;
    }
  );
}

describe("ScheduleTable", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("paginates between pages", async () => {
    const user = userEvent.setup();
    mockFetch((url) => (url.includes("_page=1") ? samplePage1 : samplePage2));

    renderWithQueryClient(
      <ScheduleTable onEdit={vi.fn()} onDelete={vi.fn()} />
    );

    // Página 1 visível
    expect(await screen.findByText("A")).toBeInTheDocument();

    // Ir para página 2
    await user.click(screen.getByRole("button", { name: "2" }));
    expect(await screen.findByText("C")).toBeInTheDocument();
  });

  it("filters by description", async () => {
    const user = userEvent.setup();
    mockFetch((url) =>
      url.includes("description_like=ZZZ")
        ? { data: [], total: 0 }
        : samplePage1
    );
    renderWithQueryClient(
      <ScheduleTable onEdit={vi.fn()} onDelete={vi.fn()} />
    );

    const input = await screen.findByPlaceholderText(/buscar/i);
    await user.clear(input);
    await user.type(input, "ZZZ");

    // Sem resultados
    expect(
      await screen.findByText(/nenhum agendamento encontrado/i)
    ).toBeInTheDocument();
  });

  it("triggers edit and delete handlers", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    mockFetch(() => samplePage1);
    renderWithQueryClient(
      <ScheduleTable onEdit={onEdit} onDelete={onDelete} />
    );

    // Editar primeiro item
    const editButtons = await screen.findAllByRole("button", {
      name: /editar/i,
    });
    await user.click(editButtons[0]);
    expect(onEdit).toHaveBeenCalled();

    // Excluir primeiro item
    const deleteButtons = await screen.findAllByRole("button", {
      name: /excluir/i,
    });
    await user.click(deleteButtons[0]);
    expect(onDelete).toHaveBeenCalled();
  });
});
