import { useCallback, useState } from "react";
import { ScheduleTable } from "@/components/organisms/ScheduleTable";
import { DeleteConfirmDialog } from "@/components/molecules/DeleteConfirmDialog";
import { useAgendamentoMutations } from "@/hooks/useAppointmentMutations";
import { ScheduleFormModal } from "@/components/organisms/ScheduleFormModal";
import { formatDateToDisplay, formatTimeToDisplay } from "@/utils/date";
import { Header } from "@/components/organisms/Header";
import type { Agendamento } from "@/types/schedule";
import { Toast } from "@/components/molecules/Toast";

export function App() {
  const [ready] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selected, setSelected] = useState<Agendamento | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { createMut, updateMut, deleteMut } = useAgendamentoMutations();

  const handleEdit = useCallback((s: Agendamento) => {
    setSelected(s);
    setIsFormOpen(true);
  }, []);

  const handleDeleteRequest = useCallback((s: Agendamento) => {
    setSelected(s);
    setIsDeleteOpen(true);
  }, []);

  const handleSubmitForm = useCallback(
    async (
      data: {
        description: string;
        date: string;
        time: string;
        responsible: string;
      },
      id?: number
    ) => {
      try {
        if (id) {
          await updateMut.mutateAsync({ id, payload: data });
          setMessage("Agendamento atualizado com sucesso.");
        } else {
          await createMut.mutateAsync(data);
          setMessage("Agendamento criado com sucesso.");
        }
        setErrorMsg(null);
      } catch (e) {
        setErrorMsg((e as Error).message || "Erro ao salvar agendamento");
        setMessage(null);
      }
    },
    [createMut, updateMut]
  );

  const handleConfirmDelete = useCallback(async () => {
    try {
      if (selected?.id) {
        await deleteMut.mutateAsync(selected.id);
        const label = selected.description?.trim()
          ? `"${selected.description}"`
          : "Agendamento";
        setMessage(`${label} excluído com sucesso.`);
        setErrorMsg(null);
      }
    } catch (e) {
      setErrorMsg((e as Error).message || "Erro ao excluir agendamento");
      setMessage(null);
    }
  }, [selected, deleteMut]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      <main
        id="conteudo"
        className="mx-auto max-w-6xl px-4 py-8 space-y-6"
        tabIndex={-1}>
        <h1
          id="agendamentos"
          className="text-2xl font-semibold text-slate-100 flex justify-center">
          Gerenciamento de Agendamentos
        </h1>

        <Toast
          message={message}
          type="success"
          onClose={() => setMessage(null)}
          position="top-right"
        />
        <Toast
          message={errorMsg}
          type="error"
          onClose={() => setErrorMsg(null)}
          position="top-right"
        />
        {ready ? (
          <ScheduleTable onEdit={handleEdit} onDelete={handleDeleteRequest} />
        ) : (
          <p>Carregando…</p>
        )}
      </main>
      <ScheduleFormModal
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        initialData={selected}
        onSubmit={handleSubmitForm}
      />

      <DeleteConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleConfirmDelete}
        title="Excluir agendamento"
        description={
          selected
            ? `Tem certeza que deseja excluir "${
                selected.description
              }" em ${formatDateToDisplay(
                selected.date
              )} às ${formatTimeToDisplay(selected.time)}?`
            : ""
        }
      />
      <footer className="w-full border-t border-slate-800 mt-8">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-400 text-center">
          © {new Date().getFullYear()} Rafaela Moreira -
          https://www.linkedin.com/in/rafaelah-moreira/
        </div>
      </footer>
    </div>
  );
}
