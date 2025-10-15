import { useQuery, useMutation, useQueryClient, type UseQueryResult, type UseMutationResult } from '@tanstack/react-query';
import { createSchedule, deleteSchedule, listSchedules, updateSchedule, type ListParams, type PaginatedResponse } from '@/services/api';
import type { Agendamento, AgendamentoCreate } from '@/types/schedule';

export function useAgendamentos(params: ListParams): {
    listQuery: UseQueryResult<PaginatedResponse<Agendamento>, Error>;
    createMut: UseMutationResult<Agendamento, Error, AgendamentoCreate, unknown>;
    updateMut: UseMutationResult<Agendamento, Error, { id: number; payload: AgendamentoCreate }, unknown>;
    deleteMut: UseMutationResult<void, Error, number, unknown>;
} {
    const queryClient = useQueryClient();

    const listQuery = useQuery<PaginatedResponse<Agendamento>>({
        queryKey: ['schedules', params],
        queryFn: () => listSchedules(params),
        placeholderData: (prev) => prev,
    });

    const createMut = useMutation({
        mutationFn: (payload: AgendamentoCreate) => createSchedule(payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['schedules'] }),
    });

    const updateMut = useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: AgendamentoCreate }) => updateSchedule(id, payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['schedules'] }),
    });

    const deleteMut = useMutation({
        mutationFn: (id: number) => deleteSchedule(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['schedules'] }),
    });

    return { listQuery, createMut, updateMut, deleteMut };
}


