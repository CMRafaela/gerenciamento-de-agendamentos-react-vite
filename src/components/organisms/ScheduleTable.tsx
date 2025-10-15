import { useEffect, useMemo, useState } from "react";
import type { ListParams } from "@/services/api";
import { useAgendamentos } from "@/hooks/useAppointments";
import type { Agendamento } from "@/types/schedule";
import { formatDateToDisplay, formatTimeToDisplay } from "@/utils/date";
import { SearchInput } from "@/components/molecules/SearchInput";
import { Pagination as Pager } from "@/components/molecules/Pagination";
import { Button } from "@/components/atoms/Button";

type Props = {
  onEdit: (schedule: Agendamento) => void;
  onDelete: (schedule: Agendamento) => void;
};

export function ScheduleTable({ onEdit, onDelete }: Props) {
  const [items, setItems] = useState<Agendamento[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const params: ListParams = useMemo(
    () => ({ page, perPage, q: debouncedQuery.trim() }),
    [page, debouncedQuery]
  );

  const { listQuery } = useAgendamentos(params);
  useEffect(() => {
    if (listQuery.data) {
      setItems(listQuery.data.data);
      setTotal(listQuery.data.total);
    }
    setLoading(listQuery.isLoading || listQuery.isFetching);
    setError(listQuery.isError ? (listQuery.error as Error).message : null);
  }, [
    listQuery.data,
    listQuery.isLoading,
    listQuery.isFetching,
    listQuery.isError,
    listQuery.error,
  ]);

  useEffect(() => {
    const h = setTimeout(() => setDebouncedQuery(query), 350);
    return () => clearTimeout(h);
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-slate-900 text-slate-100 ring-1 ring-slate-800">
        <div className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-lg font-semibold">Agendamentos</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-72">
              <SearchInput
                value={query}
                onChange={(v) => {
                  setPage(1);
                  setQuery(v);
                }}
                placeholder="Buscar..."
              />
            </div>
            <Button
              variant="primary"
              className="inline-flex items-center gap-2 border-2 border-dotted border-slate-600"
              onClick={() =>
                onEdit({
                  id: 0,
                  description: "",
                  date: "",
                  time: "",
                  responsible: "",
                } as any)
              }
              aria-label="Novo Agendamento">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-green-400"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path d="M13 11h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 1 1 2 0v6z" />
              </svg>
              Novo agendamento
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-800/60 text-slate-300">
              <tr>
                <th className="p-3 font-semibold text-center">Descrição</th>
                <th className="p-3 font-semibold text-center">Data</th>
                <th className="p-3 font-semibold text-center">Horário</th>
                <th className="p-3 font-semibold text-center">Responsável</th>
                <th className="p-3 text-center font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading && (
                <tr>
                  <td colSpan={5} className="text-center">
                    <div className="flex items-center justify-center py-8">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-600 border-t-indigo-500" />
                      <span className="ml-2 text-slate-300">Carregando…</span>
                    </div>
                  </td>
                </tr>
              )}
              {error && !loading && (
                <tr>
                  <td colSpan={5} className="p-4 text-red-300">
                    {error}
                  </td>
                </tr>
              )}
              {!loading && !error && items.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-slate-300">
                    Nenhum agendamento encontrado.
                  </td>
                </tr>
              )}
              {!loading &&
                !error &&
                items.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/40">
                    <td className="p-3 text-center">{s.description}</td>
                    <td className="p-3 text-center">
                      {formatDateToDisplay(s.date)}
                    </td>
                    <td className="p-3 text-center">
                      {formatTimeToDisplay(s.time)}
                    </td>
                    <td className="p-3 text-center">{s.responsible}</td>
                    <td className="p-3">
                      <div className="flex justify-center">
                        <div className="flex items-center gap-1 rounded-full border border-slate-700 bg-slate-800/60 p-1">
                          <Button
                            variant="ghost"
                            className="p-1.5 rounded-full text-indigo-400 hover:bg-slate-700 hover:text-indigo-300"
                            onClick={() => onEdit(s)}
                            aria-label="Editar">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="currentColor">
                              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41L18.37 3.29a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                            </svg>
                          </Button>
                          <Button
                            variant="ghost"
                            className="p-1.5 rounded-full text-red-400 hover:bg-slate-700 hover:text-red-300"
                            onClick={() => onDelete(s)}
                            aria-label="Excluir">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="currentColor">
                              <path d="M6 7h12v2H6zm2 3h8l-1 9H9l-1-9zm3-6h2l1 1h5v2H5V5h5l1-1z" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-center p-4 border-t border-slate-800 rounded-b-xl">
          <Pager
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
