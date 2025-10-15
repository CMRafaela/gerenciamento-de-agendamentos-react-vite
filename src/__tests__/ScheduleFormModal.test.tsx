import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ScheduleFormModal } from "@/components/organisms/ScheduleFormModal";

describe("ScheduleFormModal", () => {
  it("validates required fields and shows errors", async () => {
    const user = userEvent.setup();
    const onOpenChange = () => {};
    const onSubmit = vi.fn();

    render(
      <ScheduleFormModal
        open={true}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
      />
    );

    await user.click(screen.getByRole("button", { name: /criar/i }));

    expect(
      await screen.findByText(/descrição é obrigatória/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/data não pode ser no passado/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/horário inválido/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/responsável é obrigatório/i)
    ).toBeInTheDocument();
  });
});
